import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../basequery";

export const overviewApi = createApi({
    reducerPath: "overviewApi",
    baseQuery: baseQueryWithAuth,
    endpoints: (build) => ({
        getTopCards: build.query<unknown, void>({
            query: () => "/web/dasboard_top_card"
        })
    })
})

export const {useLazyGetTopCardsQuery} = overviewApi