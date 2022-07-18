import {changeState} from './form_state.js';
changeState(0);
import {validateForm,setAdsFormSubmit} from './form_validate.js';
import {createMarker} from './map.js';
import {getData} from './api.js';
import {getRandomArray,debounce} from './utils.js';
import {addEventChangeFilter,filterAdvertisements} from './filter.js';

validateForm();
const RERENDER_DELAY = 500;
getData((advertisements) => {
  createMarker(getRandomArray(advertisements));
  addEventChangeFilter (debounce ( () => createMarker(filterAdvertisements(advertisements)),RERENDER_DELAY));
});
setAdsFormSubmit();
