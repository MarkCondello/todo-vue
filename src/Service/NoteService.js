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
 
    getNotes() {
        return instance.get('/notes');
    },
    getNote(noteId){
        return instance.get(`/notes/${noteId}`);
    },
    deleteNote(noteId){
        return instance.delete(`/notes/${noteId}`);
    },
    createNote(toDoItem){
        return instance.post('/notes', toDoItem)
    },

     // I may need to split out task related enpoints to another service
    updateNoteListItemStatus(noteId, listId, status){
        return instance.patch(`/notes/${noteId}/list/${listId}`, {
            // toggles checkbox
            checked: status,
        });
    },
    createNoteList(noteId, taskItem){
        return instance.post(`/notes/${noteId}/list`, taskItem)
    },
    deleteNoteList(noteId, listId){
        return instance.delete(`/notes/${noteId}/list/${listId}`)
    },

}
