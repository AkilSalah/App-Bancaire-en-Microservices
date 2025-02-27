import { Link } from "react-router-dom";

const Navbar = () => {
  return (
      <header className="bg-gray-200 w-full text-slate-700 flex flex-col overflow-hidden px-6 py-2 lg:flex-row lg:items-center">
          <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row lg:items-center">
              <div className="flex items-center whitespace-nowrap text-2xl font-black">
                  <span className="w-56 flex gap-2">
                      <img src="/images/bank_logo.png" alt="Logo " className="w-14" />
                      <p className="my-auto">Banking App</p>
                  </span>
              </div>
              <input type="checkbox" className="peer hidden" id="navbar-open" />
              <label className="absolute top-5 right-5 cursor-pointer lg:hidden" htmlFor="navbar-open">
                  <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
              </label>
              <nav
                  aria-label="Header Navigation"
                  className="peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row"
              >
                  <ul className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
                      <li className="lg:mr-12">
                        <Link to="/home" className="rounded text-gray-700 cursor-pointer transition focus:outline-none focus:ring-blue-700 focus:ring-offset-2 hover:text-orange-500 block font-semibold text-[16px]"
                        >
                        Home
                        </Link>
                      </li>
                      <li className="lg:mr-12">
                      <Link to="/customers" className="rounded text-gray-700 cursor-pointer transition focus:outline-none focus:ring-blue-700 focus:ring-offset-2 hover:text-orange-500 block font-semibold text-[16px]"
                        >
                        Customers
                        </Link>
                      </li>
                      <li className="lg:mr-12">
                      <Link to="accounts" className="rounded text-gray-700 cursor-pointer transition focus:outline-none focus:ring-blue-700 focus:ring-offset-2 hover:text-orange-500 block font-semibold text-[16px]"
                        >
                        Accounts
                        </Link>
                      </li>
                  </ul>
                  <hr className="mt-4 w-full lg:hidden" />
              </nav>
          </div>
      </header>
  );
};

export default Navbar;