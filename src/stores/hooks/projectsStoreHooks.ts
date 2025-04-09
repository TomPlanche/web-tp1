import { useDispatch, useSelector } from "react-redux";
import type {
	TProjectsStoreDispatch,
	TProjectsStoreRootState,
} from "../projectsStore.ts"; // Use throughout your app instead of plain `useDispatch` and `useSelector`

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useProjectsStoreDispatch =
	useDispatch.withTypes<TProjectsStoreDispatch>();
export const useProjectsStoreSelector =
	useSelector.withTypes<TProjectsStoreRootState>();
