import React, {ChangeEvent, FC} from 'react';
import {TaskType} from './Todolist';
import {FilterValuesType} from '../App';
import {EditableSpan} from './EditableSpan';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    createTheme,
    alpha,
    getContrastRatio,
    ThemeProvider,
} from '@mui/material/styles';
import {Stack} from '@mui/system';

// Augment the palette to include a violet color
declare module '@mui/material/styles' {
    interface Palette {
        secondary: Palette['secondary'];
    }
    interface PaletteOptions {
        violet?: PaletteOptions['primary'];
        secondary?: PaletteOptions['secondary'];
    }
}
// Update the Button's color options to include a violet option
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        violet: true;

    }
}

const violetBase = '#7F00FF';
const violetMain = alpha(violetBase, 0.7);
const secondaryBase = '#ab47bc';
const secondaryMain = alpha(secondaryBase, 0.5);

const theme = createTheme({
    palette: {
        violet: {
            main: violetMain,
            light: alpha(violetBase, 0.5),
            dark: alpha(violetBase, 0.9),
            contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',

        },
        secondary: {
            main: secondaryMain,
            light: alpha(secondaryBase, 0.5),
            dark: alpha(secondaryBase, 0.9),
            contrastText: getContrastRatio(secondaryMain, '#fff') > 4.5 ? '#fff' : '#111',
        },
        background: {
            paper: '#fff',
        },
        text: {
            primary: '#173A5E',
            secondary: '#46505A',
        },
        action: {
            active: '#001E3C',
        }
    },
});


type TaskListPropsType = {
    todoListID: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, tasksId: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    updateTask: (todoListID: string, tasksId: string, newTaskTitle: string) => void
}

// элемент списка
export const TaskList: FC<TaskListPropsType> = ({
                                                    todoListID,
                                                    tasks,
                                                    removeTask,
                                                    changeTaskStatus,
                                                    filter,
                                                    changeFilter,
                                                    updateTask
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
    /*обновление таски*/
    const updateTaskHandler = (tasksID: string, newTaskTitle: string) => updateTask(todoListID, tasksID, newTaskTitle);

    // условный рендоринг
    const listItems: JSX.Element = filteredTasks.length === 0
        ? <div className={'span'}><span>Your list is empty. Create task list.</span></div>
        : <ul className={'list'}>
            {
                filteredTasks.map((t: TaskType) => {
                    /*удаления таски*/
                    const onClickRemoveTask = () => removeTask(todoListID, t.id);
                    /*изменения таски*/
                    const onChangeTaskStatusHundler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todoListID, t.id, e.currentTarget.checked);
                    return (
                        <li key={t.id} className={t.isDone ? 'task' : 'taskDone'}>
                            <div>
                                <Checkbox checked={t.isDone} onChange={onChangeTaskStatusHundler}/>
                                {/*<input
                                    type="checkbox"
                                    checked={t.isDone}
                                    onChange={onChangeTaskStatusHundler}
                                />*/}
                                <EditableSpan oldTitle={t.title}
                                              callBack={(newTaskTitle) => updateTaskHandler(t.id, newTaskTitle)}/>

                            </div>
                            <ThemeProvider theme={theme}>
                                <Button sx={{ "&:hover": { color: "red" }}} variant="outlined"  onClick={onClickRemoveTask}  startIcon={ <DeleteIcon /> }>
                                    Delete
                                </Button>
                            </ThemeProvider>
                            {/*<MyButton name={'delete'} onClickHandler={onClickRemoveTask}
                                      classes={t.isDone ? 'btnX-active' : 'btnX'}/>*/}
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
            <div className="myButtons">
                <ThemeProvider theme={theme}>
                    <Stack gap={2} direction="row" alignItems='space-around' justifyContent='center'>
                        <Button variant="contained" size="small" onClick={onClickSetAllFilter}
                            color={filter === 'all' ? 'violet' : 'secondary'}>all</Button>
                        <Button variant="contained" size="small" onClick={onClickSetActiveFilter}
                            color={filter === 'active' ? 'violet' : 'secondary'}>active</Button>
                        <Button variant="contained" size="small" onClick={onClickSetCompletedFilter}
                            color={filter === 'completed' ? 'violet' : 'secondary'}>completed</Button>
                    </Stack>
                </ThemeProvider>
                {/*<MyButton*/}
                {/*    name="all"*/}
                {/*    onClickHandler={onClickSetAllFilter}*/}
                {/*    classes={filter === 'all' ? 'btn-active' : 'btn'}*/}
                {/*/>*/}
                {/*<MyButton*/}
                {/*    name="active"*/}
                {/*    onClickHandler={onClickSetActiveFilter}*/}
                {/*    classes={filter === 'active' ? 'btn-active' : 'btn'}*/}
                {/*/>*/}
                {/*<MyButton*/}
                {/*    name="completed"*/}
                {/*    onClickHandler={onClickSetCompletedFilter}*/}
                {/*    classes={filter === 'completed' ? 'btn-active' : 'btn'}*/}
                {/*/>*/}
            </div>
        </div>
    );
};
