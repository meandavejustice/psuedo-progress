Pseudo Progress
------------------------------------------------------------------

from the original source:

```
A pseudo progress indicator.

This is just a silly shell animation that was meant to simulate how lots of
tests would be run on an add-on file. It sort of looks like a torrent file
randomly getting filled in.
```

#### usage

``` javascript
const PseudoProgress = require('./index.js');

const p = new PseudoProgress({
  preamble: 'Testing PseudoProgress', // message to show the user before animation. defaults to ''
  setInterval: setInterval, // optionally override setInterval
  clearInterval: clearInterval, // optionally override clearInterval
  stdout: process.stdout // optionally overide process.stdout
});

p.animate();

setTimeout(() => p.finish(), 4000);

```

#### attribution
pulled from [mozilla/jpm](https://github.com/mozilla-jetpack/jpm/blob/6a387ef466f9f80fb8a3666ae0845a9544c76390/lib/amo-client.js#L507)

original author is [@kumar303](https://github.com/kumar303)

#### License
MPL 2.0

