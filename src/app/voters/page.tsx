"use client";
import DashboardLayout from "@/components/DashboardLayout";
import React, { useEffect } from "react";

import { useState } from "react";
import { FileButton, Button, Group, Text, Skeleton } from "@mantine/core";
import {
  useBulkUploadVotersMutation,
  useLazyGetAllVoterQuery,
} from "@/lib/features/voters";
import Spinner from "@/components/Spinner";
import { notifications } from "@mantine/notifications";
import { errorColor, successColor } from "@/utils/constants";
import { useProtectRoute } from "@/hooks/useProtectRoute";

type Props = {};
const voters_data = [
  {
    id: "62",
    firstname: "Samuel",
    lastname: "Adelowo",
    middlename: "Damilare",
    email: "samueladelowo92@gmail.com",
    matric_number: "214850",
    status: "1",
    voters_path: null,
    created_at: "2024-09-29 08:58:12",
  },
  {
    id: "61",
    firstname: "Iyanuoluwa",
    lastname: "Oluwatade",
    middlename: "Isaac",
    email: "iyanuoluwaoluwatade@gmail.com",
    matric_number: "214907",
    status: "1",
    voters_path: null,
    created_at: "2024-09-29 08:58:12",
  },
];

const VoterPage = (props: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [getAllVoters, result] = useLazyGetAllVoterQuery();
  const [bulkUploadVoters, { isError, isLoading, isSuccess, data, error }] =
    useBulkUploadVotersMutation();
  const [paginationData, setPaginatioData] = useState({
    start: 0,
    len: 10,
  });

  useEffect(() => {
    getAllVoters({
      start: paginationData.start,
      len: paginationData.len,
    });
  }, []);

  useEffect(() => {
    if (isError) {
      notifications.show({
        message: (error as any).data?.message || "Something went wrong",
        color: errorColor,
      });
    }

    if (isSuccess) {
      if (data.status) {
        notifications.show({
          title: "Success",
          message: "csv uploaded successfully",
          color: successColor,
        });
      } else {
        notifications.show({
          message: data?.message,
          color: errorColor,
        });
      }
    }
  }, [isError, isSuccess]);
  return (
    <div className="py-[5rem] px-[3rem] text-white">
      <DashboardLayout>
        <div className="w-[70%] px-[5rem]">
          <>
            <Group justify="center">
              <FileButton onChange={setFile} accept=".csv">
                {(props) => (
                  <button
                    className="py-2 px-4 disabled:opacity-50 w-[9rem] flex justify-center rounded-md bg-blue-600"
                    {...props}
                  >
                    Upload Voters
                  </button>
                )}
              </FileButton>
            </Group>

            {file && (
              <div className="text-center">
                <p className="mt-4 text-white">Selected File: {file.name}</p>
                <button
                  onClick={() => {
                    if (file) {
                      bulkUploadVoters(file);
                    }
                  }}
                  disabled={isLoading}
                  className="w-[5rem] flex text-sm justify-center mx-auto bg-blue-400 disabled:bg-blue-100 px-4 py-2 rounded-md mt-4"
                >
                  {isLoading ? (
                    <div className="w-[1rem] py-1">
                      <Spinner />
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            )}
          </>

          <div className="mt-[3.5rem]">
            <h1 className="font-bold text-2xl">Registered Voters</h1>

            <div className="">
              {result.isFetching ? (
                <div className="mt-[2rem]">
                  <div className="animate-pulse mt-4 bg-gray-500 w-full h-[5rem] rounded-md"></div>
                  <div className="animate-pulse mt-4 bg-gray-500 w-full h-[5rem] rounded-md"></div>
                  <div className="animate-pulse mt-4 bg-gray-500 w-full h-[5rem] rounded-md"></div>
                  <div className="animate-pulse mt-4 bg-gray-500 w-full h-[5rem] rounded-md"></div>
                  <div className="animate-pulse mt-4 bg-gray-500 w-full h-[5rem] rounded-md"></div>
                </div>
              ) : (
                <div className="mt-[2rem]">
                  {result.data?.payload.table_data.map((el) => (
                    <div
                      key={el.id}
                      className="bg-[#22222266] cursor-pointer w-full flex items-center rounded-md px-6 py-6 mb-6"
                    >
                      <div className="mr-auto">
                        <p className="mb-2">
                          {el.firstname}&nbsp;
                          {el.lastname}
                        </p>
                        <p className="text-[#b3b3b386]">{el.email}</p>
                      </div>
                      <div className="">{el.matric_number}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-5">
              {result.data
                ? Array.from({
                    length: Math.floor(result.data.payload.length / 10) + 1,
                  }).map((el, index) => (
                    <button
                      onClick={() => {
                        getAllVoters({
                          len: 10,
                          start: index * 10,
                        });
                        setPaginatioData({
                          ...paginationData,
                          start: index * 10,
                        });
                      }}
                      className={`${
                        paginationData.start === index * 10
                          ? "bg-blue-400"
                          : "bg-blue-500"
                      }  px-4 py-1 mr-2`}
                    >
                      {index + 1}
                    </button>
                  ))
                : null}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default VoterPage;
