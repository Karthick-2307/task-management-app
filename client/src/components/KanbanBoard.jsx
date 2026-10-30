import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Plus, Edit2, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { PriorityBadge, CategoryBadge } from './Badge';
import { formatDate, isOverdue } from '../utils/formatters';

export const KanbanBoard = ({ tasks, onStatusChange, onDeleteClick }) => {
  const columns = [
    {
      id: 'Pending',
      title: 'Pending',
      color: 'border-t-amber-500',
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      id: 'In Progress',
      title: 'In Progress',
      color: 'border-t-indigo-500',
      bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    },
    {
      id: 'Completed',
      title: 'Completed',
      color: 'border-t-emerald-500',
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {columns.map((column) => {
        const columnTasks = tasks.filter((t) => t.status === column.id);

        return (
          <div
            key={column.id}
            className={`bg-gray-100/70 dark:bg-slate-900/40 rounded-2xl p-4 border border-gray-200/60 dark:border-slate-800 border-t-4 ${column.color}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{column.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${column.bg}`}>
                  {columnTasks.length}
                </span>
              </div>
              <Link
                to="/tasks/create"
                className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition"
              >
                <Plus className="w-4 h-4" />
              </Link>
            </div>

            {/* Task Cards */}
            <div className="space-y-3 min-h-[150px]">
              {columnTasks.length === 0 ? (
                <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-xl text-xs text-gray-400">
                  No tasks here
                </div>
              ) : (
                columnTasks.map((task) => {
                  const overdue = isOverdue(task.dueDate, task.status);
                  return (
                    <div
                      key={task._id}
                      className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow transition"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white leading-snug">
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-1">
                          <Link
                            to={`/tasks/edit/${task._id}`}
                            className="p-1 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => onDeleteClick(task)}
                            className="p-1 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {task.description && (
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-1.5 mt-3">
                        <PriorityBadge priority={task.priority} />
                        <CategoryBadge category={task.category} />
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                        <div
                          className={`flex items-center gap-1 ${
                            overdue
                              ? 'text-rose-600 dark:text-rose-400 font-semibold'
                              : 'text-gray-400 dark:text-gray-500'
                          }`}
                        >
                          {overdue ? <AlertCircle className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
                          <span>{formatDate(task.dueDate)}</span>
                        </div>

                        {/* Move status dropdown */}
                        <select
                          value={task.status}
                          onChange={(e) => onStatusChange(task._id, e.target.value)}
                          className="text-[11px] font-medium bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-md px-1.5 py-0.5 text-gray-600 dark:text-gray-300 focus:outline-none"
                        >
                          <option value="Pending">Move: Pending</option>
                          <option value="In Progress">Move: In Progress</option>
                          <option value="Completed">Move: Completed</option>
                        </select>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
