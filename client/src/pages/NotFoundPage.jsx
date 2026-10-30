import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
          <HelpCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-gray-900 dark:text-white">404</h1>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Page Not Found</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            The page you are looking for doesn't exist, was removed, or is temporarily unavailable.
          </p>
        </div>
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};
