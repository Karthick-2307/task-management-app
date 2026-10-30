import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckSquare,
  Clock,
  AlertCircle,
  TrendingUp,
  Plus,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/taskService';
import { StatCard } from '../components/StatCard';
import { TaskCard } from '../components/TaskCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { Toast } from '../components/Toast';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delete modal state
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await taskService.getTaskStats();
      if (res.success && res.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
      setError('Unable to load dashboard metrics. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskService.updateTask(taskId, { status: newStatus });
      setToast({ message: `Task marked as ${newStatus}`, type: 'success' });
      fetchStats();
    } catch (err) {
      setToast({ message: 'Failed to update task status', type: 'error' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return;
    setIsDeleting(true);
    try {
      await taskService.deleteTask(taskToDelete._id);
      setToast({ message: 'Task deleted successfully', type: 'success' });
      setTaskToDelete(null);
      fetchStats();
    } catch (err) {
      setToast({ message: 'Failed to delete task', type: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading dashboard metrics..." size="lg" />;
  }

  const {
    totalTasks = 0,
    pendingTasks = 0,
    inProgressTasks = 0,
    completedTasks = 0,
    overdueTasks = 0,
    completionRate = 0,
    recentTasks = [],
  } = stats || {};

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'success' })}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"?`}
      />

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-500 p-6 sm:p-8 text-white shadow-xl shadow-indigo-500/10">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm">
              Today's Overview
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Friend'}! 👋
            </h1>
            <p className="text-indigo-100 text-sm sm:text-base max-w-xl">
              You've completed {completedTasks} out of {totalTasks} tasks. Keep up the great momentum!
            </p>
          </div>

          <Link
            to="/tasks/create"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-indigo-700 font-bold text-sm shadow-md hover:bg-indigo-50 transition transform hover:-translate-y-0.5 flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            Create New Task
          </Link>
        </div>

        {/* Decorative circle glow */}
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          icon={CheckSquare}
          color="indigo"
          subtitle="All tasks logged"
        />
        <StatCard
          title="Pending"
          value={pendingTasks}
          icon={Clock}
          color="amber"
          subtitle="Awaiting start"
        />
        <StatCard
          title="In Progress"
          value={inProgressTasks}
          icon={Layers}
          color="blue"
          subtitle="Currently active"
        />
        <StatCard
          title="Completed"
          value={completedTasks}
          icon={CheckCircle2}
          color="emerald"
          subtitle="Successfully done"
        />
        <StatCard
          title="Overdue"
          value={overdueTasks}
          icon={AlertCircle}
          color="rose"
          subtitle="Passed deadline"
        />
      </div>

      {/* Progress & Quick Stats Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700/60 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Overall Task Completion Rate
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Track your productivity efficiency across all created tasks
            </p>
          </div>
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
            {completionRate}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Recent Tasks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Tasks</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Latest items created or assigned to your workspace
            </p>
          </div>
          <Link
            to="/tasks"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition"
          >
            View All Tasks
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentTasks.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center border border-gray-100 dark:border-slate-700/60 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No tasks yet</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
              Create your very first task and start boosting your productivity today!
            </p>
            <Link
              to="/tasks/create"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-500/20 transition"
            >
              <Plus className="w-4 h-4" />
              Create Task
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDeleteClick={(t) => setTaskToDelete(t)}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
