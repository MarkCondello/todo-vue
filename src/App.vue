<template>
  <div id="app">
    <h2>You have completed {{ doneCount }} todos.</h2>
    <div>
      <input type="text" v-model="title"/>
      <button @click="createToDo">Create To Do</button>
    </div>
    <ul>
    <!-- Need to add the drop event above to list items instead and pass the index-->
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
        <span>{{todo.name}}</span>
        <button @click="deleteToDo(todo.id)">
          &times;
        </button>
      </li>

    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'; 
 export default {
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
    ...mapGetters({doneCount: 'doneToDosCount'})
  },
  methods: {
    pickupTodo(e, toDoId){
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';
      console.log('pickupToDO: ', {toDoId})
      this.toDoIndexDragged = toDoId;
      //datatransfer not working...
      //e.dataTransfer.setData('todo-id', toDoId);
    },
    moveToDo(id){
      //const toDoId = e.dataTransfer.getData('todo-id');
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
