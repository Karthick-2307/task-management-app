import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Zap,
  Shield,
  Layers,
  ArrowRight,
  Clock,
  Sparkles,
  BarChart3,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Zap,
      title: 'Effortless CRUD & Fast Tracking',
      description:
        'Create, organize, and update your tasks with intuitive forms, smart priorities, and deadlines.',
    },
    {
      icon: Layers,
      title: 'Smart Categorization & Search',
      description:
        'Filter seamlessly by status, priority, or category, and search tasks in real-time with instant feedback.',
    },
    {
      icon: BarChart3,
      title: 'Actionable Visual Dashboard',
      description:
        'Gain immediate clarity with interactive statistic cards, completion progress bars, and overdue alerts.',
    },
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      description:
        'Guaranteed data privacy with bcrypt salted hashing, JSON Web Tokens (JWT), and isolated user spaces.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold tracking-wide uppercase mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Empowering Productive Teams & Individuals
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
            Master your workflow with effortless{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
              task management.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Organize personal projects, balance priorities, and conquer your daily goals with TaskFlow—the fast, modern, full-stack productivity suite.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
              >
                Go to Your Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  Start For Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-slate-700 font-semibold text-base shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                >
                  Sign In to Account
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-0" />
      </section>

      {/* Feature Section */}
      <section className="py-16 bg-white dark:bg-slate-900/60 border-y border-gray-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Everything you need to get things done
            </h2>
            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
              Built using React, Vite, Node.js, Express, MongoDB, and Tailwind CSS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-gray-50 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights / CTA Banner */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-tr from-indigo-700 to-indigo-500 text-white p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to take control of your day?</h3>
              <p className="text-indigo-100 text-sm sm:text-base max-w-lg">
                Create tasks, assign deadlines, categorize work, and monitor your personal completion rate.
              </p>
            </div>
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-2xl bg-white text-indigo-600 font-bold text-base hover:bg-indigo-50 shadow-lg shadow-black/10 transition flex-shrink-0"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
