import { registerPlugin } from '@capacitor/core';

import type { CapCoreVisionWeb } from './definitions';

const CapCoreVision = registerPlugin<CapCoreVisionWeb>('CapCoreVision', {
  web: () => import('./web').then((m) => new m.CapCoreVisionWeb()),
});

export * from './definitions';
export { CapCoreVisionWeb };
