import React, {FC} from 'react';

type MyButtonPropsType = {
    name: string
    onClickHandler: () => void
    disabled?: boolean
    classes?: string
}
export const MyButton: FC<MyButtonPropsType> = (props: MyButtonPropsType) => {
    return (
        <button className={props.classes}
            type="submit"
            onClick={props.onClickHandler}
            disabled={props.disabled}
        ><span>{props.name}</span></button>
    );
};

