import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {MyButton} from './MyButton';
import {TaskList} from './TaskList';
import {FilterValuesType} from '../App';

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
        removeTodoList
    }) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [inputError, setInputError] = useState(false)
    const [isCollapsedTodo, setIsCollapsedTodo] = useState(false)


    // проверка на длину вводимого сообщения
    // лучше функцию прокидывать через props, тут не писать
    const maxTitleLengthError = newTaskTitle.length >= 15
    const onChangeSetTitle = (event: ChangeEvent<HTMLInputElement>) => {
        inputError && setInputError(false)
        if(event.currentTarget.value.length <= 15) {
            setNewTaskTitle(event.currentTarget.value)
        }
    }

    const onKeyDownAddTeask = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && Boolean(newTaskTitle) && onClickAddTask()
    }

    const onClickAddTask = () => {
        const trimmedTittle = newTaskTitle.trim()
        if (trimmedTittle) {
            addTask(todoListID, trimmedTittle)
        } else {
            setInputError(true)
        }
        setNewTaskTitle('')
    }

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

            <div className={'taskForm'}>
                <input
                    value={newTaskTitle}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTeask}
                    className={inputError || maxTitleLengthError ? 'inputError' : 'inputDefault' }
                />
                <MyButton
                    name={"+"}
                    onClickHandler={onClickAddTask}
                    disabled={!newTaskTitle || maxTitleLengthError}
                    classes={'btn-active'}
                />
            </div>

            {inputError && <div style={{color: 'red'}}>
                <p>Please, enter correct title</p>
            </div>}
            {maxTitleLengthError && <div style={{color: 'red'}}>
                <p>Your tasktitle is too long.</p>
                <p> Maximum length 15 characters.</p>
            </div>}

            {isCollapsedTodo ? null : tasksList}
        </div>
    );
};
