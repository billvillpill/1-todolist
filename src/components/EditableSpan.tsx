import React, {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
    oldTitle: string
    callBack: (newTaskTitle: string) => void
}
export const EditableSpan = (props: EditableSpanProps) => {
    const [edit, setEdit] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState(props.oldTitle)
    const activeEditHundler = () => {
        props.callBack(newTaskTitle)
        setEdit(!edit)

    }
    const onChangeSetTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    return (
        edit
            ? <input value={newTaskTitle} type="text" onBlur={activeEditHundler} autoFocus onChange={onChangeSetTitle}/>
            : <span onDoubleClick={activeEditHundler}>{props.oldTitle}</span>
    );
};