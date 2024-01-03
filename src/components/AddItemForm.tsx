import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {MyButton} from "./MyButton";

type AddItemFormPropsType = {
    callback: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [inputError, setInputError] = useState(false)


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
        event.key === 'Enter' && Boolean(newTaskTitle) && addTaskHandler()
    }

    const addTaskHandler = () => {
        const trimmedTittle = newTaskTitle.trim()
        if (trimmedTittle) {
            props.callback(trimmedTittle)
        } else {
            setInputError(true)
        }
        setNewTaskTitle('')
    }
    return (
        <>
            <div className={'taskForm'}>
                <input
                    type='text'
                    value={newTaskTitle}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTeask}
                    className={inputError || maxTitleLengthError ? 'inputError' : 'inputDefault' }
                />
                <MyButton
                    name={"+"}
                    onClickHandler={addTaskHandler}
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
        </>

    );
};

