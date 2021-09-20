import { Box, Button, makeStyles, Modal, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import '../../../index.scss'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    modalBox: {
        border: 'none',
        borderRadius: '10px',

    },
    '#standard-basic': {
        background: '#f5f5f5',
        borderRadius: '3px'
    },
    newTask: {
        width: '124px',
        height: '40px',
        background: '#5285EC 0% 0% no-repeat padding-box',
        borderRadius: '8px'
    }
}));

export function NewTaskModal(props) {
    const [name, setName] = useState('');
    const handleChange = (e) => setName(e.target.value);
    const classes = useStyles();


    useEffect(() => {
        setName(props.name);
    }, [props.name]);

    const handleClose = () => {

    }

    return (
        <>
            <Modal
                open={props.show}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={classes.modalBox}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" color="textSecondary">
                        + New Task
                     </Typography>
                    <div>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField id="standard-basic" placeholder="Task Name" style={{ width: '100%' }} onChange={(e) => handleChange(e)}
                                value={name} />
                            <Button
                                style={{ width: '100%' }}
                                disabled={!name}
                                className={classes.newTask}
                                variant="containedPrimary"
                                type="submit"
                                onClick={() => props.handleSubmit(name)}>
                                {props.name ? 'Update' : '+ new Task'}
                            </Button>
                        </form>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
