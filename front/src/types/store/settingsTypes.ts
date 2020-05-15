// Describing the shape of the system's slice of state
export interface SettingsState {
  config: {
    repoName?: string;
    buildCommand?: string;
    mainBranch?: string;
    period?: number;
  };
}

// Describing the different ACTION NAMES available
export const FETCH_CONFIG = "FETCH_CONFIG";
export const SAVE_CONFIG = "SAVE_CONFIG";

interface FetchConfigAction {
  type: typeof FETCH_CONFIG;
  payload: SettingsState["config"];
}

interface SaveConfigAction {
  type: typeof SAVE_CONFIG;
  payload: SettingsState["config"];
}

export type SettingsActionTypes = FetchConfigAction | SaveConfigAction;
