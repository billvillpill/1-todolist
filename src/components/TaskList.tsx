import React, {ChangeEvent, FC} from 'react';
import {MyButton} from './MyButton';
import {TaskType} from './Todolist';
import {FilterValuesType} from '../App';

type TaskListPropsType = {
    todoListID: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, tasksId: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    changeFilter: (todoListID: string, value: FilterValuesType) => void
}

// элемент списка
export const TaskList: FC<TaskListPropsType> = ({
                                                    todoListID,
                                                    tasks,
                                                    removeTask,
                                                    changeTaskStatus,
                                                    filter,
                                                    changeFilter
                                                }) => {
    const filteredTasks: Array<TaskType> = filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks;
    // let filteredTasks = tasks;
    //     tasks.map(el => {
    //         if (filter === 'active') {
    //             filteredTasks = tasks.filter(t => t.isDone === false);
    //         }
    //         if (filter === 'completed') {
    //             filteredTasks = tasks.filter(t => t.isDone === true);
    //         }
    //     });

    // условный рендоринг
    const listItems: JSX.Element = filteredTasks.length === 0
        ? <div className={'span'}><span>Your list is empty. Create task list.</span></div>
        : <ul className={'list'}>
            {
                filteredTasks.map((t: TaskType) => {
                    const onClickRemoveTask = () => removeTask(todoListID, t.id);
                    const onChangeTaskStatusHundler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todoListID, t.id, e.currentTarget.checked);
                    return (
                        <li key={t.id} className={t.isDone ? 'task' : 'taskDone'}>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={t.isDone}
                                    onChange={onChangeTaskStatusHundler}
                                />
                                <span>{t.title}</span>
                            </div>
                            <MyButton name={'delete'} onClickHandler={onClickRemoveTask}
                                      classes={t.isDone ? 'btnX-active' : 'btnX'}/>
                        </li>
                    );
                })
            }
        </ul>;
    const onClickSetAllFilter = () => changeFilter(todoListID, 'all');
    const onClickSetActiveFilter = () => changeFilter(todoListID, 'active');
    const onClickSetCompletedFilter = () => changeFilter(todoListID, 'completed');


    return (
        <div className="taskList">
            {listItems}
            <div className="mybuttons">
                <MyButton
                    name="all"
                    onClickHandler={onClickSetAllFilter}
                    classes={filter === 'all' ? 'btn-active' : 'btn'}
                />
                <MyButton
                    name="active"
                    onClickHandler={onClickSetActiveFilter}
                    classes={filter === 'active' ? 'btn-active' : 'btn'}
                />
                <MyButton
                    name="completed"
                    onClickHandler={onClickSetCompletedFilter}
                    classes={filter === 'completed' ? 'btn-active' : 'btn'}
                />
            </div>
        </div>
    );
};
