import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskLists from "./TaskLists";
import AddTaskModal from "./AddTaskModal";

function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learning React",
    description: "Learning like this really helpful and clear for a developer",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavourite: true,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);

  function handleAddTask(newTask) {
    setTasks([...tasks, newTask]);
    setShowAddModal(false);
  }

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && <AddTaskModal onSave={handleAddTask} />}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask />
        </div>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions onAddClick={() => setShowAddModal(true)} />
          <TaskLists tasks={tasks} />
        </div>
      </div>
    </section>
  );
}

export default TaskBoard;
