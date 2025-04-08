import { configureStore, createSlice } from "@reduxjs/toolkit";

// Valid theme values
export type TTheme = "1" | "2" | "3" | "4" | "5" | "6";

// Theme order for cycling
const themeOrder: TTheme[] = ["1", "2", "3", "4", "5", "6"];

// localStorage key for theme
const THEME_STORAGE_KEY = "selected-theme";

const themeSlice = createSlice({
	name: "theme",
	initialState: {
		value: (localStorage.getItem(THEME_STORAGE_KEY) as TTheme) || "1",
	},
	reducers: {
		incrementTheme: (state) => {
			const currentIndex = themeOrder.indexOf(state.value as TTheme);

			state.value = themeOrder[(currentIndex + 1) % themeOrder.length];

			// Sync with localStorage
			localStorage.setItem(THEME_STORAGE_KEY, state.value);
			// Sync with HTML
			document.documentElement.dataset.theme = state.value;
		},
	},
});

export const { incrementTheme } = themeSlice.actions;

export const themeStore = configureStore({
	reducer: themeSlice.reducer,
});
