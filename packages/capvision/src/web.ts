import { WebPlugin } from '@capacitor/core';

import type { CapCoreVisionWeb } from './definitions';

export class CapCoreVisionWeb extends WebPlugin implements CapCoreVisionWeb {
async detectColor(_options: { imageBase64: string }): Promise<{ detectedColor: string }> {
  console.log('detectColor called - web stub');
throw new Error("Recolor plugin not supported on web");}
}
