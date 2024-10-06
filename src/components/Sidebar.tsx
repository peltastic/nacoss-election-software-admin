import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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
  const path = usePathname();

  return (
    <nav className="bg-[#22222266] w-[20%] rounded-md">
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
        {/* <li className="bg-black py-3 px-4 rounded-md">
          <p>Dashboard</p>
        </li>
        <li>
          <p>Dashboard</p>
        </li>
        <li>
          <p>Dashboard</p>
        </li> */}
      </ul>
    </nav>
  );
};

export default Sidebar;
