import {validateForm,setAdsFormSubmit} from './form-validate.js';
import {uploadFile} from './file.js';
import {createMapAds} from './map.js';
import './form-state.js';

uploadFile();
validateForm();
setAdsFormSubmit();
createMapAds();

