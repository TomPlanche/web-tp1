import { configureStore, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import type { TProject } from "../components/Project/Project.tsx";

const PROJECT_STORAGE_KEY = "projects";

const BASE_PROJECTS: Array<TProject> = [
	{
		id: uuidv4(),
		title: "Binario.rs",
		description:
			"A modern implementation of the Binairo puzzle game built with Tauri, SvelteKit, and Rust. Features multiple grid sizes, real-time validation, and a responsive UI.",
		icon: "🎮",
		tags: ["Rust", "Svelte", "Tauri"],
		link: "https://github.com/TomPlanche/binario_rs",
	},
	{
		id: uuidv4(),
		title: "Git CLI Helper",
		description:
			"A powerful Rust-based CLI tool that streamlines Git workflow by automating commit message generation and branch management.",
		icon: "🦀",
		tags: ["Rust", "CLI", "Git"],
		link: "https://github.com/TomPlanche/git-cli-helper",
	},
	{
		id: uuidv4(),
		title: "VPS Stats",
		description:
			"A monitoring tool for VPS statistics, providing insights and metrics for server performance.",
		icon: "📊",
		tags: ["Monitoring", "VPS", "System Stats"],
		link: "https://github.com/TomPlanche/vps_stats",
	},
	{
		id: uuidv4(),
		title: "Chess TUI Contributions",
		description:
			"Contributed to a terminal-based chess game implementation, focusing on improving game mechanics and user experience.",
		icon: "♟️",
		tags: ["Rust", "TUI", "Open Source"],
		link: "https://github.com/thomas-mauran/chess-tui/pull/128",
	},
];

const getBaseProjects = (): Array<TProject> => {
	const storedProjects = localStorage.getItem(PROJECT_STORAGE_KEY);
	if (storedProjects) {
		try {
			const parsedProjects = JSON.parse(storedProjects);
			if (Array.isArray(parsedProjects)) {
				return parsedProjects as Array<TProject>;
			}
		} catch (error) {
			console.error("Failed to parse projects from localStorage", error);

			// Fallback to base projects if parsing fails
			return BASE_PROJECTS as Array<TProject>;
		}
	}
	return BASE_PROJECTS as Array<TProject>;
};

const projectSlice = createSlice({
	name: "projects",
	initialState: {
		value: getBaseProjects(),
	},
	reducers: {
		addProject: (state, action) => {
			state.value.push(action.payload);
			localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(state.value));
		},
		removeProject: (state, action) => {
			state.value = state.value.filter(
				(project) => project.id !== action.payload,
			);
			localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(state.value));
		},
	},
});

export const { addProject, removeProject } = projectSlice.actions;

export const projectsStore = configureStore({
	reducer: projectSlice.reducer,
});

export type TProjectsStoreRootState = ReturnType<typeof projectsStore.getState>;

export type TProjectsStoreDispatch = typeof projectsStore.dispatch;
export type TProjectsStoreStore = typeof projectsStore;
