"use client";
import DashboardLayout from "@/components/DashboardLayout";
import Spinner from "@/components/Spinner";
import UpdateCandidateModal from "@/components/UpdateCandidateModal";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import {
  IGetSingleCandidateResponse,
  useLazyGetAllCandidatesQuery,
  useUploadCandidateMutation,
} from "@/lib/features/candidate";
import { useLazyGetOfficesQuery } from "@/lib/features/offices";
import { useLazyGetAllVoterQuery } from "@/lib/features/voters";
import { errorColor, successColor } from "@/utils/constants";
import {
  AspectRatio,
  Button,
  FileButton,
  Group,
  Modal,
  Select,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";

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
  const [file, setFile] = useState<File | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>("");
  const [candidatedata, setCandidateData] = useState<
    IGetSingleCandidateResponse[]
  >([]);
  const [filePreview, setFilePreview] = useState<string>("");
  const [opened, { open, close }] = useDisclosure(false);
  const [getAllVoters, { data, isSuccess }] = useLazyGetAllVoterQuery();
  const [getAllOffices, result] = useLazyGetOfficesQuery();
  const [getAllCandidates, getCandidatesRes] = useLazyGetAllCandidatesQuery();
  const [uploadCandidate, uploadCandidateRes] = useUploadCandidateMutation();
  const [votersData, setVotersData] = useState<
    { label: string; value: string }[]
  >([]);

  const [dropdownValue, setDropdownValue] = useState<{
    office: string | null;
    voter: string | null;
  }>({
    office: null,
    voter: null,
  });

  const [officesData, setOfficesData] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    if (getCandidatesRes.data) {
      setCandidateData(getCandidatesRes.data.payload.table_data);
    }
  }, [getCandidatesRes.data]);

  useEffect(() => {
    getAllVoters({
      nolimit: true,
    });
    getAllOffices();
    getAllCandidates();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      if (data.status) {
        const voters_dropdown_data = data.payload.table_data.map((el) => {
          return {
            label: el.firstname + " " + el.lastname,
            value: el.id,
          };
        });
        setVotersData(voters_dropdown_data);
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (uploadCandidateRes.isSuccess) {
      if (uploadCandidateRes.data.status) {
        notifications.show({
          title: "Success",
          message: "Candidate Uploaded Successfully",
          color: successColor,
        });
        setDropdownValue({
          office: null,
          voter: null,
        });
        setFile(null);
        getAllCandidates();
      } else {
        notifications.show({
          message: uploadCandidateRes.data.message,
          color: errorColor,
        });
      }
    }
  }, [uploadCandidateRes.isSuccess]);

  useEffect(() => {
    if (result.isSuccess) {
      if (result.data.status) {
        const offices_dropdown_data = result.data.payload.table_data.map(
          (el) => {
            return {
              label: el.name + " " + `(${el.slug})`,
              value: el.id,
            };
          }
        );
        setOfficesData(offices_dropdown_data);
      }
    }
  }, [result.isSuccess]);

  return (
    <>
      <Modal
        opened={opened}
        size={"lg"}
        centered
        onClose={close}
        title="Update candidate"
      >
        <UpdateCandidateModal
          refetch={() => getAllCandidates()}
          close={close}
          votersData={votersData}
          officeData={officesData}
          id={selectedCandidateId}
        />
      </Modal>
      <div className="py-[5rem] px-[3rem] text-white">
        <DashboardLayout>
          <div className="w-[70%] px-[5rem]">
            <h1 className="text-[1.5rem] font-bold mb-10">Add candidate</h1>
            <>
              <div className="w-[13rem]">
                <Group justify="center">
                  <FileButton
                    onChange={(file) => {
                      if (file) {
                        setFile(file);
                        const objectUrl = URL.createObjectURL(file);
                        setFilePreview(objectUrl);
                      }
                    }}
                    accept="image/png,image/jpeg"
                  >
                    {(props) => (
                      <button
                        className="text-[2rem] items-center  disabled:opacity-50 w-[5rem] flex justify-center rounded-full h-[5rem] border-white border"
                        {...props}
                      >
                        {filePreview ? (
                          <AspectRatio ratio={1800 / 1800}>
                            <Image
                              src={filePreview}
                              width={100}
                              height={100}
                              className="w-[5rem] h-[5rem] rounded-full"
                              alt="preview"
                            />
                          </AspectRatio>
                        ) : (
                          <FaUser />
                        )}
                      </button>
                    )}
                  </FileButton>
                </Group>
                <p className=" text-center  mt-3 font-medium">
                  Upload candidate image
                </p>
              </div>
            </>
            {/* <Input placeholder="" label="" /> */}
            <div className="mt-10">
              <Select
                searchable
                label="Office"
                value={dropdownValue.office}
                defaultValue={dropdownValue.office}
                size="lg"
                placeholder="Select"
                data={officesData}
                onChange={(e) =>
                  setDropdownValue({
                    ...dropdownValue,
                    office: e,
                  })
                }
              />
            </div>
            <div className="mt-4">
              <Select
                searchable
                label="Voter"
                size="lg"
                value={dropdownValue.voter}
                defaultValue={dropdownValue.voter}
                placeholder="Select"
                data={votersData}
                onChange={(e) =>
                  setDropdownValue({
                    ...dropdownValue,
                    voter: e,
                  })
                }
              />
            </div>
            <div className="mt-10">
              <button
                onClick={() => {
                  if (dropdownValue.office && dropdownValue.voter && file) {
                    uploadCandidate({
                      office_id: dropdownValue.office,
                      voter_id: dropdownValue.voter,
                      voter_path: file,
                    });
                  }
                }}
                disabled={
                  uploadCandidateRes.isLoading ||
                  !dropdownValue.office ||
                  !dropdownValue.voter ||
                  !file
                }
                className="disabled:cursor-not-allowed w-[7rem] flex justify-center disabled:bg-blue-300 bg-blue-500 py-2 rounded-sm font-semibold"
              >
                {uploadCandidateRes.isLoading ? (
                  <div className="w-[1rem] py-1">
                    <Spinner />
                  </div>
                ) : (
                  "Upload"
                )}
              </button>
            </div>

            <div className="mt-[3.5rem]">
              <h1 className="font-bold text-2xl">Uploaded candidates</h1>
              <div className="mt-[2.5rem]">
                {getCandidatesRes.isFetching ? (
                  <>
                    <div className="animate-pulse mt-4 bg-gray-500 w-full h-[5rem] rounded-md"></div>
                    <div className="animate-pulse mt-4 bg-gray-500 w-full h-[5rem] rounded-md"></div>
                    <div className="animate-pulse mt-4 bg-gray-500 w-full h-[5rem] rounded-md"></div>
                    <div className="animate-pulse mt-4 bg-gray-500 w-full h-[5rem] rounded-md"></div>
                    <div className="animate-pulse mt-4 bg-gray-500 w-full h-[5rem] rounded-md"></div>
                  </>
                ) : (
                  <>
                    {candidatedata.map((el) => (
                      <div
                        onClick={() => {
                          setSelectedCandidateId(el.id);
                          open();
                        }}
                        key={el.id}
                        className="cursor-pointer transition-all duration-150 bg-[#22222266] hover:bg-[#717171] w-full flex items-center rounded-md px-6 py-6 mb-6"
                      >
                        <div className="mr-4">
                          {el.voters_path ? (
                            <AspectRatio ratio={1800 / 1800}>
                              <Image
                                src={el.voters_path}
                                width={100}
                                height={100}
                                className="w-[2em] h-[2rem] rounded-full"
                                alt="preview"
                              />
                            </AspectRatio>
                          ) : (
                            <div className="border border-white h-[2rem] w-[2rem] flex items-center justify-center rounded-full">
                              <FaUser />
                            </div>
                          )}
                        </div>
                        <div className="mr-auto">
                          <p className="">
                            {el.firstname} &nbsp;
                            {el.middlename} &nbsp;
                            {el.lastname}
                          </p>
                        </div>
                        <p className="">{el.office}</p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </DashboardLayout>
      </div>
    </>
  );
};

export default CandidatesPage;
