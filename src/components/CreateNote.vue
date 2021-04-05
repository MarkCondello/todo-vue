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
                            <!-- SHould this be a textarea instead, if switching to checkboxes, we can split out each text line into a checkbox line -->
                            <!-- <input ref="taskInput" class="smaller" type="text" name="task" v-model="task" placeholder="Take a note..."/> -->
                            <textarea 
                            ref="taskInput" 
                            class="smaller" 
                            v-model="note.list" 
                            placeholder="Take a note...">
                            </textarea>
                        </m-layout-grid-cell>
                    </m-layout-grid-inner>
                </template>
                <template v-else>
                    <m-layout-grid-inner>
                        <m-layout-grid-cell :span="8">
                            <p @click="opened=true">Take a note...</p>
                        </m-layout-grid-cell>
                        <m-layout-grid-cell :span="4" class="mdc-layout-grid--align-right">
                            <m-icon-button icon="check_box" title="Check list" class="material-icons-outlined">
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
export default {
    data() {
        return {
            // ToDo: Check db.json for any properties that need to be included
            note: {
                title: '',
                pinned: false,
                color: '',
                edited: "03/28/2021", //ToDo: Needs to be dynamic
                labels: [],
                type: 'list',
                list: null, //I plan to make this mutable between string and an array of objects
            },
            opened: false,
        }
    },
    methods: {
        handleClose(){
            this.opened=false;
            this.validateFields();
        },
        validateFields(){
            if(this.note.title.length > 2 || this.note.list.length > 2){
                this.createToDo()
                return;
            }
            this.clearFields();
        },
        clearFields(){
            this.title = '';
            this.list = '';
        },
        createToDo(){
            this.$store.dispatch('createNote', this.note);
            this.clearFields();
        }
    },

    watch: {
        opened(value){
            if(value){
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
 