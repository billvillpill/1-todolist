import React, {FC} from 'react';
import {MyButton} from "./MyButton";
import {Task} from "./Task";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean

}

// export const Todolist = (props: TodolistPropsType): React.ReactNode => {           -- React.ReactNode говорит, что компонента должна вернуть react элемент
// jsx element
// нужно обязательно указывать, что это именно реакт компонента, и это можно сделать разными способами


export const Todolist: FC<TodolistPropsType> = ({ title, tasks }) => {

    //1. первый вариант деструктиризации объекта
    // const title = props.title
    // const tasks: Array<TaskType> = props.tasks

    //2. второй способ
    // const {title: myTitle, tasks: myTasks} = props

    //3. третий способ
    // const { title, tasks } = props


    const listItems: Array<JSX.Element> = []
    for (let i = 0; i < tasks.length; i++) {

        // деструктуризировал объекта в компоненте Task.
        // JSX.Element это объявил, что это компонента, а не просто какая-то константа
        const listItem: JSX.Element = <Task {...tasks[i]} />
        listItems.push(listItem)
    }


    return (
        <div className={"todoList"}>
            <h3>{title}</h3>
            <div>
                <input/>
                <MyButton name={"+"} />
            </div>
            <ul>
                {listItems}
            </ul>
            <div>
                <MyButton name={"All"} />
                <MyButton name={"Active"} />
                <MyButton name={"Completed"} />
            </div>
        </div>
    );
};
