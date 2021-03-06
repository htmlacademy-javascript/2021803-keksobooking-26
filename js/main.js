import {changeState} from './form-state.js';
changeState(0);
import {validateForm,setAdsFormSubmit} from './form-validate.js';
import {createMarker} from './map.js';
import {getData} from './api.js';
import {getRandomArray,debounce} from './utils.js';
import {addEventChangeFilter,filterAdvertisements} from './filter.js';
import {uploadFile} from './file.js';

uploadFile();
validateForm();
const RERENDER_DELAY = 500;
getData((advertisements) => {
  createMarker(getRandomArray(advertisements));
  addEventChangeFilter (debounce ( () => createMarker(filterAdvertisements(advertisements)),RERENDER_DELAY));
});
setAdsFormSubmit();
