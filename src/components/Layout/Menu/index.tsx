import React from "react";
import { MENU_NAVIGATION } from "@/constants/menu";
import Link from "next/link";
import { useRouter } from 'next/router';

export default function Menu() {
  const router = useRouter();
  const { pathname } = router;
  console.log('test',pathname ,MENU_NAVIGATION[0].label )
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
          <li key={item.id} className={``}>
            <Link href={item.link} className="flex flex-row">
              <div className={`flex h-[24px] w-full items-center justify-between ml-lg ${pathname === item.link ? "bg-primary-300":""}`}>
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
