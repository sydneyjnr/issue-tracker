"use client";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import React from "react";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";

const NavBar = () => {
  const CurrentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];
  return (
    <nav className=" border-b mb-5 px-5 py-3 ">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classnames(
                      "hover:text-zinc-800 transition-colors",
                      {
                        "text-zinc-900": CurrentPath === link.href,
                        "text-zinc-500": CurrentPath !== link.href,
                      },
                    )}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <button
                    type="button"
                    style={{ all: "unset", cursor: "pointer" }}
                  >
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
                  <DropdownMenu.Label>
                    {session.user!.email}
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log Out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Log In</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
