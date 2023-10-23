let storeItems = document.getElementById("store");
let storeHeader = document.getElementById("store-header");

async function getWeather() {
  // Show loading message
  document.getElementById("loading").style.display = "block";

  try {
    const response = await new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const result = await axios.get(
            "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m"
          );
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, 2000); // Delay of 2 seconds
    });
    return response.data.current_weather;
  } catch (error) {
    console.log(error);
  } finally {
    // Hide loading message
    document.getElementById("loading").style.display = "none";
  }
}

getWeather().then((weather) => {
  // weather.temperature = 15;

  if (weather.temperature < 20) {
    storeItems.style.display = "none";
    storeHeader.textContent = "It's too cold to buy drinks..";
  }
  console.log(weather); // Log the current weather
});
