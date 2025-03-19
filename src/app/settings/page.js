"use client";

import React, { useState } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "../../components/global/Sidebar";
import {
  IconBrandTabler,
  IconSettings,
  IconClipboardText,
  IconBinaryTree2,
  IconUserScreen,
  IconChartBubble,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Settings from "@/components/settings/Settings";

export default function SidebarDemo({ params }) {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-800 size-5 flex-shrink-0" />
      ),
    },
    {
      label: "Frontend",
      href: "/frontend",
      icon: (
        <IconUserScreen className="text-neutral-800 size-5 flex-shrink-0" />
      ),
    },
    {
      label: "Backend",
      href: "/backend",
      icon: (
        <IconBinaryTree2 className="text-neutral-800 size-5 flex-shrink-0" />
      ),
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: (
        <IconChartBubble className="text-neutral-800 size-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logs",
      href: "/logs",
      icon: (
        <IconClipboardText className="text-neutral-800 size-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="text-neutral-800 size-5 flex-shrink-0" />,
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={cn(
          "rounded-md hidden md:flex flex-col md:flex-row bg-neutral-100 w-full flex-1 border overflow-hidden",
          "h-screen"
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 pl-3 pt-3 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-3 text-neutral-800 font-dm text-sm">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
        <Settings />
      </div>
      <div className="flex flex-col md:hidden bg-gray-100 min-h-screen items-center justify-center text-center">
        <img src="LimeblockLogo.png" className="w-1/3" />
        <h1 className="font-aeonik font-semibold text-3xl pt-6 pb-4">
          Mobile not supported
        </h1>
        <p className="text-gray-700 font-inter text-sm">
          Try Limeblock on a bigger device
        </p>
      </div>
    </>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal font-dm flex space-x-2 items-center text-sm py-1 relative z-20"
    >
      <img src="/LimeblockLogo.png" className="-ml-0.5 size-7" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-aeonik font-medium text-neutral-800 text-base blackspace-pre mt-0.5"
      >
        Limeblock
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-neutral-800 py-1 relative z-20"
    >
      {/* <div className="h-5 w-6 bg-black rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"></div> */}
      <img src="/LimeblockLogo.png" className="-ml-0.5 size-7" />
    </Link>
  );
};
