import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from './components/ButtonApp';
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    newTasksAC,
    tasksReducer, updateTasksAC
} from './reducers/tasksReducer';

//create +
//read +
//update +
//delete +

export type FilterValuesType = 'all' | 'active' | 'completed'
export type todoListsType = { id: string, title: string, filter: FilterValuesType }
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    // BLL: бизнес логика
    let todolistsID1 = v1();
    let todolistsID2 = v1();

    let [todolists, setTodolist] = useState<Array<todoListsType>>([
        {id: todolistsID1, title: 'What to learn', filter: 'all'},
        {id: todolistsID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
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

    /*TASKS*/
    // delete task
    const removeTask = (todoListID: string, taskId: string) => {
        dispatchTasks(removeTaskAC(todoListID, taskId))
    };

    // create task
    const addTask = (todoListID: string, title: string) => {
        dispatchTasks(addTaskAC(todoListID, title))
    };

    //update task (title)
    const updateTask = (todoListID: string, taskId: string, newTaskTitle: string) => {
        dispatchTasks(updateTasksAC(todoListID, taskId, newTaskTitle))
    }

    //update task (isDone)
    const changeTaskStatus = (todoListID: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todoListID, taskId, isDone))
    };


    /*TODOLISTS ----------- нужно сделать useReducer для TODOLISTS--------------*/
    // delete todolist
    const removeTodoList = (todoListID: string) => {
        setTodolist(todolists.filter(el => el.id !== todoListID));
        delete tasks[todoListID]
    }

    // create todolist
    const addTodolist = (newTitle: string) => {
        const newID = v1();
        const newTodo: todoListsType = {id: newID, title: newTitle, filter: 'all'};
        setTodolist([...todolists, newTodo]);
        dispatchTasks(newTasksAC(newID));
    }

    //update todolist (title)
    const updateTodoList = (todoListID: string, newTaskTitle: string) => {
        setTodolist(todolists.map(el => el.id === todoListID ? {...el, title: newTaskTitle} : el))
    }

    //update todolists (filter)
    const changeFilter = (todoListID: string, value: FilterValuesType) => {
        setTodolist(todolists.map(el => el.id === todoListID ? {...el, filter: value} : el))
    }

    //UI интерфейс
    return (
        <div className="App">
            <ButtonAppBar />
            <div className='container'>
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
                                    addTask={addTask}
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
        </div>
    );
}

export default App;
