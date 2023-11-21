import React, {FC, useState} from 'react';
import {MyButton} from "./MyButton";
import {TaskList} from "./TaskList";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (tasksId: number) => void
}
export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type FilterValuesType = 'all' | 'active' | 'completed'

// export const Todolist = (props: TodolistPropsType): React.ReactNode => {   --
// React.ReactNode говорит, что компонента должна вернуть react элемент jsx element
// нужно обязательно указывать, что это именно реакт компонента, и это можно сделать разными способами

//1. первый вариант деструктиризации объекта
// const title = props.title
// const tasks: Array<TaskType> = props.tasks

//2. второй способ
// const {title: myTitle, tasks: myTasks} = props

//3. третий способ
// const { title, tasks } = props

export const Todolist: FC<TodolistPropsType> = ({title, tasks, removeTask}) => {

    //фильтр для кнопок отображения списка 'all' | 'active' | 'completed'
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const filteredTasks: Array<TaskType> = filter === "active"
        ? tasks.filter(t => !t.isDone)
        : filter === "completed"
            ? tasks.filter(t => t.isDone)
            : tasks

    // Почему не работает этот вариант через map?
    // const list: Array<JSX.Element> = filteredTasks.map(task => {
    //     let listItem: JSX.Element = <TaskList {...task} onClikRemoveTask={() => removeTask(task.id)}/>
    // });

    // const list: Array<JSX.Element> = []
    // for (let i = 0; i < filteredTasks.length; i++) {
    //     const onClikRemoveTask = () => removeTask(filteredTasks[i].id)
    //     // деструктуризировал объекта в компоненте TaskList.
    //     // JSX.Element это объявил, что это компонента, а не просто какая-то константа
    //     const listItem: JSX.Element = <TaskList
    //         {...filteredTasks[i]}
    //         onClikRemoveTask={onClikRemoveTask}/>
    //     list.push(listItem)
    // }

    // условный рендоринг, т.е. чере
    const list: JSX.Element = filteredTasks.length === 0
        ? <span>Your list is empty. Create tasks, please.</span>
        : <ul>
            {
                filteredTasks.map((t: TaskType) => {
                    const onClikRemoveTask = () => removeTask(t.id)
                    return <TaskList {...t} onClikRemoveTask={onClikRemoveTask}/>
                })
            }
        </ul>

    return (
        <div className={"todoList"}>
            <h3>{title}</h3>
                <input/>
                <MyButton name={"+"} onClickHandler={() => {}}/>
            <div className={"taskList"}>
                {list}
                <MyButton name={"All"} onClickHandler={() => setFilter("all")}/>
                <MyButton name={"Active"} onClickHandler={() => setFilter("active")}/>
                <MyButton name={"Completed"} onClickHandler={() => setFilter("completed")}/>
            </div>
        </div>
    );
};
