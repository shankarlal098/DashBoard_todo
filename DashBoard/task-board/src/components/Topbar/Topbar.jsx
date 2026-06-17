import {
  HiOutlineCalendar,
  HiOutlineBell,
} from "react-icons/hi";

import { LuMessageSquareMore } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";

function Topbar() {
  return (
    <header
      className="
      h-20
      bg-white
      border-b
      border-gray-200
      px-4
      md:px-8
      flex
      items-center
      justify-between
      "
    >
      <div className="relative">

        <IoSearchOutline
          className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-gray-400
          "
          size={20}
        />

        <input
          type="text"
          placeholder="Search for anything..."
          className="
          w-[220px]
          md:w-[420px]
          pl-12
          pr-4
          py-3
          rounded-xl
          bg-[#F5F5F5]
          border
          border-transparent
          outline-none
          focus:border-[#5030E5]
          transition
          "
        />

      </div>
      <div
        className="
        flex
        items-center
        gap-3
        md:gap-5
        "
      >

        <button
          className="
          hidden
          md:flex
          w-10
          h-10
          rounded-xl
          bg-[#F5F5F5]
          items-center
          justify-center
          hover:bg-[#EDEBFF]
          transition
          cursor-pointer
          "
        >
          <HiOutlineCalendar size={20} />
        </button>

        <button
          className="
          hidden
          md:flex
          w-10
          h-10
          rounded-xl
          bg-[#F5F5F5]
          items-center
          justify-center
          hover:bg-[#EDEBFF]
          transition
          cursor-pointer
          "
        >
          <LuMessageSquareMore size={20} />
        </button>

        <button
          className="
          w-10
          h-10
          rounded-xl
          bg-[#F5F5F5]
          flex
          items-center
          justify-center
          hover:bg-[#EDEBFF]
          transition
          cursor-pointer
          "
        >
          <HiOutlineBell size={20} />
        </button>


        <div
          className="
          flex
          items-center
          gap-3
          pl-2
          "
        >

          <div
            className="
            hidden
            md:block
            text-right
            "
          >
            <h4
              className="
              font-semibold
              text-sm
              text-[#0D062D]
              "
            >
              Shankar Lal
            </h4>

            <p
              className="
              text-xs
              text-gray-500
              "
            >
              Rajasthan, India
            </p>
          </div>

          <div
            className="
            w-11
            h-11
            rounded-full
            bg-[#D8D2FF]
            flex
            items-center
            justify-center
            font-semibold
            text-[#5030E5]
            cursor-pointer
            "
          >
            S
          </div>

        </div>

      </div>
    </header>
  );
}

export default Topbar;