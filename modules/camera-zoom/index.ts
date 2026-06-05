import { requireOptionalNativeModule } from 'expo';

type CameraZoomNativeModule = {
  /** The maximum zoom *factor* of the device's back camera (e.g. 1.0, 4.0, 16.0). */
  getMaxZoomFactor(): Promise<number>;
};

// Optional: resolves to null on web / when the native module isn't present.
const CameraZoom =
  requireOptionalNativeModule<CameraZoomNativeModule>('CameraZoom');

/**
 * Returns the back camera's maximum zoom *factor* (not expo-camera's 0–1 value).
 * Falls back to 1 (no zoom available) when the native module is unavailable.
 */
export async function getMaxZoomFactorAsync(): Promise<number> {
  if (!CameraZoom) return 1;
  try {
    const max = await CameraZoom.getMaxZoomFactor();
    return typeof max === 'number' && max >= 1 ? max : 1;
  } catch {
    return 1;
  }
}
