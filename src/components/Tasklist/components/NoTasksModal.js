import { Box, Button, makeStyles, Modal, Typography } from '@material-ui/core';
import React from 'react';
import '../../../index.scss'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 308,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    textAlign: 'center',
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
    newTask: {
        width: '124px',
        height: '40px',
        background: '#5285EC 0% 0% no-repeat padding-box',
        borderRadius: '8px'
    }
}));

export function NoTaskModal(props) {
    const classes = useStyles();

    const handleClose = () => {

    }

    return (
        <>
            <Modal
                open={props.show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={classes.modalBox}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" color="textSecondary">
                        You Have no task.
                    </Typography>
                    <div>
                        <form className={classes.root} noValidate autoComplete="off">
                            <Button
                                style={{ width: '100%' }}
                                className={classes.newTask + ' addNewTask'}
                                variant="containedPrimary"
                                type="submit"
                                onClick={() => props.handleSubmit()}>
                                + new Task
                </Button>
                        </form>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
