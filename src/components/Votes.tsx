"use client";
import { useLazyGetCandidateStatsQuery } from "@/lib/features/candidate";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import VoteImg from "/public/assets/vote-img.jpg";
import Image from "next/image";
import Spinner from "./Spinner";
import Vote from "./Vote";

interface Props {
  total_votes: string | undefined;
}

const Votes = ({ total_votes }: Props) => {
  const [getCandidateStats, result] = useLazyGetCandidateStatsQuery();

  useEffect(() => {
    getCandidateStats("1");
  }, []);

  const offices = [
    "President",
    "Vice President",
    "General Secretary",
    "Financial Secretary",
    "Public Relations Officer",
  ];

  const [office, setOffice] = useState("0");

  const changeOffice = async (direction: "forward" | "backward") => {
    if (direction === "forward") {
      const newOffice = (parseInt(office) + 1) % 5;
      setOffice(newOffice.toString());
      await getCandidateStats((newOffice + 1).toString());
    } else {
      const newOffice = office !== "0" ? (parseInt(office) - 1) % 5 : 4;
      setOffice(newOffice.toString());
      await getCandidateStats((newOffice + 1).toString());
    }
  };
  return (
    <div className="w-[40%] text-white">
      <div className=" flex bg-[#22222266] px-6 py-4 rounded-xl items-center">
        <div className="w-[60%] text-lg">
          <h1 className="font-semibold mb-2">Ongoing Elections</h1>
          <p className="text-[#f9f9f970] mb-6">President Student Council</p>
          <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
            Vote Now
          </button>
        </div>
        <div className="w-[40%] rounded-xl overflow-hidden">
          <Image src={VoteImg} alt="vote-img" />
        </div>
      </div>
      <div className="bg-[#22222266] mt-4 rounded-xl px-6 py-4 min-h-[15rem] flex flex-col justify-between">
        <div className="flex justify-between 400 mb-6">
          <div className="text-lg">
            <h1 className="font-semibold mb-2">Total Votes</h1>
            <p className="text-[#f9f9f970]">{total_votes}</p>
          </div>

          <button className="text-blue-600">Show all</button>
        </div>
        <div className="flex flex-col items-center">
          {result.isFetching ? (
            <div className="w-[1rem] py-1">
              <Spinner />
            </div>
          ) : (
            result.data?.payload.map((el, index) => (
              <Vote
                index={index}
                candidate_id={el.candidate_id}
                firstname={el.firstname}
                middlename={el.middlename}
                lastname={el.lastname}
                total_votes={el.total_votes}
                voters_path={el.voters_path}
              />
            ))
          )}
        </div>
        <div className="flex  items-center justify-between ">
          <div
            className="cursor-pointer"
            onClick={() => changeOffice("backward")}
          >
            <IoIosArrowBack />
          </div>
          <p className="text-sm text-[#f9f9f970]">
            {offices[parseInt(office)]}
          </p>
          <div
            className="cursor-pointer"
            onClick={() => changeOffice("forward")}
          >
            <IoIosArrowForward />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Votes;
