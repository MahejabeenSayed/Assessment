import React, { useEffect } from "react";
import Header from "./Header";
import Summary from "./Summary";
import Tasklist from "./Tasklist";
import { NoTaskModal } from "./Tasklist/components/NoTasksModal";
import { useHistory } from "react-router-dom";
import { addTask, getSummary } from "../service/customService";
import { NewTaskModal } from "./Tasklist/components/NewTaskModal";
import { Container } from "@material-ui/core";


export default function Dashboard() {
    const [newTask, setNewTask] = React.useState(false);
    const [noTask, setNoTask] = React.useState(false);
    const [dashboardData, setDashboardData] = React.useState();
    let history = useHistory();

    useEffect(() => {
        if (!sessionStorage.getItem('react-token')) {
            history.push('/sign-in')
        }
        getDashboardDetails()
    }, [])

    const onNewTask = () => {
        setNoTask(false)
        setNewTask(true)
    }

    const getDashboardDetails = () => {
        getSummary().then(response => {
            if (response.success) {
                if (response.data && response.data.totalTasks == 0) {
                    setNoTask(true)
                    setDashboardData(response.data)
                }
                else {
                    setDashboardData(response.data)
                }
            }
        })
    }

    const onSaveNewTask = (name) => {
        setNewTask(false)
        const requestBody = { name: name, completed: false }
        addTask(requestBody).then(response => {
            if (response.success) {
                getDashboardDetails()
            } 
        })
    }

    return (
        <>
            <div>
                <Header />
                <Container maxWidth="md">
                    {dashboardData && <Summary dashboardData={dashboardData} />}
                    <Tasklist dashboardData={dashboardData} refresh={getDashboardDetails} />

                    <NoTaskModal
                        show={noTask}
                        onHide={() => setNoTask(false)}
                        handleSubmit={() => onNewTask()}
                    />

                    <NewTaskModal
                        show={newTask}
                        handleSubmit={(name) => onSaveNewTask(name)}
                    />
                </Container>
            </div>
        </>
    );
}