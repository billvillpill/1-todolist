import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import AddTaskIcon from '@mui/icons-material/AddTask';

type AddItemFormPropsType = {
    callback: (title: string) => void
    placeholder: string
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [inputError, setInputError] = useState<string | null>(null);


    // проверка на длину вводимого сообщения
    // лучше функцию прокидывать через props, тут не писать
    const maxTitleLengthError = newTaskTitle.length >= 15
    const onChangeSetTitle = (event: ChangeEvent<HTMLInputElement>) => {
        !!inputError && setInputError(null) //false
        if(event.currentTarget.value.length <= 15) {
            setNewTaskTitle(event.currentTarget.value)
        }
    }

    const onKeyDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && Boolean(newTaskTitle) && addTaskHandler()
    }

    const addTaskHandler = () => {
        const trimmedTittle = newTaskTitle.trim()
        if (trimmedTittle) {
            props.callback(trimmedTittle)
        } else {
            setInputError('title is required') // string должна быть, как аргумент: 'title is required'
        }
        setNewTaskTitle('')
    }

    return (
        <>
            <div className={'taskForm'}>
                {/*<input*/}
                {/*    type='text'*/}
                {/*    value={newTaskTitle}*/}
                {/*    onChange={onChangeSetTitle}*/}
                {/*    onKeyDown={onKeyDownAddTask}*/}
                {/*    className={inputError || maxTitleLengthError ? 'inputError' : 'inputDefault' }*/}
                {/*/>*/}
                <TextField
                    error={!!inputError || maxTitleLengthError}
                    size='small'
                    value={newTaskTitle}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                    id="outlined-basic"
                    label={inputError ? inputError : props.placeholder}
                    variant="outlined"
                />
                    <Fab variant="extended" color="primary" size="small" onClick={addTaskHandler} disabled={!newTaskTitle || maxTitleLengthError}>
                        <AddTaskIcon />
                    </Fab>
                {/*<MyButton*/}
                {/*    name={"+"}*/}
                {/*    onClickHandler={addTaskHandler}*/}
                {/*    disabled={!newTaskTitle || maxTitleLengthError}*/}
                {/*    classes={'btn-active'}*/}
                {/*/>*/}
            </div>

            {!!inputError && <div style={{color: 'red'}}>
                <p>Please, enter correct title</p>
            </div>}
            {maxTitleLengthError && <div style={{color: 'red'}}>
                <p>Your tasktitle is too long.</p>
                <p> Maximum length 15 characters.</p>
            </div>}
        </>
    );
};

