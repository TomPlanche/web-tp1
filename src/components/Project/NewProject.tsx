import "./Project.scss";
import {
	addNewRandomProject,
	projectsStore,
} from "../../stores/projectsStore.ts";

const NewProject = () => {
	// Methods
	const handleClick = () => {
		projectsStore.dispatch(addNewRandomProject());
	};
	return (
		<div
			className="project clickable"
			style={{
				justifyContent: "center",
			}}
			onClick={() => handleClick()}
			onKeyDown={() => handleClick()}
		>
			+
		</div>
	);
};

export default NewProject;
