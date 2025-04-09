import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { projectsStore } from "./stores/projectsStore.ts";

const body = document.querySelector("body");

if (!body) {
	throw new Error("Root element not found");
}

createRoot(body).render(
	<StrictMode>
		<Provider store={projectsStore}>
			<App />
		</Provider>
	</StrictMode>,
);
