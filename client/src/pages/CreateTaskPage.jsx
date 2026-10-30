import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskForm } from '../components/TaskForm';
import { taskService } from '../services/taskService';
import { Toast } from '../components/Toast';

export const CreateTaskPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const res = await taskService.createTask(formData);
      if (res.success) {
        setToast({ message: 'Task created successfully!', type: 'success' });
        setTimeout(() => {
          navigate('/tasks');
        }, 600);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create task';
      setToast({ message: msg, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        title="Create New Task"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
