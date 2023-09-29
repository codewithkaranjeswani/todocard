import Link from "next/link";
import { AiOutlineGithub } from "react-icons/ai";

function Footer() {
  return (
    <footer className="container mx-auto border-t sm:px-6">
      <div className="flex py-3 text-center flex-wrap justify-between">
        <div className="flex items-center justify-center space-x-1 hover:cursor-default">
          © 2023 The TodoCard Project
        </div>
        <div className="mb-1 flex items-center justify-center space-x-2">
          <Link href="https://github.com" rel="noreferrer" target="_blank">
            <AiOutlineGithub
              className="cursor-pointer transition-transform hover:-translate-y-1"
              size={30}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
