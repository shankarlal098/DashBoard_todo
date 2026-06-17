import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus } from "react-icons/fi";
import { moveTask } from "../../redux/taskSlice";
import TaskCard from "../TaskCard/TaskCard";

function Column({
  title,
  color,
  status,
  onOpenAddTaskModal,
  onEditTask,
  filterPriority,
}) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  
  const [isOver, setIsOver] = useState(false);

  const columnTasks = tasks.filter(
    (task) =>
      task.status === status &&
      (filterPriority === "All" || task.priority === filterPriority)
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isOver) setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    
    const taskId = e.dataTransfer.getData("text/plain");
    
    if (taskId) {
      dispatch(
        moveTask({
          id: taskId,
          newStatus: status, 
        })
      );
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
      rounded-[20px]
      p-5
      h-fit
      min-h-[600px]
      w-full
      flex
      flex-col
      transition-all
      duration-300
      ${
        isOver 
          ? "bg-[#EAEAEA] border-2 border-dashed border-[#5030E5]/30 scale-[1.01] shadow-inner" 
          : "bg-[#F5F5F5] border-2 border-transparent"
      }
      `}
    >
      <div className="mb-4">
        <div className="flex items-center gap-2.5">
          {/* Status color dot indicator */}
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: color,
            }}
          />

          <h2 className="font-semibold text-[#0D062D] text-[16px] tracking-tight">
            {title}
          </h2>

          <span className="bg-[#E0E0E0] text-[#625F6E] text-[12px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
            {columnTasks.length}
          </span>

          {status === "todo" && (
            <button
              onClick={onOpenAddTaskModal}
              className="ml-auto w-6 h-6 rounded-[6px] bg-[#5030E5]/10 text-[#5030E5] flex items-center justify-center hover:bg-[#5030E5] hover:text-white transition-all duration-200 cursor-pointer"
            >
              <FiPlus size={16} />
            </button>
          )}
        </div>

        <div
          className="h-[3px] mt-5 rounded-full"
          style={{
            backgroundColor: color,
          }}
        />
      </div>

      <div className="space-y-5 mt-2 flex-1">
        {columnTasks.length > 0 ? (
          columnTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEditTask={onEditTask}
            />
          ))
        ) : (
          <div className="bg-white/40 rounded-2xl border border-dashed border-gray-200 py-12 px-4 text-center text-xs font-medium text-[#787486] transition-all">
            No active assignments found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Column;