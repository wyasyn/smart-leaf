import { getMaxZoomFactorAsync } from '@modules/camera-zoom';
import { CameraView, type CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect, useNavigation } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';

import { useSmartLeafModel } from '@/ml/SmartLeafModelProvider';
import { runDiagnosis } from '@/ml/inference';
import {
  useActiveScanImage,
  useScanStore,
} from '@/stores/scan-store';
import { useSettingsStore } from '@/stores/settings-store';

import { ScanCameraView } from './ScanCameraView';
import { ScanControls } from './ScanControls';
import { ScanPreviewView } from './ScanPreviewView';
import { ScanResultOverlay } from './ScanResultOverlay';
import { buildZoomPresets } from './ScanZoomPill';

export function ScanScreen() {
  const navigation = useNavigation();
  const cameraRef = useRef<CameraView>(null);
  const navigatingRef = useRef(false);

  const [zoom, setZoom] = useState(0);
  const [zoomVisible, setZoomVisible] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');
  const [maxZoomFactor, setMaxZoomFactor] = useState(1);

  // Read the device's true max zoom factor once so 1×/2×/3× map to real magnification.
  useEffect(() => {
    let active = true;
    getMaxZoomFactorAsync().then((max) => {
      if (active) setMaxZoomFactor(max);
    });
    return () => {
      active = false;
    };
  }, []);

  const zoomPresets = useMemo(
    () => buildZoomPresets(maxZoomFactor),
    [maxZoomFactor],
  );

  const phase = useScanStore((s) => s.phase);
  const status = useScanStore((s) => s.status);
  const error = useScanStore((s) => s.error);
  const addImage = useScanStore((s) => s.addImage);
  const retake = useScanStore((s) => s.retake);
  const removeActiveImage = useScanStore((s) => s.removeActiveImage);
  const setStatus = useScanStore((s) => s.setStatus);
  const setResult = useScanStore((s) => s.setResult);
  const setError = useScanStore((s) => s.setError);
  const reset = useScanStore((s) => s.reset);
  const activeImage = useActiveScanImage();

  const { model, state: modelState, reload: reloadModel } = useSmartLeafModel();
  const confThresholdOverride = useSettingsStore((s) => s.confThresholdOverride);

  // Reset scan state when leaving the scan tab, not when pushing stack screens.
  useEffect(() => {
    const tabNav = navigation.getParent();
    if (!tabNav) return;

    const unsubBlur = tabNav.addListener('blur', () => {
      if (!navigatingRef.current) {
        reset();
      }
    });

    return () => {
      unsubBlur();
    };
  }, [navigation, reset]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        navigatingRef.current = false;
      };
    }, []),
  );

  const handleCapture = async () => {
    if (Platform.OS === 'web') return;

    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.9 });
    if (photo?.uri) {
      setZoomVisible(false);
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
      setZoomVisible(false);
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
      // Stay on the scan screen — the result renders as an inline card overlay.
      setResult(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Diagnosis failed');
    }
  };

  const showCamera = phase === 'camera';
  const hasActiveImage = phase === 'preview' && !!activeImage;
  const isBusy = status === 'preprocessing' || status === 'running';
  const showResult = status === 'done' || status === 'uncertain';

  return (
    <View style={styles.container}>
      {showCamera ? (
        <ScanCameraView cameraRef={cameraRef} zoom={zoom} facing={facing} />
      ) : null}
      {hasActiveImage ? <ScanPreviewView uri={activeImage.uri} /> : null}

      {isBusy ? (
        <View style={styles.loadingOverlay} pointerEvents="none">
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Analyzing…</Text>
        </View>
      ) : null}

      {error && hasActiveImage ? (
        <View style={styles.errorBanner} pointerEvents="none">
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {showResult ? (
        <ScanResultOverlay />
      ) : showCamera || hasActiveImage ? (
        <ScanControls
          phase={showCamera ? 'camera' : 'preview'}
          busy={isBusy}
          shutterDisabled={
            Platform.OS === 'web' ||
            (!showCamera && modelState !== 'loaded')
          }
          onCapture={handleCapture}
          onPickFromGallery={handlePickFromGallery}
          onFlipCamera={() =>
            setFacing((f) => (f === 'back' ? 'front' : 'back'))
          }
          onAnalyze={handleAnalyze}
          onRetake={retake}
          onRemove={removeActiveImage}
          modelLoaded={modelState === 'loaded'}
          onReloadModel={reloadModel}
          zoom={zoom}
          zoomPresets={zoomPresets}
          onZoomChange={setZoom}
          zoomVisible={zoomVisible}
          onToggleZoom={() => setZoomVisible((v) => !v)}
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
