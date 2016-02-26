/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the 'License'). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */

/*
 * A pseudo progress indicator.
 *
 * This is just a silly shell animation that was meant to simulate how lots of
 * tests would be run on an add-on file. It sort of looks like a torrent file
 * randomly getting filled in.
 */

module.exports = PseudoProgress;

function PseudoProgress(conf) {
  conf = Object.assign({
    preamble: "",
    setInterval: setInterval,
    clearInterval: clearInterval,
    stdout: process.stdout,

  }, conf);

  this.bucket = [];
  this.interval = null;
  this.motionCounter = 1;

  this.preamble = conf.preamble;
  this.preamble += " [";
  this.addendum = "]";
  this.setInterval = conf.setInterval;
  this.clearInterval = conf.clearInterval;
  this.stdout = conf.stdout;

  var shellWidth = 80;
  if (this.stdout.isTTY) {
    shellWidth = this.stdout.columns;

  }

  this.emptyBucketPointers = [];
  var bucketSize = shellWidth - this.preamble.length - this.addendum.length;
  for (var i = 0; i < bucketSize; i++) {
    this.bucket.push(" ");
    this.emptyBucketPointers.push(i);

  }
}

PseudoProgress.prototype.animate = function(conf) {
  conf = Object.assign({
    speed: 100,

  }, conf);
  var self = this;
  var bucketIsFull = false;
  this.interval = this.setInterval(function() {
    if (bucketIsFull) {
      self.moveBucket();

    } else {
      bucketIsFull = self.randomlyFillBucket();

    }

  }, conf.speed);
};

PseudoProgress.prototype.finish = function() {
  this.clearInterval(this.interval);
  this.fillBucket();
};

PseudoProgress.prototype.randomlyFillBucket = function() {
  // randomly fill a bucket (the width of the shell) with dots.
  var self = this;
  var randomIndex = Math.floor(Math.random() *
    this.emptyBucketPointers.length);
  var pointer = this.emptyBucketPointers[randomIndex];
  this.bucket[pointer] = ".";

  this.showBucket();

  var isFull = true;
  var newPointers = [];
  this.emptyBucketPointers.forEach(function(pointer) {
    if (self.bucket[pointer] === " ") {
      isFull = false;
      newPointers.push(pointer);

    }

  });
  this.emptyBucketPointers = newPointers;

  return isFull;
};

PseudoProgress.prototype.fillBucket = function() {
  // fill the whole bucket with dots to indicate completion.
  this.bucket = this.bucket.map(function() {
    return ".";

  });
  this.showBucket();
};

PseudoProgress.prototype.moveBucket = function() {
  // animate dots moving in a forward motion.
  for (var i = 0; i < this.bucket.length; i++) {
    this.bucket[i] = ((i - this.motionCounter) % 3) ? " " : ".";

  }
  this.showBucket();

  this.motionCounter ++;
};

PseudoProgress.prototype.showBucket = function() {
  this.stdout.write("\r" + this.preamble + this.bucket.join("") +
                    this.addendum);
};
