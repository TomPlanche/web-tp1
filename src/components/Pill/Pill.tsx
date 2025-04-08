import "./Pill.scss";

export type TPillProps = {
	label: string;
	variant?: "default" | "rust" | "web" | "system";
};

const Pill = ({ label, variant = "default" }: TPillProps) => (
	<span className={`tag ${variant}`}>{label}</span>
);

export default Pill;
