"use client";
import DashboardLayout from "@/components/DashboardLayout";
import Input from "@/components/Input";
import { Button, Modal, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

type Props = {};

const candidate_data = [
  {
    firstname: "Ifeoluwa",
    lastname: "Akinwusi",
    middlename: "Samuel",
    office: "Vice President",
    voters_path:
      "http://localhost:8080/uploads/voters/1727757803_d81b0e16f4ae8961d236.jpg",
  },
];

const CandidatesPage = (props: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} centered onClose={close} title="Authentication">
        <div className="text-black">
          <h1 className="text-[1.5rem] font-bold text-black">
            Upload Candidate
          </h1>
          {/* <Input placeholder="" label="" /> */}
          <div className="mt-10">
            <Select label="Office" size="lg" placeholder="Select" data={[]} />
          </div>
          <div className="mt-4">
            <Select label="Voter" size="lg" placeholder="Select" data={[]} />
          </div>
          <div className="mt-10">
            <Button>Upload</Button>
          </div>
        </div>
      </Modal>
      <div className="py-[5rem] px-[3rem]">
        <DashboardLayout>
          <div className="w-[70%] px-[5rem]">
            <h1 className="text-[1.5rem] font-bold">Add Candidate</h1>
            {/* <Input placeholder="" label="" /> */}
            <div className="mt-4">
              <Select label="Office" size="lg" placeholder="Select" data={[]} />
            </div>
            <div className="mt-4">
              <Select label="Voter" size="lg" placeholder="Select" data={[]} />
            </div>
            <div className="mt-10">
              <Button>Upload</Button>
            </div>

            <div className="mt-[3.5rem]">
              <h1 className="font-bold text-2xl">Uploaded Candidates</h1>
              <div className="mt-[2.5rem]">
                {candidate_data.map((el) => (
                  <div
                    onClick={open}
                    key={el.firstname + el.lastname}
                    className="cursor-pointer bg-[#22222266] w-full flex items-center rounded-md px-6 py-6 mb-6"
                  >
                    <div className="mr-auto">
                      <p className="mb-2">
                        {el.firstname} &nbsp;
                        {el.lastname}
                      </p>
                    </div>
                    <p className="">{el.office}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DashboardLayout>
      </div>
    </>
  );
};

export default CandidatesPage;
