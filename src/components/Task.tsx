import React, {FC} from 'react';
import {TaskType} from "./Todolist";

type TaskPropsType = {
    isDone: boolean
    title: string
}
export const Task: FC<TaskPropsType> = ({title, isDone}) => {
    return (
        <li>
            <input type={"checkbox"} checked={isDone}/> tasks[i].
            <span>{title}</span>
        </li>
    );
};

