import AVFoundation
import ExpoModulesCore

public class CameraZoomModule: Module {
  public func definition() -> ModuleDefinition {
    Name("CameraZoom")

    // Returns the back camera's maximum video zoom *factor* (>= 1.0).
    // expo-camera maps its 0–1 `zoom` prop linearly onto 1.0...maxAvailableVideoZoomFactor,
    // so the JS side can convert a desired factor F to zoom = (F - 1) / (max - 1).
    AsyncFunction("getMaxZoomFactor") { () -> Double in
      let discovery = AVCaptureDevice.DiscoverySession(
        deviceTypes: [
          .builtInWideAngleCamera,
          .builtInDualCamera,
          .builtInDualWideCamera,
          .builtInTripleCamera,
        ],
        mediaType: .video,
        position: .back
      )

      let device =
        discovery.devices.first
        ?? AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .back)

      guard let device else {
        return 1.0
      }

      return Double(device.maxAvailableVideoZoomFactor)
    }
  }
}
