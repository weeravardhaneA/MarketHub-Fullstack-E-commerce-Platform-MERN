import { useState } from "react";
import LoginIcon from "./LoginIcon";

const Header = () => {
  const [Array, setArray] = useState([
    { link: "products", text: "Products" },
    { link: "about", text: "About" },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="px-[5vw] py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="w-60 text-3xl font-extrabold text-yellow-400 tracking-wide">
          ShopNest
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-8 h-8 text-yellow-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex flex-row justify-around w-200 space-x-8 text-sm font-medium">
          {Array.map((item, index) => (
            <div key={index}>
              <a
                href={"/" + item.link}
                className="relative hover:text-yellow-300 transition after:absolute after:-bottom-1 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-yellow-500 after:transition-all"
              >
                {item.text}
              </a>
            </div>
          ))}
        </nav>

        {/* Actions: Login and Cart */}
        <div className="hidden md:flex w-40 items-center space-x-6">
          <LoginIcon />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden px-[5vw] pb-4">
          <nav className="flex flex-col space-y-4 text-sm font-medium">
            {Array.map((item, index) => (
              <a
                key={index}
                href={"/" + item.link}
                className="hover:text-yellow-300 transition"
              >
                {item.text}
              </a>
            ))}
            <LoginIcon />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
