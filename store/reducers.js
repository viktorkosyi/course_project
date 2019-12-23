export default function createReducers() {
    return {
        addItem: (payLoad, state) => ({
            ...state,
            todo: [payLoad, ...state.todo],
        }),

        removeItem: (payLoad, state) => {
            let ind;
            state.todo.forEach((element, index) => {
                if (element._id == payLoad.todoItem._id) {
                    ind = index;
                }
            });
            return {
                ...state,
                todo: [
                    ...state.todo.slice(0, ind),
                    ...state.todo.slice(ind + 1, state.todo.length),
                ],
            }
        },

        editItem: (payLoad, state) => {
            let ind;
            state.todo.forEach((element, index) => {
                if (element._id == payLoad.todoItem._id) {
                    ind = index;
                }
            });
            return {
                ...state,
                todo: [
                    ...state.todo.slice(0, ind),
                    { ...state.todo[ind], text: payLoad.text },
                    ...state.todo.slice(ind + 1, state.todo.length),
                ],
            }
        },

        completeItem: (payLoad, state) => {
            let ind;
            state.todo.forEach((element, index) => {
                if (element._id == payLoad.todoItem._id) {
                    ind = index;
                }
            });
            return {
                ...state,
                todo: [
                    ...state.todo.slice(0, ind),
                    { ...state.todo[ind], completed: !state.todo[ind].completed },
                    ...state.todo.slice(ind + 1, state.todo.length),
                ],
            }
        },
    }
}