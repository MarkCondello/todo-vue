import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 10000
  
});

export default {
    getToDos() {
        return instance.get('/todos');
    },

    getToDo(id){
        return instance.get(`/todos/${id}`);
    },

    deleteToDo(id){
        return instance.delete(`/todos/${id}`);
    },

    updateToDoStatus(id, status){
        return instance.patch(`/todos/${id}`, {
            completed: status,
        });
    },

    createToDo(todo){
        //Do I post to a list or a single model??? YES, post to a list
        return instance.post('/todos', todo)
    },

}
