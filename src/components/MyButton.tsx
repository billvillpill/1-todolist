import React, {FC} from 'react';

type MyButtonPropsType = {
    name: string
    onClickHandler: () => void
    disabled?: boolean
}
export const MyButton: FC<MyButtonPropsType> = (props: MyButtonPropsType) => {
    return (
        <button className='buttonItem'
            type="submit"
            onClick={props.onClickHandler}
            disabled={props.disabled}
        >{props.name}</button>
    );
};

