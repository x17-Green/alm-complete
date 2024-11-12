// src/components/DataTable.tsx
import React from 'react';

const DataTable: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Data Table</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>1</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>Sample Item</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>100</td>
                    </tr>
                    {/* Additional rows can be added here */}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
