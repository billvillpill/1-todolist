import {TasksStateType} from '../App';
import {TaskType} from '../components/Todolist';
import {v1} from 'uuid';

export const tasksReducer = (state: TasksStateType, action: TasksReducerType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todoListID]: state[action.payload.todoListID].filter(el => el.id !== action.payload.taskId)}
        }
        case 'ADD-TASK': {
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            };
            return {...state, [action.payload.todoListID]: [...state[action.payload.todoListID], newTask]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state, [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskId
                    ? {...el, isDone: action.payload.isDone}
                    : el)}
        }
        case 'NEW-TASK': {

            return {...state, [action.payload.newID]: []}
        }
        case 'UPDATE-TASK': {
            return {...state, [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskId
                    ? {...el, title: action.payload.newTaskTitle}
                    : el)}
        }

        default:
            return state
    }
}
type TasksReducerType = RemoveTaskType | AddTaskType | changeTaskStatusType | newTasksType | updateTasksType

type RemoveTaskType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todoListID: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListID,
            taskId
        }
    } as const
}
type AddTaskType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todoListID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListID,
            title
        }
    } as const
}
type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todoListID: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoListID,
            taskId,
            isDone
        }
    } as const
}
type newTasksType = ReturnType<typeof newTasksAC>
export const newTasksAC = (newID: string) => {
    return {
        type: 'NEW-TASK',
        payload: {
            newID
        }
    } as const
}
type updateTasksType = ReturnType<typeof updateTasksAC>
export const updateTasksAC = (todoListID: string, taskId: string, newTaskTitle: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todoListID,
            taskId,
            newTaskTitle
        }
    } as const
}
