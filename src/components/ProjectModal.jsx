import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../context/ProjectContext';
import getIcon from '../utils/iconUtils';

const X = getIcon('X');
const Folder = getIcon('Folder');

const ProjectModal = () => {
  const { isModalOpen, closeModal, addProject } = useProjects();
  const [projectName, setProjectName] = useState('');
  const [projectColor, setProjectColor] = useState('#3b82f6');
  const [error, setError] = useState('');
  const modalRef = useRef(null);
  
  const colors = [
    '#3b82f6', // blue
    '#8b5cf6', // purple
    '#f97316', // orange
    '#10b981', // green
    '#ef4444', // red
    '#f59e0b', // amber
    '#06b6d4', // cyan
    '#ec4899', // pink
  ];
  
  useEffect(() => {
    if (isModalOpen) {
      setProjectName('');
      setProjectColor('#3b82f6');
      setError('');
    }
  }, [isModalOpen]);
  
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!projectName.trim()) {
      setError('Project name is required');
      return;
    }
    
    addProject({ name: projectName.trim(), color: projectColor });
    closeModal();
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleOutsideClick}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-surface-800 rounded-xl p-6 max-w-md w-full shadow-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center"><Folder className="mr-2 h-5 w-5" /> Add New Project</h3>
              <button onClick={closeModal} className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="project-name" className="label">Project Name</label>
                <input id="project-name" type="text" className="input" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="My Project" />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button type="button" onClick={closeModal} className="btn btn-ghost">Cancel</button>
                <button type="submit" className="btn btn-primary">Create Project</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;