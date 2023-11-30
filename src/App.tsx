import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from 'uuid';

//create
//read +
//update
//delete +

function App() {
    // BLL: бизнес логика
    const todoListTitle_1: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS/ES6", isDone: false},
        {id: v1(), title: "REACT", isDone: false},

    ])

    // delete task
    const removeTask = (tasksId: string) => {
        setTasks(tasks.filter((t)=> t.id !== tasksId))
    }

    // create task
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask,...tasks])
    }

    //UI интерфейс
    return (
        <div className="App">
            <Todolist
                title={todoListTitle_1}
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
