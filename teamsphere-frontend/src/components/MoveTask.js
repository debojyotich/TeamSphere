import React, { useEffect, useState } from 'react';
import InviteMember from './InviteMember';
import './moveTask.css';

const MoveTask  = ({ show, onClose, onProjectCreated }) => {
  
  const url1 = "http://localhost:5000/api/projects/getProjectsWithTask/All" ;
  const url2 = "http://localhost:5000/api/tasks/" ;
   
  

  const [projects, setProjects] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
  const [message, setMessage] = useState('');


  const reloadProjects = () => {
    fetch(url1)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProjects(data.data);
        }
      });
  };

  useEffect(() => {
    reloadProjects();
  }, []);

   if (!show) return null;

   const handleDragStart = (task, fromProjectId) => {
    setDraggedTask({ ...task, fromProjectId });
  };

   const handleDrop = async (toProjectId) => {
    if (!draggedTask || draggedTask.fromProjectId === toProjectId) return;
    // Move task in backend
    const url3=url2+draggedTask._id;
    await fetch(url3, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: toProjectId })
    });
    setDraggedTask(null);
    reloadProjects();
  };

  

  return (
    <div  className='modal-new' onClick={() => { onClose(); setMessage(''); }}>
      
    <div className="project-tasks-board-container">
      <h2 className="project-tasks-board-title">Project Tasks Overview</h2>
      <div className="project-tasks-board-list">
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map(project => (
            <div
              key={project._id}
              className="project-tasks-board-item"
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(project._id)}
            >
              <div className="project-tasks-board-header">{project.name}</div>
              <div className="project-tasks-board-content">
                {project.tasks && project.tasks.length > 0 ? (
                  <ul className="project-tasks-board-tasks">
                    {project.tasks.map(task => (
                      <li
                        key={task._id}
                        className="project-tasks-board-task"
                        draggable
                        onDragStart={() => handleDragStart(task, project._id)}
                      >
                        {task.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="project-tasks-board-none">No tasks</span>
                )}
                
              </div>
              
            </div>
          ))
        )}
      </div>
      
    </div>
     <button type="button" className="modal-btn-new" onClick={() => { onClose(); setMessage(''); }}>Cancel</button>
    </div>
    
  );
};

export default MoveTask;