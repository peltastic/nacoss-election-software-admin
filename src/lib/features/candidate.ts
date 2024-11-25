import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../basequery";

export interface IGetAllCandidatesResponse {
  status: boolean;
  message: string;
  payload: {
    length: string;
    table_data: IGetSingleCandidateResponse[];
  };
}

export interface IGetSingleCandidateResponse {
  firstname: string;
  lastname: string;
  middlename: string;
  offices_id: string;
  voters_id: string;
  office: string;
  voters_path: string | null;
  id: string;
}

export interface IGetCandidateStatsResponse {
  candidate_id: string;
  firstname: string;
  lastname: string;
  middlename: string;
  voters_path: string | null;
  total_votes: string;
}

export const candidateApi = createApi({
  reducerPath: "candidateApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (build) => ({
    getAllCandidates: build.query<IGetAllCandidatesResponse, void>({
      query: () => "/web/candidates",
    }),

    getSingleCandidate: build.query<
      {
        status: boolean;
        message: string;
        payload: IGetSingleCandidateResponse;
      },
      string
    >({
      query: (id) => `/web/candidates/${id}`,
    }),

    getCandidateStats: build.query<
      {
        status: boolean;
        message: string;
        payload: IGetCandidateStatsResponse[];
      },
      string
    >({
      query: (id) => `/web/dashboard_candidate_stats?office=${id}`,
    }),

    uploadCandidate: build.mutation<
      {
        status: boolean;
        message: string;
      },
      {
        office_id: string;
        voter_id: string;
        voter_path?: File | null;
      }
    >({
      query: (payload) => {
        const formdata = new FormData();
        formdata.append("office_id", payload.office_id);
        formdata.append("voter_id", payload.voter_id);
        if (payload.voter_path) {
          formdata.append("voter_path", payload.voter_path);
        }
        return {
          url: "/web/candidates_office",
          method: "POST",
          body: formdata,
        };
      },
    }),

    updateCandidate: build.mutation<
      {
        status: boolean;
        message: string;
      },
      {
        office_id: string;
        voter_id: string;
        voter_path?: File | null;
        id: string;
      }
    >({
      query: (payload) => {
        const formdata = new FormData();
        formdata.append("office_id", payload.office_id);
        formdata.append("voter_id", payload.voter_id);
        if (payload.voter_path) {
          formdata.append("voter_path", payload.voter_path);
        }
        return {
          url: `/web/candidates_office/${payload.id}`,
          method: "POST",
          body: formdata,
        };
      },
    }),
  }),
});

export const {
  useLazyGetAllCandidatesQuery,
  useUploadCandidateMutation,
  useUpdateCandidateMutation,
  useLazyGetSingleCandidateQuery,
  useLazyGetCandidateStatsQuery,
} = candidateApi;
