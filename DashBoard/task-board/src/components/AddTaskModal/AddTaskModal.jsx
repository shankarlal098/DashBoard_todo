import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FiCalendar, FiChevronDown, FiAlertCircle, FiCheck } from "react-icons/fi";
import { addTask, updateTask } from "../../redux/taskSlice";

function AddTaskModal({ task, onClose }) {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "Low");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const priorityOptions = [
    { label: "Low", color: "bg-[#orange-500]", text: "text-orange-600", bg: "bg-orange-50" },
    { label: "Medium", color: "bg-[#blue-500]", text: "text-blue-600", bg: "bg-blue-50" },
    { label: "High", color: "bg-[#red-500]", text: "text-red-600", bg: "bg-red-50" }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (task) {
      dispatch(
        updateTask({
          id: task.id,
          title,
          description,
          priority,
          dueDate,
        })
      );
    } else {
      dispatch(
        addTask({
          id: crypto.randomUUID(),
          title,
          description,
          priority,
          dueDate,
          status: "todo",
          createdAt: Date.now(),
        })
      );
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-[4px] flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div
        className="
        bg-white
        w-full
        max-w-lg
        rounded-[24px]
        p-8
        shadow-[0_20px_50px_rgba(0,0,0,0.15)]
        border
        border-gray-100
        relative
        animate-in fade-in zoom-in-95 duration-200
        "
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#0D062D]">
            {task ? "Edit Task Details" : "Create New Task"}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Assign proper metadata and timelines to ensure scope control.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Design High-Fidelity Wireframes"
              className="
              w-full
              border
              border-gray-200
              rounded-xl
              p-3.5
              text-sm
              text-[#0D062D]
              placeholder-gray-400
              outline-none
              focus:border-[#5030E5]
              focus:ring-4
              focus:ring-[#5030E5]/10
              transition-all
              duration-200
              "
            />
          </div>

          <div>
            <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
              Description
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed breakdown of the required sub-tasks..."
              className="
              w-full
              border
              border-gray-200
              rounded-xl
              p-3.5
              text-sm
              text-[#0D062D]
              placeholder-gray-400
              outline-none
              resize-none
              focus:border-[#5030E5]
              focus:ring-4
              focus:ring-[#5030E5]/10
              transition-all
              duration-200
              "
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="relative" ref={dropdownRef}>
              <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                Priority Level
              </label>
              
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="
                w-full
                border
                border-gray-200
                rounded-xl
                p-3.5
                text-sm
                text-[#0D062D]
                bg-white
                flex
                items-center
                justify-between
                focus:border-[#5030E5]
                focus:ring-4
                focus:ring-[#5030E5]/10
                transition-all
                cursor-pointer
                "
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    priority === "High" ? "bg-red-500" : priority === "Medium" ? "bg-blue-500" : "bg-orange-500"
                  }`} />
                  <span className="font-medium">{priority}</span>
                </div>
                <FiChevronDown className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50 animate-in slide-in-from-top-2 duration-150">
                  {priorityOptions.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => {
                        setPriority(opt.label);
                        setIsDropdownOpen(false);
                      }}
                      className="
                      w-full
                      text-left
                      px-4
                      py-3
                      hover:bg-gray-50
                      text-sm
                      font-medium
                      text-[#0D062D]
                      flex
                      items-center
                      justify-between
                      transition
                      cursor-pointer
                      "
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          opt.label === "High" ? "bg-red-500" : opt.label === "Medium" ? "bg-blue-500" : "bg-orange-500"
                        }`} />
                        <span>{opt.label} Priority</span>
                      </div>
                      {priority === opt.label && <FiCheck className="text-[#5030E5]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                Due Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  p-3.5
                  pl-4
                  text-sm
                  text-[#0D062D]
                  outline-none
                  focus:border-[#5030E5]
                  focus:ring-4
                  focus:ring-[#5030E5]/10
                  transition-all
                  duration-200
                  "
                />
              </div>
            </div>

          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="
              px-6
              py-3
              border
              border-gray-200
              rounded-xl
              text-sm
              font-semibold
              text-gray-500
              hover:bg-gray-50
              hover:text-gray-700
              cursor-pointer
              transition-all
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
              px-6
              py-3
              bg-[#5030E5]
              text-white
              rounded-xl
              text-sm
              font-semibold
              hover:bg-[#4024c7]
              hover:shadow-lg
              hover:shadow-[#5030E5]/20
              cursor-pointer
              transition-all
              "
            >
              {task ? "Save Modifications" : "Add Task to Board"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;