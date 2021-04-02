import Vue from 'vue';
import Vuex from 'vuex';
import ToDoService from '../Service/ToDoService';
 
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        todos: [],
    },
    mutations: {
        SET_TODOS(state, todos){
            state.todos = todos;
        },
        DELETE_TODO(state, toDoId){
            state.todos = state.todos.filter(todo => todo.id !== toDoId)
        },
        SET_TODO(state, todo){
            state.todos.push(todo);
        },
        MOVE_TODO(state, {taskIndex, droppedOnTaskIndex}){
            const taskToMove = state.todos.splice(taskIndex, 1)[0];
            state.todos.splice(droppedOnTaskIndex, 0, taskToMove);
        },

        // May want to split task related work to a module
        UPDATE_TODO_TASK_STATUS(state, {toDoId, taskId}){
            state.todos[toDoId].tasks = state.todos[toDoId].tasks.map((task)=>{
                if(task.id === taskId){
                    task.completed != task.completed;
                    return task;
                }
                return task;
             })
        },
        CREATE_TODO_TASK(state, {toDoId, taskItem}){
            state.todos[toDoId].tasks.push(taskItem);
        },
        DELETE_TODO_TASK(state, {toDoId, taskId}){
            state.todos[toDoId].tasks = state.todos[toDoId].tasks.filter(task=> task.id !== taskId)
        },
    },
    actions: {
        getToDos({commit}){
            ToDoService.getToDos()
            .then(resp => {
                commit('SET_TODOS', resp.data);
            })
            .catch(err => {
                console.error("Error: ", err)
            })
        },
        deleteToDo({commit}, toDoId){
            ToDoService.deleteToDo(toDoId)
            .then(() => {
                commit('DELETE_TODO', toDoId)
            })
            .catch(err => {
                console.error("Error: ", err)
            })
        },
        createToDo({commit}, title){
           const todo = { name: title };

             ToDoService.createToDo(todo)
            .then(resp => {
                commit("SET_TODO", resp.data);
            })
            .catch(err => {
                console.error("Error: ", err)
            })
        },

        // May want to split task related work to a module
        updateToDoTaskStatus({commit}, {toDoId, taskId, status}){
            ToDoService.updateToDoTaskStatus(toDoId, taskId, status)
            .then(resp => {
                commit('UPDATE_TODO_TASK_STATUS', resp.data); 
            })
            .catch(err=> {
                console.error("Error", err)
            })
        },
        createToDoTask({commit}, {toDoId, taskItem}){
            ToDoService.createToDo(toDoId, taskItem)
            .then(resp => {
                commit('CREATE_TODO_TASK', resp.data);
            })
            .catch(err=>{
                console.error("Task Create Error", err)
            })
        },
        deleteToDoTask({commit}, {toDoId, taskId}){
            ToDoService.deleteToDoTask(toDoId, taskId)
            .then(resp=>{
                // Need to check this below, is it resp.data.id
                commit('DELETE_TODO_TASK', resp.data.id)
            })
            .catch(err => console.error("DELETE ERROR", err))
        },

    },
    getters: {
        getDoneToDos: (state)=>{
            // This will no longer work...
            return state.todos.filter(todo=> todo.completed);
        },
        doneToDosCount: (state, getters) => {
            return getters.getDoneToDos.length;
        }
    }
})