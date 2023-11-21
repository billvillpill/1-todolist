import React, {FC} from 'react';

type MyButtonPropsType = {
    name: string
}
export const MyButton: FC<MyButtonPropsType> = (props) => {
    return (
            <button type={"submit"}>{props.name}</button>
    );
};

