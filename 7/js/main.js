import {getRenderingAdvertisement} from './create_advertisements.js';
import {createAdvertisements} from './data.js';
import {changeState} from './form_state.js';
import './form_validate.js';
getRenderingAdvertisement(createAdvertisements());
changeState(1);
