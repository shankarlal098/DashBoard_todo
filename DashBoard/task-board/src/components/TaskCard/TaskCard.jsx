import { useState, useRef, useEffect } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FiMessageSquare, FiFolder, FiCalendar, FiEdit2, FiTrash2, FiArrowRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { moveTask, deleteTask } from "../../redux/taskSlice";

function TaskCard({ task, onEditTask }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  const isOverdue =
    task?.dueDate &&
    task.status !== "done" &&
    new Date(task.dueDate) < new Date();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = () => {
    if (window.confirm("Delete this task permanently from the workspace?")) {
      dispatch(deleteTask(task.id));
    }
    setShowMenu(false);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const getPriorityStyles = () => {
    if (task.status === "done") {
      return "bg-[#E6F4EA] text-[#68B266]";
    }
    switch (task.priority) {
      case "High":
        return "bg-[#FDF2F2] text-[#D8727D]";
      case "Medium":
        return "bg-[#FFF9EC] text-[#E4A11B]";
      case "Low":
      default:
        return "bg-[#F0ECFC] text-[#787486]";
    }
  };

  return (
    <div
      draggable="true" 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`
      bg-white
      rounded-[16px]
      p-5
      shadow-[0_2px_4px_rgba(0,0,0,0.02)]
      hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)]
      border
      border-transparent
      hover:border-gray-100
      flex
      flex-col
      relative
      group
      cursor-grab
      active:cursor-grabbing
      transition-all
      duration-300
      ${
        isDragging 
          ? "opacity-50 scale-95 border-dashed border-gray-300 shadow-none bg-gray-50/50" 
          : "opacity-100"
      }
      `}
    >
      <div className="flex justify-between items-center mb-3">
        <span className={`px-2.5 py-1 rounded-[4px] text-[12px] font-medium capitalize ${getPriorityStyles()}`}>
          {task.status === "done" ? "Completed" : task.priority}
        </span>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-[#787486] rounded-lg hover:bg-gray-100 hover:text-[#0D062D] transition cursor-pointer"
          >
            <HiOutlineDotsHorizontal size={20} />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-7 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden w-36 z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-100">
              <button
                onClick={() => {
                  onEditTask(task);
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2.5 text-xs font-medium text-[#0D062D] hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              >
                <FiEdit2 className="text-gray-400" size={14} />
                Edit Details
              </button>

              <button
                onClick={handleDelete}
                className="w-full text-left px-4 py-2.5 text-xs font-medium text-red-500 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
              >
                <FiTrash2 size={14} />
                Delete Task
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="font-semibold text-[18px] text-[#0D062D] leading-snug mb-1 tracking-tight">
        {task.title}
      </h3>

      <p className="text-[#787486] text-[12px] leading-relaxed mb-4 break-words line-clamp-3">
        {task.description || "No description provided for this task."}
      </p>

      {task.dueDate && (
        <div className="mb-4">
          <span
            className={`
            inline-flex
            items-center
            gap-1.5
            text-[11px]
            font-medium
            px-2.5
            py-1
            rounded-md
            ${isOverdue ? "bg-red-50 text-red-600 font-semibold" : "bg-gray-50 text-[#787486]"}
            `}
          >
            <FiCalendar size={12} />
            <span>{task.dueDate}</span>
            {isOverdue && <span className="text-[10px] uppercase tracking-wider pl-1 font-bold animate-pulse">(Overdue)</span>}
          </span>
        </div>
      )}

      <div className="w-full h-[1px] bg-gray-100 my-1 mb-4" />

      <div className="flex items-center justify-between mt-auto gap-2">
        <div className="flex items-center gap-3 text-[#787486]">
          <div className="flex items-center gap-1 text-[12px] hover:text-[#5030E5] transition cursor-default">
            <FiMessageSquare size={14} />
            <span className="font-medium text-xs">4</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] hover:text-[#5030E5] transition cursor-default">
            <FiFolder size={14} />
            <span className="font-medium text-xs">2</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-1 transition-all">
        {task.status === "todo" && (
          <button
            onClick={() => dispatch(moveTask({ id: task.id, newStatus: "inprogress" }))}
            className="w-full py-2 text-xs font-semibold rounded-xl border border-gray-200 text-gray-600 hover:border-[#5030E5] hover:text-[#5030E5] hover:bg-[#5030E5]/5 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Start Progress</span>
            <FiArrowRight size={12} />
          </button>
        )}

        {task.status === "inprogress" && (
          <button
            onClick={() => dispatch(moveTask({ id: task.id, newStatus: "done" }))}
            className="w-full py-2 text-xs font-semibold rounded-xl border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-600 hover:bg-green-50 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Mark Completed</span>
            <FiArrowRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskCard;