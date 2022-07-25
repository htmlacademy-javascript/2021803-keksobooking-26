import {PricesLimit} from './data.js';

const MAX_ADVERTISEMENTS = 10;

const filterForm = document.querySelector('.map__filters');
const filterHouseType = filterForm.querySelector('#housing-type');
const filterHousingPrice = filterForm.querySelector('#housing-price');
const filterHousingRooms = filterForm.querySelector('#housing-rooms');
const filterHousingGuests = filterForm.querySelector('#housing-guests');
const filterFeatures = [...filterForm.querySelectorAll('#housing-features [type="checkbox"]')];
let listFeatures = [];

const checkTypeHouse = (ads) => (filterHouseType.value === 'any' || ads.offer.type === filterHouseType.value);
const checkPriceLimit = (value) => (PricesLimit[filterHousingPrice.value][0] <= value && PricesLimit[filterHousingPrice.value][1] > value);
const checkPriceHouse = (ads) => ads.offer.price ? checkPriceLimit(ads.offer.price) : filterHousingPrice.value === 'any';
const checkRoomCount = (ads) => (filterHousingRooms.value === 'any' || ads.offer.rooms === +filterHousingRooms.value);
const checkGuestCount = (ads) => (filterHousingGuests.value === 'any' || ads.offer.guests === +filterHousingGuests.value);
const checkFeatures = (ads) => {
  if (ads.offer.features !== undefined) {
    return listFeatures.every((element) => ads.offer.features.some((feature) => element.value === feature));
  }
  return listFeatures.length === 0;
};
const filterAdvertisements = (advertisements) => {
  listFeatures = filterFeatures.filter((element) => element.checked);
  const result = [];
  for (const ads of advertisements) {
    if (
      checkTypeHouse(ads) &&
        checkPriceHouse(ads) &&
        checkRoomCount(ads) &&
        checkGuestCount(ads) &&
        checkFeatures(ads)
    ) {
      result.push(ads);
      if (result.length === MAX_ADVERTISEMENTS) {
        return result;
      }
    }
  }
  return result;
};

const addEventChangeFilter = (onUpdate) => filterForm.addEventListener('change', onUpdate);

const resetMapFilters = () => {
  filterForm.reset();
};

export {addEventChangeFilter,filterAdvertisements,resetMapFilters};
