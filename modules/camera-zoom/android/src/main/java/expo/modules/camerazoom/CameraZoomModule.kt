package expo.modules.camerazoom

import android.content.Context
import android.hardware.camera2.CameraCharacteristics
import android.hardware.camera2.CameraManager
import android.os.Build
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class CameraZoomModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("CameraZoom")

    // Returns the back camera's maximum zoom *ratio* (>= 1.0). expo-camera maps its
    // 0–1 `zoom` prop onto this range, so the JS side converts a desired factor F to
    // zoom = (F - 1) / (max - 1).
    AsyncFunction("getMaxZoomFactor") {
      val context = appContext.reactContext ?: return@AsyncFunction 1.0
      val manager =
        context.getSystemService(Context.CAMERA_SERVICE) as? CameraManager
          ?: return@AsyncFunction 1.0

      var maxZoom = 1.0

      try {
        for (id in manager.cameraIdList) {
          val characteristics = manager.getCameraCharacteristics(id)
          val facing = characteristics.get(CameraCharacteristics.LENS_FACING)
          if (facing != CameraCharacteristics.LENS_FACING_BACK) {
            continue
          }

          // Android 11+ exposes a true zoom-ratio range (includes optical lenses).
          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            val range = characteristics.get(CameraCharacteristics.CONTROL_ZOOM_RATIO_RANGE)
            if (range != null) {
              maxZoom = range.upper.toDouble()
            }
          }

          // Fallback to the legacy max digital zoom on older devices.
          if (maxZoom <= 1.0) {
            val maxDigital =
              characteristics.get(CameraCharacteristics.SCALER_AVAILABLE_MAX_DIGITAL_ZOOM)
            if (maxDigital != null && maxDigital > 1f) {
              maxZoom = maxDigital.toDouble()
            }
          }
          break
        }
      } catch (e: Exception) {
        return@AsyncFunction 1.0
      }

      maxZoom
    }
  }
}
