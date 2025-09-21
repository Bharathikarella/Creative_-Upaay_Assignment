import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import themeReducer from "./themeSlice";

const saveToLocalStorage = (state) => {
  localStorage.setItem("appState", JSON.stringify(state));
};

const loadFromLocalStorage = () => {
  const data = localStorage.getItem("appState");
  return data ? JSON.parse(data) : undefined;
};

const preloadedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    theme: themeReducer,
  },
  preloadedState,
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
