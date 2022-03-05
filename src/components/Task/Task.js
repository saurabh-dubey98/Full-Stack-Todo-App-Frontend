import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import "./Task.css"
import { FaEdit, FaTrash } from 'react-icons/fa'
import { createSubTask, getSubTasks } from '../../lib/subtask'
import { SubTask, Modal } from '..'

const Task = ({ openModal, modalName, task, updateStatus, setEditId, setTaskInfo, deleteTask, setFilter }) => {
    const { title, desc, _id, dueDate, remindBefore } = task
    const [subTasks, setSubtask] = useState([])
    const [taskComplete, setTaskComplete] = useState(false)
    const [subTaskTitle, setSubTaskTitle] = useState('')
    const [modalToggle, setModalToggle] = useState(false)
    const { user } = useSelector(state => state.auth)
    const date = new Date(dueDate)
    const addSubtask = async (e) => {
        e.preventDefault()

        if (!subTaskTitle) {
            return alert('Sub task title is required')
        }
        createSubTask({
            taskId: _id,
            title: subTaskTitle,
            subtaskState: false
        }, user)
        setModalToggle(false)
        setSubTaskTitle('')
        const subtasksList = await getSubTasks(_id, user)
        setSubtask(subtasksList)
    }

    const taskStatusChange = (e) => {
        setTaskComplete(e.target.checked)
        updateStatus(user, {
            taskId: _id,
            taskState: e.target.checked
        })
    }

    useEffect(() => {
        const asyncFunc = async () => {
            const subtasksList = await getSubTasks(_id, user)
            setSubtask(subtasksList)
            setTaskComplete(task.taskState)
        }
        asyncFunc()
    }, [modalToggle, task, subTaskTitle, _id, user])

    return (
        <div className="task-subtask-container">
            <div className="task-section-container">
                <div className="task-item">
                    <div>
                        <input type="checkbox" checked={`${taskComplete ? 'checked' : ''}`} value={taskComplete} onChange={taskStatusChange} />
                        <h2 className={`${taskComplete && 'completedTaskStyle'}`}>{title}</h2>
                    </div>
                    <p>{desc}</p>
                </div>
                <div className="reminder-container">
                    <div className="due-date">
                        Due date: <span>{date.toLocaleString()}</span>
                    </div>
                </div>
                <div className="task-item-left">
                    <div className="delete-and-edit-btn-container">
                        <FaEdit className="task-edit-btn" onClick={() => {
                            openModal(true);
                            modalName('Edit Task');
                            setEditId(_id);
                            setTaskInfo({
                                taskTitle: title,
                                taskDesc: desc,
                                dueDate: dueDate,
                                remindBefore: remindBefore
                            })
                        }} />
                        <FaTrash className="task-delete-btn" onClick={() => deleteTask(user, _id, setFilter)} />
                    </div>
                </div>
            </div>

            {/* Add subtask */}
            <button className="add-sub-task" onClick={() => setModalToggle(true)}>Add sub task</button>


            {/* Subtasks */}
            <div className="subtask-section-container">
                {subTasks.length < 0 ? <div>No subtasks found</div> : <> {subTasks.map(subtask => <SubTask setSubtask={setSubtask} key={subtask._id} taskComplete={taskComplete} subtask={subtask} user={user} />)}</>}

            </div>
            {modalToggle && <Modal modalToggle={setModalToggle} addTaskForm={addSubtask}>
                <div className="add-task-form">
                    <h2>Add Sub Task</h2>
                    <div>
                        <div className="form-group">
                            <label htmlFor="subtasktitle">Title</label>
                            <input onChange={e => setSubTaskTitle(e.target.value)} value={subTaskTitle} id="subtasktitle" placeholder="Enter title" type="text" />
                        </div>

                    </div>
                </div>
            </Modal>}
        </div >
    )
}

export default Task