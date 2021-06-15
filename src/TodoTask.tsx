import React from 'react';
import {ITask} from './interface'
import './App.css'

interface Props {
    task: ITask;
    completeTask(keyToDelete: string): void;
    onChangeEdit(event: any, keyToEdit: string): void;
    changeStatusEdit(keyToChangeStatusEdit: string): Promise<void>
}

const TodoTask = ({ task, completeTask, changeStatusEdit, onChangeEdit }: Props) => {
    return (
        <div className="task">
            <div className="content">
                {
                    task.edit
                    ? <>
                        <span><input type="text" name="task" placeholder="Task..." value={task.taskName} onChange={(event) => onChangeEdit(event, task.key)}/></span>
                        <span><input type="number" name="deadline" placeholder="Deadline (in Days)..." value={task.deadline} onChange={(event) => onChangeEdit(event, task.key)}/></span>
                        {/* <button onClick={() => {completeTask(task.key)}}>
                            X
                        </button> */}
                        <button onClick={() => {changeStatusEdit(task.key)}}>
                            Ok
                        </button>
                    </>
                    : <>
                        <span>{task.taskName}</span>
                        <span>{task.deadline}</span>
                        <button onClick={() => {completeTask(task.key)}}>
                            X
                        </button>
                        <button onClick={() => {changeStatusEdit(task.key)}}>
                            edit
                        </button>
                    </>
                }
                
            </div>
        </div>
    )
}

export default TodoTask