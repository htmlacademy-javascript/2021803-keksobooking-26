import { createAdvertisement, COUNT_ADVERTISEMENTS } from './data.js';

const ADVERTISEMENTS = [];
for (let i = 1; i <= COUNT_ADVERTISEMENTS; i++) {
  ADVERTISEMENTS.push(createAdvertisement(i));
}

