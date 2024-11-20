import config from "@/config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ILoginAdminResponse {
  status: boolean
  message: string
  payload: {
    token: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    id: string
  };
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_URL,
  }),
  endpoints: (builder) => ({
    loginAdmin: builder.mutation<
      ILoginAdminResponse,
      {
        username: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: "https://election.thearlyearschoolimited.com/web/authenticate",
        method: "POST",
        body,
        headers: {
          "X-APP-KEY": config.APP_KEY,
        },
      }),
    }),
  }),
});

export const { useLoginAdminMutation } = authApi;
