<template>
    <m-card>
        <m-card-primary-action>
            <m-layout-grid style="width:100%;">
                <template v-if="editOptions">
                    <m-layout-grid-inner>
                        <m-layout-grid-cell :span="8">
                            <input type="text" name="title" v-model="title" placeholder="Title"/>
                        </m-layout-grid-cell >
                        <m-layout-grid-cell :span="4" class="mdc-layout-grid--align-right">
                            <m-icon-button icon="push_pin" title="Pin note">
                            </m-icon-button> 
                        </m-layout-grid-cell>
                    </m-layout-grid-inner>
                    <m-layout-grid-inner>
                        <m-layout-grid-cell :span="12">
                            <input ref="taskInput" class="smaller" type="text" name="task" v-model="task" placeholder="Take a note..."/>
                        </m-layout-grid-cell>
                    </m-layout-grid-inner>
                </template>
                <template v-else>
                    <m-layout-grid-inner>
                        <m-layout-grid-cell :span="8">
                            <p @click="editOptions=true">Take a note...</p>
                        </m-layout-grid-cell>
                        <m-layout-grid-cell :span="4" class="mdc-layout-grid--align-right">
                            <m-icon-button icon="check_box" title="Check list">
                            </m-icon-button>
                            <m-icon-button icon="brush" title="Add Sketch">
                            </m-icon-button>
                            <m-icon-button icon="photo" title="Add Photo">
                            </m-icon-button>
                        </m-layout-grid-cell>
                    </m-layout-grid-inner>
                </template>
            </m-layout-grid>
        </m-card-primary-action>
        <template v-if="editOptions"> 
             <template slot="actionButtons">
                <m-icon-button icon="notification_important" title="Add reminder">
                </m-icon-button>
                <m-icon-button icon="person_add_alt_1" title="Add user">
                </m-icon-button>
                <m-icon-button icon="palette" title="Colour palette">
                </m-icon-button>
                <m-icon-button icon="image" title="Add images">
                </m-icon-button>
                <m-icon-button icon="archive" title="Add to archive">
                </m-icon-button>
                <m-icon-button icon="more_horiz" title="Options">
                </m-icon-button>
             </template>
            <template slot="actionIcons">
                <m-button @click="editOptions=false">Close</m-button>
            </template> 
        </template> 
    </m-card>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            task: '',
            editOptions : false,

        }
    },
    watch: {
        editOptions(value){
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
 