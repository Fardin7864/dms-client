import { NavLink } from "react-router-dom";

const Navlinks = () => {
    return (
        <ul className="flex gap-1 justify-center md:gap-3 ">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "shadow-md p-2 rounded-lg text-[#910A67]"
                : " hover:text-[#910A67] hover:shadow-md p-2 rounded-lg"
            }
          >
            <span className=" md:text-md font-semibold text-sm">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/sell"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "shadow-md p-2 rounded-lg"
                : "hover:text-[#910A67] hover:shadow-md p-2 rounded-lg"
            }
          >
            <span className="text-sm md:text-md font-semibold text-gray-500 hover:text-[#910A67]">
              Delivery
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/sell"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "shadow-md p-2 rounded-lg"
                : " hover:shadow-md p-2 rounded-lg"
            }
          >
            <span className="text-sm md:text-md font-semibold text-gray-500 hover:text-[#910A67]">
               Return
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/sell"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "shadow-md p-2 rounded-lg"
                : "hover:text-[#910A67] hover:shadow-md p-2 rounded-lg"
            }
          >
            <span className="text-sm md:text-md font-semibold text-gray-500 hover:text-[#910A67]">
               Order
            </span>
          </NavLink>
        </li>
      </ul>
    );
};

export default Navlinks;