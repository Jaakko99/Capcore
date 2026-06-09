export interface RecolorPlugin {
    createSession(options: {
    imageBase64: string;
  }): Promise<{
    sessionId: string;
  }>;

  getDominantColor(options: {
    sessionId: string;
  }): Promise<{
    detectedColor: string;
  }>;

  recolor(options: {
    sessionId: string;
    targetColor: string;
  }): Promise<{
    imageBase64: string;
  }>;
}