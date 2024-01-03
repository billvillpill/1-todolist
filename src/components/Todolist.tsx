import React, {ChangeEvent, FC, useState} from 'react';
import {MyButton} from './MyButton';
import {TaskList} from './TaskList';
import {FilterValuesType} from '../App';
import {AddItemForm} from "./AddItemForm";

type TodolistPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, tasksId: string) => void
    callback: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    removeTodoList: (todoListID: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
// export const Todolist = (props: TodolistPropsType): React.ReactNode => {   --
// React.ReactNode говорит, что компонента должна вернуть react элемент jsx element
// нужно обязательно указывать, что это именно реакт компонента, и это можно сделать разными способами

export const Todolist: FC<TodolistPropsType> = (
    {
        todoListID,
        title,
        tasks,
        removeTask,
        callback,
        changeTaskStatus,
        filter,
        changeFilter,
        removeTodoList
    }) => {
    const [isCollapsedTodo, setIsCollapsedTodo] = useState(false)


    const tasksList = <TaskList
        todoListID={todoListID}
        tasks={tasks}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
        filter={filter}
        changeFilter={changeFilter}
    />
    const removeTodoListHundler = () => {
        removeTodoList(todoListID)
    }
    const addTaskHandler = (title: string) => {
        callback(todoListID, title)
    }

    return (
        <div className={'todoList'}>
            <div className={'header'}>
                <h3>{title}</h3>
                <MyButton
                    name={"x"}
                    onClickHandler={removeTodoListHundler}
                    classes='delete-todolist'
                />
            </div>

            <div className='taskList-info'>
                <div>
                    <div><span>{isCollapsedTodo ? 'show' : 'hide'}</span></div>
                    <input
                        type='checkbox'
                        checked={isCollapsedTodo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setIsCollapsedTodo(e.currentTarget.checked)}
                    />
                </div>
                <div>All task:<div className='info'><span>{tasks.length}</span></div></div>
            </div>

            <AddItemForm callback={addTaskHandler} />

            {isCollapsedTodo ? null : tasksList}
        </div>
    );
};
