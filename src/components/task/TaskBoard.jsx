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
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(tasks.map((task) => (task.id === newTask.id ? newTask : task)));
    }
    setShowAddModal(false);
  }
  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }
  function handleClose() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }
  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }
  function handleDeleteAll() {
    setTasks([]);
  }
  function handleFavTask(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isFavourite: !task.isFavourite } : task
      )
    );
  }

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddTask}
          taskToUpdate={taskToUpdate}
          onClose={handleClose}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask />
        </div>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setShowAddModal(true)}
            onDeleteAll={handleDeleteAll}
          />
          <TaskLists
            onFav={handleFavTask}
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>
    </section>
  );
}

export default TaskBoard;
