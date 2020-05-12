import { createSlice } from "@reduxjs/toolkit";

export const temperaturesSlice = createSlice({
    name: "temperatures",
    initialState: {
        temperatures: 0,
        unit: "C",
        location: "",
        weather: "",
        icon: "",
    },
    reducers: {
        loadTemperatures: (state, action) => {
            state.temperatures = action.payload - 273.15;
        },
        celsiusToFarenheit: (state) => {
            state.temperatures = state.temperatures * (9 / 5) + 32;
            state.unit = "F";
        },
        farenheitToCelsius: (state) => {
            state.temperatures = (state.temperatures - 32) * (5 / 9);
            state.unit = "C";
        },
        loadLocation: (state, action) => {
            state.location = action.payload[0] + ", " + action.payload[1];
        },
        loadWeather: (state, action) => {
            state.weather = action.payload;
        },
        loadIcon: (state, action) => {
            state.icon = `http://openweathermap.org/img/wn/${action.payload}@2x.png`;
        },
    },
});

export const {
    loadTemperatures,
    celsiusToFarenheit,
    farenheitToCelsius,
    loadLocation,
    loadWeather,
    loadIcon,
} = temperaturesSlice.actions;

export const loadAsync = () => async (dispatch) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            let pos = await {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            let response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${pos.lat}&lon=${pos.lng}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
            );
            let temperatures = await response.json();
            console.log(temperatures.weather[0].icon);
            dispatch(loadTemperatures(temperatures.main.temp));
            dispatch(
                loadLocation([temperatures.name, temperatures.sys.country])
            );
            dispatch(loadWeather(temperatures.weather[0].main));
            if (temperatures.weather[0].icon) {
                dispatch(loadIcon(temperatures.weather[0].icon));
            }
        });
    } else {
        console.log("not able to get location");
    }
};

export const selectTemperatures = (state) => state.temperatures.temperatures;
export const selectUnit = (state) => state.temperatures.unit;
export const selectLocation = (state) => state.temperatures.location;
export const selectWeather = (state) => state.temperatures.weather;
export const selectIcon = (state) => state.temperatures.icon;

export default temperaturesSlice.reducer;
