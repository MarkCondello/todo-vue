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
        UPDATE_TODO(state, updatedToDo){
            state.todos = state.todos.map((todo)=>{
                if(todo.id === updatedToDo.id){
                    return updatedToDo;
                }
                return todo;
             })
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
            // Needs to persist state.

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
        updateToDoStatus({commit}, {id, status}){
            ToDoService.updateToDoStatus(id, status)
            .then(resp => {
                commit('UPDATE_TODO', resp.data); 
            })
            .catch(err=> {
                console.error("Error", err)
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
           const todo = {name: title, completed: false};

           console.log({todo})
            ToDoService.createToDo(todo)
            .then(resp => {
                commit("SET_TODO", resp.data);
            })
            .catch(err => {
                console.error("Error: ", err)
            })
        }
    },
    getters: {
        getDoneToDos: (state)=>{
            return state.todos.filter(todo=> todo.completed);
        },
        doneToDosCount: (state, getters) => {
            return getters.getDoneToDos.length;
        }
    }
})