import {configureStore, createSelector, createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";
import {projectSchema, type TProject} from "../components/Project/";
import {shuffle} from "../utils";

const PROJECT_STORAGE_KEY = "projects";

export const BASE_PROJECTS: Array<TProject> = [
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
	{
		id: uuidv4(),
		title: "Last.fm Fetch",
		description:
			"A Rust library for fetching and analyzing Last.fm user data with ease. Features async API integration, comprehensive statistics, and data export capabilities.",
		icon: "🎵",
		tags: ["Rust", "API", "Data Analysis"],
		link: "https://github.com/TomPlanche/last_fm_fetch",
	},
	{
		id: uuidv4(),
		title: "Personal Website",
		description:
			"My personal website built with Svelte and SvelteKit. Features a modern UI with smooth animations, custom cursor, and Last.fm integration.",
		icon: "🌐",
		tags: ["SvelteKit", "API"],
		link: "https://github.com/TomPlanche/website",
	},
	{
		id: uuidv4(),
		title: "Projet Jérémie",
		description:
			"Research tool repository created for a friend's Master's thesis that analyzes medieval texts, finds word occurrences while accounting for historical spelling variations. Designed to be user-friendly for non-technical users, with configurable search terms and error tolerance.",
		icon: "🤝",
		tags: ["Rust", "Text Analysis", "Python"],
		link: "https://github.com/TomPlanche/projet-jeremie",
	},
	{
		id: uuidv4(),
		title: "Advent of Code 2024",
		description:
			"My solutions for the Advent of Code 2024 programming challenges, demonstrating problem-solving skills and code organization.",
		icon: "🎄",
		tags: ["Rust", "Challenges", "Problem Solving"],
		link: "https://github.com/TomPlanche/aoc-2024",
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
	return BASE_PROJECTS;
};

const projectSlice = createSlice({
	name: "projects",
	initialState: {
		value: getBaseProjects(),
	},
	reducers: {
		addProject: (state, action) => {
			// Verify that the passed project has a valid structure
			const response = projectSchema.safeParse(action.payload);

			if (!response.success) {
				console.error("Invalid project structure", response.error);
				return;
			}

			state.value.push(response.data);
			localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(state.value));
		},
		removeProject: (state, action) => {
			state.value = state.value.filter(
				(project) => project.id !== action.payload,
			);
			localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(state.value));
		},
		resetProjects: (state) => {
			state.value = shuffle(BASE_PROJECTS);
			localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(state.value));
		},
	},
});

export const selectProjects = createSelector(
	[(state: TProjectsStoreRootState) => state.value],
	(projects) => projects
);

export const {addProject, resetProjects, removeProject} =
	projectSlice.actions;

export const projectsStore = configureStore({
	reducer: projectSlice.reducer,
});


export type TProjectsStoreRootState = ReturnType<typeof projectsStore.getState>;
