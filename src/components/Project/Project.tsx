import "./Project.scss";
import Pill, {getTagVariant} from "../Pill";
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {removeProject} from "../../stores/projectsStore.ts";
import type {TProject} from "./index.ts";
import type {MouseEvent} from "react";

const Project = ({id, title, description, icon, tags, link}: TProject) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		if (link) {
			window.open(link, "_blank");
		}
	};

	const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
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
					onClick={(e) => handleDelete(e)}
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
