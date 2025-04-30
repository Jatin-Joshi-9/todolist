"use client";
import React, { useState } from "react";
import { FaTrash, FaRocket, FaPlus } from "react-icons/fa";

const Page = () => {
  const [mainTask, setMainTask] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Function to handle form submission
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    if (!title || !desc) return; // Ensure both title and description are provided

    const newTask = {
      id: Date.now(), // Unique ID for the task
      title,
      desc,
    };

    setMainTask((prevTasks) => [...prevTasks, newTask]); // Add the new task to the list
    setTitle(""); // Clear the title input
    setDesc(""); // Clear the description input
  };

  // Function to handle task deletion
  const deleteHandler = (id) => {
    setIsDeleting(true);
    setTimeout(() => {
      setMainTask((prevTasks) => prevTasks.filter((task) => task.id !== id));
      setIsDeleting(false);
    }, 300); // Add a delay for animation
  };

  return (
    <div className="cosmic-app min-h-screen">
      <div className="cosmic-bg">
        <div className="particles"></div>
      </div>

      <header className="app-header text-center py-8">
        <h1 className="text-5xl font-bold mb-4">
          <span className="gradient-text">Cosmic Task Master 3000</span>
        </h1>
      </header>

      <div className="app-body max-w-4xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="task-form bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-8 shadow-2xl mb-12"
        >
          <div className="input-group mb-6">
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="cosmic-input w-full p-4 bg-white text-black border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          <div className="input-group mb-8">
            <input
              type="text"
              placeholder="Task Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="cosmic-input w-full p-4 bg-white text-black border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          <button
            type="submit"
            className="add-btn w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all flex items-center justify-center gap-2"
          >
            <FaPlus className="text-xl" /> Launch Task
          </button>
        </form>

        <ul className="task-list space-y-6">
          {mainTask.length ? (
            mainTask.map((task) => (
              <li
                key={task.id}
                className={`task-card ${
                  isDeleting ? "shake" : ""
                } flex justify-between items-center`}
              >
                <div className="task-content">
                  <h3 className="task-title">{task.title}</h3>
                  <p className="task-desc">{task.desc}</p>
                </div>
                <button
                  onClick={() => deleteHandler(task.id)}
                  className="delete-btn ml-4"
                >
                  <FaTrash /> Purge
                </button>
              </li>
            ))
          ) : (
            <div className="empty-state">
              <FaRocket className="rocket-icon" />
              <h2>Mission Control Ready!</h2>
              <p>Add your first cosmic task</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Page;