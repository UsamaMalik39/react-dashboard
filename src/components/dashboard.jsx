import React , { useEffect } from 'react';
import Highcharts from 'highcharts';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    useEffect(() => {
        Highcharts.chart('container', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Egg Yolk Composition'
            },
            tooltip: {
                valueSuffix: '%'
            },
            subtitle: {
                text:
                'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
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
                    data: [
                        {
                            name: 'Water',
                            y: 55.02
                        },
                        {
                            name: 'Fat',
                            sliced: true,
                            selected: true,
                            y: 26.71
                        },
                        {
                            name: 'Carbohydrates',
                            y: 1.09
                        },
                        {
                            name: 'Protein',
                            y: 15.5
                        },
                        {
                            name: 'Ash',
                            y: 1.68
                        }
                    ]
                }
            ]
            });
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
