'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useProjects } from '@/context/ProjectsContext';

const ADMIN_PASSWORD = 'dmon'; // In production, use env vars or better auth

const CATEGORIES = [
  'SaaS Platform',
  'Web3 / DeFi',
  '3D Engine / WebGL',
  'AI / ML Platform',
  'Creative / Interactive',
  'Graphics / Tool',
  'Mobile App',
  'E-Commerce',
  'Other',
];

const GRADIENTS = [
  'from-blue-600/20 to-purple-600/20',
  'from-purple-600/20 to-pink-600/20',
  'from-cyan-600/20 to-blue-600/20',
  'from-pink-600/20 to-orange-600/20',
  'from-green-600/20 to-teal-600/20',
  'from-amber-600/20 to-green-600/20',
  'from-red-600/20 to-orange-600/20',
  'from-indigo-600/20 to-blue-600/20',
];

const ACCENTS = [
  '#00d4ff', '#7c3aed', '#06b6d4', '#ec4899',
  '#10b981', '#f59e0b', '#ef4444', '#6366f1',
];

const EMOJIS = ['🌌', '💎', '🎮', '🌆', '🤖', '🏔️', '🚀', '⚡', '🔥', '💻', '📱', '🎯'];

const EMPTY_PROJECT = {
  title: '',
  category: 'SaaS Platform',
  description: '',
  longDesc: '',
  image: '🚀',
  gradient: GRADIENTS[0],
  accent: ACCENTS[0],
  tech: '',
  links: { live: '', github: '' },
  metrics: '',
};

export default function AdminPage() {
  const { projects, addProject, updateProject, deleteProject, resetToDefault } = useProjects();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState(EMPTY_PROJECT);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [activeTab, setActiveTab] = useState('list'); // list | add | preview

  useEffect(() => {
    const stored = sessionStorage.getItem('admin-auth');
    if (stored === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin-auth', 'true');
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin-auth');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      ...form,
      tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean),
      metrics: form.metrics.split(',').map((m) => m.trim()).filter(Boolean),
    };

    if (editingProject) {
      updateProject(editingProject.id, projectData);
      setEditingProject(null);
    } else {
      addProject(projectData);
    }
    setForm(EMPTY_PROJECT);
    setActiveTab('list');
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setForm({
      ...project,
      tech: project.tech.join(', '),
      metrics: project.metrics.join(', '),
    });
    setActiveTab('add');
  };

  const handleDelete = (id) => {
    deleteProject(id);
    setShowDeleteConfirm(null);
  };

  const handleCancel = () => {
    setEditingProject(null);
    setForm(EMPTY_PROJECT);
    setActiveTab('list');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-3xl glass border border-white/10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h1
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Admin Panel
            </h1>
            <p className="text-sm text-white/40" style={{ fontFamily: 'var(--font-body)' }}>
              Enter password to manage projects
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-white/10 text-white text-sm outline-none focus:border-neon-blue/60 transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
              />
            </div>
            {error && (
              <p className="text-xs text-red-400" style={{ fontFamily: 'var(--font-mono)' }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-white/30 hover:text-neon-blue transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              ← Back to site
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 flex items-center justify-center">
              <span className="text-lg">⚡</span>
            </div>
            <div>
              <h1
                className="text-lg font-bold text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Admin Panel
              </h1>
              <p className="text-xs text-white/30" style={{ fontFamily: 'var(--font-mono)' }}>
                Manage your portfolio projects
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs rounded-lg glass border border-white/10 text-white/60 hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              View Site →
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-xs rounded-lg glass border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'list', label: 'All Projects', count: projects.length },
            { id: 'add', label: editingProject ? 'Edit Project' : 'Add Project' },
            { id: 'preview', label: 'Live Preview' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs rounded-lg border transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-neon-blue/20 border-neon-blue/50 text-neon-blue'
                  : 'glass border-white/10 text-white/40 hover:text-white hover:border-white/20'
              }`}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-2 px-1.5 py-0.5 rounded bg-white/10 text-white/60 text-[10px]">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {projects.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-white/30 text-sm mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                    No projects yet. Add your first project!
                  </p>
                  <button
                    onClick={() => setActiveTab('add')}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white text-sm font-semibold"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Add Project
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 sm:p-6 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                          style={{
                            background: `${project.accent}15`,
                            border: `1px solid ${project.accent}30`,
                          }}
                        >
                          {project.image}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3
                              className="text-base font-bold text-white truncate"
                              style={{ fontFamily: 'var(--font-display)' }}
                            >
                              {project.title}
                            </h3>
                            <span
                              className="px-2 py-0.5 text-[10px] rounded-full"
                              style={{
                                background: `${project.accent}15`,
                                color: project.accent,
                                border: `1px solid ${project.accent}30`,
                                fontFamily: 'var(--font-mono)',
                              }}
                            >
                              {project.category}
                            </span>
                          </div>
                          <p
                            className="text-xs text-white/40 truncate"
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            {project.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleEdit(project)}
                            className="px-3 py-2 text-xs rounded-lg glass border border-neon-blue/20 text-neon-blue hover:bg-neon-blue/10 transition-colors"
                            style={{ fontFamily: 'var(--font-mono)' }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(project.id)}
                            className="px-3 py-2 text-xs rounded-lg glass border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
                            style={{ fontFamily: 'var(--font-mono)' }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab('add')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  + Add New Project
                </button>
                <button
                  onClick={() => {
                    if (confirm('Reset all projects to default? This cannot be undone.')) {
                      resetToDefault();
                    }
                  }}
                  className="px-6 py-3 rounded-xl glass border border-white/10 text-white/40 text-sm hover:text-white hover:border-white/20 transition-all"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Reset to Default
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'add' && (
            <motion.div
              key="add"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-3xl"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-white/40 mb-2 block" style={{ fontFamily: 'var(--font-mono)' }}>
                      Project Title *
                    </label>
                    <input
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-white/10 text-white text-sm outline-none focus:border-neon-blue/60 transition-colors"
                      style={{ fontFamily: 'var(--font-body)' }}
                      placeholder="e.g. Nebula Dashboard"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-2 block" style={{ fontFamily: 'var(--font-mono)' }}>
                      Category *
                    </label>
                    <select
                      required
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-white/10 text-white text-sm outline-none focus:border-neon-blue/60 transition-colors"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/40 mb-2 block" style={{ fontFamily: 'var(--font-mono)' }}>
                    Short Description *
                  </label>
                  <input
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-white/10 text-white text-sm outline-none focus:border-neon-blue/60 transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                    placeholder="Brief description for the card..."
                  />
                </div>

                <div>
                  <label className="text-xs text-white/40 mb-2 block" style={{ fontFamily: 'var(--font-mono)' }}>
                    Long Description
                  </label>
                  <textarea
                    value={form.longDesc}
                    onChange={(e) => setForm({ ...form, longDesc: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-white/10 text-white text-sm outline-none focus:border-neon-blue/60 transition-colors resize-none"
                    style={{ fontFamily: 'var(--font-body)' }}
                    placeholder="Detailed description for the modal..."
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <label className="text-xs text-white/40 mb-2 block" style={{ fontFamily: 'var(--font-mono)' }}>
                      Icon
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {EMOJIS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setForm({ ...form, image: emoji })}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all ${
                            form.image === emoji
                              ? 'bg-neon-blue/20 border-neon-blue/50 border'
                              : 'bg-dark-700/50 border-white/10 border hover:border-white/20'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-2 block" style={{ fontFamily: 'var(--font-mono)' }}>
                      Accent Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ACCENTS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setForm({ ...form, accent: color })}
                          className={`w-8 h-8 rounded-lg transition-all ${
                            form.accent === color ? 'ring-2 ring-white scale-110' : ''
                          }`}
                          style={{ background: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-2 block" style={{ fontFamily: 'var(--font-mono)' }}>
                      Gradient
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {GRADIENTS.map((grad) => (
                        <button
                          key={grad}
                          type="button"
                          onClick={() => setForm({ ...form, gradient: grad })}
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${grad} transition-all ${
                            form.gradient === grad ? 'ring-2 ring-white scale-110' : ''
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-white/40 mb-2 block" style={{ fontFamily: 'var(--font-mono)' }}>
                      Tech Stack (comma separated)
                    </label>
                    <input
                      value={form.tech}
                      onChange={(e) => setForm({ ...form, tech: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-white/10 text-white text-sm outline-none focus:border-neon-blue/60 transition-colors"
                      style={{ fontFamily: 'var(--font-mono)' }}
                      placeholder="React, Next.js, TypeScript..."
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-2 block" style={{ fontFamily: 'var(--font-mono)' }}>
                      Metrics (comma separated)
                    </label>
                    <input
                      value={form.metrics}
                      onChange={(e) => setForm({ ...form, metrics: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-white/10 text-white text-sm outline-none focus:border-neon-blue/60 transition-colors"
                      style={{ fontFamily: 'var(--font-mono)' }}
                      placeholder="1M+ users, 99.9% uptime..."
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-white/40 mb-2 block" style={{ fontFamily: 'var(--font-mono)' }}>
                      Live URL
                    </label>
                    <input
                      value={form.links.live}
                      onChange={(e) => setForm({ ...form, links: { ...form.links, live: e.target.value } })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-white/10 text-white text-sm outline-none focus:border-neon-blue/60 transition-colors"
                      style={{ fontFamily: 'var(--font-mono)' }}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-2 block" style={{ fontFamily: 'var(--font-mono)' }}>
                      GitHub URL
                    </label>
                    <input
                      value={form.links.github}
                      onChange={(e) => setForm({ ...form, links: { ...form.links, github: e.target.value } })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-white/10 text-white text-sm outline-none focus:border-neon-blue/60 transition-colors"
                      style={{ fontFamily: 'var(--font-mono)' }}
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-8 py-3 rounded-xl glass border border-white/10 text-white/60 text-sm hover:text-white hover:border-white/20 transition-all"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="mb-4 p-4 rounded-xl bg-neon-blue/5 border border-neon-blue/20">
                <p className="text-xs text-neon-blue" style={{ fontFamily: 'var(--font-mono)' }}>
                  💡 This is how your projects appear to visitors. Changes are saved automatically.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-6 rounded-2xl glass border border-white/5"
                    style={{
                      boxShadow: `0 0 40px ${project.accent}15`,
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{project.image}</span>
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          background: `${project.accent}15`,
                          color: project.accent,
                          border: `1px solid ${project.accent}30`,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {project.category}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-bold text-white mb-2"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-sm text-white/50 mb-4"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-xs rounded-md text-white/40 border border-white/5"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowDeleteConfirm(null)}
            />
            <motion.div
              className="relative w-full max-w-md p-6 rounded-3xl glass border border-white/10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <h3
                className="text-xl font-bold text-white mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Delete Project?
              </h3>
              <p className="text-sm text-white/40 mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                This action cannot be undone. The project will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-semibold hover:bg-red-500/30 transition-colors"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 py-3 rounded-xl glass border border-white/10 text-white/60 text-sm hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

