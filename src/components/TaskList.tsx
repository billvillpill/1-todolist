import React, {ChangeEvent, FC, useState} from 'react';
import {MyButton} from './MyButton';
import {TaskType} from './Todolist';

type TaskListPropsType = {
    tasks: Array<TaskType>
    removeTask: (tasksId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

type FilterValuesType = 'all' | 'active' | 'completed'

// элемент списка
export const TaskList: FC<TaskListPropsType> = ({tasks, removeTask, changeTaskStatus}) => {
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
        ? <div className={'span'}><span>Your list is empty. Create task list.</span></div>
        : <ul className={'list'}>
            {
                filteredTasks.map((t: TaskType) => {
                    const onClickRemoveTask = () => removeTask(t.id);
                    const onChangeTaskStatusHundler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked) ;
                    return (
                        <li key={t.id} className={t.isDone ? 'task' : 'taskDone'}>
                            <div>
                                <input
                                    type='checkbox'
                                    checked={t.isDone}
                                    onChange={onChangeTaskStatusHundler}
                                />
                                <span>{t.title}</span>
                            </div>
                            <MyButton name={'delete'} onClickHandler={onClickRemoveTask} classes={t.isDone ? 'btnX-active' : 'btnX'}/>
                        </li>
                    )
                })
            }
        </ul>
    const onClickSetAllFilter = () => setFilter('all');
    const onClickSetActiveFilter = () => setFilter('active');
    const onClickSetCompletedFilter = () => setFilter('completed');



    return (
        <div className='taskList'>
            {listItems}
            <div className='mybuttons'>
                <MyButton
                    name='all'
                    onClickHandler={onClickSetAllFilter}
                    classes={filter === 'all' ? 'btn-active' : 'btn'}
                />
                <MyButton
                    name='active'
                    onClickHandler={onClickSetActiveFilter}
                    classes={filter === 'active' ? 'btn-active' : 'btn'}
                />
                <MyButton
                    name='completed'
                    onClickHandler={onClickSetCompletedFilter}
                    classes={filter === 'completed' ? 'btn-active' : 'btn'}
                />
            </div>
        </div>
    )
}
