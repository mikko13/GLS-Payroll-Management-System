import React from "react";
import { AlertCircle } from "lucide-react";
import { TaskProps } from "./types";

type TaskItemProps = TaskProps

const TaskItem: React.FC<TaskItemProps> = ({ task, deadline, priority }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-start">
        <div
          className={`mt-1 mr-3 flex-shrink-0 w-2 h-2 rounded-full ${getPriorityColor(
            priority
          )}`}
        ></div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-800">{task}</h3>
          <div className="flex items-center mt-1">
            <AlertCircle size={14} className="text-gray-400 mr-1" />
            <span className="text-xs text-gray-500">Due: {deadline}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PendingTasksListProps {
  tasks: TaskProps[];
}

const PendingTasksList: React.FC<PendingTasksListProps> = ({ tasks }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-100">
      <div className="px-6 py-4 border-b border-blue-100">
        <h2 className="text-lg font-medium text-blue-800">Pending Tasks</h2>
      </div>
      <div className="p-6">
        {tasks.map((task, index) => (
          <TaskItem key={index} {...task} />
        ))}
      </div>
    </div>
  );
};

export default PendingTasksList;