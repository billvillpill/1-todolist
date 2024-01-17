import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from './components/ButtonApp';
import {
    addTaskReducer,
    changeTaskStatusReducer,
    removeTaskReducer,
    newTasksReducer,
    tasksReducer,
    updateTasksReducer
} from './reducers/tasksReducer';
import {
    ChangeTodoListsReducer,
    NewTodolistReducer,
    removeTodoListsReducer,
    todoListsReducer, UpdateTodolistReducer
} from './reducers/todoListsReducer';

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
    /*TASKS*/
    // delete task
    const removeTask = (todoListID: string, taskId: string) => {
        dispatchTasks(removeTaskReducer(todoListID, taskId))
    };

    // create task
    const addTask = (todoListID: string, title: string) => {
        dispatchTasks(addTaskReducer(todoListID, title))
    };

    //update task (title)
    const updateTask = (todoListID: string, taskId: string, newTaskTitle: string) => {
        dispatchTasks(updateTasksReducer(todoListID, taskId, newTaskTitle))
    }

    //update task (isDone)
    const changeTaskStatus = (todoListID: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusReducer(todoListID, taskId, isDone))
    };


    /*TODOLISTS */
    // delete todolist
    const removeTodoList = (todoListID: string) => {
        dispatchTodolist(removeTodoListsReducer(todoListID))
        delete tasks[todoListID]
    }

    // create todolist
    const createTodolist = (newTitle: string) => {
        const newID = v1();
        dispatchTodolist(NewTodolistReducer(newID, newTitle));
        dispatchTasks(newTasksReducer(newID));
    }

    //update todolist (title)
    const updateTodoList = (todoListID: string, newTaskTitle: string) => {
        dispatchTodolist(UpdateTodolistReducer(todoListID, newTaskTitle))
    }

    //update todoLists (filter)
    const changeFilter = (todoListID: string, value: FilterValuesType) => {
        dispatchTodolist(ChangeTodoListsReducer(todoListID, value))
    }

    let todolistsID1 = v1();
    let todolistsID2 = v1();

    let [todoLists, dispatchTodolist] = useReducer(todoListsReducer,[
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
    //UI интерфейс
    return (
        <div className="App">
            {/*header*/}
            <ButtonAppBar />
            <div className='container'>
                {/* new TodoList*/}
                <AddItemForm callback={createTodolist} placeholder={'text'}/>
                <div className='flexWrapper'>
                    <div className='todoLists'>
                        {todoLists.map(el => {
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
