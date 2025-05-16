import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import { ProjectProvider } from '../context/ProjectContext';
import MainFeature from '../components/MainFeature';
import ProjectModal from '../components/ProjectModal';

const CheckCircle = getIcon('CheckCircle');
const ListTodo = getIcon('ListTodo');
const Folder = getIcon('Folder');
const Calendar = getIcon('Calendar');

function Home({ isDarkMode }) {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  });

  useEffect(() => {
    // Get saved tasks to calculate stats
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completed = savedTasks.filter(task => task.status === 'completed').length;
    
    setStats({
      totalTasks: savedTasks.length,
      completedTasks: completed,
      pendingTasks: savedTasks.length - completed
    });
  }, []);

  const handleTasksUpdated = (newTasks) => {
    const completed = newTasks.filter(task => task.status === 'completed').length;
    
    setStats({
      totalTasks: newTasks.length,
      completedTasks: completed,
      pendingTasks: newTasks.length - completed
    });
  };

  return (
    <ProjectProvider>
      <div className="min-h-screen">
        <header className="bg-gradient-to-r from-primary to-secondary py-4 sm:py-6 text-white">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                  <CheckCircle className="mr-2 h-6 w-6" />
                  TaskFlow
                </h1>
                <p className="text-primary-light dark:text-white/70 mt-1">
                  Efficiently manage and organize your tasks
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="container-custom py-6 md:py-8">
          <section className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card p-4 flex items-center"
              >
                <div className="rounded-full bg-primary/10 p-3 mr-4">
                  <ListTodo className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{stats.totalTasks}</h3>
                  <p className="text-surface-500 dark:text-surface-400 text-sm">Total Tasks</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-4 flex items-center"
              >
                <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mr-4">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{stats.completedTasks}</h3>
                  <p className="text-surface-500 dark:text-surface-400 text-sm">Completed Tasks</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card p-4 flex items-center"
              >
                <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 p-3 mr-4">
                  <Calendar className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{stats.pendingTasks}</h3>
                  <p className="text-surface-500 dark:text-surface-400 text-sm">Pending Tasks</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card p-4 flex items-center"
              >
                <div className="rounded-full bg-secondary/10 p-3 mr-4">
                  <Folder className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Projects</h3>
                  <p className="text-surface-500 dark:text-surface-400 text-sm">Organize tasks</p>
                </div>
              </motion.div>
            </div>
          </section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Task Management</h2>
            </div>
            
            <MainFeature onTasksUpdated={handleTasksUpdated} isDarkMode={isDarkMode} />
          </motion.section>
        </main>

        <footer className="bg-surface-100 dark:bg-surface-800 py-6 mt-12">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-surface-600 dark:text-surface-400 text-sm">
                  &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
        <ProjectModal />
      </div>
    </ProjectProvider>
  );
}

export default Home;