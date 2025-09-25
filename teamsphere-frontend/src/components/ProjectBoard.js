import React, { useEffect, useState } from 'react';
import InviteMember from './InviteMember';
 import MyPopup from './MyPopup'; // Your popup component
 import './projecttable.css';
 import './modal.css';
 

 

const ProjectBoard = ({ theme }) => {
  const [projects, setProjects] = useState([]);
  const [newList, setNewList] = useState([]);
  const projectList = '[]';
  
  
  const [selectedRowData, setSelectedRowData] = useState(null);
    const [showModal, setShowModal] = useState(false);

      const handleRowClick = (project) => {
        setSelectedRowData(project);
        
        setShowModal(true);
       
      };

      const handleCloseModal  = () => {
        setShowModal(false);
        setSelectedRowData(null); // Clear selected data when closing
      };

  const reloadProjects = () => {
    fetch('http://localhost:5000/api/projects')
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

   

  return (
    <div>
            <h2>Projects</h2>
      <InviteMember  />
      <div>
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <table className='project-table'>
            <thead>
            <tr >
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Detail</th>
                
            </tr>
            </thead>
            <tbody>
            {projects.map(project => (
              <tr key={project._id} >               
                <td>
                 
                  {project.name}
                 
               
                  </td>                
                <td>{project.description}</td>
                <td>{project.status}</td>
                <td style={{ alignItems: 'center' }}>
                    <button  className="viewdetail-btn" onClick={() => handleRowClick(project)}>View Details</button>

                     
                  </td>
                 
              </tr>
            ))}
            </tbody>
             </table>
           
          )}

          {showModal && (
            <MyPopup data={selectedRowData} onClose={handleCloseModal} />
          )}
       
      </div>
    </div>
  );
};

export default ProjectBoard;
