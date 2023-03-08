import Container from "../Container";
import Image from "next/image";
import { useRouter } from "next/router";
import navCertifyFullLogo from "@/assets/logo/navCertifyFullLogo.png";
import { useState } from "react";

export default function Nav({ toggleNav, navOpen, frame }: any) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Account",
      link: "/login",
    },
    {
      name: "Pricing",
      link: "/pricing",
    },
    {
      name: "Courses",
      link: "/coming-soon",
    },
  ];

  // framed pages
  if (frame) {
    return (
      <nav className="relative flex h-14 items-center justify-center rounded bg-white p-2 text-black shadow-md dark:bg-dark-gray dark:text-white">
        <Container padding="p-0">
          <div className="flex items-center justify-between">
            <div id="nav-left">
              <Image
                src={navCertifyFullLogo}
                width="120"
                onClick={() => router.push("/")}
                className="cursor-pointer"
                alt="certify logo and link to home"
              />
            </div>
            <div id="nav-right">
              {navOpen && (
                <div onClick={toggleNav} className="z-1 fixed top-0 left-0 h-full w-full cursor-pointer" />
              )}
              <HamburgerButton navOpen={navOpen} handleClick={toggleNav} />
              <HamburgerMenu navOpen={navOpen}>
                {navLinks.map((item, index) => (
                  <NavLink item={item} index={index} key={index} />
                ))}
              </HamburgerMenu>
            </div>
          </div>
        </Container>
      </nav>
    );
  }

  // non framed pages
  return (
    <nav className="relative flex h-14 items-center justify-center rounded bg-white/[0.6] p-2 text-black dark:bg-dark-gray dark:text-white">
      <Container padding="p-0">
        <div className="flex items-center justify-between">
          <div id="nav-left">
            <Image
              src={navCertifyFullLogo}
              width="120"
              onClick={() => router.push("/")}
              className="cursor-pointer"
              alt="certify logo and link to home"
            />
          </div>
          <div id="nav-right">
            {isNavOpen && (
              <div
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="z-1 fixed top-0 left-0 h-full w-full cursor-pointer"
              />
            )}
            <HamburgerButton navOpen={isNavOpen} handleClick={() => setIsNavOpen(!isNavOpen)} />
            <HamburgerMenu navOpen={isNavOpen}>
              {navLinks.map((item, index) => (
                <NavLink item={item} index={index} />
              ))}
            </HamburgerMenu>
          </div>
        </div>
      </Container>
    </nav>
  );
}

function HamburgerButton({ handleClick, navOpen }: any) {
  return (
    <div
      id="hamburger-button"
      onClick={handleClick}
      className="relative cursor-pointer px-2 [&>div]:hover:bg-french-blue"
    >
      <div
        className={`my-[5px] h-[2px] w-6 bg-black duration-300 dark:bg-white ${
          navOpen && "translate-y-[7px] rotate-45"
        }`}
      ></div>
      <div
        className={`my-[5px] h-[2px] w-6 bg-black duration-300 dark:bg-white ${
          navOpen && "translate-x-[-100vw]"
        }`}
      ></div>
      <div
        className={`my-[5px] h-[2px] w-6 bg-black duration-300 dark:bg-white ${
          navOpen && "-translate-y-[7px] -rotate-45"
        }`}
      ></div>
    </div>
  );
}

function HamburgerMenu({ navOpen, children }: any) {
  return (
    <div className="absolute top-16 left-0 flex w-full items-center justify-center">
      <ul
        id="nav-menu"
        className={`${
          navOpen ? " scale-100" : "scale-0"
        } mx-auto flex w-full origin-top-right flex-col items-center justify-center gap-2 rounded bg-white p-2 shadow-md duration-150 dark:bg-dark-gray md:w-2/3`}
      >
        {children}
      </ul>
    </div>
  );
}

function NavLink({ item, index }) {
  const router = useRouter();
  return (
    <li
      className="cursor-pointer text-center underline underline-offset-4 duration-300 ease-in-out hover:scale-105 hover:text-french-blue"
      onClick={() => router.push(item.link)}
      key={index}
      id="nav-link"
    >
      {item.name}
    </li>
  );
}
