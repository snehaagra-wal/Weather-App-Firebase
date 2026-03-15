// 1. Firebase Config
const firebaseConfig = {
    apiKey: "AiZaSyAv229y390sZxtibXLlVhTkPo0g6PmkMMg",
    authDomain: "weatherapp-de3ce.firebaseapp.com",
    projectId: "weatherapp-de3ce",
    storageBucket: "weatherapp-de3ce.firebasestorage.app",
    messagingSenderId: "468559096988",
    appId: "1:468559096988:web:549aae0f9b9355889c9159"
};

// 2. Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3. Weather API Key
const weatherApiKey = "ce8cd4c8edb50238767b0f71233eb938";

// 4. Weather Function
async function getWeatherData(city) {
    // Is line ko dhyan se dekhna, yahan backticks (`) use huye hain
    const apiURL =`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${weatherApiKey}`;
    
    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        if (response.status == 200) {
            document.getElementById("cityName").innerHTML = data.name;
            document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.getElementById("desc").innerHTML = data.weather[0].description;

            // Firebase mein save karna
            db.collection("searches").add({
                city: data.name,
                temp: data.main.temp,
                time: new Date()
            }).then(() => {
                console.log("History saved to Firebase!");
            });
        } else {
            alert("Enter city name correctly!");
        }
    } catch (error) {
        console.error("Error aa gaya:", error);
    }
}

// 5. Button Click Logic
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
    let city = document.getElementById("cityInput").value;
    if (city) {
        getWeatherData(city);
    }
});
