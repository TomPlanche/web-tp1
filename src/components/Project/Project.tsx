import "./Project.scss";
import Pill from "../Pill";

export type TProject = {
	title: string;
	description: string;
	icon?: string;
	tags?: string[];
	link?: string;
};

const Project = ({ title, description, icon, tags, link }: TProject) => {
	// Helper function to determine tag variant based on tag name
	const getTagVariant = (
		tag: string,
	): "default" | "rust" | "web" | "system" => {
		if (tag.toLowerCase().includes("rust")) return "rust";
		if (["svelte", "web", "tauri"].includes(tag.toLowerCase())) return "web";
		if (["vps", "cli", "system"].includes(tag.toLowerCase())) return "system";
		return "default";
	};

	const handleClick = () => {
		if (link) {
			window.open(link, "_blank");
		}
	};

	return (
		<div
			className={`project ${link ? "clickable" : ""}`}
			onClick={handleClick}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					handleClick();
				}
			}}
		>
			<div className="project__header">
				<span className="project__icon">{icon}</span>
				<h3 className="project__title">{title}</h3>
			</div>

			<p className="project__description">{description}</p>

			{tags && tags.length > 0 && (
				<div className="project__tags">
					{tags.map((tag) => (
						<Pill key={`tag-${tag}`} label={tag} variant={getTagVariant(tag)} />
					))}
				</div>
			)}
		</div>
	);
};

export default Project;
