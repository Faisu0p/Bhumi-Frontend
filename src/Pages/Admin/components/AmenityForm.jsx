import React, { useState } from 'react';
import './AmenityForm.css';

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

  const categorizedAmenities = {
    "Basic Amenities": [
      "waterSupply",
      "powerBackup",
      "adequateParkingCoveredUncovered",
      "gatedSecurityWithCctvSurveillance",
      "highSpeedElevators",
      "fireSafetySystems",
    ],
    "Lifestyle & Recreation Amenities": [
      "landscapedGardensParks",
      "joggingAndCyclingTracks",
      "indoorGamesRoom",
      "sportsFacilities",
      "multipurposeHallForEvents",
    ],
    "Green & Sustainable Features": [
      "rainwaterHarvesting",
      "solarPowerPanels",
      "sewageTreatmentPlant",
      "organicWasteComposting",
      "energyEfficientLightingInCommonAreas",
    ],
    "Advanced Safety & Technology Features": [
      "videoDoorPhones",
      "digitalSmartLocks",
      "wiFiConnectivityInCommonAreas",
      "intercomFacility",
      "earthquakeResistantDesign",
    ],
    "Convenience Features": [
      "shoppingArcadeConvenienceStore",
      "pharmacyClinic",
      "cafeteriaRestaurant",
      "visitorParking",
      "dedicatedServiceElevators",
    ],
    "Premium/High-end Features": [
      "infinityPool",
      "skyLoungeTerraceGarden",
      "privateTheaterMediaRoom",
      "businessCenterCoWorkingSpaces",
    ],
    "Community-oriented Features": [
      "petFriendlyZones",
      "amphitheaterOpenAirSeating",
      "templePrayerRoom",
      "seniorCitizenArea",
      "communityLibrary",
      "barbecuePicnicZones",
    ],
    "Health & Wellness Amenities": [
      "spaAndSauna",
      "meditationYogaDeck",
      "openGymFitnessStationsInThePark",
      "walkingReflexologyPath",
      "healthCheckUpKiosk",
    ],
    "Technology & Automation Amenities": [
      "electricVehicleEvChargingStations",
      "smartHomeAutomationFeatures",
      "automatedParkingSystems",
      "smartWasteManagementSystem",
      "appBasedVisitorManagementSystem",
    ],
    "Luxury Lifestyle Features": [
      "exclusivePrivatePoolsForPenthouses",
      "helipad",
      "wineCellarOrTastingLounge",
      "golfSimulatorPuttingGreen",
    ],
    "Work & Study Amenities": [
      "servicedApartmentsForGuests",
      "dedicatedWorkFromHomeCabins",
      "soundproofStudyPodsForStudents",
      "conferenceRoomsWithAvFacilities",
      "elearningZoneForKids",
      "artAndCraftStudioForHobbies",
    ],
    "Sports & Adventure Amenities": [
      "cricketNets",
      "skatingRink",
      "futsalCourt",
      "archeryRange",
      "outdoorAdventureActivities",
    ],
    "Social & Cultural Amenities": [
      "artGalleryOrExhibitionHall",
      "culturalAmphitheater",
      "danceAndMusicStudios",
      "cookingClassZoneOrOpenKitchen",
      "eventPlazaForFestivals",
    ],
    "Specialized Premium Amenities": [
      "skywalkOrObservationDeck",
      "waterfrontWithBoatingFacilities",
      "privateCabanasOrGazebos",
      "luxuryConciergeServices",
    ],
    "Security and Accessibility Features": [
      "rooftopSolarObservatory",
      "emergencyPanicButtonsInCommonAreas",
      "physicallyDisabledFriendlyPathwaysAndFacilities",
      "dedicatedSpaceForAmbulanceParking",
      "dedicatedDeliveryLockersForEcommerceParcels",
      "droneDeliveryLandingZones",
    ],
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Amenities</h2>
      {Object.keys(categorizedAmenities).map((category, index) => (
        <div key={index} className={`amenity-category-${index}`}>
          <h3 className={`amenity-category-title-${index}`}>{category}</h3>
          {categorizedAmenities[category].map((key) => (
            <label key={key} className={`amenity-checkbox-${key}`}>
              {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
              <input
                type="checkbox"
                name={key}
                checked={amenityData[key]}
                onChange={handleChange}
                className={`amenity-input-${key}`}
              />
            </label>
          ))}
        </div>
      ))}
      <button type="submit" className="submit-button">Next</button>
    </form>
  );
};

export default AmenityForm;
