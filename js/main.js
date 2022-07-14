import {changeState} from './form_state.js';
changeState(0);
import {validateForm,setAdsFormSubmit} from './form_validate.js';
import {getMap} from './map.js';
import {getData} from './api.js';
validateForm();
getData((advertisements) => {
  getMap(advertisements);
});
setAdsFormSubmit();
