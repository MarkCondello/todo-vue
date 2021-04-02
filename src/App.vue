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
          <!-- Split this out to its own component -->
          <create-note></create-note>

        </div>
      </main>
  
      <ul>
         <li 
        v-for="(todo, id) in todos" 
        :key="id"
        draggable
        @dragstart="pickupTodo($event, id)"
        @drop="moveToDo(id)"
        @dragover.prevent
        @dragenter.prevent
        >
          <input type="checkbox" :checked="todo.completed" @change="changeStatus(todo)" />
          <span>{{todo.title}}</span>
          <button @click="deleteToDo(todo.id)">
            &times;
          </button>
        </li>

      </ul>
      </m-theme>
  </div>
</template>
<script>

import CreateNote from './components/CreateNote';
import { mapState,   } from 'vuex'; 
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
    this.$store.dispatch('getToDos')
  },
  computed: { 
    ...mapState(['todos']), 
   },
  methods: {

    showNoteModal(){
      
    },


    pickupTodo(e, toDoId){
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';
      console.log('pickupToDO: ', {toDoId})
      this.toDoIndexDragged = toDoId;
    },
    moveToDo(id){
       this.$store.commit('MOVE_TODO', {taskIndex : this.toDoIndexDragged, droppedOnTaskIndex: id})
    },
    changeStatus(todo){
      let status = !todo.completed;
      this.$store.dispatch('updateToDoStatus', { id: todo.id, status } );
    },
    deleteToDo(id){
      this.$store.dispatch('deleteToDo', id)
    },
    createToDo(){
      if(this.title.length > 3){
        this.$store.dispatch('createToDo', this.title);
        this.title = null;
      }
    }
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

 