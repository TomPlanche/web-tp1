import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const body = document.querySelector("body");

if (!body) {
	throw new Error("Root element not found");
}

createRoot(body).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
