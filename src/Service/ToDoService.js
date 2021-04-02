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
        // ToDo: Change ToDo to Note

    getToDos() {
        return instance.get('/todos');
    },
    getToDo(toDoId){
        return instance.get(`/todos/${toDoId}`);
    },
    deleteToDo(toDoId){
        return instance.delete(`/todos/${toDoId}`);
    },
    createToDo(toDoItem){
        return instance.post('/todos', toDoItem)
    },

    // ToDo: Change Tasks to Lists
    // I may need to split out task related enpoints to another service
    updateToDoTaskStatus(toDoId, taskId, status){
        return instance.patch(`/todos/${toDoId}/tasks/${taskId}`, {
            // toggles current status
            completed: status,
        });
    },
    createToDoTask(toDoId, taskItem){
        return instance.post(`/todos/${toDoId}/tasks`, taskItem)
    },
    deleteToDoTask(toDoId, taskId){
        return instance.delete(`/todos/${toDoId}/tasks/${taskId}`)
    },

}
