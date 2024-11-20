// "use client"
import React, { useEffect } from "react";
import VoteImg from "/public/assets/vote-img.jpg";
import Image from "next/image";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Sidebar from "./Sidebar";
import DashboardLayout from "./DashboardLayout";
import { useLazyGetTopCardsQuery } from "@/lib/features/overview";
// import { DonutChart } from "@mantine/charts";
// import { DonutChart } from '@mantine/charts';

type Props = {};

const contestants: {
  name: string;
  id: string;
  votes: number;
}[] = [
  {
    id: "1",
    name: "Pelumi",
    votes: 20,
  },
  {
    id: "2",
    name: "Test User",
    votes: 200,
  },
  {
    id: "3",
    name: "Test Userrr",
    votes: 210,
  },
];

const Dashboard = (props: Props) => {
  const [getTopCards, {}] = useLazyGetTopCardsQuery();
  useEffect(() => {
    getTopCards();
  }, []);
  return (
    <DashboardLayout>
      <div className="w-[40%]">
        <div className=" flex bg-[#22222266] px-6 py-4 rounded-xl items-center">
          <div className="w-[60%]">
            <h1 className="font-semibold mb-2">Ongoing Elections</h1>
            <p className="text-[#f9f9f970] mb-6">President Student Council</p>
          </div>
          <div className="w-[40%] rounded-xl overflow-hidden">
            <Image src={VoteImg} alt="vote-img" />
          </div>
        </div>
        <div className="bg-[#22222266] mt-4 rounded-xl px-6 py-4">
          <div className="">
            <h1 className="font-semibold mb-2">Total Votes</h1>
            <p className="text-[#f9f9f970] mb-6">745</p>
          </div>
          <div className="">
            {contestants.map((el, index) => (
              <div
                key={el.id}
                className="flex px-4 py-4 rounded-md items-center mb-4 bg-black"
              >
                <div className="w-[4rem] h-[4rem] bg-slate-100 mr-4 rounded-md"></div>
                <div className="mr-auto">
                  <p className="font-semibold">{el.name}</p>
                  <p className="text-[#f9f9f970] text-sm">
                    vote: <span className="text-white">{el.votes}</span>
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
            ))}
          </div>
          <div className="flex  items-center justify-between">
            <IoIosArrowBack />
            <p className="text-sm text-[#f9f9f970]">President</p>
            <IoIosArrowForward />
          </div>
        </div>
      </div>
      <div className="w-[30%]">
        <div className="text-center py-6 px-4 w-full bg-[#22222266] rounded-xl text-white">
          <h2 className=" mb-2 font-semibold">Voting ends in</h2>
          <p>13 hrs 23 min</p>
        </div>
        <div className="text-center mt-4 rounded-xl py-6 bg-[#22222266]">
          <h1>Voting Process</h1>
          {/* <DonutChart data={[
            {
              name: "Registered Voters",
              value: 2300,
              color: "green"
            }
          ]} /> */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
