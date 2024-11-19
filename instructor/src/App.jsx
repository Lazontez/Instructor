import React, { useState } from 'react';
import LogForm from './components/LogForm';
import TaskList from './components/TaskLists';
import TaskEditModal from './components/TaskEditModal'; // Importing the modal component

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Practice scales', description: 'Practice major scales', status: 'in-progress', progress: 50 },
    { id: 2, name: 'Learn chords', description: 'Learn basic chord progressions', status: 'in-progress', progress: 20 },
  ]);
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [taskToEdit, setTaskToEdit] = useState(null); // State for the task being edited

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]); // Add the new task to the existing array
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId)); // Remove the task from the array
  };

  const openEditModal = (task) => {
    setTaskToEdit(task); // Set the task to edit
    setModalVisible(true); // Show the modal
  };

  const closeEditModal = () => {
    setModalVisible(false); // Hide the modal
    setTaskToEdit(null); // Clear the task to edit
  };

  const handleSaveEdit = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task)); // Update the task
    closeEditModal(); // Close the modal after saving
  };

  const updateTaskProgress = (taskId, newProgress) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, progress: newProgress } : task
    ));
  };

  

  return (
    <div className="app">
      <h1>Guitar Lesson Tracker</h1>
      <LogForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        removeTask={removeTask}
        editTask={openEditModal}
        setTasks={setTasks}
        updateTaskProgress={updateTaskProgress}
         // Pass the openEditModal function
      />

      {/* Edit Task Modal */}
      {modalVisible && taskToEdit && (
        <TaskEditModal
          isOpen={modalVisible}
          task={taskToEdit}
          onSave={handleSaveEdit}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
}

export default App;

