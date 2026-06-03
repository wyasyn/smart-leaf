import { CameraView } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useRef } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';

import { useSmartLeafModel } from '@/ml/SmartLeafModelProvider';
import { runDiagnosis } from '@/ml/inference';
import { useSettingsStore } from '@/stores/settings-store';
import {
  useActiveScanImage,
  useScanStore,
} from '@/stores/scan-store';

import { ScanCameraControls } from './ScanCameraControls';
import { ScanCameraView } from './ScanCameraView';
import { ScanPreviewControls } from './ScanPreviewControls';
import { ScanPreviewView } from './ScanPreviewView';

export function ScanScreen() {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const navigatingRef = useRef(false);

  const phase = useScanStore((s) => s.phase);
  const status = useScanStore((s) => s.status);
  const error = useScanStore((s) => s.error);
  const addImage = useScanStore((s) => s.addImage);
  const retake = useScanStore((s) => s.retake);
  const removeActiveImage = useScanStore((s) => s.removeActiveImage);
  const addAnother = useScanStore((s) => s.addAnother);
  const setStatus = useScanStore((s) => s.setStatus);
  const setResult = useScanStore((s) => s.setResult);
  const setError = useScanStore((s) => s.setError);
  const reset = useScanStore((s) => s.reset);
  const activeImage = useActiveScanImage();

  const { model, state: modelState } = useSmartLeafModel();
  const confThresholdOverride = useSettingsStore((s) => s.confThresholdOverride);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!navigatingRef.current) {
          reset();
        }
        navigatingRef.current = false;
      };
    }, [reset]),
  );

  const handleCapture = async () => {
    if (Platform.OS === 'web') return;

    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.9 });
    if (photo?.uri) {
      addImage(photo.uri);
    }
  };

  const handlePickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      addImage(result.assets[0].uri);
    }
  };

  const handleAnalyze = async () => {
    if (!activeImage?.uri) return;
    if (modelState !== 'loaded' || !model) {
      setError('Model is still loading. Please wait and try again.');
      return;
    }

    setStatus('preprocessing');
    try {
      setStatus('running');
      const result = await runDiagnosis(
        model,
        activeImage.uri,
        confThresholdOverride ?? undefined,
      );
      setResult(result);
      navigatingRef.current = true;
      router.push('/(main)/(scan)/result');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Diagnosis failed');
    }
  };

  const showCamera = phase === 'camera';
  const showPreview = phase === 'preview' && activeImage;
  const isBusy = status === 'preprocessing' || status === 'running';

  return (
    <View style={styles.container}>
      {showCamera ? <ScanCameraView cameraRef={cameraRef} /> : null}
      {showPreview ? <ScanPreviewView uri={activeImage.uri} /> : null}

      {isBusy ? (
        <View style={styles.loadingOverlay} pointerEvents="none">
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Analyzing…</Text>
        </View>
      ) : null}

      {showCamera ? (
        <ScanCameraControls
          onCapture={handleCapture}
          onPickFromGallery={handlePickFromGallery}
          disabled={Platform.OS === 'web'}
        />
      ) : null}

      {error && showPreview ? (
        <View style={styles.errorBanner} pointerEvents="none">
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {showPreview ? (
        <ScanPreviewControls
          onRetake={retake}
          onRemove={removeActiveImage}
          onAddAnother={addAnother}
          onAnalyze={handleAnalyze}
          analyzeDisabled={isBusy || modelState !== 'loaded'}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorBanner: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(220,38,38,0.9)',
    padding: 12,
    borderRadius: 8,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
});
