import {TasksStateType} from '../App';
import {TaskType} from '../components/Todolist';
import {v1} from 'uuid';

    const typeRemoveTasks = 'REMOVE-TASK'
    const typeAddTasks = 'ADD-TASK'
    const typeChangeStatus = 'CHANGE-TASK-STATUS'
    const typeNewTask = 'NEW-TASK'
    const typeUpdateTask = 'UPDATE-TASK'

export const tasksReducer = (state: TasksStateType, action: TasksReducerType): TasksStateType => {
    switch (action.type) {
        case typeRemoveTasks: {
            return {...state, [action.payload.todoListID]: state[action.payload.todoListID].filter(el => el.id !== action.payload.taskId)}
        }
        case typeAddTasks: {
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            };
            return {...state, [action.payload.todoListID]: [...state[action.payload.todoListID], newTask]}
        }
        case typeChangeStatus: {
            return {...state, [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskId
                    ? {...el, isDone: action.payload.isDone}
                    : el)}
        }
        case typeNewTask: {

            return {...state, [action.payload.newID]: []}
        }
        case typeUpdateTask: {
            return {...state, [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskId
                    ? {...el, title: action.payload.newTaskTitle}
                    : el)}
        }
        default:
            return state
    }
}
type TasksReducerType = RemoveTaskType | AddTaskType | changeTaskStatusType | newTasksType | updateTasksType

type RemoveTaskType = ReturnType<typeof removeTaskReducer>
export const removeTaskReducer = (todoListID: string, taskId: string) => {
    return {
        type: typeRemoveTasks,
        payload: {
            todoListID,
            taskId
        }
    } as const
}
type AddTaskType = ReturnType<typeof addTaskReducer>
export const addTaskReducer = (todoListID: string, title: string) => {
    return {
        type: typeAddTasks,
        payload: {
            todoListID,
            title
        }
    } as const
}
type changeTaskStatusType = ReturnType<typeof changeTaskStatusReducer>
export const changeTaskStatusReducer = (todoListID: string, taskId: string, isDone: boolean) => {
    return {
        type: typeChangeStatus,
        payload: {
            todoListID,
            taskId,
            isDone
        }
    } as const
}
type newTasksType = ReturnType<typeof newTasksReducer>
export const newTasksReducer = (newID: string) => {
    return {
        type: typeNewTask,
        payload: {
            newID
        }
    } as const
}
type updateTasksType = ReturnType<typeof updateTasksReducer>
export const updateTasksReducer = (todoListID: string, taskId: string, newTaskTitle: string) => {
    return {
        type: typeUpdateTask,
        payload: {
            todoListID,
            taskId,
            newTaskTitle
        }
    } as const
}
