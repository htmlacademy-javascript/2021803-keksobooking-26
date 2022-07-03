import {getRenderingAdvertisement} from './create_advertisements.js';
import {createAdvertisements} from './data.js';
import {changeState} from './form_state.js';
getRenderingAdvertisement(createAdvertisements());
changeState(0);
