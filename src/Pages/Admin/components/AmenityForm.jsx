import React, { useState } from 'react';
import './AmenityForm.css';

const AmenityForm = ({ onNext, amenities, onPrevious}) => {
  const [amenityData, setAmenityData] = useState({

    // Basic Amenities
    waterSupply: true,
    powerBackup: true,
    adequateParkingCoveredUncovered: true,
    gatedSecurityWithCctvSurveillance: true,
    highSpeedElevators: true,
    fireSafetySystems: true,

    // Lifestyle & Recreation Amenities
    landscapedGardensParks: true,
    joggingAndCyclingTracks: true,
    indoorGamesRoom: true,
    sportsFacilities: true,
    multipurposeHallForEvents: true,

    // Green & Sustainable Features
    rainwaterHarvesting: true,
    solarPowerPanels: true,
    sewageTreatmentPlant: true,
    organicWasteComposting: true,
    energyEfficientLightingInCommonAreas: true,

    // Advanced Safety & Technology Features
    videoDoorPhones: false,
    digitalSmartLocks: false,
    wiFiConnectivityInCommonAreas: false,
    intercomFacility: false,
    earthquakeResistantDesign: false,

    // Convenience Features
    shoppingArcadeConvenienceStore: true,
    pharmacyClinic: true,
    cafeteriaRestaurant: true,
    visitorParking: true,
    dedicatedServiceElevators: true,

    // Premium/High-end Features
    infinityPool: false,
    skyLoungeTerraceGarden: false,
    privateTheaterMediaRoom: false,
    businessCenterCoWorkingSpaces: false,

    // Community-oriented Features
    petFriendlyZones: false,
    amphitheaterOpenAirSeating: false,
    templePrayerRoom: false,
    seniorCitizenArea: false,
    communityLibrary: false,
    barbecuePicnicZones: false,

    // Health & Wellness Amenities
    spaAndSauna: true,
    meditationYogaDeck: true,
    openGymFitnessStationsInThePark: true,
    walkingReflexologyPath: true,
    healthCheckUpKiosk: true,

    // Technology & Automation Amenities
    electricVehicleEvChargingStations: false,
    smartHomeAutomationFeatures: false,
    automatedParkingSystems: false,
    smartWasteManagementSystem: false,
    appBasedVisitorManagementSystem: false,

    // Luxury Lifestyle Features
    exclusivePrivatePoolsForPenthouses: false,
    helipad: false,
    wineCellarOrTastingLounge: false,
    golfSimulatorPuttingGreen: false,

    // Work & Study Amenities
    servicedApartmentsForGuests: false,
    dedicatedWorkFromHomeCabins: false,
    soundproofStudyPodsForStudents: false,
    conferenceRoomsWithAvFacilities: false,
    elearningZoneForKids: false,
    artAndCraftStudioForHobbies: false,

    // Sports & Adventure Amenities
    cricketNets: false,
    skatingRink: false,
    futsalCourt: false,
    archeryRange: false,
    outdoorAdventureActivities: false,

    // Social & Cultural Amenities
    artGalleryOrExhibitionHall: false,
    culturalAmphitheater: false,
    danceAndMusicStudios: false,
    cookingClassZoneOrOpenKitchen: false,
    eventPlazaForFestivals: false,

    // Specialized Premium Amenities
    skywalkOrObservationDeck: false,
    waterfrontWithBoatingFacilities: false,
    privateCabanasOrGazebos: false,
    luxuryConciergeServices: false,

    // Security and Accessibility Features
    rooftopSolarObservatory: true,
    emergencyPanicButtonsInCommonAreas: true,
    physicallyDisabledFriendlyPathwaysAndFacilities: true,
    dedicatedSpaceForAmbulanceParking: true,
    dedicatedDeliveryLockersForEcommerceParcels: true,
    droneDeliveryLandingZones: true,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setAmenityData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Amenities Data called",amenityData);
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
    <form onSubmit={handleSubmit} className="amenity-form-container">
      <h2 className="amenity-form-heading">Amenities</h2>
      {Object.keys(categorizedAmenities).map((category, index) => (
        <div key={index} className="amenity-form-category">
          <h3 className="amenity-form-category-title">{category}</h3>
          {categorizedAmenities[category].map((key) => (
            <label key={key} className="amenity-form-checkbox-label">
              {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
              <input
                type="checkbox"
                name={key}
                checked={amenityData[key]}
                onChange={handleChange}
                className="amenity-form-checkbox"
              />
            </label>
          ))}
        </div>
      ))}
      <button type="button" className="amenity-form-submit-btn" onClick={onPrevious}>Previous</button>
      <button type="submit" className="amenity-form-submit-btn">Next</button>
    </form>
  );
};

export default AmenityForm;
