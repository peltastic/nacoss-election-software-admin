import {
  useLazyGetSingleCandidateQuery,
  useUpdateCandidateMutation,
} from "@/lib/features/candidate";
import {
  AspectRatio,
  FileButton,
  Group,
  Select,
  Skeleton,
} from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import Spinner from "./Spinner";
import { notifications } from "@mantine/notifications";
import { errorColor, successColor } from "@/utils/constants";

type Props = {
  id: string;
  votersData: { label: string; value: string }[];
  officeData: { label: string; value: string }[];
  refetch: () => void;
  close: () => void;
};

const UpdateCandidateModal = (props: Props) => {
  const [getSingleCandidate, result] = useLazyGetSingleCandidateQuery();
  const [updateCandidate, { isError, isLoading, isSuccess, data }] =
    useUpdateCandidateMutation();
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");
  const [dropdownValue, setDropdownValue] = useState<{
    office: string | null;
    voter: string | null;
  }>({
    office: null,
    voter: null,
  });

  useEffect(() => {
    if (props.id) {
      getSingleCandidate(props.id);
    }
  }, [props.id]);

  useEffect(() => {
    if (result.data) {
      setDropdownValue({
        ...dropdownValue,
        office: result.data.payload.offices_id,
        voter: result.data.payload.voters_id,
      });
    }
    if (result.data?.payload.voters_path) {
      setFilePreview(result.data.payload.voters_path);
    }
  }, [result.data]);
  useEffect(() => {
    if (result.isError) {
      notifications.show({
        message: (result.error as any).data?.message || "Something went wrong",
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
        props.refetch();
        props.close();
      } else {
        notifications.show({
          message: data.message,
          color: errorColor,
        });
      }
    }
  }, [isError, isSuccess]);

  return (
    <div className="text-black px-6 py-10">
      {result.isFetching ? (
        <div className="">
          <div className="mt-2 w-[5rem]  ">
            <Skeleton height={80} radius={"100%"} />
          </div>
          <div className="mt-6">
            <Skeleton height={50} />
          </div>
          <div className="mt-2">
            <Skeleton height={50} />
          </div>
          <div className="mt-6 w-[5rem]">
            <Skeleton height={50} />
          </div>
        </div>
      ) : (
        <>
          <div className="w-[13rem] ">
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
                    className="text-[2rem] items-center  disabled:opacity-50 w-[5rem] flex justify-center rounded-full h-[5rem] border-black border"
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
          <div className="mt-10">
            <Select
              label="Office"
              size="lg"
              placeholder="Select"
              data={props.officeData}
              defaultValue={result.data?.payload.offices_id}
              value={dropdownValue.office}
              onChange={(e) => {
                console.log(e);
                setDropdownValue({
                  ...dropdownValue,
                  office: e,
                });
              }}
            />
          </div>
          <div className="mt-4">
            <Select
              label="Voter"
              size="lg"
              placeholder="Select"
              data={props.votersData}
              onChange={(e) =>
                setDropdownValue({
                  ...dropdownValue,
                  voter: e,
                })
              }
              defaultValue={result.data?.payload.voters_id}
              value={dropdownValue.voter}
            />
          </div>
          <div className="mt-10">
            <button
              onClick={() => {
                if (dropdownValue.office && dropdownValue.voter) {
                  updateCandidate({
                    office_id: dropdownValue.office,
                    voter_id: dropdownValue.voter,
                    voter_path: file,
                    id: props.id,
                  });
                }
              }}
              disabled={
                (!dropdownValue.office && !dropdownValue.voter) || isLoading
              }
              className="flex justify-center disabled:cursor-not-allowed disabled:bg-blue-400 bg-blue-500 w-[5rem] text-sm font-semibold rounded-md text-white py-2"
            >
              {isLoading ? (
                <div className="w-[1rem] py-1">
                  <Spinner />
                </div>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateCandidateModal;
