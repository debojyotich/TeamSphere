
import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './sidebar.css';
import CreateProjectModal from './CreateProjectModal';
import CreateTaskModal from './CreateTaskModal.js';
import CreateMemberModal from './CreateMemberModal.js';
import MoveTask from './MoveTask.js';
import ProjectBoard from './ProjectBoard.js';
import { Link } from 'react-router-dom';


const Sidebar = ({ theme, onProjectCreated }) => {
  const [showModal, setShowModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showMoveTaskModal, setShowMoveTaskModal] = useState(false);

  return (
    <div style={{
      width: '220px',
      backgroundColor: theme === 'dark' ? '#23272f' : '#1f2a40',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      justifyContent: 'space-between'
    }}>
      <div>
        <h2 style={{ marginBottom: '30px' }}>TEAMSPHERE</h2>
        <nav>
          <div style={{ marginBottom: '15px', cursor: 'pointer' }} onClick={() => setShowModal(true)}>Create Project</div>
        </nav>
        <nav>
          <div style={{ marginBottom: '15px', cursor: 'pointer' }} onClick={() => setShowTaskModal(true)}>Create Task</div>
        </nav>
        <nav>
          <div style={{ marginBottom: '15px', cursor: 'pointer' }} onClick={() => setShowMemberModal(true)}>Create Member</div>
        </nav>
        <nav>
          <div style={{ marginBottom: '15px', cursor: 'pointer' }} onClick={() => setShowMoveTaskModal(true)}>Move Task</div>
        </nav>
        

         

        <ThemeToggle />
      </div>
      <button style={{
        marginTop: 'auto',
        padding: '10px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        cursor: 'pointer'
      }}>
        LOGOUT
      </button>
      <CreateProjectModal show={showModal} onClose={() => setShowModal(false)} onProjectCreated={onProjectCreated} />
      <CreateTaskModal show={showTaskModal} onClose={() => setShowTaskModal(false)} onProjectCreated={onProjectCreated} />
      <CreateMemberModal show={showMemberModal} onClose={() => setShowMemberModal(false)} onProjectCreated={onProjectCreated} />


    </div>
  );
};

export default Sidebar;
