import React , { useEffect } from 'react';
import Highcharts from 'highcharts';
import { Link } from 'react-router-dom';
import { useQuery  } from 'react-query';

const calculateGenderPercentage = (data) => {
    if (!Array.isArray(data)) {
        console.error("Invalid data format. Expected an array.");
        return [];
    }

    let maleCount = 0;
    let femaleCount = 0;
    data.forEach((item) => {
        if (item.gender === 'male') {
            maleCount++;
        } else if (item.gender === 'female') {
            femaleCount++;
        }
    });

    const total = maleCount + femaleCount;
    const malePercentage = total === 0 ? 0 : (maleCount / total) * 100;
    const femalePercentage = total === 0 ? 0 : (femaleCount / total) * 100;

    const resultArray = [
        { name: 'male', y: malePercentage },
        { name: 'female', y: femalePercentage },
    ];

    return resultArray;
};
const Dashboard = () => {
    const { data: users, isLoading, error } = useQuery('users', async () => {
        const response = await fetch('http://localhost:3000/api/users');
        const data = await response.json();
        return data;
      });
    useEffect(() => {
        if (!isLoading && !error && users) {
            Highcharts.chart('container', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Gender Division'
                },
                tooltip: {
                    valueSuffix: '%'
                },
                plotOptions: {
                    series: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: [{
                            enabled: true,
                            distance: 20
                        }, {
                            enabled: true,
                            distance: -40,
                            format: '{point.percentage:.1f}%',
                            style: {
                                fontSize: '1.2em',
                                textOutline: 'none',
                                opacity: 0.7
                            },
                            filter: {
                                operator: '>',
                                property: 'percentage',
                                value: 10
                            }
                        }]
                    }
                },
                series: [
                    {
                        name: 'Percentage',
                        colorByPoint: true,
                        data: calculateGenderPercentage(users) 
                    }
                ]
            });
        }
        
    });

  


  return (
    <div className='m-10'>
        <div className='flex justify-between items-center'>
            <h2 className='text-[30px] font-semibold mb-2'>Dashboard</h2>
            <div className='flex gap-2 items-center'>
            <Link to={"/create"} className='p-2 bg-green-400 text-green-900 rounded-md'>Create</Link>
            <Link to={"/users"} className='p-2 bg-slate-200 text-slate-900 rounded-md'>View Users</Link>
            </div>
        </div>
      <div id="container" className='rounded-lg'></div>
    </div>
  );
};

export default Dashboard;
