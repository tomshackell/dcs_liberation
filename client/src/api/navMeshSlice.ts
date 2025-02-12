import { RootState } from "../app/store";
import { gameLoaded, gameUnloaded } from "./actions";
import { NavMesh, NavMeshPoly } from "./liberationApi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavMeshState {
  blue: NavMeshPoly[];
  red: NavMeshPoly[];
}

const initialState: NavMeshState = {
  blue: [],
  red: [],
};

interface INavMeshUpdate {
  blue: boolean;
  mesh: NavMesh;
}

const navMeshSlice = createSlice({
  name: "navmesh",
  initialState: initialState,
  reducers: {
    updated: (state, action: PayloadAction<INavMeshUpdate>) => {
      const polys = action.payload.mesh.polys;
      if (action.payload.blue) {
        state.blue = polys;
      } else {
        state.red = polys;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(gameLoaded, (state, action) => {
      state.blue = action.payload.navmeshes.blue.polys;
      state.red = action.payload.navmeshes.red.polys;
    });
    builder.addCase(gameUnloaded, (state) => {
      state.blue = [];
      state.red = [];
    });
  },
});

export const { updated: navMeshUpdated } = navMeshSlice.actions;

export const selectNavMeshes = (state: RootState) => state.navmeshes;

export default navMeshSlice.reducer;
