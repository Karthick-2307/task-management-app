import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Monitor, Bell, Shield, LogOut, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Settings & Preferences
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Customize your interface, appearance, and account options
        </p>
      </div>

      {/* Theme Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700/60 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Appearance & Theme</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Choose your preferred color theme for the interface
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Light Theme Option */}
          <button
            onClick={() => {
              if (theme !== 'light') toggleTheme();
            }}
            className={`p-4 rounded-2xl border text-left transition flex items-start justify-between ${
              theme === 'light'
                ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 ring-2 ring-indigo-600/20'
                : 'border-gray-200 dark:border-slate-700 hover:border-gray-300'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-sm text-gray-900 dark:text-white">Light Mode</span>
              </div>
              <p className="text-xs text-gray-500">Crisp, bright, high-contrast look</p>
            </div>
            {theme === 'light' && <Check className="w-5 h-5 text-indigo-600" />}
          </button>

          {/* Dark Theme Option */}
          <button
            onClick={() => {
              if (theme !== 'dark') toggleTheme();
            }}
            className={`p-4 rounded-2xl border text-left transition flex items-start justify-between ${
              theme === 'dark'
                ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 ring-2 ring-indigo-600/20'
                : 'border-gray-200 dark:border-slate-700 hover:border-gray-300'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-indigo-400" />
                <span className="font-bold text-sm text-gray-900 dark:text-white">Dark Mode</span>
              </div>
              <p className="text-xs text-gray-400">Easy on the eyes in low light</p>
            </div>
            {theme === 'dark' && <Check className="w-5 h-5 text-indigo-400" />}
          </button>
        </div>
      </div>

      {/* Account Info & Logout */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700/60 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Account Management</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Current active session and identity details
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/50 border border-gray-200/60 dark:border-slate-700/60 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            Active Session
          </span>
        </div>

        <div className="pt-2">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 font-bold text-sm transition"
          >
            <LogOut className="w-4 h-4" />
            Sign Out of Account
          </button>
        </div>
      </div>
    </div>
  );
};
