import React from "react";
import { MENU_NAVIGATION } from "@/constants/menu";
import Link from "next/link";
import { useRouter } from 'next/router';
import { LayoutDashboardIcon, SettingsIcon, TrophyIcon  } from "lucide-react";
export default function Menu() {
  const router = useRouter();
  const { pathname } = router;
  const icons = [<LayoutDashboardIcon />, <TrophyIcon />, <SettingsIcon />].map((icon, index) => {
    return React.cloneElement(icon, { key: index });
  });

  return (
    <nav className="border border-solid pt-20">
      {/*
        //TODO: add logo
          <img
            alt="logo"
            src=""
          />
      */}
      <ul className="list-menu-items mt-xxsm justify-items-stretch overflow-hidden transition">
        {MENU_NAVIGATION.map((item) => (
          <li key={item.id} className="mb-4">
            <Link href={item.link} className="flex flex-row">
            <div className="mr-8">
             {icons[item.id]}
            </div>
              <div className={`flex h-[24px] w-full items-center justify-between ml-lg rounded-sm p-3 ${pathname === item.link ? "bg-primary-300":""}`}>
                <label className="block cursor-pointer whitespace-nowrap pl-xsm">
                  {item.label}
                </label>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
