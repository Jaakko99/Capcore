import { WebPlugin } from '@capacitor/core';
import type { CapCoreVisionPlugin } from './definitions';

export class CapCoreVisionWeb extends WebPlugin implements CapCoreVisionPlugin {
  async createSession(_options: { imageBase64: string }): Promise<{ sessionId: string }> {
    console.log('createSession called - web stub');
    throw new Error("CapCoreVision plugin features are not supported on web fallbacks.");
  }

  async getDominantColor(_options: { sessionId: string }): Promise<{ detectedColor: string }> {
    throw new Error("CapCoreVision plugin features are not supported on web fallbacks.");
  }

  async recolor(_options: { sessionId: string; targetColor: string }): Promise<{ imageBase64: string }> {
    throw new Error("CapCoreVision plugin features are not supported on web fallbacks.");
  }
}