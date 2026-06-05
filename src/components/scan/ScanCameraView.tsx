import { CameraView, useCameraPermissions, type CameraType } from 'expo-camera';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ScanCameraViewProps = {
  cameraRef: React.RefObject<CameraView | null>;
  /** Camera zoom, 0–1 over the device's available range. */
  zoom?: number;
  /** Which lens to use. */
  facing?: CameraType;
};

export function ScanCameraView({
  cameraRef,
  zoom = 0,
  facing = 'back',
}: ScanCameraViewProps) {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View style={styles.fill} />;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.fill, styles.permission]}>
        <Text style={styles.permissionText}>
          Camera access is required to scan plants.
        </Text>
        <Pressable style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant permission</Text>
        </Pressable>
      </View>
    );
  }

  // The scan tab is kept attached (detachInactiveScreens={false} in the tabs layout),
  // so this CameraView stays mounted across tab switches and the preview surface is
  // never destroyed — the camera is live the instant you return, with no white frame.
  return (
    <CameraView ref={cameraRef} style={styles.fill} facing={facing} zoom={zoom} />
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  permission: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 24,
    backgroundColor: '#000',
  },
  permissionText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: '#3DBB6E',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
