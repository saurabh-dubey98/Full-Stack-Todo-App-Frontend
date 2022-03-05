import axios from "axios"

export const getTasks = async (user, setTasks, setFilter) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    }
    try {
        const response = await axios.get(process.env.REACT_APP_TASK_API_URL, config)
        setTasks(response.data)
        response.data.sort((a, b) => {
            const date1 = new Date(a.dueDate)
            const date2 = new Date(b.dueDate)
            return date1 - date2
        })
        setFilter(response.data)
    } catch (error) {
        console.log(error);
    }
}

export const updateTaskStatus = async (user, taskData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    }
    try {
        await axios.put(process.env.REACT_APP_TASK_API_URL + "status/" + taskData.taskId, taskData, config)
    } catch (error) {
        alert("Some error occured while updateing the task")
    }
}

export const updateTask = async (user, taskData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    }
    try {
        await axios.put(process.env.REACT_APP_TASK_API_URL + taskData.taskId, taskData, config)
    } catch (error) {
        alert("Some error occured while updating the task")
    }
}

export const deleteTask = async (user, taskId, setFilter) => {
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    }

    try {
        await axios.delete(process.env.REACT_APP_TASK_API_URL + taskId, config)
        setFilter(prev => (
            prev.filter(task => task._id !== taskId)
        ))
    } catch (error) {
        console.log("Some error occured while deleting the task");
    }
}