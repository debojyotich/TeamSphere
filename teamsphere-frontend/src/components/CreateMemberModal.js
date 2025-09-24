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



const CreateMemberModal = ({ show, onClose, onMemberCreated }) => {
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [projects, setProjects] = useState([]);



  const handleCreateMember = async (e) => {
    e.preventDefault();
    if (!memberName) {
      setMessage('Please fill all fields.');
      return;
    }
    const res = await fetch('http://localhost:5000/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: memberName,
        email: memberEmail,
        projectId: selectedProject
      })
    });
    const data = await res.json();
    if (data.success) {
      setMessage('Member created successfully!');
      setMemberName('');
      setMemberEmail('');
      setTimeout(() => {
        if (onMemberCreated) onMemberCreated();
        onClose();
        setMessage('');
      }, 800);
    } else {
      setMessage(data.error || 'Failed to create Member.');
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
    <div  className='modal' onClick={() => { onClose(); setMessage(''); }}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <h3 style={{ marginTop: 0, marginBottom: '18px', color: '#23272f', textAlign: 'center' }}>Create Member</h3>
        <form onSubmit={handleCreateMember}>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="memberName" className="modal-label">Member Name:</label>
            <input id="memberName" type="text" value={memberName} onChange={e => setMemberName(e.target.value)} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="memberEmail"  className="modal-label">Member Email:</label>
            <input id="memberEmail" type="text" value={memberEmail} onChange={e => setMemberEmail(e.target.value)} style={{ width: '100%' }} />
          </div>


          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="selectedProject"  className="modal-label">Select Project:</label>
            <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)} style={{ width: '100%' }}>
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

export default CreateMemberModal;
