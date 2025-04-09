import { useSelector } from "react-redux";
import type { TProjectsStoreRootState } from "../projectsStore.ts";

export const useProjectsStoreSelector =
	useSelector.withTypes<TProjectsStoreRootState>();
