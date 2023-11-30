import React, {FC, useState} from 'react';
import {MyButton} from './MyButton';
import {TaskType} from './Todolist';

type TaskListPropsType = {
    tasks: Array<TaskType>
    removeTask: (tasksId: string) => void
}

type FilterValuesType = 'all' | 'active' | 'completed'

// элемент списка
export const TaskList: FC<TaskListPropsType> = ({tasks, removeTask}) => {
    const [filter, setFilter] = useState<FilterValuesType>('all');

    const filteredTasks: Array<TaskType> = filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks;
    // const listItems: Array<JSX.Element> = []
    // for (let i = 0; i < filteredTasks.length; i++) {
    //     const onClickRemoveTask = () => removeTask(filteredTasks[i].id)
    //     const listItem: JSX.Element = <li>
    //         <input type='checkbox' checked={filteredTasks[i].isDone} />
    //         <span>{filteredTasks[i].title}</span>
    //         <MyButton name={'x'} onClickHandler={onClickRemoveTask} />
    //     </li>
    //     listItems.push(listItem)
    // }
    // условный рендоринг
    const listItems: JSX.Element = filteredTasks.length === 0
        ? <span>Your list is empty. Create task list.</span>
        : <ul>
            {
                filteredTasks.map((t: TaskType) => {
                    const onClickRemoveTask = () => removeTask(t.id);
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <MyButton name={'x'} onClickHandler={onClickRemoveTask}/>
                        </li>
                    )
                })
            }
        </ul>
    return (
        <div className='taskList'>
            {listItems}
            <div className='mybuttons'>
                <MyButton name="all" onClickHandler={() => setFilter('all')}/>
                <MyButton name="active" onClickHandler={() => setFilter('active')}/>
                <MyButton name="completed" onClickHandler={() => setFilter('completed')}/>
            </div>
        </div>
    );


};

