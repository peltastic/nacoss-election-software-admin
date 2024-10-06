"use client";
import Dashboard from "@/components/Dashboard";
import Input from "@/components/Input";
import { Button } from "@mantine/core";
import Image from "next/image";

export default function Home() {
  return (
    <div className="  mt-[3rem]">
      <h1 className="text-4xl font-bold text-center">Admin Login</h1>
      <div className="bg-[#22222266] px-8 mx-auto mt-[5rem] py-10 w-[30rem]">
        <Input
          placeholder=""
          changed={() => {}}
          className="py-2 w-full outline-none"
          label="Email"
          value=""
        />
        <div className="mt-6">
          <Input
            placeholder=""
            changed={() => {}}
            className="py-2 w-full outline-none"
            label="Password"
            value=""
          />
        </div>
        <Button className="mt-10">Next</Button>
      </div>
    </div>
  );
}
