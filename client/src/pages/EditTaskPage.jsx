import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TaskForm } from '../components/TaskForm';
import { taskService } from '../services/taskService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Toast } from '../components/Toast';

export const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const res = await taskService.getTaskById(id);
        if (res.success && res.data) {
          setTaskData(res.data);
        }
      } catch (err) {
        setToast({ message: 'Failed to load task details', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const res = await taskService.updateTask(id, formData);
      if (res.success) {
        setToast({ message: 'Task updated successfully!', type: 'success' });
        setTimeout(() => {
          navigate('/tasks');
        }, 600);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update task';
      setToast({ message: msg, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading task details..." size="lg" />;
  }

  if (!taskData) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Task Not Found</h3>
        <p className="text-sm text-gray-500 mt-2">The task you are looking for does not exist or has been deleted.</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'success' })}
        />
      )}

      <TaskForm
        title="Edit Task"
        initialData={taskData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
