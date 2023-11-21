import React, {FC} from 'react';

type MyButtonPropsType = {
    name: string
    onClickHandler: () => void
}
export const MyButton: FC<MyButtonPropsType> = (props: MyButtonPropsType) => {
    return (
        <button
            type={"submit"}
            onClick={props.onClickHandler}
        >{props.name}</button>
    );
};

