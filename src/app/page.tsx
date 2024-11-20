"use client";
import Dashboard from "@/components/Dashboard";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import { useLoginAdminMutation } from "@/lib/features/auth";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Formik } from "formik";
import Image from "next/image";
import { useEffect } from "react";
import { setTokenCoookie } from "@/utils/storage";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/lib/slices/userSlice";
import { useRouter } from "next/navigation";
import { errorColor, successColor } from "@/utils/constants";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginAdmin, { isLoading, isError, isSuccess, error, data }] =
    useLoginAdminMutation();

  useEffect(() => {
    if (isError) {
      notifications.show({
        message: (error as any).data?.message || "Somerthing went wrong",
        color: errorColor,
      });
    }
    if (isSuccess) {
      if (data.status) {
        notifications.show({
          title: "Success",
          message: "Login Successful",
          color: successColor,
        });
        setTokenCoookie(data.payload.token);
        dispatch(
          setUserInfo({
            email: data.payload.email,
            firstname: data.payload.firstname,
            id: data.payload.id,
            lastname: data.payload.lastname,
            username: data.payload.username,
          })
        );
        router.push("/home");
      } else {
        notifications.show({
          message: data.message,
          color: errorColor,
        });
      }
    }
  }, [isError, isSuccess]);
  return (
    <div className="  mt-[3rem] text-white">
      <h1 className="text-4xl font-bold text-center">Admin Login</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values) => {
          loginAdmin(values);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="bg-[#22222266] px-8 mx-auto mt-[5rem] py-10 w-[30rem]">
              <Input
                label="Email"
                placeholder=""
                changed={handleChange}
                className="py-2 px-2 w-full outline-none text-black"
                name="username"
                value={values.username}
                onBlur={handleBlur}
              />

              <div className="mt-6">
                <Input
                  placeholder=""
                  name="password"
                  changed={handleChange}
                  className="py-2 px-2 w-full outline-none text-black"
                  label="Password"
                  onBlur={handleBlur}
                  value={values.password}
                  type="password"
                />
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="disabled:opacity-50 font-semibold bg-blue-400 px-5 py-2 w-[6rem] rounded-sm mt-10 flex justify-center"
              >
                {isLoading ? (
                  <div className="w-[1rem] py-1">
                    <Spinner />
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
