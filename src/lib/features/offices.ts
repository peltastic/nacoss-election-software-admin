import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../basequery";

export interface IGetOffices {
    status: true
    message: string
    payload: {
        length: number
        table_data: {
            id: string
            name: string
            slug: string
        }[]
    }
}

export const officeApi = createApi({
    reducerPath: "officeApi",
    baseQuery: baseQueryWithAuth,
    endpoints: (build) => ({
        getOffices: build.query<IGetOffices, void>({
            query: () => ({
                url: "/web/offices",
            })
        })
    })
})

export const {useLazyGetOfficesQuery} = officeApi