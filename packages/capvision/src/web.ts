import { WebPlugin } from '@capacitor/core';

import type { RecolorPlugin } from './definitions';

export class RecolorWeb extends WebPlugin implements RecolorPlugin {
async detectColor(_options: { imageBase64: string }): Promise<{ detectedColor: string }> {
  console.log('detectColor called - web stub');
throw new Error("Recolor plugin not supported on web");}
}
