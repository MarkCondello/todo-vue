<template>
    <m-card>
 
        <m-card-primary-action>
            <m-layout-grid style="width:100%;">
                <template v-if="opened">
                    <m-layout-grid-inner>
                        <m-layout-grid-cell :span="8">
                            <input type="text" v-model="note.title" placeholder="Title"/>
                        </m-layout-grid-cell >
                        <m-layout-grid-cell :span="4" class="mdc-layout-grid--align-right">
                            <m-icon-button 
                            @click.prevent="note.pinned = !note.pinned"
                            icon="push_pin" title="Pin note"       
                            :class="note.pinned ? 'material-icons-outlined' : 'material-icons'">
                            </m-icon-button> 
                        </m-layout-grid-cell>
                    </m-layout-grid-inner>
                    <m-layout-grid-inner>
                        <m-layout-grid-cell :span="12">
                            <!-- Should this be a textarea instead, if switching to checkboxes, we can split out each text linebreak into a checkbox line item -->
                            <textarea 
                                v-if="note.type.list"
                                ref="taskInput" 
                                class="smaller" 
                                v-model="note.list" 
                                placeholder="Take a note...">
                            </textarea>
                            <!-- ToDo: split this out to a seperate component?? -->
                            <template v-if="note.type.checklist">
                                <draggable :list="note.list">
                                    <div v-for="(item, index) in note.list" style="display: flex; align-items:center; justify-content: space-between;" :key="index">
                                        <div style="display: flex; align-items:center; justify-content: center; width: 100%;" 
                                            @mouseover="item.hovered = true"
                                            @mouseleave="item.hovered = false" >
                                            <m-icon 
                                                :icon="item.hovered ? 'drag_indicator' : ''" 
                                                class="drag-icon"
                                                title="Drag list item" 
                                            />
                                            <input 
                                                type="checkbox"
                                                v-model="item.checked"/>
                                            <input 
                                                class="smaller" 
                                                v-model="item.name" 
                                                type="text"
                                                ref="field"
                                                v-on:keyup.alt.down="focusFieldByIndex(index+1)" 
                                                v-on:keyup.alt.up="focusFieldByIndex(index-1)" 
                                                v-on:keyup.enter="addCheckListItem"
                                                placeholder="List item..."/>
                                        </div>
                                        <m-icon-button 
                                            icon="clear" 
                                            title="Remove list item" 
                                            class="material-icons-outlined"
                                            @click="removeListItem(index)"
                                        />
                                        <!-- <nested-draggable :list="item.list" /> -->
                                    </div>
                                </draggable>
                            </template>
                        </m-layout-grid-cell>
                    </m-layout-grid-inner>
                 </template>
                <template v-else>
                    <m-layout-grid-inner>
                        <m-layout-grid-cell :span="8">
                            <p @click="opened=true">Take a note...</p>
                        </m-layout-grid-cell>
                        <m-layout-grid-cell :span="4" class="mdc-layout-grid--align-right">
                            <m-icon-button icon="check_box" title="Check list" :class="note.type.list ?'material-icons-outlined': 'material-icons'" @click="handleCheckBoxButton">
                            </m-icon-button>
                            <m-icon-button icon="brush" title="Add Sketch" class="material-icons-outlined">
                            </m-icon-button>
                            <m-icon-button icon="photo" title="Add Photo" class="material-icons-outlined">
                            </m-icon-button>
                        </m-layout-grid-cell>
                    </m-layout-grid-inner>
                </template>
            </m-layout-grid>
        </m-card-primary-action>
        <template v-if="opened"> 
             <template slot="actionButtons">
                <m-icon-button icon="notification_important" title="Add reminder" class="material-icons-outlined">
                </m-icon-button>
                <m-icon-button icon="person_add_alt_1" title="Add user" class="material-icons-outlined">
                </m-icon-button>
                <m-icon-button icon="palette" title="Colour palette" class="material-icons-outlined">
                </m-icon-button>
                <m-icon-button icon="image" title="Add images" class="material-icons-outlined">
                </m-icon-button>
                <m-icon-button icon="archive" title="Add to archive" class="material-icons-outlined">
                </m-icon-button>
                <m-icon-button icon="more_horiz" title="Options">
                </m-icon-button>
             </template>
            <template slot="actionIcons">
                <m-button @click="handleClose">Close</m-button>
            </template> 
        </template> 
    </m-card>
</template>
<script>
import draggable from 'vuedraggable'
export default {
    components:{draggable, },
    data() {
        return {
            note: {
                title: '',
                pinned: false,
                color: '',
                edited: `${this.$store.state.date.getDay()}/${this.$store.state.date.getMonth()}/${this.$store.state.date.getFullYear()}`,  
                labels: [],
                type:  {
                    list: true,
                    checklist: false,
                },
                list: null, //This mutable between string type and an array of objects
            },
            opened: false,
        }
    },
    created(){},
    methods: {
        handleClose(){
            this.opened=false;
            this.validateFields();
        },
        validateFields(){
            if(this.note.title.length > 2 || this.note.list && this.note.list.length > 2){
                this.createNote()
                return;
            }
            this.clearFields();
        },
        clearFields(){
            this.title = '';
            this.list = null;
        },
        createNote(){
            this.$store.dispatch('createNote', this.note);
            this.clearFields();
        },
        handleCheckBoxButton(){
            this.clearFields(); // check todo to refactor this
            this.opened=true;
            if(this.note.type.list){
                this.note.type.list = false; 
                this.note.type.checklist = true;
                this.note.list = [];            
                this.addCheckListItem();
                return
            }
            this.note.list = null;
            this.note.type.list = true; 
            this.note.type.checklist = false;
        },
        addCheckListItem(){
            this.note.list.push({
                "order": this.note.list.length ? this.note.list.length - 1 : 0,
                "name": "",
                "checked": false,
                "is_parent": false,
                "is_sub_parent": false,
                "nesting_level": 0,
                "hovered": false,
                //dragged???
            });
            let index = this.note.list.length ? this.note.list.length - 1 : 0;
            this.focusFieldByIndex(index);
        },
        focusFieldByIndex(index){ // use this method for alt up or down keys
            this.$nextTick(()=>{ //add focus to the newly created checklist item
                this.$refs.field[index].focus();  
             }); 
        },
        removeListItem(index){
            this.note.list.splice(index, 1);
            if(!this.note.list.length){ 
                this.addCheckListItem();
            }
        },
    },
    watch: {
        opened(value){
            //TODO: Add the taskInput ref on the first checklist item
            if(value && this.note.type.list){
                this.$nextTick(() => {
                    this.$refs.taskInput.focus();
                });
                //need to check for click outside to close the options if so.
                return;
            }
            return;
        }
    }
}
</script>
 <style>
 .drag-icon {
     cursor: move;
 }
 </style>