import type { Task } from "../pages/tracker/Tracker";

type Props = {
   task: Task;
   isActive: boolean;
   onSelect: () => void;
   onComplete: () => void;
};

const TaskItem = ({ task, isActive, onSelect, onComplete}: Props) => {
   return (
      <li
         className={`task-item ${isActive ? "active-task" : ""}`}
         onClick={onSelect}
         onDoubleClick={onComplete}
      >
         {task.name} ({task.type}: {task.category})
      </li>
   );
};

export default TaskItem;
