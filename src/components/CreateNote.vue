<template>
    <m-card :class="note.color">
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
                            <!-- ToDo: when switching to checkboxes, we can split out each linebreak and convert those into a checkbox line item -->
                            <textarea 
                                v-if="note.type.list"
                                ref="listTextArea" 
                                class="smaller" 
                                v-model="note.list" 
                                placeholder="Take a note...">
                            </textarea>
                            <checkList 
                                ref="checkList"
                                @remove-checklist-item="removeCheckListItem" 
                                @add-checklist-item="addCheckListItem" 
                                v-if="note.type.checklist" 
                                :list-items="note.list">
                            </checkList>
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

                <!-- Split this out to its own component -->
                <m-icon-button 
                icon="palette" 
                title="Colour palette" 
                class="material-icons-outlined"
                @click="showPalette=true"
                >
                    <m-menu-anchor>
                        <m-menu-surface 
                            :open="showPalette" 
                            class="color-palette-panel"
                        >
                            <a 
                            v-for="(color, index) in colorOptions"
                            :key="index+color"
                            :title="ucFirst(color)" 
                            @click.stop="showPalette=false; note.color=`${color}`"
                            :class="color"></a>
                         </m-menu-surface>
                    </m-menu-anchor>
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

import checkList from './CheckList';
import {mapState} from 'vuex';
 export default {
    components:{ checkList},
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
            showPalette: false,
        }
    },
    computed: {
        ...mapState(['colorOptions']),
    },
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
                return;
            }
            this.note.list = null;
            this.note.type.list = true; 
            this.note.type.checklist = false;
        },  
        addCheckListItem(){
            console.log("reached addCheckListItem")
            this.note.list.push({
                "name": "",
                "checked": false,
                "hovered": false,
                "focused": false,
                //dragged???
                "list": [
                    {
                        "name": "",
                        "checked": false,
                        "hovered": false,
                        "list": [
                            {
                                "name": "",
                                "checked": false,
                                "hovered": false,
                            }
                        ],
                    }
                ],
            });
            //send this to child checklist component
            this.$nextTick(()=>{
                let index = this.note.list.length ? this.note.list.length - 1 : 0;
                this.$refs.checkList.focusFieldByIndex(index)
            })
          //  this.focusFieldByIndex(index);
        },
         removeCheckListItem(index){
            this.note.list.splice(index, 1);
            if(!this.note.list.length){ 
                this.addCheckListItem();//ensure there is always a list item set
            }
        },
        ucFirst(word){
           return word.slice(0,1).toUpperCase() + word.slice(1);
        }
    },
 
    watch: {
        opened(value){
             if(value && this.note.type.list){
                this.$nextTick(() => {
                   this.$refs.listTextArea.focus();  
                });
                //need to check for click outside to close the options if so.
                return;
            }
            return;
        }
    }
}
</script>
