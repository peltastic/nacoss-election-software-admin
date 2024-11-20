import { useProtectRoute } from "@/hooks/useProtectRoute";
import { setAuthStatus } from "@/lib/slices/authSlice";
import { setUserInfo } from "@/lib/slices/userSlice";
import { successColor } from "@/utils/constants";
import { removeCookie } from "@/utils/storage";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";

type Props = {};

const pages = [
  {
    name: "Dashboard",
    link: "/home",
  },
  {
    name: "Voters",
    link: "/voters",
  },
  {
    name: "Candidates",
    link: "/candidates",
  },
];

const Sidebar = (props: Props) => {
  const { disableExpiration } = useProtectRoute();
  const dispatch = useDispatch();
  const path = usePathname();
  const router = useRouter();

  return (
    <nav className="bg-[#22222266] w-[20%] rounded-md text-white">
      <ul className="px-6 space-y-6 py-8">
        {pages.map((el) => (
          <Link href={el.link}>
            <li
              className={`${
                path === el.link ? "bg-black" : ""
              }  py-3 px-4 rounded-md cursor-pointer transition-all mb-3`}
            >
              <p>{el.name}</p>
            </li>
          </Link>
        ))}
        <li
          onClick={() => {
            disableExpiration();
            removeCookie("token");
            dispatch(
              setUserInfo({
                email: "",
                firstname: "",
                id: "",
                lastname: "",
                username: "",
              })
            );
            notifications.show({
              message: "Logout successful",
              color: successColor,
            });
            router.push("/");
          }}
          className="  py-3 rounded-md flex items-center px-6 cursor-pointer hover:bg-black"
        >
          <p className="mr-2">Logout</p>
          <CiLogout />
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
