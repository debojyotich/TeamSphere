import React, { useState, useEffect } from 'react';
import './modal.css';


const CreateProjectModal = ({ show, onClose, onProjectCreated }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [message, setMessage] = useState('');

   

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projectName) {
      setMessage('Please fill all fields.');
      return;
    }
    const res = await fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: projectName,
        description:projectDescription,
        status: selectedStatus,
        createdBy:"68caf3234fcd395b61b5021e"
      })
    });
    const data = await res.json();
    if (data.success) {
      setMessage('Project created successfully!');
      setProjectName('');
      setProjectDescription('');
      setSelectedStatus('');
      setTimeout(() => {
        if (onProjectCreated) onProjectCreated();
        onClose();
        setMessage('');
      }, 800);
    } else {
      setMessage(data.error || 'Failed to create project.');
    }
  };

  if (!show) return null;

  return (
    <div  className='modal' onClick={() => { onClose(); setMessage(''); }}>
      <div  className='modal-content'  onClick={e => e.stopPropagation()}>
        <h3 style={{ marginTop: 0, marginBottom: '18px', color: '#23272f', textAlign: 'center' }}>Create Project</h3>
        <form onSubmit={handleCreateProject}>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="projectName" className="modal-label">Project Name:</label>
            <input id="projectName" type="text" value={projectName} onChange={e => setProjectName(e.target.value)} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="projectDescription" className="modal-label">Project Description:</label>
            <input id="projectDescription" type="text" value={projectDescription} onChange={e => setProjectDescription(e.target.value)} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="statusSelect" className="modal-label">Status:</label>
            <select id="statusSelect" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} style={{ width: '100%' }}>
              <option value="">Select Status</option>
               
                <option key={"pending"} value={"pending"}>{"Pending"}</option>
                <option key={"in-progress"} value={"in-Progress"}>{"In-Progress"}</option>
                <option key={"complete"} value={"complete"}>{"Complete"}</option>
               
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

export default CreateProjectModal;
