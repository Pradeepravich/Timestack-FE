import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: any | null;
  organization: string | null;
  projectId: string | null;
  project: string | null;
  selectedPeriod: string | null;
  selectedAreapath: string | null;
}

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  organization: localStorage.getItem("organization"),
  projectId: localStorage.getItem("projectId"),
  project: localStorage.getItem("project"),
  selectedPeriod: localStorage.getItem("selectedPeriod") || null,
  selectedAreapath: localStorage.getItem("selectedAreapath") || null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, user, refreshToken } = action.payload;
      state.isLoggedIn = true;
      state.user = user;
      state.token = token;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.selectedPeriod = null;
      state.selectedAreapath = null;

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("selectedPeriod");
      localStorage.removeItem("selectedAreapath");
    },

    setSelectedPeriod: (state, action: PayloadAction<string>) => {
      state.selectedPeriod = action.payload;
      localStorage.setItem("selectedPeriod", action.payload);
    },

    setSelectedAreapath: (state, action: PayloadAction<string>) => {
      state.selectedAreapath = action.payload;
      localStorage.setItem("selectedAreapath", action.payload);
    },
  },
});
export const { login, logout, setSelectedPeriod, setSelectedAreapath } = AuthSlice.actions;
export default AuthSlice.reducer;
