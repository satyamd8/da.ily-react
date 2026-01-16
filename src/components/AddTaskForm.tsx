import { useState } from "react";
import type { Task } from "../pages/tracker/Tracker";

type Props = {
   onAddTask: (task: Task) => void;
};

const AddTaskForm = ({ onAddTask }: Props) => {
   const [name, setName] = useState("");
   const [type, setType] = useState<"class" | "club">("class");
   const [category, setCategory] = useState("");

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!name || !category) return;

      onAddTask({
         id: crypto.randomUUID(),
         name,
         type,
         category,
         completed: false,
         totalSeconds: 0
      });

      setName("");
      setCategory("");
   };

   return (
      <div className="add-task" onSubmit={handleSubmit}>
         <h2>Add New Task</h2>

         <form id="task-form">
            <input
               placeholder="Task name..."
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value as any)}>
               <option value="class">Class</option>
               <option value="club">Club</option>
            </select>
            <input
               placeholder="e.g. CSCI 39548"
               value={category}
               onChange={(e) => setCategory(e.target.value)}
            />
            <button type="submit">Add Task</button>
         </form>
      </div>
   );
};

export default AddTaskForm;
