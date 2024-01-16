import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {MyButton} from './MyButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



type AddItemFormPropsType = {
    callback: (title: string) => void
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

    const onKeyDownAddTeask = (event: KeyboardEvent<HTMLInputElement>) => {
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
    const styles={
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px',
        backgroundColor: '#000000'
    }

    return (
        <>
            <div className={'taskForm'}>
                {/*<input*/}
                {/*    type='text'*/}
                {/*    value={newTaskTitle}*/}
                {/*    onChange={onChangeSetTitle}*/}
                {/*    onKeyDown={onKeyDownAddTeask}*/}
                {/*    className={inputError || maxTitleLengthError ? 'inputError' : 'inputDefault' }*/}
                {/*/>*/}
                <TextField
                    error={!!inputError}
                    size='small'
                    value={newTaskTitle}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTeask}
                    id="outlined-basic"
                    label={inputError ? inputError : 'type smth...'}
                    variant="outlined"
                />
                <Button
                    variant="contained"
                    onClick={addTaskHandler}
                    disabled={!newTaskTitle || maxTitleLengthError}
                    style={styles}
                >+</Button>
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

