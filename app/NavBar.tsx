"use client";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import React from "react";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const CurrentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames("hover:text-zinc-800 transition-colors", {
                "text-zinc-900": CurrentPath === link.href,
                "text-zinc-500": CurrentPath !== link.href,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && <Link href="/api/auth/signout">Log Out</Link>}
        {status === "unauthenticated" && <Link href="/api/auth/signin">Log In</Link>}
      </Box>
    </nav>
  );
};

export default NavBar;
