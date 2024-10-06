"use client";
import DashboardLayout from "@/components/DashboardLayout";
import React from "react";

import { useState } from "react";
import { FileButton, Button, Group, Text } from "@mantine/core";

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
  return (
    <div className="py-[5rem] px-[3rem]">
      <DashboardLayout>
        <div className="w-[70%] px-[5rem]">
          <>
            <Group justify="center">
              <FileButton onChange={setFile} accept="image/png,image/jpeg">
                {(props) => (
                  <Button
                    className="py-2 px-4 rounded-md bg-blue-600"
                    {...props}
                  >
                    Upload Voters
                  </Button>
                )}
              </FileButton>
            </Group>

            {file && <p className="mt-4">Selected File: {file.name}</p>}
          </>

          <div className="mt-[3.5rem]">
            <h1 className="font-bold text-2xl">Registered Voters</h1>

            <div className="mt-[2rem]">
              {voters_data.map((el) => (
                <div
                  key={el.id}
                  className="bg-[#22222266] w-full flex items-center rounded-md px-6 py-6 mb-6"
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
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default VoterPage;
