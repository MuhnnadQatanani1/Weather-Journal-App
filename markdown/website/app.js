// Personal API Key for OpenWeatherMap API
const apiKey = 'YOUR_API_KEY&units=imperial';

// Event listener for generate button
document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  const baseUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`;

  getWeather(baseUrl)
    .then(data => {
      postData('/add', {
        temperature: data.main.temp,
        date: new Date().toLocaleDateString(),
        userResponse: feelings
      });
    })
    .then(updateUI);
}

// GET request to OpenWeatherMap API
const getWeather = async (url) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
}

// POST data to server
const postData = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
}

// Update UI with fetched data
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('temp').innerHTML = `${Math.round(allData.temperature)} degrees`;
    document.getElementById('content').innerHTML = allData.userResponse;
    document.getElementById('date').innerHTML = allData.date;
  } catch (error) {
    console.log('error', error);
  }
}
