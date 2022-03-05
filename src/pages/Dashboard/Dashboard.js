import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import "./Dashboard.css"
import { Task, Modal } from '../../components'
import { getTasks, updateTaskStatus, updateTask, deleteTask } from '../../lib/task'

const Dashboard = () => {
    const [modalToggle, setModalToggle] = useState(false)
    const [modalHeading, setModalHeading] = useState('')
    const [tasks, setTasks] = useState([])
    const [EditId, setEditId] = useState('')
    const [filter, setFilter] = useState([])
    const [taskInfo, setTaskInfo] = useState({
        taskTitle: '',
        taskDesc: '',
        dueDate: '',
        remindBefore: ''
    })

    const { taskTitle, taskDesc, dueDate, remindBefore } = taskInfo
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)

    const taskChangeHandler = e => {
        setTaskInfo(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const createTask = async (taskData) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        }

        try {
            await axios.post(process.env.REACT_APP_TASK_API_URL, taskData, config)
            getTasks(user, setTasks, setFilter)
        } catch (error) {
            alert("Some error occured while adding new tasks")
        }
    }

    const addTaskForm = (e) => {
        e.preventDefault()
        if (!taskTitle || !taskDesc || !dueDate) {
            return alert('All the field are required')
        }
        if (modalHeading === "Edit Task") {
            const foundTask = tasks.find(item => item._id === EditId)
            console.log(foundTask);
            updateTask(user, {
                taskId: EditId,
                title: taskTitle,
                desc: taskDesc,
                dueDate: dueDate,
                remindBefore: remindBefore
            })
        } else {
            createTask({
                title: taskTitle,
                desc: taskDesc,
                dueDate: dueDate,
                taskState: false,
                remindBefore: remindBefore
            })
            setTaskInfo({
                taskTitle: '',
                taskDesc: '',
                dueDate: '',
                remindBefore: ''
            })
        }
        setModalToggle(false)
    }

    const filterHandler = e => {
        const filterValue = e.target.value
        const currentData = new Date()
        if (filterValue === "today") {

            const filteredTasks = tasks.filter(task => {
                const dueDate = new Date(task.dueDate)
                const diffBetweenDates = Math.round((dueDate - currentData) / (1000 * 60 * 60 * 24))
                if (diffBetweenDates <= 1) {
                    return task
                }
            })
            setFilter(filteredTasks)
        }
        if (filterValue === "this week") {

            const filteredTasks = tasks.filter(task => {
                const dueDate = new Date(task.dueDate)
                const diffBetweenDates = Math.round((dueDate - currentData) / (1000 * 60 * 60 * 24))
                if (diffBetweenDates <= 7) {
                    return task
                }
            })
            setFilter(filteredTasks)
        }
        if (filterValue === "next week") {

            const filteredTasks = tasks.filter(task => {
                const dueDate = new Date(task.dueDate)
                const diffBetweenDates = Math.round((dueDate - currentData) / (1000 * 60 * 60 * 24))
                if (diffBetweenDates > 7 && diffBetweenDates < 14) {
                    return task
                }
            })
            setFilter(filteredTasks)
        }
        if (filterValue === "overdue") {

            const filteredTasks = tasks.filter(task => {
                const dueDate = new Date(task.dueDate)
                const diffBetweenDates = Math.round((dueDate - currentData) / (1000 * 60 * 60 * 24))
                if (diffBetweenDates > 14) {
                    return task
                }
            })
            setFilter(filteredTasks)
        }
        if (filterValue === "completed") {
            const filteredTasks = tasks.filter(task => {
                if (task.taskState) {
                    return task
                }
            })
            setFilter(filteredTasks)
        }
        if (filterValue === "show all") {
            getTasks(user, setTasks, setFilter)
        }
    }

    const searchHandler = e => {
        const searchResult = tasks.filter(task => task.title.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilter(searchResult)
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
        if (!user) {
            navigate('/login')
        }
        getTasks(user, setTasks, setFilter)
    }, [navigate, user])

    if (tasks.length < 0) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <button className="add-task-btn" onClick={() => { setModalToggle(true); setModalHeading("Add Task") }}>Add Task</button>
            {modalToggle && <Modal modalToggle={setModalToggle} addTaskForm={addTaskForm}>
                <div className="add-task-form">
                    <h2>{modalHeading}</h2>
                    <div>
                        <div className="form-group">
                            <label htmlFor="tasktitle">Title</label>
                            <input onChange={taskChangeHandler} name="taskTitle" value={taskTitle} id="tasktitle" placeholder="Enter title" type="text" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="desc">Description</label>
                            <input onChange={taskChangeHandler} name="taskDesc" value={taskDesc} id="desc" placeholder="Enter description" type="text" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="duedate">Due date</label>
                            <input onChange={taskChangeHandler} name="dueDate" value={dueDate} id="duedate" placeholder="Enter due date" type="datetime-local" />
                        </div>
                        <div className="form-group">
                            <select id="remindMe" onChange={taskChangeHandler} name="remindBefore" value={remindBefore} required>
                                <option selected disabled>Remind me before</option>
                                <option value="0">At the due date</option>
                                <option value="1">1 Hour</option>
                                <option value="2">2 Hour</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Modal>}
            {/* Search and filters */}
            <div className="search-filter">
                <div className="filter-container">
                    <div>
                        {/* <label htmlFor="filter">Filter tasks</label> */}
                        <select id="filter" onChange={filterHandler}>
                            <option selected disabled>Filter</option>
                            <option value="show all">Show All</option>
                            <option value="today">Today</option>
                            <option value="this week">This week</option>
                            <option value="next week">Next Week</option>
                            <option value="overdue">Overdue</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
                <div className="search-container">
                    <input id="search" onChange={searchHandler} type="text" placeholder="Search" />
                </div>
            </div>

            <hr className="hr-line" />

            {/* Task */}
            {filter.length > 0 ? <>{filter?.map(task => <Task key={task._id} setFilter={setFilter} deleteTask={deleteTask} setTaskInfo={setTaskInfo} setEditId={setEditId} updateTask={updateTask} task={task} openModal={setModalToggle} modalName={setModalHeading} updateStatus={updateTaskStatus} />)}</> : <div>There are no tasks</div>}

        </div>
    )
}

export default Dashboard