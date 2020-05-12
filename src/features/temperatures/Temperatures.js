import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    loadAsync,
    selectTemperatures,
    celsiusToFarenheit,
    farenheitToCelsius,
    selectUnit,
    selectLocation,
    selectWeather,
    selectIcon,
} from "./temperaturesSlice";

function Temperatures() {
    const temperatures = useSelector(selectTemperatures);
    const unit = useSelector(selectUnit);
    const location = useSelector(selectLocation);
    const weather = useSelector(selectWeather);
    const icon = useSelector(selectIcon);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadAsync());
    }, [dispatch]);
    return (
        <div className="bg-blue-300 h-screen flex flex-col justify-center items-center text-6xl">
            <div className="">
                {Number.parseFloat(temperatures).toFixed(2)}
                <button
                    className="text-red-600"
                    onClick={() => {
                        unit === "C"
                            ? dispatch(celsiusToFarenheit())
                            : dispatch(farenheitToCelsius());
                    }}
                >
                    &deg;{unit}
                </button>
            </div>
            <div>{location}</div>
            <div>{weather}</div>
            <div>
                <img
                    src={icon}
                    alt="weather icon"
                    className="object-contain h-48 w-auto"
                />
            </div>
        </div>
    );
}

export default Temperatures;
