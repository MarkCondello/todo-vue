import Vue from 'vue';
import Vuex from 'vuex';
import NoteService from '../Service/NoteService';
 
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        notes: [],
        date: new Date(),
    },
    mutations: {
        SET_NOTES(state, notes){
            state.notes = notes;
        },
        DELETE_NOTE(state, noteId){
            state.notes = state.notes.filter(note => note.id !== noteId)
        },
        SET_NOTE(state, note){
            state.notes.push(note);
        },
        // MOVE_NOTE(state, {noteIndex, droppedOnNoteIndex}){
        //     const noteToMove = state.notes.splice(noteIndex, 1)[0];
        //     state.notes.splice(droppedOnNoteIndex, 0, noteToMove);
        // },

        // May want to split list related work to a module
        UPDATE_NOTE_LIST_STATUS(state, {noteId, listId}){
            state.notes[noteId].lists = state.notes[noteId].lists.map((list)=>{
                if(list.id === listId){
                    list.checked != list.checked;
                    return list;
                }
                return list;
             })
        },
        CREATE_NOTE_LIST(state, {noteId, listItem}){
            state.notes[noteId].lists.push(listItem);
        },
        DELETE_NOTE_LIST(state, {noteId, listId}){
            state.notes[noteId].lists = state.notes[noteId].lists.filter(list=> list.id !== listId)
        },
    },
    actions: {
        getNotes({commit}){
            NoteService.getNotes()
            .then(resp => {
                commit('SET_NOTES', resp.data);
            })
            .catch(err => {
                console.error("Error: ", err)
            })
        },
        deleteNote({commit}, noteId){
            NoteService.deleteNote(noteId)
            .then(() => {
                commit('DELETE_NOTE', noteId)
            })
            .catch(err => {
                console.error("Error: ", err)
            })
        },
        createNote({commit}, note){
            note.selected = false;
            note.archived = false;
            note.opened = false;

            console.log("Note data: ", {note});
            NoteService.createNote(note)
            .then(resp => {
                commit("SET_NOTE", resp.data);
            })
            .catch(err => {
                console.error("Error: ", err)
            })
        },

        // May want to split list related work to a module
        updateNoteListItemStatus({commit}, {noteId, listId, status}){
            NoteService.updateNoteListItemStatus(noteId, listId, status)
            .then(resp => {
                commit('UPDATE_NOTE_LIST_STATUS', resp.data); 
            })
            .catch(err=> {
                console.error("Error", err)
            })
        },
        createNoteList({commit}, {noteId, listItem}){
            NoteService.createNote(noteId, listItem)
            .then(resp => {
                commit('CREATE_NOTE_LIST', resp.data);
            })
            .catch(err=>{
                console.error("List Create Error", err)
            })
        },
        deleteNoteList({commit}, {noteId, listId}){
            NoteService.deleteNoteList(noteId, listId)
            .then(resp=>{
                // Need to check this below, is it resp.data.id
                commit('DELETE_NOTE_LIST', resp.data.id)
            })
            .catch(err => console.error("DELETE ERROR", err))
        },

    },
    getters: {
        // getDonenotes: (state)=>{
        //     // This will no longer work...
        //     return state.notes.filter(note=> note.checked);
        // },
        // donenotesCount: (state, getters) => {
        //     return getters.getDonenotes.length;
        // }
    }
});