import axios from "axios";

export const getSubTasks = async (taskId, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    }
    try {
        const response = await axios.get(process.env.REACT_APP_TASK_API_URL + taskId, config)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const createSubTask = async (taskData, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    }

    try {
        await axios.post(process.env.REACT_APP_TASK_API_URL + taskData.taskId, taskData, config)
    } catch (error) {
        alert("Some error occured while adding new tasks")
    }
}

export const updateSubTaskStatus = async (subTaskData, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    }
    try {
        await axios.put(process.env.REACT_APP_TASK_API_URL + "subtaskStatus/" + subTaskData.subTaskId, subTaskData, config)
    } catch (error) {
        alert("Some error occured while updateing the task")
    }
}

export const deleteSubTask = async (subTaskId, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    }

    try {
        await axios.delete(process.env.REACT_APP_TASK_API_URL + "subtask/" + subTaskId, config)
    } catch (error) {
        alert("Some error occured while deleting the subtask.")
    }
}