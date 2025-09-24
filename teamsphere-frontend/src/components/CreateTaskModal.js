import React, { useState, useEffect } from 'react';
import './modal.css';

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const modalContentStyle = {
  background: '#fff',
  padding: '30px',
  borderRadius: '8px',
  minWidth: '320px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  color: '#222',
  position: 'relative'
};



const CreateTaskModal = ({ show, onClose, onTaskCreated }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [message, setMessage] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [projects, setProjects] = useState([]);

   

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!taskTitle) {
      setMessage('Please fill all fields.');
      return;
    }
    const res = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: taskTitle,
        description:taskDescription,
        status: selectedStatus,
        projectId: selectedProject,
        createdBy:"68caf3234fcd395b61b5021e"
      })
    });
    const data = await res.json();
    if (data.success) {
      setMessage('Task created successfully!');
      setTaskTitle('');
      setTaskDescription('');
      setSelectedStatus('');
      setTimeout(() => {
        if (onTaskCreated) onTaskCreated();
        onClose();
        setMessage('');
      }, 800);
    } else {
      setMessage(data.error || 'Failed to create task.');
    }
  };

   useEffect(() => {
      if (show) {
        fetch('http://localhost:5000/api/projects')
          .then(res => res.json())
          .then(data => {
            if (data.success) setProjects(data.data);
          });
      }
    }, [show]);

  if (!show) return null;

  return (
    <div className='modal' onClick={() => { onClose(); setMessage(''); }}>
      <div  className='modal-content' onClick={e => e.stopPropagation()}>
        <h3 style={{ marginTop: 0, marginBottom: '18px', color: '#23272f', textAlign: 'center' }}>Create Task</h3>
        <form onSubmit={handleCreateTask}>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="taskTitle"  className="modal-label">Task Title:</label>
            <input id="taskTitle" type="text" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="taskDescription"  className="modal-label">Task Description:</label>
            <input id="taskDescription" type="text" value={taskDescription} onChange={e => setTaskDescription(e.target.value)} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="statusSelect"  className="modal-label">Status:</label>
            <select id="statusSelect" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} style={{ width: '100%' }}>
              <option value="">Select Status</option>
               
                <option key={"pending"} value={"pending"}>{"Pending"}</option>
                <option key={"in-progress"} value={"in-Progress"}>{"In-Progress"}</option>
                <option key={"complete"} value={"complete"}>{"Complete"}</option>
               
            </select>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="selectedProject"  className="modal-label">Select Project:</label>
            <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)}  style={{ width: '100%' }}>
                  <option value="">Select Project</option>
                  {projects.map(project => (
                    <option key={project._id} value={project._id}>{project.name}</option>
                  ))}
                </select>
          </div>

         
          
          <button type="submit"  className="modal-btn">Create</button>
          <button type="button"  className="modal-btn" onClick={() => { onClose(); setMessage(''); }}>Cancel</button>
        </form>
        {message && <div style={{ color: message.includes('success') ? 'green' : 'red', marginTop: '10px' }}>{message}</div>}
      </div>
    </div>
  );
};

export default CreateTaskModal;
