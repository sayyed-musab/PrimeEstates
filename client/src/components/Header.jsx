import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-800 p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="font-bold md:text-xl flex flex-wrap">
            <span className="text-amber-600">Prime</span>
            <span className="text-slate-200">Estates</span>
          </h1>
        </Link>
        <form className="bg-white p-1 text-sm md:text-base rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-28 sm:w-64"
          />
          <FaSearch className="text-slate-700" />
        </form>
        <ul className="flex gap-4 text-sm md:text-base">
          <li className="hidden sm:inline text-slate-200  hover:border-b-2 hover:border-b-amber-700">
            <Link to="/">Home</Link>
          </li>
          <li className="hidden sm:inline text-slate-200  hover:border-b-2 hover:border-b-amber-700">
            <Link to="/about">About</Link>
          </li>
          <li className="text-slate-200 hover:border-b-2 hover:border-b-amber-700">
            <Link to="/signin">Sign in</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
