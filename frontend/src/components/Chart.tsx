// src/components/Chart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart: React.FC = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56],
                fill: false,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    return <Line data={data} />;
};

export default Chart;
