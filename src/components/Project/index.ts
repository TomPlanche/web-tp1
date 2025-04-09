import { z } from "zod";
import NewProject from "./NewProject.tsx";
import Project from "./Project.tsx";

export const projectSchema = z.object({
	id: z.string().uuid("Invalid UUID"),
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	icon: z.string().optional(),
	tags: z.array(z.string()).optional(),
	link: z.string().url("Invalid URL").optional(),
});

export type TProject = z.infer<typeof projectSchema>;
export { Project, NewProject };
