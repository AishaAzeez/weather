const button = document.getElementById('getloc');
const result = document.getElementById('result'); // Assuming there's an element with id 'result' in your HTML

async function getData(lat, long) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=967b79616f4148bf973180351230312&q=${lat},${long}&aqi=yes`);
        let data = await response.json();
        data = data.location.name;

        return data; // Return the temperature data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function gotLocation(position) {
    try {
        let place = await getData(position.coords.latitude, position.coords.longitude);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=5b4bee0ba241d092159faf007e166080`)
        .then(response => response.json()).then(out => displayData(out))
        function displayData(dataArray) {
          place=dataArray.name
          tempd = dataArray.main.temp
          tempd -= 273.15
          tempd = tempd.toFixed(2)
          wind=dataArray.wind.speed
          humid=dataArray.main.humidity
          first.innerHTML = `<div>
            <P>${tempd}°C</P>
            </div>
    `
    cit.innerHTML = `<div>
            <P>${place}</P>
            </div>
    `
    win.innerHTML = `<div>
            <P>${wind} Km/s</P>
            </div>
    `
    hum.innerHTML = `<div>
            <P>${humid} %</P>
            </div>
    `
  
  
  
        }} catch (error) {
        console.error('Error getting location:', error);
        // Handle the error as needed
    }
    
}

function failedToGet() {
    console.log('There was some issue');
}

button.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
});

button.addEventListener('touchstart', async () => {
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
});












