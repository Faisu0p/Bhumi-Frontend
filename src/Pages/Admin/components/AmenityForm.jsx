import React, { useState } from 'react';

const AmenityForm = ({ onNext, amenities }) => {
  const [amenityData, setAmenityData] = useState({
    waterSupply: false,
    powerBackup: false,
    adequateParkingCoveredUncovered: false,
    gatedSecurityWithCctvSurveillance: false,
    highSpeedElevators: false,
    fireSafetySystems: false,
    landscapedGardensParks: false,
    joggingAndCyclingTracks: false,
    indoorGamesRoom: false,
    sportsFacilities: false,
    multipurposeHallForEvents: false,
    rainwaterHarvesting: false,
    solarPowerPanels: false,
    sewageTreatmentPlant: false,
    organicWasteComposting: false,
    energyEfficientLightingInCommonAreas: false,
    videoDoorPhones: false,
    digitalSmartLocks: false,
    wiFiConnectivityInCommonAreas: false,
    intercomFacility: false,
    earthquakeResistantDesign: false,
    shoppingArcadeConvenienceStore: false,
    pharmacyClinic: false,
    cafeteriaRestaurant: false,
    visitorParking: false,
    dedicatedServiceElevators: false,
    infinityPool: false,
    skyLoungeTerraceGarden: false,
    privateTheaterMediaRoom: false,
    businessCenterCoWorkingSpaces: false,
    petFriendlyZones: false,
    amphitheaterOpenAirSeating: false,
    templePrayerRoom: false,
    seniorCitizenArea: false,
    communityLibrary: false,
    barbecuePicnicZones: false,
    spaAndSauna: false,
    meditationYogaDeck: false,
    openGymFitnessStationsInThePark: false,
    walkingReflexologyPath: false,
    healthCheckUpKiosk: false,
    electricVehicleEvChargingStations: false,
    smartHomeAutomationFeatures: false,
    automatedParkingSystems: false,
    smartWasteManagementSystem: false,
    appBasedVisitorManagementSystem: false,
    exclusivePrivatePoolsForPenthouses: false,
    helipad: false,
    wineCellarOrTastingLounge: false,
    golfSimulatorPuttingGreen: false,
    servicedApartmentsForGuests: false,
    dedicatedWorkFromHomeCabins: false,
    soundproofStudyPodsForStudents: false,
    conferenceRoomsWithAvFacilities: false,
    elearningZoneForKids: false,
    artAndCraftStudioForHobbies: false,
    cricketNets: false,
    skatingRink: false,
    futsalCourt: false,
    archeryRange: false,
    outdoorAdventureActivities: false,
    artGalleryOrExhibitionHall: false,
    culturalAmphitheater: false,
    danceAndMusicStudios: false,
    cookingClassZoneOrOpenKitchen: false,
    eventPlazaForFestivals: false,
    skywalkOrObservationDeck: false,
    waterfrontWithBoatingFacilities: false,
    privateCabanasOrGazebos: false,
    luxuryConciergeServices: false,
    rooftopSolarObservatory: false,
    emergencyPanicButtonsInCommonAreas: false,
    physicallyDisabledFriendlyPathwaysAndFacilities: false,
    dedicatedSpaceForAmbulanceParking: false,
    dedicatedDeliveryLockersForEcommerceParcels: false,
    droneDeliveryLandingZones: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setAmenityData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext([...amenities, amenityData]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Amenities</h2>
      {Object.keys(amenityData).map((key) => (
        <label key={key}>
          {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
          <input
            type="checkbox"
            name={key}
            checked={amenityData[key]}
            onChange={handleChange}
          />
        </label>
      ))}
      <button type="submit">Next</button>
    </form>
  );
};

export default AmenityForm;
