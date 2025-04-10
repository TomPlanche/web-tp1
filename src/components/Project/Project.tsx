import "./Project.scss";
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {removeProject} from "../../stores/projectsStore.ts";
import Pill, {getTagVariant} from "../Pill";
import type {TProject} from "./index.ts";

const Project = ({id, title, description, icon, tags, link}: TProject) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		if (link) {
			window.open(link, "_blank");
		}
	};

	const handleDelete = (e: Event) => {
		e.stopPropagation();
		dispatch(removeProject(id));
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
				<button
					type="button"
					className="project__delete"
					onClick={handleDelete}
					aria-label="Delete project"
				>
					×
				</button>
			</div>

			<p className="project__description">{description}</p>

			{tags && tags.length > 0 && (
				<div className="project__tags">
					{tags.map((tag) => (
						<Pill
							key={uuidv4()}
							label={tag}
							variant={getTagVariant(tag)}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Project;
