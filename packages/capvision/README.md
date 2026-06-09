# recolor-plugin

Native on-device object segmentation and transformation for Capacitor apps.

## Install

To use npm

```bash
npm install recolor-plugin
````

To use yarn

```bash
yarn add recolor-plugin
```

Sync native files

```bash
npx cap sync
```

## API

<docgen-index>

* [`detectColor(...)`](#detectcolor)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### detectColor(...)

```typescript
detectColor(options: { imageBase64: string; }) => Promise<{ detectedColor: string; }>
```

| Param         | Type                                  |
| ------------- | ------------------------------------- |
| **`options`** | <code>{ imageBase64: string; }</code> |

**Returns:** <code>Promise&lt;{ detectedColor: string; }&gt;</code>

--------------------

</docgen-api>
