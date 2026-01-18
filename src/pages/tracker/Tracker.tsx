import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Stopwatch from "../../components/Stopwatch";
import AddTaskForm from "../../components/AddTaskForm";
import TaskList from "../../components/TaskList";
import "./tracker.css";

export type Task = {
   id: string;
   name: string;
   type: "class" | "club";
   category: string;
   completed: boolean;
   totalSeconds: number;
};

const Tracker = () => {
   const [tasks, setTasks] = useState<Task[]>([]);
   const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

   useEffect(() => {
         document.title = "da.ily | Tracker"
      }, []);

   // task handling

   const addTask = (task: Task) => {
      setTasks((prev) => [...prev, task]);
   };

   const selectTask = (id: string) => {
      setActiveTaskId(id);
   };

   const completeTask = (id: string) => {
      setTasks((prev) =>
         prev.map((t) => (t.id === id ? { ...t, completed: true } : t))
      );
      if (activeTaskId === id) setActiveTaskId(null);
   };

   // stopwatch

   const handleStopwatchStop = (seconds: number) => {
      if (!activeTaskId || seconds === 0) return;

      setTasks((prev) =>
         prev.map((task) =>
            task.id === activeTaskId
               ? { ...task, totalSeconds: task.totalSeconds + seconds }
               : task
         )
      );
   };

   // return

   const activeTasks = tasks.filter((t) => !t.completed);
   const finishedTasks = tasks.filter((t) => t.completed);

   return (
      <div className="tracker-page">
         <header>
            <h3>da.ily</h3>
            <Navbar />
         </header>

         <main className="tracker">
            <section className="tracking-container">
               <Stopwatch
                  disabled={!activeTaskId}
                  onStop={handleStopwatchStop}
               />

               <AddTaskForm
                  onAddTask={(task) => addTask({ ...task, totalSeconds: 0 })}
               />
            </section>

            <section className="task-lists">
               <TaskList
                  title="Upcoming Tasks"
                  tasks={activeTasks}
                  activeTaskId={activeTaskId}
                  onSelectTask={selectTask}
                  onCompleteTask={completeTask}
                  instructions="Click on a task to time it. Double-click to mark as finished!"
               />

               <TaskList
                  title="Finished Tasks"
                  tasks={finishedTasks}
                  activeTaskId={null}
                  onSelectTask={() => {}}
                  onCompleteTask={() => {}}
               />
            </section>
         </main>
      </div>
   );
};

export default Tracker;
