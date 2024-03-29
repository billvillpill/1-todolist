import React, {ChangeEvent, FC, useState} from 'react';
import {TaskList} from './TaskList';
import {FilterValuesType} from '../App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';


type TodolistPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, tasksId: string) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    removeTodoList: (todoListID: string) => void
    updateTask: (todoListID: string, tasksId: string, newTaskTitle: string) => void
    updateTodoList: (todoListID: string, newTaskTitle: string) => void
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
        addTask,
        changeTaskStatus,
        filter,
        changeFilter,
        removeTodoList,
        updateTask,
        updateTodoList
    }) => {
    const [isCollapsedTodo, setIsCollapsedTodo] = useState(false)


    const tasksList = <TaskList
        todoListID={todoListID}
        tasks={tasks}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
        filter={filter}
        changeFilter={changeFilter}
        updateTask={updateTask}
    />
    const removeTodoListHundler = () => {
        removeTodoList(todoListID)
    }
    const addTaskHandler = (title: string) => {
        addTask(todoListID, title)
    }
    const updateTodoListHandler = (newTaskTitle: string) => {
        updateTodoList(todoListID, newTaskTitle)
    }



    return (
        <div className={'todoList'}>
            <div className={'header'}>
                {/*Заголовок todoList*/}
                <h3><EditableSpan oldTitle={title} callBack={updateTodoListHandler} />
                </h3>
                {/*кнопка удаления todoList*/}
                    <IconButton aria-label="delete" >
                        <DeleteIcon onClick={removeTodoListHundler} sx={{ "&:hover": { color: "red" } }} />
                    </IconButton>

                {/*<MyButton*/}
                {/*    name={"x"}*/}
                {/*    onClickHandler={removeTodoListHundler}*/}
                {/*    classes='delete-todolist'*/}
                {/*/>*/}
            </div>

            <div className='taskList-info'>
                <div>
                    {/*показать или скрыть таски и кнопки all, active, completed*/}
                    <div><span>{isCollapsedTodo ? 'show' : 'hide'}</span></div>
                    <Switch  defaultChecked={isCollapsedTodo} onChange={(e: ChangeEvent<HTMLInputElement>) => setIsCollapsedTodo(e.currentTarget.checked)} size="small" />
                    {/*<input
                        type='checkbox'
                        checked={isCollapsedTodo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setIsCollapsedTodo(e.currentTarget.checked)}
                    />*/}
                </div>
                <div>All task:<div className='info'><span>{tasks.length}</span></div></div>
            </div>


            <AddItemForm callback={addTaskHandler} placeholder={'text'}/>

            {isCollapsedTodo ? null : tasksList}
        </div>
    );
};
