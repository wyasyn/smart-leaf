import { IconCamera } from '@tabler/icons-react-native';
import { CameraView, useCameraPermissions, type CameraType } from 'expo-camera';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const ACCENT = '#3DBB6E';

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
    // Once the user has permanently denied access, the OS prompt no longer
    // appears — send them to Settings instead.
    const deniedForever = permission.canAskAgain === false;
    const onPress = deniedForever
      ? () => Linking.openSettings()
      : requestPermission;

    return (
      <View style={[styles.fill, styles.permission]}>
        <Animated.View
          entering={FadeIn.duration(250)}
          style={styles.card}
        >
          <View style={styles.iconBadge}>
            <IconCamera size={22} color={ACCENT} strokeWidth={1.9} />
          </View>

          <Text style={styles.title}>Camera Access</Text>
          <Text style={styles.body}>
            Allow the camera to scan plant leaves.
          </Text>

          <Pressable
            onPress={onPress}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>
              {deniedForever ? 'Open Settings' : 'Allow'}
            </Text>
          </Pressable>
        </Animated.View>
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
    padding: 24,
    backgroundColor: '#000',
  },
  card: {
    width: 280,
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 22,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.75)',
    gap: 8,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(61,187,110,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  title: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  body: {
    color: '#6B7280',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  button: {
    marginTop: 14,
    alignSelf: 'stretch',
    backgroundColor: ACCENT,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
