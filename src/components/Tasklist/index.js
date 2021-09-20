import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, Grid } from '@material-ui/core';
import { NewTaskModal } from './components/NewTaskModal';
import { addTask, deleteTask, editTask, geAllTask } from '../../service/customService';
import { Delete, Edit } from '@material-ui/icons';

function createData(id, name, completed) {
    return { id, name, completed };
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 300,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    tasklistHeading: {
        marginTop: '40px',
        marginBottom: '10px',

    },
    newTask: {
        width: '124px',
        height: '40px',
        background: '#5285EC 0% 0% no-repeat padding-box',
        borderRadius: '8px'
    },
    title: {
        color: '#537178',
        fontSize: '24px',
        fontFamily: 'Montserrat'
    }
}));

export default function EnhancedTable(props) {
    const classes = useStyles();
    const [selected, setSelected] = React.useState([]);
    const [dense, setDense] = React.useState(false);
    const [newTask, setNewTask] = React.useState(false);
    const [selectedTaskName, setSelectedTaskName] = React.useState('');
    const [tasklist, setTaskList] = React.useState([]);


    useEffect(() => {
        getAllTaskDetails()
    }, [])


    useEffect(() => {
        if (props.dashboardData && props.dashboardData.totalTasks != tasklist.length) {
            getAllTaskDetails()
        }
    })

    const getAllTaskDetails = () => {
        geAllTask().then(response => {
            if (response.success) {
                const tasks = response.data.tasks
                if (tasks.length > 0) {
                    const taskRows = []
                    tasks.map(task => {
                        taskRows.push(createData(task._id, task.name, task.completed))
                    })
                    setTaskList(taskRows)
                } else {
                    setTaskList([])
                }
            }
        })
    }


    const handleClick = (event, row) => {
        const requestBody = { id: row.id, name: row.name, completed: event.target.checked }
        editTask(requestBody).then(response => {
            if (response.success) {
                getAllTaskDetails()
                props.refresh()
            }
        })
    };


    const isSelected = (name) => selected.indexOf(name) !== -1;

    const handleNewTask = () => {
        setNewTask(true)
    }

    const onSaveNewTask = (name) => {
        setNewTask(false)
        if (selectedTaskName) {
            const requestBody = { id: selectedTaskName.id, name: name, completed: selectedTaskName.completed }
            editTask(requestBody).then(response => {
                if (response.success) {
                    getAllTaskDetails()
                    setSelectedTaskName('')
                    props.refresh()
                }
            })
        }
        else {
            const requestBody = { name: name, completed: false }
            addTask(requestBody).then(response => {
                if (response.success) {
                    getAllTaskDetails()
                    props.refresh()
                }
            })
        }

    }

    const handleEdit = (row) => {
        setSelectedTaskName(row)
        setNewTask(true)
    }


    const handleDelete = (id) => {
        deleteTask(id).then(response => {
            if (response.success) {
                getAllTaskDetails()
                props.refresh()
            }
        })

    }


    return (
        <div className={classes.root}>
            <Grid container spacing={0} className={classes.tasklistHeading}>
                <Grid item xs={6} style={{ textAlign: 'left' }}>
                    <span align="left" className={classes.title}>Tasks</span>
                </Grid>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={3} style={{ textAlign: 'right' }}>
                    <Button variant="containedPrimary" className={classes.newTask} containedPrimary
                        align="right" onClick={() => handleNewTask()}
                    >+ Add Task</Button>
                </Grid>
            </Grid>

            <Paper className={classes.paper}>
                <TableContainer className="tasklist-table">
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <TableBody className="tasklist-table">
                            {(tasklist.length > 0) && tasklist.map((row, index) => {
                                const isItemSelected = isSelected(row.completed);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.name}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={row.completed}
                                                onClick={(event) => handleClick(event, row)}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                            {row.completed && <s> {row.name}</s>}
                                            {!row.completed && <span> {row.name}</span>}

                                        </TableCell>
                                        <TableCell align="right"><Edit onClick={() => handleEdit(row)} /> <Delete onClick={() => handleDelete(row.id)} /></TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>

                    </Table>
                </TableContainer>
            </Paper>

            <NewTaskModal
                show={newTask}
                name={selectedTaskName.name}
                handleSubmit={(name) => onSaveNewTask(name)}
            />
        </div>
    );
}
