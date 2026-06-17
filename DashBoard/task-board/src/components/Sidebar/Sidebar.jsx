import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineCog,
} from "react-icons/hi";

import { MdOutlineMessage } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";

function Sidebar() {
  return (
    <aside
      className="
      w-[280px]
      bg-white
      border-r
      border-gray-200
      flex
      flex-col
      shrink-0
      "
    >
      <div
        className="
        h-20
        border-b
        border-gray-200
        flex
        items-center
        px-8
        "
      >
        <h1
          className="
          font-bold
          text-2xl
          tracking-tight
          text-[#0D062D]
          "
        >
          Project M.
        </h1>
      </div>

      <nav className="px-5 py-8">
        <ul className="space-y-2">

          <li
            className="
            flex
            items-center
            gap-4
            p-3
            rounded-xl
            bg-[#EDEBFF]
            text-[#5030E5]
            font-semibold
            cursor-pointer
            "
          >
            <HiOutlineHome size={22} />
            Home
          </li>

          <li
            className="
            flex
            items-center
            gap-4
            p-3
            rounded-xl
            text-gray-500
            hover:bg-gray-100
            transition
            cursor-pointer
            "
          >
            <MdOutlineMessage size={22} />
            Messages
          </li>

          <li
            className="
            flex
            items-center
            gap-4
            p-3
            rounded-xl
            text-gray-500
            hover:bg-gray-100
            transition
            cursor-pointer
            "
          >
            <LuClipboardList size={22} />
            Tasks
          </li>

          <li
            className="
            flex
            items-center
            gap-4
            p-3
            rounded-xl
            text-gray-500
            hover:bg-gray-100
            transition
            cursor-pointer
            "
          >
            <HiOutlineUsers size={22} />
            Members
          </li>

          <li
            className="
            flex
            items-center
            gap-4
            p-3
            rounded-xl
            text-gray-500
            hover:bg-gray-100
            transition
            cursor-pointer
            "
          >
            <HiOutlineCog size={22} />
            Settings
          </li>

        </ul>
      </nav>

      <div className="mx-6 border-t border-gray-200" />

      <div className="p-6">

        <h3
          className="
          text-xs
          font-semibold
          tracking-widest
          text-gray-400
          mb-5
          "
        >
          MY PROJECTS
        </h3>

        <div className="space-y-2">

          <div
            className="
            bg-[#EDEBFF]
            border
            border-[#D8D2FF]
            p-4
            rounded-xl
            flex
            items-center
            gap-3
            cursor-pointer
            "
          >
            <div className="w-2 h-2 rounded-full bg-green-500" />

            <span className="font-medium text-[#0D062D]">
              Mobile App
            </span>
          </div>

          <div
            className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-gray-100
            transition
            cursor-pointer
            "
          >
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            <span>Website Redesign</span>
          </div>

          <div
            className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-gray-100
            transition
            cursor-pointer
            "
          >
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span>Design System</span>
          </div>

          <div
            className="
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-gray-100
            transition
            cursor-pointer
            "
          >
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Wireframes</span>
          </div>

        </div>
      </div>

      <div className="mt-auto p-6">

        <div
          className="
          bg-[#F5F5F5]
          rounded-2xl
          p-5
          text-center
          "
        >
          <div
            className="
            w-12
            h-12
            mx-auto
            mb-4
            rounded-full
            bg-yellow-100
            flex
            items-center
            justify-center
            text-xl
            "
          >
            💡
          </div>

          <h3
            className="
            font-semibold
            text-[#0D062D]
            mb-2
            "
          >
            Thoughts Time
          </h3>

          <p
            className="
            text-xs
            text-gray-500
            leading-5
            mb-4
            "
          >
            We don't have any notice for you,
            till then you can share your
            thoughts with your peers.
          </p>

          <button
            className="
            w-full
            bg-white
            border
            border-gray-200
            rounded-xl
            py-2
            text-sm
            font-medium
            hover:bg-gray-50
            transition
            cursor-pointer
            "
          >
            Write a Message
          </button>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;