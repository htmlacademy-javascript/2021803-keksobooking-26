import {validateForm,setAdsFormSubmit} from './form-validate.js';
import {uploadFile} from './file.js';
import {createMapAds} from './map.js';

uploadFile();
validateForm();
setAdsFormSubmit();
createMapAds();

