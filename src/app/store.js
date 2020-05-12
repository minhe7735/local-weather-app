import { configureStore } from "@reduxjs/toolkit";
import temperaturesReducer from "../features/temperatures/temperaturesSlice";

export default configureStore({
    reducer: {
        temperatures: temperaturesReducer,
    },
});
