const filterForm = document.querySelector('.map__filters');
const filterHouseType = filterForm.querySelector('#housing-type');
const filterHousingPrice = filterForm.querySelector('#housing-price');
const filterHousingRooms = filterForm.querySelector('#housing-rooms');
const filterHousingGuests = filterForm.querySelector('#housing-guests');
const filterFeatures = [...filterForm.querySelectorAll('#housing-features [type="checkbox"]')];
const MAX_ADVERTISEMENTS = 10;
const PricesLimit = {
  any: [0, 100000],
  low: [0, 10000],
  middle: [10000, 50000],
  high: [50000, 100000]
};

let listFeatures = [];

const checkTypeHouse = (advertisement) => (filterHouseType.value === 'any' || advertisement.offer.type === filterHouseType.value);
const checkPriceLimit = (value) => (PricesLimit[filterHousingPrice.value][0] <= value && PricesLimit[filterHousingPrice.value][1] > value);
const checkPriceHouse = (advertisement) => advertisement.offer.price ? checkPriceLimit(advertisement.offer.price) : filterHousingPrice.value === 'any';
const checkRoomCount = (advertisement) => (filterHousingRooms.value === 'any' || advertisement.offer.rooms === +filterHousingRooms.value);
const checkGuestCount = (advertisement) => (filterHousingGuests.value === 'any' || advertisement.offer.guests === +filterHousingGuests.value);
const checkFeatures = (advertisement
) => {
  if (advertisement
    .offer.features !== undefined) {
    return listFeatures.every((element) => advertisement
      .offer.features.some((feature) => element.value === feature));
  }
  return listFeatures.length === 0;
};
const filterAdvertisements = (advertisements) => {
  listFeatures = filterFeatures.filter((element) => element.checked);
  const result = [];
  for (const advertisement
    of advertisements) {
    if (
      checkTypeHouse(advertisement) &&
      checkPriceHouse(advertisement) &&
      checkRoomCount(advertisement) &&
      checkGuestCount(advertisement) &&
      checkFeatures(advertisement)
    ) {
      result.push(advertisement
      );
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
