import { BuildModel } from "../../../../server/typings/buildModel";

export const FETCH_BUILDS = "FETCH_BUILDS";
export const FETCH_MORE_BUILDS = "FETCH_MORE_BUILDS";
export const DETAILS_BUILD = "DETAILS_BUILD";
export const LOG_BUILD = "LOG_BUILD";
export const NEW_BUILD_ID = "NEW_BUILD_ID";

// Describing the shape of the system's slice of state
export interface BuildsState {
  data: BuildModel[];
  details: BuildModel | null;
  log: string | null;
  newBuildId: BuildModel["id"] | null;
}

interface FetchBuildsAction {
  type: typeof FETCH_BUILDS;
  payload: BuildModel[];
}

interface FetchMoreBuildsAction {
  type: typeof FETCH_MORE_BUILDS;
  payload: BuildModel[];
}

interface DetailsBuildAction {
  type: typeof DETAILS_BUILD;
  payload: BuildModel;
}

interface LogBuildAction {
  type: typeof LOG_BUILD;
  payload: string;
}

interface NewBuildIdAction {
  type: typeof NEW_BUILD_ID;
  payload: BuildModel["id"];
}

export type BuildsActionTypes =
  | FetchBuildsAction
  | FetchMoreBuildsAction
  | DetailsBuildAction
  | LogBuildAction
  | NewBuildIdAction;
