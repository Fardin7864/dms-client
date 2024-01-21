import {
  AiFillDollarCircle,
  AiFillExclamationCircle,
  AiFillFileText,
  AiFillTags,
  AiOutlineExclamation,
  AiOutlineUsergroupAdd,
  AiTwotoneWallet,
} from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { NavLink } from "react-router-dom";
import Navlinks from "../navlinks/Navlinks";

const Navbar = () => {
  const navLink = (
    <>
      {" "}
      <li>
        <NavLink to={"/"}>
          <GoHome className=" text-2xl font-bold" />
          <span className=" text-md font-semibold">Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/sell"}>
          <AiFillTags className=" text-2xl font-bold" />
          <span className=" text-md font-semibold">Sell</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/return"}>
          <AiOutlineExclamation className=" text-2xl font-bold" />
          <span className=" text-md font-semibold">Return</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/orders"}>
          <AiFillFileText className=" text-2xl font-bold" />
          <span className=" text-md font-semibold">Orders</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/stock"}>
          <AiTwotoneWallet className=" text-2xl font-bold" />
          <span className=" text-md font-semibold">Stock</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/damages"}>
          <AiFillExclamationCircle className=" text-2xl font-bold" />
          <span className=" text-md font-semibold">Damages</span>
        </NavLink>
      </li>
      <li className="flex flex-row items-center">
        <h4 className=" text-xl font-bold">EMPLOYEES</h4>
      </li>
      <li>
        <NavLink to={"/empployee"}>
          <AiOutlineUsergroupAdd className=" text-2xl font-bold" />
          <span className=" text-md font-semibold">Epmployee List</span>
        </NavLink>
      </li>
      <li>
        <NavLink to={"/salary"}>
          <AiFillDollarCircle className=" text-2xl font-bold" />
          <span className=" text-md font-semibold">Salary Sheet</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 lg:justify-between lg:px-10">
      <div className="navbar-start lg:hidden ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLink}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <div className="hidden md:block">
        <Navlinks/>
        </div>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
