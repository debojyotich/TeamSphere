import React from 'react';
import { useState, useEffect } from 'react';
import './projecttable.css';

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



function MyPopup({ data, show, onClose, children }) {

    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);

    const url1 = "http://localhost:5000/api/tasks/getTaskByProject/" + data._id;
    const url2 = "http://localhost:5000/api/members/getMemberByProject/" + data._id;

    const reloadTask = () => {
        fetch(url1)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setTasks(data.data);
                }
            });


    };

    const reloadMember = () => {
        fetch(url2)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setMembers(data.data);
                }
            });
    };

    useEffect(() => {
        reloadTask();
        reloadMember();
    }, [data]);






    return (
        <div className="popup-overlay">
            <div className="popup-content">


                <h2>Details for {data.name}</h2>
                <p>Project Description : {data.description} </p>
                <p>Project Status : {data.status}</p>
                {/* Add more details as needed */}

                <div>
                    <h2>Tasks</h2>
                    <div>
                        {tasks.length === 0 ? (
                            <p>No Tasks found.</p>
                        ) : (
                            <table className='project-table'>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map(task => (
                                        <tr key={task._id} >
                                            <td>
                                                {task.title}
                                            </td>
                                            <td>{task.description}</td>
                                            <td>{task.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
                <div>
                    <h2>Members</h2>
                    <div>
                        {members.length === 0 ? (
                            <p>No Member found.</p>
                        ) : (
                            <table className='project-table'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.map(member => (
                                        <tr key={member._id} >
                                            <td>
                                                {member.name}
                                            </td>
                                            <td>{member.email}</td>
                                            <td>{member.gender}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default MyPopup;