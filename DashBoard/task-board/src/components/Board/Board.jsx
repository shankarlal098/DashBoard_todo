import Column from "../Column/Column";

function Board({
  onOpenAddTaskModal, onEditTask , filterPriority
}) {
  return (
    <div
      className="
      grid
      grid-cols-1
      lg:grid-cols-3
      gap-6
      "
    >
    <Column
      title="To Do"
      color="#5030E5"
      status="todo"
      onOpenAddTaskModal={onOpenAddTaskModal}
      onEditTask={onEditTask}
      filterPriority={filterPriority}
    />

    <Column
      title="On Progress"
      color="#FFA500"
      status="inprogress"
      onEditTask={onEditTask}
      filterPriority={filterPriority}
    />

    <Column
      title="Done"
      color="#8BC48A"
      status="done"
      onEditTask={onEditTask}
      filterPriority={filterPriority}
    />
    </div>
  );
}

export default Board;