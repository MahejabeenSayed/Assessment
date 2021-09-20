import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { Pie } from 'react-chartjs-2';

const state = {
    datasets: [
        {
            label: 'Rainfall',
            backgroundColor: [
                'blue',
                '#ccc',
            ],
            hoverBackgroundColor: [
                '#501800',
                '#4B5000',
            ],
            data: []
        }
    ]
}

export default function Summary(props) {
    const [data, setData] = React.useState([]);
    const [chart, setChart] = React.useState(state);

    useEffect(() => {
        if (props.dashboardData && data !== props.dashboardData) {
            getSummaryDetails()
        }
    })

    const getSummaryDetails = () => {
        setData(props.dashboardData)
        let pieData = { ...state };
        pieData.datasets[0].data = []
        pieData.datasets[0].data.push(props.dashboardData.tasksCompleted)
        pieData.datasets[0].data.push((props.dashboardData.totalTasks - props.dashboardData.tasksCompleted))
        setChart({
            ...pieData
        });
    }

    return (
        <div>
            <Grid container spacing={3} style={{marginTop : '22px'}}>
                <Grid item xs={12} md={4} lg={4}>
                    <Card className="info-card">
                        <CardHeader title=" Tasks Completed">                           
                        </CardHeader>
                        <CardContent>
                            <div className="card-text">
                                <span className="large-num" color="primary">{data ? data.tasksCompleted : 0}</span>
                                <span>/{data ? data.totalTasks : 0}</span>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                <Card className="info-card">
                        <CardHeader title="Latest Created Tasks">
                           
                        </CardHeader>
                        <CardContent>
                        <ul>
                                    {data && data.latestTasks && data.latestTasks.length > 0 && data.latestTasks.map(task => {
                                        return (
                                            <li>
                                                {task.completed && <s> {task.name}</s>}
                                                {!task.completed && <span> {task.name}</span>}
                                            </li>
                                        )
                                    })}
                                </ul>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                <Card className="info-card">
                        <CardContent>
                        <div style={{ width: '150px', margin: 'auto' }}>
                                {chart && <Pie height="100" width="100"
                                    data={chart}
                                    options={{
                                        title: {
                                            display: true,
                                            text: 'Average Rainfall per month',
                                            fontSize: 20
                                        },
                                        legend: {
                                            display: true,
                                            position: 'right'
                                        }
                                    }}
                                />
                                }
                            </div>
                       
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}