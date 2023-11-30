import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {MyButton} from "./MyButton";
import {TaskList} from "./TaskList";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (tasksId: string) => void
    addTask: (title: string) => void
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
        title,
        tasks,
        removeTask,
        addTask
    }) => {
    let [newTaskTitle, setNewTaskTitle] = useState('')

    // проверка на длину вводимого сообщения
    // лучше функцию прокидывать через props, тут не писать
    const maxTitleLengthError = newTaskTitle.length >= 15
    const onChangeInputHadler = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.value.length <= 15) {
            setNewTaskTitle(event.currentTarget.value)
        }
    }

    const onKeyDownAddTeask = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && Boolean(newTaskTitle) && onClickButtonHundler()
    }

    const onClickButtonHundler = () => {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    return (
        <div className={"todoList"}>
            <h3>{title}</h3>

            <div className={"taskForm"}>
                <input
                    value={newTaskTitle}
                    onChange={onChangeInputHadler}
                    onKeyDown={onKeyDownAddTeask}
                />
                <MyButton
                    name={"+"}
                    onClickHandler={onClickButtonHundler}
                    disabled={!newTaskTitle || maxTitleLengthError}
                />
            </div>
            {maxTitleLengthError && <div style={{color: 'red'}}>
                <p>Your tasktitle is too long.</p>
                <p> Maximum length 15 characters.</p>
            </div>}
            <TaskList tasks={tasks} removeTask={removeTask}/>
        </div>
    );
};
