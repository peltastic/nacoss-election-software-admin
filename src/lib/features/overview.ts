import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../basequery";

interface Stats {
  status: boolean;
  message: string;
  payload: { active_voters: string; total_votes: string; total_voters: string };
}

export const overviewApi = createApi({
  reducerPath: "overviewApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (build) => ({
    getTopStats: build.query<Stats, void>({
      query: () => "/web/dasboard_top_stats",
    }),
  }),
});

export const { useLazyGetTopStatsQuery } = overviewApi;
