import React, {useState} from 'react';

type EditableSpanProps = {
    title: string
}
export const EditableSpan = (props: EditableSpanProps) => {
    const [edit, setEdit] = useState(false);
    return (
        <div>
            <span>{props.title}</span>

        </div>
    );
};

