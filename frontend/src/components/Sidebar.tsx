// src/components/Sidebar.tsx
import React from 'react';

const Sidebar: React.FC = () => {
    return (
        <aside style={{ width: '250px', padding: '20px', background: '#f4f4f4' }}>
            <h2>Dashboard Menu</h2>
            <ul>
                <li><a href="#overview">Overview</a></li>
                <li><a href="#reports">Reports</a></li>
                <li><a href="#settings">Settings</a></li>
                <li><a href="#profile">Profile</a></li>
            </ul>
        </aside>
    );
};

export default Sidebar;


