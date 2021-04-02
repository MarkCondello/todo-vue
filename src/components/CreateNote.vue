<template>
    <m-card outlined>
        <template slot="actionButtons" v-if="editOptions">
             <input type="text" name="title" v-model="title" placeholder="title"/>
        </template>
        <template slot="actionButtons" v-else>
            <p @click="editOptions=true">Take a note...</p>
        </template>

        <template slot="actionIcons" v-if="editOptions">
             <m-icon-button icon="push_pin" title="Pin note">
            </m-icon-button> 
        </template>
        <template slot="actionIcons" v-else>
            <m-icon-button icon="check_box" title="Check list">
            </m-icon-button>
            <m-icon-button icon="brush" title="Add Sketch">
            </m-icon-button>
            <m-icon-button icon="photo" title="Add Photo">
            </m-icon-button>
        </template>

 
            <m-layout-grid v-if="editOptions">
                <
                <m-layout-grid-inner>
                    <m-layout-grid-cell>
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
                        <!-- Need Ellipsis -->
                    </m-layout-grid-cell>
                    <m-layout-grid-cell>
                        <m-button>Close</m-button>
                    </m-layout-grid-cell>
                </m-layout-grid-inner>
            </m-layout-grid>
     </m-card>
</template>

<script>
export default {
    data() {
        return {
            editOptions : false,

        }
    }
}
</script>

<style>

</style>