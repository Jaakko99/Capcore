import { registerPlugin } from '@capacitor/core';

import type { RecolorPlugin } from './definitions';

const Recolor = registerPlugin<RecolorPlugin>('Recolor', {
  web: () => import('./web').then((m) => new m.RecolorWeb()),
});

export * from './definitions';
export { Recolor };
