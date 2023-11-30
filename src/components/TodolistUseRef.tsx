import React, {ChangeEvent, FC, useRef, useState} from 'react';
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
    // let [value, setValue] = useState('')
    // const onChangeInputHadler = (event: ChangeEvent<HTMLInputElement>) => {
    //     setValue(event.currentTarget.value)
    // }

    const taskTitleInput = useRef<HTMLInputElement>(null)
    const onClickButtonHundler = () => {
        if(taskTitleInput.current) {
            const newTaskTitle = taskTitleInput.current.value
            addTask(newTaskTitle)
            taskTitleInput.current.value = ''
        }
    }

    return (
        <div className={"todoList"}>
            <h3>{title}</h3>

            <div className={"taskButton"}>
                {/*<input value={value} onChange={onChangeInputHadler}/>*/}
                <input ref={taskTitleInput}/>
                <MyButton name={"+"} onClickHandler={onClickButtonHundler}/>
            </div>
            <TaskList tasks={tasks} removeTask={removeTask}/>
        </div>
    );
};
