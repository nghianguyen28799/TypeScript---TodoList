import React from 'react';
import "./App.css"
import {ITask} from './interface'
import TodoTask from './TodoTask'
const App: React.FC = () => {
  const [task, setTask] = React.useState<string>("");
  const [deadline, setDeadline] = React.useState<number>(0);
  const [todoList, setTodoList] = React.useState<ITask[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };
  
  const addTask = (): void => {
    const newTask = { 
      taskName: task, 
      deadline: deadline, 
      key: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 7),
      edit: false,
    };
    const handleAdd = [...todoList, newTask]
    setTodoList(handleAdd);
  }

  const completeTask = (keyToDelete: string): void => {
    setTodoList(todoList.filter((task) => {
      return task.key != keyToDelete;
    }))
  }

  const changeStatusEdit = async (keyToChangeStatusEdit: string): Promise<void> => {
    setTodoList(await todoList.map(task => {
      return task.key == keyToChangeStatusEdit ? {...task, edit: !task.edit} : task
    }))
  }

  const onChangeEdit = async (event: React.ChangeEvent<HTMLInputElement>, keyToEdit: string): Promise<void> => {
    if(event.target.name === "task") {
      setTodoList(await todoList.map(task => {
        return task.key == keyToEdit ? {...task, taskName: event.target.value} : task
      }))
    } else {
      setTodoList(await todoList.map(task => {
        return task.key == keyToEdit ? {...task, deadline: Number(event.target.value)} : task
      }))
    }
  }

  return (
    <div className="App">
      <div className="header">
        <h3>Todo List</h3>
        <div className="headerContainer">
          <div className="inputContainer">
            <input type="text" name="task" placeholder="Task..." onChange={(event) => handleChange(event)} />
            <input type="number" name="deadline" placeholder="Deadline (in Days)..." onChange={(event) => handleChange(event)} />  
          </div>
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask 
            key={key} 
            task={task} 
            completeTask={completeTask} 
            changeStatusEdit={changeStatusEdit}
            onChangeEdit={onChangeEdit}
          />
        })}
      </div>
    </div>
  );
}

export default App;
