import { useState } from "react";
import { useSelector } from "react-redux";
import { FiFilter, FiCalendar, FiChevronDown, FiPlus, FiLink, FiEdit3 } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";

import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import Board from "../components/Board/Board";
import AddTaskModal from "../components/AddTaskModal/AddTaskModal";

function Dashboard() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterPriority, setFilterPriority] = useState("All");
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

  const tasks = useSelector((state) => state.tasks.tasks);

  const overdueTasks = tasks.filter(
    (task) =>
      task.status !== "done" &&
      task.dueDate &&
      new Date(task.dueDate) < new Date()
  );

  const priorityOptions = ["All", "Low", "Medium", "High"];

  const avatars = [
    { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60", alt: "User 1" },
    { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60", alt: "User 2" },
    { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60", alt: "User 3" },
    { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60", alt: "User 4" },
  ];

  return (
    <div className="flex min-h-screen bg-white font-sans antialiased text-[#0D062D]">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden border-l border-[#E0E0E0]">
        <Topbar />

        <div className="flex-1 overflow-y-auto px-6 py-10 lg:px-12">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl md:text-[48px] font-bold tracking-tight text-[#0D062D]">
                Mobile App
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <button className="p-1.5 bg-[#5030E5]/10 text-[#5030E5] rounded-lg hover:bg-[#5030E5]/20 transition cursor-pointer">
                  <FiEdit3 size={16} />
                </button>
                <button className="p-1.5 bg-[#5030E5]/10 text-[#5030E5] rounded-lg hover:bg-[#5030E5]/20 transition cursor-pointer">
                  <FiLink size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 self-start sm:self-center">
              <div className="flex items-center gap-2">
                <button className="text-[#5030E5] font-semibold text-sm flex items-center gap-1 hover:opacity-80 transition cursor-pointer">
                  <span className="text-lg font-bold">+</span> Invite
                </button>
                <div className="flex -space-x-2 overflow-hidden">
                  {avatars.map((avatar, idx) => (
                    <img
                      key={idx}
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src={avatar.src}
                      alt={avatar.alt}
                    />
                  ))}
                  <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-[#FFECEE] text-[#D25B68] text-xs font-semibold">
                    +2
                  </div>
                </div>
              </div>

              <div className="h-6 w-[1px] bg-gray-200 hidden sm:block" />

              <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition flex items-center gap-2 cursor-pointer shadow-sm">
                Share
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <button
                  onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                  className="bg-white border border-gray-300 px-4 py-2.5 rounded-xl text-gray-500 font-medium text-sm flex items-center gap-2 hover:bg-gray-50 transition cursor-pointer"
                >
                  <FiFilter className="text-gray-400" size={16} />
                  <span>{filterPriority === "All" ? "Filter" : `${filterPriority} Only`}</span>
                  <FiChevronDown className="text-gray-400" size={14} />
                </button>
                {showPriorityDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50">
                    {priorityOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setFilterPriority(opt);
                          setShowPriorityDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium text-[#0D062D] transition cursor-pointer"
                      >
                        {opt === "All" ? "All Priorities" : `${opt} Priority`}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="bg-white border border-gray-300 px-4 py-2.5 rounded-xl text-gray-500 font-medium text-sm flex items-center gap-2 hover:bg-gray-50 transition cursor-pointer">
                <FiCalendar className="text-gray-400" size={16} />
                <span>Today</span>
                <FiChevronDown className="text-gray-400" size={14} />
              </button>
            </div>
          </div>

          {overdueTasks.length > 0 && (
            <div className="mb-8 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl font-medium text-sm flex items-center gap-3 shadow-sm">
              <span className="text-lg">⚠️</span>
              <div>
                <span className="font-bold">Overdue Alert:</span> You have {overdueTasks.length} task(s) currently running behind schedule.
              </div>
            </div>
          )}

          <div className="w-full">
            <Board
              onOpenAddTaskModal={() => setIsAddTaskOpen(true)}
              onEditTask={(task) => setEditingTask(task)}
              filterPriority={filterPriority}
            />
          </div>

          {isAddTaskOpen && (
            <AddTaskModal
              task={null}
              onClose={() => setIsAddTaskOpen(false)}
            />
          )}

          {editingTask && (
            <AddTaskModal
              task={editingTask}
              onClose={() => setEditingTask(null)}
            />
          )}

        </div>
      </main>
    </div>
  );
}

export default Dashboard;