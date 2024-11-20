import config from "@/config/config";
import { getCookie } from "@/utils/storage";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: config.API_URL,
  prepareHeaders(headers, api) {
    const token = getCookie("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("X-APP-KEY", config.APP_KEY as string);
    }
    return headers
  },
});


// export const base