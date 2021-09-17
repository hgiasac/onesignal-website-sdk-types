# OneSignal Website SDK TypeScript types

Typescript definitions for [OneSignal-Website-SDK](https://github.com/OneSignal/OneSignal-Website-SDK)

```ts
import { OneSignal } from "onesignal-website-sdk-types";

const oneSignal: OneSignal = window["OneSignal"] || [];

oneSignal.push(() => {
  oneSignal.init({ appId: "<YOUR_APP_ID>" });
  // ...
});
```