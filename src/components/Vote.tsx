import { IGetCandidateStatsResponse } from "@/lib/features/candidate";
import Image from "next/image";
import React from "react";

interface Props extends IGetCandidateStatsResponse {
  index: number;
}

const Vote = ({
  index,
  candidate_id,
  firstname,
  lastname,
  total_votes,
  voters_path,
}: Props) => {
  return (
    <div
      key={candidate_id}
      className="flex px-4 py-4 rounded-md items-center mb-4 bg-black w-full"
    >
      <div className="w-[4rem] h-[4rem] bg-slate-100 mr-4 rounded-md">
        {/* <Image src={voters_path} alt={lastname} /> */}
      </div>
      <div className="mr-auto">
        <p className="font-semibold">{firstname + " " + lastname}</p>
        <p className="text-[#f9f9f970] text-sm">
          Votes: <span className="text-white">{total_votes}</span>
        </p>
      </div>
      <p className="text-white font-medium">
        {index + 1}
        {index + 1 === 1
          ? "st"
          : index + 1 === 2
          ? "nd"
          : index + 1 === 3
          ? "rd"
          : "th"}
      </p>
    </div>
  );
};

export default Vote;
