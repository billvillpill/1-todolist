import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';


type EditableSpanProps = {
    oldTitle: string
    callBack: (newTaskTitle: string) => void
}
export const EditableSpan = (props: EditableSpanProps) => {
    const [edit, setEdit] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState(props.oldTitle);
    const activeEditHundler = () => {
        if (edit) props.callBack(newTaskTitle);
        setEdit(!edit);

    };
    const onChangeSetTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value);
    };
    return (
        edit
            ? <TextField
                size="small"
                value={newTaskTitle}
                onBlur={activeEditHundler}
                autoFocus
                onChange={onChangeSetTitle}
                id="outlined-basic"
                label='Enter a new name'
                variant="filled"
            />

            /*<input value={newTaskTitle} onBlur={activeEditHundler} autoFocus onChange={onChangeSetTitle}/>*/
            : <span onDoubleClick={activeEditHundler}>{props.oldTitle}</span>
    );
};