program();

function program() {
  const map = [
    { name: "Nashville, TN", latitude: 36.17, longitude: -86.78 },
    { name: "New York, NY", latitude: 40.71, longitude: -74.0 },
    { name: "Atlanta, GA", latitude: 33.75, longitude: -84.39 },
    { name: "Denver, CO", latitude: 39.74, longitude: -104.98 },
    { name: "Seattle, WA", latitude: 47.61, longitude: -122.33 },
    { name: "Los Angeles, CA", latitude: 34.05, longitude: -118.24 },
    { name: "Memphis, TN", latitude: 35.15, longitude: -90.05 }
  ];

  const citiesMap = new CitiesMap(map);
  console.log("Northernmost city - " + citiesMap.getNorthernmostCityName());
  console.log("Southernmost city - " + citiesMap.getSouthernmostCityName());
  console.log("Easternmost city - " + citiesMap.getEasternmostCityName());
  console.log("Westernmost city - " + citiesMap.getWesternmostCityName());

  console.log(
    "Neares city to 53.88, 27.54 (Minsk) " + citiesMap.getNearestCityName(53.88, 27.54)
  );

  console.log("All cities states - " + citiesMap.getAllCitiesStates());
}

function CitiesMap(cities) {
  this.cities = cities;

  this.getNorthernmostCityName = () => {
    let maxLatitude = -90;
    let northernmostCityName = "";
    this.cities.forEach(city => {
      const cityLatitude = city.latitude;
      if (cityLatitude > maxLatitude) {
        maxLatitude = cityLatitude;
        northernmostCityName = city.name;
      }
    });

    return northernmostCityName;
  };

  this.getSouthernmostCityName = () => {
    let minLatitude = 90;
    let southernmostCityName = "";
    this.cities.forEach(city => {
      const cityLatitude = city.latitude;
      if (cityLatitude < minLatitude) {
        minLatitude = cityLatitude;
        southernmostCityName = city.name;
      }
    });

    return southernmostCityName;
  };

  this.getEasternmostCityName = () => {
    let maxLongitude = -180;
    let easternmostCityName = "";
    this.cities.forEach(city => {
      const cityLongitude = city.longitude;
      if (cityLongitude > maxLongitude) {
        maxLongitude = cityLongitude;
        easternmostCityName = city.name;
      }
    });

    return easternmostCityName;
  };

  this.getWesternmostCityName = () => {
    let minLongitude = 180;
    let westernmostCityName = null;
    this.cities.forEach(city => {
      const cityLongitude = city.longitude;
      if (cityLongitude < minLongitude) {
        minLongitude = cityLongitude;
        westernmostCityName = city.name;
      }
    });

    return westernmostCityName;
  };

  this.getNearestCityName = (latitude, longitude) => {
    const averageEarthRadius = 6371;

    // Max possible distance on Earth between two points - 20000 km
    let minimalDistance = 20000;
    let nearestCityName = "";

    this.cities.forEach(city => {
      const distance =
        averageEarthRadius * getRadianDistance(city, { latitude, longitude });

      if (distance < minimalDistance) {
        minimalDistance = distance;
        nearestCityName = city.name;
      }
    });

    return nearestCityName;
  };

  this.getAllCitiesStates = () => {
    return this.cities
      .map(city => city.name.slice(-2))
      .filter((state, index, states) => states.indexOf(state) === index)
      .join(" ");
  };

  function getRadianDistance(firstCity, secondCity) {
    return (
      Math.sin(firstCity.latitude) * Math.sin(secondCity.latitude) +
      Math.cos(firstCity.longitude) *
        Math.cos(secondCity.longitude) *
        Math.cos(firstCity.longitude - secondCity.longitude)
    );
  }
}
