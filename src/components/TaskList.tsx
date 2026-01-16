import type { Task } from "../pages/tracker/Tracker";
import TaskItem from "./TaskItem";

type Props = {
   title: string;
   tasks: Task[];
   activeTaskId: string | null;
   onSelectTask: (id: string) => void;
   onCompleteTask: (id: string) => void;
   instructions?: string; // optional instructions
};

const TaskList = ({
   title,
   tasks,
   activeTaskId,
   onSelectTask,
   onCompleteTask,
   instructions,
}: Props) => {
   return (
      <div className="task-list">
         <h2>{title}</h2>
         {instructions && <p className="task-instructions">{instructions}</p>}
         <ul id="task-list">
            {tasks.map((task) => (
               <TaskItem
                  key={task.id}
                  task={task}
                  isActive={task.id === activeTaskId}
                  onSelect={() => onSelectTask(task.id)}
                  onComplete={() => onCompleteTask(task.id)}
               />
            ))}
         </ul>
      </div>
   );
};

export default TaskList;
