import "./Pill.scss";

type TPillVariant = "default" | "rust" | "web" | "system";

export type TPillProps = {
	label: string;
	variant?: TPillVariant;
};

export const getTagVariant = (
	tag: string,
): TPillVariant => {
	if (tag.toLowerCase().includes("rust")) return "rust";
	if (["svelte", "web", "tauri", "sveltekit"].includes(tag.toLowerCase()))
		return "web";
	if (["vps", "cli", "system"].includes(tag.toLowerCase())) return "system";
	return "default";
};

const Pill = ({ label, variant = "default" }: TPillProps) => (
	<span className={`tag ${variant}`}>{label}</span>
);

export default Pill;
