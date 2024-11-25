"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Sidebar from "./Sidebar";
import DashboardLayout from "./DashboardLayout";
import { useLazyGetTopStatsQuery } from "@/lib/features/overview";
import { DonutChart } from "@mantine/charts";
import { useLazyGetCandidateStatsQuery } from "@/lib/features/candidate";
import Spinner from "./Spinner";
import Votes from "./Votes";

type Props = {};

// const contestants: {
//   name: string;
//   id: string;
//   votes: number;
// }[] = [
//   {
//     id: "1",
//     name: "Pelumi",
//     votes: 20,
//   },
//   {
//     id: "2",
//     name: "Test User",
//     votes: 200,
//   },
//   {
//     id: "3",
//     name: "Test Userrr",
//     votes: 210,
//   },
// ];

const Dashboard = (props: Props) => {
  const [getTopCards, { data }] = useLazyGetTopStatsQuery();

  useEffect(() => {
    getTopCards();
  }, []);

  return (
    <DashboardLayout>
      <Votes total_votes={data?.payload.total_votes} />

      <div className="w-[30%] text-white">
        <div className="text-center py-6 px-4 w-full bg-[#22222266] rounded-xl text-white">
          <h2 className=" mb-2 font-semibold">Voting ends in</h2>
          <p>13 hrs 23 min</p>
        </div>
        <div className="text-center mt-4 rounded-xl py-6 bg-[#22222266]">
          <h1 className="text-xl font-semibold mb-6">Voting Process</h1>
          {data ? (
            <div className="text-white flex flex-col gap-8">
              <div className="flex flex-col items-center gap-4">
                <DonutChart
                  data={[
                    {
                      name: "Registered Voters",
                      value: parseInt(data.payload.total_voters),
                      color: "green",
                    },
                  ]}
                  chartLabel={data?.payload.total_voters}
                  size={80}
                  thickness={15}
                  strokeColor="#22222266"
                />
                <p className="">Total number of registered voters</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <DonutChart
                  data={[
                    {
                      name: "Total number of Voters",
                      value: parseInt(data.payload.total_votes),
                      color: "green",
                    },
                  ]}
                  chartLabel={data?.payload.total_votes}
                  size={80}
                  thickness={15}
                  strokeColor="#22222266"
                />
                <p className="">Total number of votes</p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <DonutChart
                  data={[
                    {
                      name: "Active Voters",
                      value: parseInt(data.payload.active_voters),
                      color: "green",
                    },
                    {
                      name: "Inactive Voters",
                      value:
                        parseInt(data.payload.total_voters) -
                        parseInt(data.payload.active_voters),
                      color: "red",
                    },
                  ]}
                  chartLabel={data?.payload.active_voters}
                  size={80}
                  thickness={15}
                  strokeColor="#22222266"
                  color="red"
                  labelColor="#00ffc89f"
                />
                <p className="">Active voters</p>
              </div>
            </div>
          ) : (
            <></>
          )}
          {/* <DonutChart
            withLabelsLine
            labelsType="value"
            withLabels
            data={data}
          /> */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
