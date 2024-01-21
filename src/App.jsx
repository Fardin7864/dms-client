import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./common/navbar/Navbar";
import { GoHome } from "react-icons/go";
import { AiFillFileText, AiFillTags ,AiTwotoneWallet,AiOutlineUsergroupAdd,AiFillDollarCircle, AiFillExclamationCircle, AiOutlineExclamation } from "react-icons/ai";
import Navlinks from "./common/navlinks/Navlinks";


function App() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-[#fcfcfc]">
        {/* Page content here */}
        <Navbar/>
        <div className=" md:hidden my-3">
          <Navlinks/>
        </div>
        <Outlet/>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        > </label>
        <ul className="menu p-4 w-80 min-h-full bg-[#030637] text-base-100">
          {/* Sidebar content here */}
          <li className="flex flex-row items-center"><img src="/public/logo.png" alt=""  className="w-20 "/><h4 className=" text-2xl font-bold">VELOCI</h4></li>
          <li>
            <NavLink to={'/'}><GoHome className=" text-2xl font-bold"/><span className=" text-md font-semibold">Dashboard</span></NavLink>
          </li>
          <li>
            <NavLink to={'/sell'}><AiFillTags className=" text-2xl font-bold"/><span className=" text-md font-semibold">Sell</span></NavLink>
          </li>
          <li>
            <NavLink to={'/return'}><AiOutlineExclamation  className=" text-2xl font-bold"/><span className=" text-md font-semibold">Return</span></NavLink>
          </li>
          <li>
            <NavLink to={'/orders'}><AiFillFileText className=" text-2xl font-bold"/><span className=" text-md font-semibold">Orders</span></NavLink>
          </li>
          <li>
            <NavLink to={'/stock'}><AiTwotoneWallet  className=" text-2xl font-bold"/><span className=" text-md font-semibold">Stock</span></NavLink>
          </li>
          <li>
            <NavLink to={'/damages'}><AiFillExclamationCircle  className=" text-2xl font-bold"/><span className=" text-md font-semibold">Damages</span></NavLink>
          </li>
          <li className="flex flex-row items-center"><h4 className=" text-xl font-bold">EMPLOYEES</h4></li>
          <li>
            <NavLink to={'/empployee'}><AiOutlineUsergroupAdd  className=" text-2xl font-bold"/><span className=" text-md font-semibold">Epmployee List</span></NavLink>
          </li>
          <li>
            <NavLink to={'/salary'}><AiFillDollarCircle  className=" text-2xl font-bold"/><span className=" text-md font-semibold">Salary Sheet</span></NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
