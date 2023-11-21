import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";

//create
//read
//update
//delete

function App() {
    //BLL: бизнес логика
    const todoListTitle_1: string = "What to learn"
    const todoListTitle_2: string = "What to buy"

    const task_1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "JS/ES6", isDone: false},
        {id: 3, title: "REACT", isDone: false},

    ];
    const task_2: Array<TaskType> = [
        {id: 4, title: "Beer", isDone: true},
        {id: 5, title: "Dried Fish", isDone: false},
        {id: 6, title: "Cheeps", isDone: false},
        {id: 7, title: "Sausages", isDone: false},
        {id: 8, title: "Сheese", isDone: true},
        {id: 9, title: "Сhicken", isDone: true},

    ];

    //UI интерфейс
    return (
        <div className="App">
            <Todolist title={todoListTitle_1} tasks={task_1} />
            <Todolist title={todoListTitle_2} tasks={task_2} />
        </div>
    );
}

export default App;
