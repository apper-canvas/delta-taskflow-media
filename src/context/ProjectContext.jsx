import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const ProjectContext = createContext();

export function useProjects() {
  return useContext(ProjectContext);
}

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [
      { id: 'default', name: 'General', color: '#3b82f6' }
    ];
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (project) => {
    // Generate a unique ID based on timestamp and random number
    const newProject = { 
      ...project, 
      id: `project-${Date.now()}-${Math.floor(Math.random() * 1000)}` 
    };
    
    setProjects(prevProjects => [...prevProjects, newProject]);
    toast.success(`Project "${project.name}" created successfully!`);
    return newProject;
  };

  const updateProject = (id, updatedProject) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === id ? { ...project, ...updatedProject } : project
      )
    );
    toast.success(`Project updated successfully!`);
  };

  const deleteProject = (id) => {
    // Don't allow deleting the default project
    if (id === 'default') {
      toast.error("The General project cannot be deleted.");
      return false;
    }
    
    setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
    toast.success("Project deleted successfully!");
    return true;
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const value = {
    projects, addProject, updateProject, deleteProject,
    isModalOpen, openModal, closeModal
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export default ProjectContext;