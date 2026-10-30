import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Edit2, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PriorityBadge, StatusBadge, CategoryBadge } from './Badge';
import { formatDate, isOverdue } from '../utils/formatters';

export const TaskCard = ({ task, onDeleteClick, onStatusChange }) => {
  const overdue = isOverdue(task.dueDate, task.status);

  const handleStatusToggle = () => {
    if (!onStatusChange) return;
    const nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    onStatusChange(task._id, nextStatus);
  };

  return (
    <div
      className={`group relative bg-white dark:bg-slate-800 rounded-2xl p-5 border transition-all duration-200 hover:shadow-lg ${
        overdue
          ? 'border-rose-300 dark:border-rose-900/60 shadow-rose-500/5'
          : 'border-gray-100 dark:border-slate-700/60 hover:border-indigo-200 dark:hover:border-indigo-900/50'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Completion checkbox & title */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button
            onClick={handleStatusToggle}
            title={task.status === 'Completed' ? 'Mark as Pending' : 'Mark as Completed'}
            className="mt-0.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            {task.status === 'Completed' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50 dark:fill-emerald-950/40" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-slate-600 group-hover:border-indigo-500 transition-colors" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h4
              className={`text-base font-semibold truncate ${
                task.status === 'Completed'
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {task.title}
            </h4>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <CategoryBadge category={task.category} />
              <PriorityBadge priority={task.priority} />
              <StatusBadge status={task.status} />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <Link
            to={`/tasks/edit/${task._id}`}
            title="Edit Task"
            className="p-1.5 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-slate-700 transition"
          >
            <Edit2 className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDeleteClick(task)}
            title="Delete Task"
            className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:text-gray-400 dark:hover:text-rose-400 dark:hover:bg-slate-700 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Footer Info: Due Date, Overdue notice, Created date */}
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-2">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 font-medium ${
              overdue
                ? 'text-rose-600 dark:text-rose-400 font-semibold'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {overdue ? <AlertCircle className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
            <span>{formatDate(task.dueDate)}</span>
            {overdue && <span className="text-[10px] uppercase tracking-wide bg-rose-100 dark:bg-rose-950/60 px-1.5 py-0.5 rounded font-bold">Overdue</span>}
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500">
          <Clock className="w-3 h-3" />
          <span>Added {formatDate(task.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};
