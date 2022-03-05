import { useState } from 'react'
import { HiX } from 'react-icons/hi'
import { updateSubTaskStatus, deleteSubTask } from '../../lib/subtask'
import "./SubTask.css"

const SubTask = ({ taskComplete, subtask, user, setSubtask }) => {
    const [subTaskComplete, setSubTaskComplete] = useState(subtask.subtaskState)

    const taskStatusChange = (e) => {
        setSubTaskComplete(e.target.checked)
        updateSubTaskStatus({
            subTaskId: subtask._id,
            subtaskState: e.target.checked
        }, user)
    }
    return (
        <div className="subtask-container">
            <input type="checkbox" checked={`${subTaskComplete || taskComplete ? 'checked' : ''}`} value={subTaskComplete} onChange={taskStatusChange} />
            <HiX className="dubtask_delete-btn" onClick={() => {
                deleteSubTask(subtask._id, user)
                setSubtask(prev => prev.filter(sub => sub._id !== subtask._id))
            }} />
            <h4 className={`${taskComplete && 'subTaskCompleteStyle'} ${subTaskComplete && 'subTaskCompleteStyle'}`}>{subtask.title}</h4>
        </div >
    )
}

export default SubTask