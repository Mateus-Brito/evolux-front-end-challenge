import { AcademicCapIcon, GithubIcon } from "@libs/icons";
import Link from "next/link";

const Header = () => {
  return (
    <div className="relative bg-white border-b-2 border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-3 md:justify-start md:space-x-10">
          <div className="flex justify-start">
            <Link href="/">
              <span className="sr-only">Telecom Carrier</span>
              <AcademicCapIcon color="#333" width={30} height={30} />
            </Link>
          </div>
          <nav className="space-x-10 flex flex-1 justify-center">
            <Link
              href="/"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Home
            </Link>
          </nav>
          <div className="items-center justify-end flex">
            <a
              className="nav-link items-center flex flex-row"
              href="https://github.com/Mateus-Brito/evolux-front-end-challenge"
            >
              <GithubIcon color="#333" width={22} height={22} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
