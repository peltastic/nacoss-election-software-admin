import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../basequery";

export interface IGetSingleVoterResponse {
  id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  matric_number: string;
}
export interface IGetAllVotersResponse {
  status: boolean;
  message: string;
  payload: {
    length: number;
    table_data: IGetSingleVoterResponse[];
  };
}

export const votersApi = createApi({
  reducerPath: "votersApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (build) => ({
    getAllVoter: build.query<
      IGetAllVotersResponse,
      {
        start?: number;
        len?: number;
        nolimit?: boolean;
      }
    >({
      query: ({ start, len, nolimit }) => {
        let query = "";
        if (!nolimit) {
          query = `?start=${start}&len=${len}`;
        }
        return { url: `/web/voters${query}` };
      },
    }),
    getSingleVoter: build.query<unknown, string>({
      query: (id) => `web/voters/${id}`,
    }),
    bulkUploadVoters: build.mutation<
      {
        status: boolean;
        message: string;
      },
      File
    >({
      query: (file) => {
        const formdata = new FormData();
        formdata.append("student_import", file);
        return {
          url: "/web/bulk_voters_upload",
          method: "POST",
          body: formdata,
        };
      },
    }),
  }),
});

export const {
  useBulkUploadVotersMutation,
  useLazyGetAllVoterQuery,
  useGetSingleVoterQuery,
} = votersApi;
