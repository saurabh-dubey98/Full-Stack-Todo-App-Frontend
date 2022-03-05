import React from 'react'
import ReactDOM from 'react-dom'
import "./Modal.css"
import { Card } from '..'

const Modal = ({ modalToggle, children, addTaskForm }) => {
    return ReactDOM.createPortal(<>
        <div className="overlay" onClick={() => modalToggle(false)}>
        </div>
        <div className="modal-container">
            <div className="modal">
                <Card>
                    <form onSubmit={addTaskForm}>
                        {children}
                        <div className="modal-btns">
                            <button className="modal-submit-btn" type="submit">Submit</button>
                            <button className="modal-close-btn" onClick={() => modalToggle(false)}>Close</button>
                        </div>
                    </form>

                </Card>
            </div>
        </div>
    </>, document.getElementById('portal'))
}

export default Modal