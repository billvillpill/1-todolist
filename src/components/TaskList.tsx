import React, {FC} from 'react';
import {MyButton} from "./MyButton";

type TaskPropsType = {
    isDone: boolean
    title: string
    onClikRemoveTask: () => void
}

// элемент списка
export const TaskList: FC<TaskPropsType> = (props: TaskPropsType) => {
    return (
        <li>
            <input type={"checkbox"} checked={props.isDone}/>
            <span>{props.title}</span>
            <MyButton name={"x"} onClickHandler={props.onClikRemoveTask} />
        </li>
    );
};

