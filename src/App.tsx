import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";

//create +
//read +
//update +
//delete +
type todoListsType = { id: string, title: string, filter: FilterValuesType }
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    // BLL: бизнес логика
    let todolistsID1 = v1();
    let todolistsID2 = v1();

    let [todolists, setTodolist] = useState<Array<todoListsType>>([
        {id: todolistsID1, title: 'What to learn', filter: 'all'},
        {id: todolistsID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, setTasks] = useState({
        [todolistsID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistsID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });

    // delete task
    const removeTask = (todoListID: string, tasksId: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== tasksId)});
    };

    // create task
    const addTask = (todoListID: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        setTasks({...tasks, [todoListID]: [...tasks[todoListID], newTask]});
    };
    //update task (isDone)
    const changeTaskStatus = (todoListID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskId ? {...el, isDone} : el)});
    };
    const changeFilter = (todoListID: string, value: FilterValuesType) => {
        setTodolist(todolists.map(el => el.id === todoListID ? {...el, filter: value} : el))
    }
    const removeTodoList = (todoListID: string) => {
        setTodolist(todolists.filter(el => el.id !== todoListID));
        delete tasks[todoListID]
    }
    const addTodolist = (newTitle: string) => {
        const newID = v1();
        const newTodo: todoListsType = {id: newID, title: newTitle, filter: 'all'};
        setTodolist([...todolists, newTodo]);
        setTasks({...tasks, [newID]: []});
    }
    const updateTask = (todoListID: string, tasksId: string, newTaskTitle: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === tasksId ? {...el, title: newTaskTitle} : el)})
    }
    const updateTodoList = (todoListID: string, newTaskTitle: string) => {
        setTodolist(todolists.map(el => el.id === todoListID ? {...el, title: newTaskTitle} : el))
    }

    //UI интерфейс
    return (
        <div className="App">
            <AddItemForm callback={addTodolist}/>
            <div className='flexWrapper'>
                <div className='todoLists'>
                    {todolists.map(el => {
                        return (
                            <Todolist
                                key={el.id}
                                todoListID={el.id}
                                title={el.title}
                                tasks={tasks[el.id]}
                                removeTask={removeTask}
                                callback={addTask}
                                changeTaskStatus={changeTaskStatus}
                                changeFilter={changeFilter}
                                filter={el.filter}
                                removeTodoList={removeTodoList}
                                updateTask={updateTask}
                                updateTodoList={updateTodoList}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
