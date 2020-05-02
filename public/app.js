/* Global Variables */
let debug = true;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
if (debug) {
  console.log(newDate);
}

//API Base Url & key.
const apiKey = "&appid=7449c86fb07bba9189d3b080f6272d4e";
const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`;

document.getElementById("generate").addEventListener("click", (e) => {
// Callback for getting json data from api and api calls to our backend. 
    const zipcode = document.getElementById("zipcode").value;
    const feelings = document.getElementById("feelings").value;
     if (debug) {
       console.log("zipcode: ", zipcode);
       console.log("feelings: ", feelings);
     }
     getWeatherData(baseURL, zipcode, apiKey)
       .then((res) => {
         if (debug) {
           console.log(res);
         }
         // for a worng zip code, rety=urn message city not found
         if (res.message === "city not found") {
           postData("/addWeatherDetails", {
             date: newDate,
             temp: "city not found",
             content: "",
           });
         } else {
           postData("/addWeatherDetails", {
             date: newDate,
             temp: `${res.name} Temp Today: ${res.main.temp} °F`,
             content: feelings,
           });
         }
       })
       .then(function () {
         //callback function to update UI.
         updateDOM();
       });
});

// Get Weather data in JSON from endpoint.  
const getWeatherData = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + ",in" + key + "&units=imperial");
  try {
    const data = await res.json();
    if (debug) {
      console.log("getWeather: no error: ", data);
    }
    return data;
  } catch (error) {
    console.log("getWeather: error", error);
    // appropriately handle the error
  }
};

// POST api call to backend.
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  try {
    const newData = await res.json();
    if (debug) {
      console.log(newData);
    }
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

// Function to update UI with updated data.
const updateDOM = async () => {
  const res = await fetch("/allDetials");
  try {
    const allData = await res.json();

    if (debug) {
      console.log("all Data", allData);
    }

    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    document.getElementById("temp").innerHTML = allData.temperature;
    document.getElementById("content").innerHTML = `Feeling ${allData.content}`;
  } catch (error) {
    console.log("error", error);
  }
};
