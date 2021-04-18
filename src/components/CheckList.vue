<template >
<!-- This component still need a lot more work. There should never be empty list items and a new item can only be created once the current item has a character -->
    <draggable class="dragArea" :list="listItems" :group="{ name: 'g1' }">
        <template v-for="(item, index) in listItems">
            <div 
            class="checklist" 
            :key="index">
                <div style="position: relative; display: flex; align-items:center; justify-content: space-between;"
                    @mouseover="item.hovered = true"
                    @mouseleave="item.hovered = false" 
                >
                    <div style="display: flex; align-items:center; justify-content: center; width: 100%;"
                        :class="{'border' : item.focused}"
                    >
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
                            @focus="item.focused = true"
                            @blur="item.focused = false"

                            v-on:keyup.alt.down="focusFieldByIndex(index+1)" 
                            v-on:keyup.alt.up="focusFieldByIndex(index-1)" 
                            placeholder="List item..."
                            v-on:keyup.enter="addCheckListItem"
                            />
                    </div>
                    <m-icon-button 
                        :icon="item.hovered ? 'clear' : ''" 
                        title="Remove list item" 
                        class="material-icons-outlined"
                        @click="removeCheckListItem(index)"
                    />
                </div>
                <!-- ToDo: Try to work out how to get subs working -->
                <!-- <checkListComponent :list-items="item.list" :key="'sub' + index "></checkListComponent> -->
            </div>
         </template>
    </draggable>
</template>
<script>

import draggable from 'vuedraggable'
export default {
    name: "checkListComponent",
    components:{draggable, },
    props:{
        listItems: {
            required: true,
        }
    },

    methods: {
        removeCheckListItem(index){
        this.$emit('remove-checklist-item', index);
        },
        addCheckListItem(){
            this.$emit('add-checklist-item', );
        },
        focusFieldByIndex(index){ // use this method for alt up or down keys
            this.$nextTick(()=>{ //add focus to the newly created checklist item
                this.$refs.field[index].focus();  
             }); 
        },
    }
}
</script>

 <style>
 .drag-icon {
    cursor: move;
    position: absolute;
    top:13px;
    left: -20px;
  }

.border {
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
}

 .checklist .checklist {
     padding-left: 2rem;
     border: 2px solid red;
 }
 </style>
 