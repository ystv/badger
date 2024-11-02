import { serverAPI } from "./serverApiClient";
import { listenOnStore } from "../storeListener";
import { serverConnected } from "./serverConnectionState";
import { createAppSlice } from "./reduxHelpers";

export const serverDataSlice = createAppSlice({
  name: "serverData",
  initialState: {
    upcomingShows: [] as { id: number; name: string }[],
    upcomingShowsLoading: false,
    upcomingShowsError: null as string | null,
  },
  reducers: (builder) => ({
    updateUpcomingShows: builder.asyncThunk(
      async () => {
        const result = await serverAPI().shows.listUpcoming.query();
        return result.map((show) => ({ id: show.id, name: show.name }));
      },
      {
        pending: (state) => {
          state.upcomingShowsLoading = true;
          state.upcomingShowsError = null;
        },
        fulfilled: (state, action) => {
          state.upcomingShowsLoading = false;
          state.upcomingShows = action.payload;
        },
        rejected: (state, action) => {
          state.upcomingShowsLoading = false;
          state.upcomingShowsError = action.error.message ?? "Unknown error";
        },
      },
    ),
  }),
});

// Eagerly fetch the show list when we connect
listenOnStore({
  matcher: serverConnected,
  effect: (_, api) => {
    api.dispatch(serverDataSlice.actions.updateUpcomingShows());
  },
});
