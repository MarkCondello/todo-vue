<template>
  <div id="app" >
    <m-theme :customStyle="$root.material">
      <header>
        <!-- ToDo: Inc hamburger, keep icon link, search bar -->
         <m-top-app-bar>
          <template slot="navigation">
            <m-icon-button icon="menu" />
            <span slot="navigation">Keep</span>
          </template>
          <template slot="actions">     
            <m-icon-button icon="refresh"/>
            <m-icon-button icon="view_stream"/>
            <m-icon-button icon="settings"/>
          </template>
         </m-top-app-bar>
      </header>
      <main>
        <aside>
          <!-- ToDo:Inc side menu eg remingers, labels, archive, trash options -->
        </aside>
        <div>
           <create-note></create-note>
        </div>
      </main>

      <div v-if="pinnedNotes.length" >
        <p>PINNED</p>
        <div class="notes-container">
          <!-- noteCard component -->
          <m-card :class="note.color" 
            v-for="(note, id) in pinnedNotes" 
            :key="id"
            class="noteCard"
            >
              <span>{{note.title}}</span>
          </m-card>
        </div>
      </div>
      <div v-if="otherNotes.length" >
        <p>OTHERS</p>
        <div class="notes-container">
          <m-card :class="note.color" 
            v-for="(note, id) in otherNotes" 
            :key="id"
            class="noteCard"
            >
            <span>{{note.title}}</span>
          </m-card>
        </div>
      </div>
      </m-theme>
  </div>
</template>
<script>

import CreateNote from './components/CreateNote';
import { mapState,  mapGetters } from 'vuex'; 
 export default {
  components: {CreateNote, },
  name: 'App',
   data() {
    return {
      title: null,
      toDoIndexDragged: null,
    }
  },
  created() {
    this.$store.dispatch('getNotes')
  },
  computed: { 
    // Dont need mapState to get notes
    ...mapState(['notes']), 
    ...mapGetters(['pinnedNotes', 'otherNotes'])
  },
  methods: {
    // pickupTodo(e, toDoId){
    //   e.dataTransfer.effectAllowed = 'move';
    //   e.dataTransfer.dropEffect = 'move';
    //   console.log('pickupToDO: ', {toDoId})
    //   this.toDoIndexDragged = toDoId;
    // },
    // moveToDo(id){
    //    this.$store.commit('MOVE_TODO', {taskIndex : this.toDoIndexDragged, droppedOnTaskIndex: id})
    // },
    // changeStatus(todo){
    //   let status = !todo.checked;
    //   this.$store.dispatch('updateToDoStatus', { id: todo.id, status } );
    // },

    // This should be added to the note card component
    deleteNote(id){
      this.$store.dispatch('deleteNote', id)
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
 }
</style>

 