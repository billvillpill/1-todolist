import {FilterValuesType, todoListsType} from '../App';
    const typeRemoveTodoLists = 'REMOVE-TODOLISTS'
    const typeNewTodoLists = 'NEW-TODOLISTS'
    const typeUpdateTodoLists = 'UPDATE-TODOLISTS'
    const typeChangeTodoLists = 'CHANGE-TODOLISTS-FILTER'

export const todoListsReducer = (state: todoListsType[], action: TodoListsReducerType): todoListsType[] => {
    switch (action.type) {
        case typeRemoveTodoLists: {
            return state.filter(el => el.id !== action.payload.todoListID)
        }
        case typeNewTodoLists: {
            const newTodo: todoListsType = {
                id: action.payload.newID,
                title: action.payload.newTitle,
                filter: 'all'};
            return [...state, newTodo]
        }
        case typeUpdateTodoLists: {
            return state.map(el => el.id === action.payload.todoListID ? {...el, title: action.payload.newTaskTitle} : el)
        }
        case typeChangeTodoLists: {
            return state.map(el => el.id === action.payload.todoListID
                ? {...el, filter: action.payload.value}
                : el)
        }
        default:
            return state
    }
}
type TodoListsReducerType = RemoveTodoListsType | NewTodoListsType | UpdateTodoListsType | ChangeTodoListsType

type RemoveTodoListsType = ReturnType<typeof removeTodoListsReducer>
export const removeTodoListsReducer = (todoListID: string) => {
    return {
        type: typeRemoveTodoLists,
        payload: {
            todoListID
        }
    } as const
}
type NewTodoListsType = ReturnType<typeof NewTodolistReducer>
export const NewTodolistReducer = (newID: string, newTitle: string) => {
    return {
        type: typeNewTodoLists,
        payload: {
            newID,
            newTitle
        }
    } as const
}
type UpdateTodoListsType = ReturnType<typeof UpdateTodolistReducer>
export const UpdateTodolistReducer = (todoListID: string, newTaskTitle: string) => {
    return {
        type: typeUpdateTodoLists,
        payload: {
            todoListID,
            newTaskTitle
        }
    } as const
}
type ChangeTodoListsType = ReturnType<typeof ChangeTodoListsReducer>
export const ChangeTodoListsReducer = (todoListID: string, value: FilterValuesType) => {
    return {
        type: typeChangeTodoLists,
        payload: {
            todoListID,
            value
        }
    } as const
}

