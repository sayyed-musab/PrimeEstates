import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-gray-800 p-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/">
          <h1 className="font-bold md:text-xl flex flex-wrap">
            <span className="text-amber-600">Prime</span>
            <span className="text-slate-200">Estates</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 py-1 px-2 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-28 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4 text-sm md:text-base">
          <li className="hidden sm:inline text-slate-200  hover:border-b-2 hover:border-b-amber-700">
            <Link to="/">Home</Link>
          </li>
          <li className="hidden sm:inline text-slate-200  hover:border-b-2 hover:border-b-amber-700">
            <Link to="/about">About</Link>
          </li>
          <li>
            {currentUser ? (
              <Link to="/profile">
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar || currentUser.validUser?.avatar}
                  alt="profile"
                />
              </Link>
            ) : (
              <span className="text-slate-200 hover:border-b-2 hover:border-b-amber-700">
                <Link to="/signin">Sign in</Link>
              </span>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
