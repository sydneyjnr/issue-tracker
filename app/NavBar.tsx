"use client";

import {Skeleton} from "@/app/components";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import React from "react";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";

const NavBar = () => {
  return (
    <nav className=" border-b mb-5 px-5 py-3 ">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const CurrentPath = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": CurrentPath === link.href,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem"/>

  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button type="button" style={{ all: "unset", cursor: "pointer" }}>
              <Avatar
                src={session.user!.image!}
                fallback="?"
                size="2"
                radius="full"
                referrerPolicy="no-referrer"
              />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>{session.user!.email}</DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Log Out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
      {status === "unauthenticated" && (
        <Link className="nav-link" href="/api/auth/signin">
          Log In
        </Link>
      )}
    </Box>
  );
};

export default NavBar;
