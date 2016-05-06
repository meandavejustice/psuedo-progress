const PseudoProgress = require('./index.js');

const p = new PseudoProgress({
  preamble: 'Testing PseudoProgress'
});

p.animate();

setTimeout(() => p.finish(), 8000);
