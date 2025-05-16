import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import { useProjects } from '../context/ProjectContext';

// Icon declarations
const Plus = getIcon('Plus');
const Edit = getIcon('Edit');
const Trash2 = getIcon('Trash2');
const CheckCircle = getIcon('CheckCircle');
const Clock = getIcon('Clock');
const AlertCircle = getIcon('AlertCircle');
const Folder = getIcon('Folder');
const Check = getIcon('Check');
const X = getIcon('X');
const MoveRight = getIcon('MoveRight');
const Filter = getIcon('Filter');
const Search = getIcon('Search');
  const { projects, openModal } = useProjects();
const Calendar = getIcon('Calendar');
const Flag = getIcon('Flag');
const Tag = getIcon('Tag');

  });
  // Task state
  const [tasks, setTasks] = useState([]);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

    projectId: 'default',
  // Task form state
  const [selectedProject, setSelectedProject] = useState('all');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');
  const [taskStatus, setTaskStatus] = useState('todo');
  const [taskTags, setTaskTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  // Get tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);  

  // Use ref to store previous task state for comparison
  const prevTasksRef = useRef(null);

  // Deep comparison function for tasks arrays
  const tasksChanged = (prevTasks, currentTasks) => {
    if (!prevTasks) return true;
    if (prevTasks.length !== currentTasks.length) return true;
    
    // Compare each task by stringifying (deep comparison)
    return JSON.stringify(prevTasks) !== JSON.stringify(currentTasks);
  };

  useEffect(() => {
    // Only update localStorage and call onTasksUpdated if tasks actually changed
    if (tasksChanged(prevTasksRef.current, tasks)) {
      // Save to localStorage
      localStorage.setItem('tasks', JSON.stringify(tasks));
      
      // Call the callback if provided
      if (onTasksUpdated) {
        onTasksUpdated(tasks);
      }
      
      // Update the ref with current tasks
      prevTasksRef.current = [...tasks];
    }
  }, [tasks, onTasksUpdated]);

  // Filter and sort tasks
  const filteredTasks = tasks.filter(task => {
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesPriority && matchesSearch;
  });

  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in_progress');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');

  // Open task form for creating a new task
  const handleOpenTaskForm = () => {
      projectId: 'default',
    setTaskFormOpen(true);
    setEditingTask(null);
    resetFormFields();
  };

  // Open task form for editing an existing task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskDueDate(task.dueDate);
    setTaskPriority(task.priority);
    setTaskStatus(task.status);
    setTaskTags(task.tags);
    setTaskFormOpen(true);
  };

  // Close task form and reset fields
  const handleCloseTaskForm = () => {
    setTaskFormOpen(false);
    resetFormFields();
  };

  // Reset form fields to default values
  const resetFormFields = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate('');
    setTaskPriority('medium');
    setTaskStatus('todo');
    setTaskTags([]);
    setNewTag('');
  };

  // Handle adding a tag
  const handleAddTag = () => {
    if (newTag.trim() && !taskTags.includes(newTag.trim())) {
      setTaskTags([...taskTags, newTag.trim()]);
      setNewTag('');
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tagToRemove) => {
    setTaskTags(taskTags.filter(tag => tag !== tagToRemove));
  };

  // Add or update a task
  const handleSaveTask = (e) => {
    e.preventDefault();
    
    if (!taskTitle.trim()) {
      toast.error("Task title is required");
  const getFilteredTasks = (status) => {
    if (selectedProject === 'all') {
      return getTasksByStatus(status);
    } else {
      return tasks.filter(task => task.status === status && task.projectId === selectedProject);
    }
  };

      return;
    }

    const taskData = {
      id: editingTask ? editingTask.id : Date.now().toString(),
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      dueDate: taskDueDate,
      priority: taskPriority,
      status: taskStatus,
      tags: taskTags,
      createdAt: editingTask ? editingTask.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

      {/* Project filter controls */}
      <div className="flex flex-wrap items-center mb-4 gap-2">
        <div className="flex items-center">
          <Filter className="h-5 w-5 mr-2 text-surface-500" />
          <select 
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="input py-1 px-3 pr-8"
          >
            <option value="all">All Projects</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>
        <button onClick={openModal} className="btn btn-secondary btn-sm"><Folder className="h-4 w-4 mr-1" /> Add Project</button>
      </div>

    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(task => task.id === editingTask.id ? taskData : task));
      toast.success("Task updated successfully!");
    } else {
      // Add new task
      setTasks([...tasks, taskData]);
      toast.success("Task added successfully!");
    }

    handleCloseTaskForm();
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter(task => task.id !== taskId));
      toast.success("Task deleted successfully!");
    }
  };

  // Update task status
  const handleUpdateStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus, updatedAt: new Date().toISOString() } 
        : task
    ));
    toast.success(`Task moved to ${newStatus.replace('_', ' ')}!`);
  };

  // Render priority badge
  const renderPriorityBadge = (priority) => {
    const badges = {
      low: { 
        class: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300", 
        icon: <CheckCircle className="w-3 h-3 mr-1" /> 
      },
      medium: { 
        class: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300", 
        icon: <Clock className="w-3 h-3 mr-1" /> 
              <div className="mb-4">
                <label htmlFor="project" className="label flex items-center">
                  <Folder className="h-4 w-4 mr-1" /> Project
                </label>
                <select id="project" value={newTask.projectId} onChange={(e) => setNewTask({...newTask, projectId: e.target.value})} className="input">
                  <option disabled>Select a project</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
              </div>

      },
      high: { 
        class: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300", 
        icon: <AlertCircle className="w-3 h-3 mr-1" /> 
      }
    };

    const badge = badges[priority] || badges.medium;
    
    return (
      <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${badge.class}`}>
        {badge.icon}
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Determine if a date is overdue
  const isOverdue = (dateString, status) => {
    if (!dateString || status === 'completed') return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

          <h3 className="text-md font-semibold mb-2 flex items-center">To Do <span className="ml-2 text-xs bg-surface-200 dark:bg-surface-700 px-2 py-0.5 rounded-full">{getFilteredTasks('todo').length}</span></h3>
    <div>
      {/* Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-surface-400" />
              {getFilteredTasks('todo').length === 0 ? (
            <input
              type="text"
              className="pl-10 input"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
                    getFilteredTasks('todo').map(task => {
          
          <div className="sm:w-48">
            <select
              className="input"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={handleOpenTaskForm}
          className="btn-primary flex-shrink-0 flex items-center justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Task
                          
                          <div className="flex items-center mb-2">
                            {/* Project tag */}
                            {task.projectId && (
                              <span className="inline-flex items-center text-xs px-2 py-0.5 rounded mr-2" style={{ backgroundColor: `${projects.find(p => p.id === task.projectId)?.color}20`, color: projects.find(p => p.id === task.projectId)?.color }}>
                                <Folder className="w-3 h-3 mr-1" />
                                {projects.find(p => p.id === task.projectId)?.name}
                              </span>
                            )}
                          </div>
                        
      </div>
        {/* To Do Column */}
        <div className="task-column lg:w-1/3">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-500 mr-2"></div>
              To Do
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-surface-200 dark:bg-surface-700">
                {todoTasks.length}
              </span>
            </h3>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            {todoTasks.length === 0 ? (
              <div className="p-4 text-center text-surface-500 dark:text-surface-400 bg-surface-100 dark:bg-surface-700/50 rounded-lg">
                No tasks to do
              </div>
            ) : (
              <AnimatePresence>
                {todoTasks.map(task => (
                  <motion.div
                    key={task.id}
          <h3 className="text-md font-semibold mb-2 flex items-center">In Progress <span className="ml-2 text-xs bg-surface-200 dark:bg-surface-700 px-2 py-0.5 rounded-full">{getFilteredTasks('inProgress').length}</span></h3>
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`task-card ${isOverdue(task.dueDate) ? 'border-l-4 border-l-red-500' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-surface-900 dark:text-white">{task.title}</h4>
                      <div className="flex gap-1">
              {getFilteredTasks('inProgress').length === 0 ? (
                          onClick={() => handleEditTask(task)}
                          className="p-1 text-surface-500 hover:text-primary"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteTask(task.id)}
                    getFilteredTasks('inProgress').map(task => {
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {task.description && (
                      <p className="text-sm text-surface-600 dark:text-surface-400 mb-2 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {task.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                          
                          <div className="flex items-center mb-2">
                            {/* Project tag */}
                            {task.projectId && (
                              <span className="inline-flex items-center text-xs px-2 py-0.5 rounded mr-2" style={{ backgroundColor: `${projects.find(p => p.id === task.projectId)?.color}20`, color: projects.find(p => p.id === task.projectId)?.color }}>
                                <Folder className="w-3 h-3 mr-1" />
                                {projects.find(p => p.id === task.projectId)?.name}
                              </span>
                            )}
                          </div>
                        
                    </div>
                        {renderPriorityBadge(task.priority)}
                        
                        {task.dueDate && (
                          <span className={`ml-2 text-xs flex items-center ${
                            isOverdue(task.dueDate) 
                              ? 'text-red-600 dark:text-red-400' 
                              : 'text-surface-500 dark:text-surface-400'
                          }`}>
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(task.dueDate)}
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleUpdateStatus(task.id, 'in_progress')}
                        className="text-xs flex items-center text-primary hover:text-primary-dark"
                      >
                        <MoveRight className="w-3 h-3 mr-1" />
                        Start
                      </button>
                    </div>
          <h3 className="text-md font-semibold mb-2 flex items-center">Completed <span className="ml-2 text-xs bg-surface-200 dark:bg-surface-700 px-2 py-0.5 rounded-full">{getFilteredTasks('completed').length}</span></h3>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
        
        {/* In Progress Column */}
              {getFilteredTasks('completed').length === 0 ? (
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2"></div>
              In Progress
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-surface-200 dark:bg-surface-700">
                {inProgressTasks.length}
              </span>
                    getFilteredTasks('completed').map(task => {
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            {inProgressTasks.length === 0 ? (
              <div className="p-4 text-center text-surface-500 dark:text-surface-400 bg-surface-100 dark:bg-surface-700/50 rounded-lg">
                No tasks in progress
              </div>
            ) : (
              <AnimatePresence>
                {inProgressTasks.map(task => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`task-card ${isOverdue(task.dueDate) ? 'border-l-4 border-l-red-500' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-surface-900 dark:text-white">{task.title}</h4>
                      <div className="flex gap-1">
                        <button 
                          
                          <div className="flex items-center mb-2">
                            {/* Project tag */}
                            {task.projectId && (
                              <span className="inline-flex items-center text-xs px-2 py-0.5 rounded mr-2" style={{ backgroundColor: `${projects.find(p => p.id === task.projectId)?.color}20`, color: projects.find(p => p.id === task.projectId)?.color }}>
                                <Folder className="w-3 h-3 mr-1" />
                                {projects.find(p => p.id === task.projectId)?.name}
                              </span>
                            )}
                          </div>
                        
                          className="p-1 text-surface-500 hover:text-primary"
                        <button 
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-1 text-surface-500 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {task.description && (
                      <p className="text-sm text-surface-600 dark:text-surface-400 mb-2 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {task.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {renderPriorityBadge(task.priority)}
                        
                        {task.dueDate && (
                          <span className={`ml-2 text-xs flex items-center ${
                            isOverdue(task.dueDate) 
                              ? 'text-red-600 dark:text-red-400' 
                              : 'text-surface-500 dark:text-surface-400'
                          }`}>
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(task.dueDate)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleUpdateStatus(task.id, 'todo')}
                          className="text-xs flex items-center text-surface-500 hover:text-primary-dark"
                        >
                          Back
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(task.id, 'completed')}
                          className="text-xs flex items-center text-primary hover:text-primary-dark ml-2"
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Complete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
        
        {/* Completed Column */}
        <div className="task-column lg:w-1/3">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
              Completed
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-surface-200 dark:bg-surface-700">
                {completedTasks.length}
              </span>
            </h3>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            {completedTasks.length === 0 ? (
              <div className="p-4 text-center text-surface-500 dark:text-surface-400 bg-surface-100 dark:bg-surface-700/50 rounded-lg">
                No completed tasks
              </div>
            ) : (
              <AnimatePresence>
                {completedTasks.map(task => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="task-card bg-surface-50 dark:bg-surface-800/60"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-surface-900 dark:text-white line-through opacity-70">{task.title}</h4>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-1 text-surface-500 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {task.description && (
                      <p className="text-sm text-surface-600 dark:text-surface-400 mb-2 line-clamp-2 opacity-70">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {task.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 opacity-70"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center opacity-70">
                        {renderPriorityBadge(task.priority)}
                        
                        {task.dueDate && (
                          <span className="ml-2 text-xs flex items-center text-surface-500 dark:text-surface-400">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(task.dueDate)}
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleUpdateStatus(task.id, 'in_progress')}
                        className="text-xs flex items-center text-primary hover:text-primary-dark"
                      >
                        Reopen
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Task Form Modal */}
      <AnimatePresence>
        {taskFormOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={handleCloseTaskForm}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-soft p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  {editingTask ? 'Edit Task' : 'Add New Task'}
                </h3>
                <button 
                  onClick={handleCloseTaskForm}
                  className="p-1 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSaveTask}>
                <div className="mb-4">
                  <label htmlFor="taskTitle" className="label">Title *</label>
                  <input
                    id="taskTitle"
                    type="text"
                    className="input"
                    placeholder="Task title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="taskDescription" className="label">Description</label>
                  <textarea
                    id="taskDescription"
                    className="textarea h-24"
                    placeholder="Task description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="taskDueDate" className="label">Due Date</label>
                    <input
                      id="taskDueDate"
                      type="date"
                      className="input"
                      value={taskDueDate}
                      onChange={(e) => setTaskDueDate(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="taskPriority" className="label">Priority</label>
                    <select
                      id="taskPriority"
                      className="input"
                      value={taskPriority}
                      onChange={(e) => setTaskPriority(e.target.value)}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="taskStatus" className="label">Status</label>
                  <select
                    id="taskStatus"
                    className="input"
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="taskTags" className="label">Tags</label>
                  <div className="flex">
                    <input
                      id="taskTags"
                      type="text"
                      className="input rounded-r-none"
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="bg-primary text-white px-3 py-2 rounded-r-lg hover:bg-primary-dark transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {taskTags.map(tag => (
                      <div 
                        key={tag} 
                        className="bg-surface-200 dark:bg-surface-700 text-surface-800 dark:text-surface-200 px-2 py-1 rounded-full text-sm flex items-center"
                      >
                        <span className="mr-1">{tag}</span>
                        <button 
                          type="button"
                          onClick={() => handleRemoveTag(tag)} 
                          className="text-surface-500 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseTaskForm}
                    className="btn-ghost"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    {editingTask ? 'Update Task' : 'Add Task'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MainFeature;