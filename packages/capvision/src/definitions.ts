export interface CapCoreVisionPlugin {
    /**
     * Initializes an isolated ML segmentation session with the source image.
     * Returns a unique sessionId to reference this cached asset in native memory.
    */

    createSession(options: {
    imageBase64: string;
  }): Promise<{
    sessionId: string;
  }>;
    /**
    * Analyzes the cached session image using on-device ML Kit / CoreML
    * to extract the primary dominant color vector.
    */
  getDominantColor(options: {
    sessionId: string;
  }): Promise<{
    detectedColor: string;
  }>;

    /**
   * Executes the native masking and tint layer overrides on the specified
   * session image, returning the updated base64 data string.
   */
  recolor(options: {
    sessionId: string;
    targetColor: string;
  }): Promise<{
    imageBase64: string;
  }>;
}