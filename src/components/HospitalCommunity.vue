<template>
    <div>
        <v-select label="Are hospital staff members of the board of local food organizations?" :items="yn" v-model="staffonboard"></v-select>
        <v-textarea v-if="staffonboard" label="Identify the organization and staff person."></v-textarea>
        <v-textarea label="Please list up to five key partners (ex. sponsors, major funders, or event collaborators."></v-textarea>
        <!-- <v-checkbox v-for="item in communications" :key="item" :label="item"></v-checkbox> -->
        <p>Identify how you communicate about your food offerings. Select all that apply.</p>
        <v-row>
            
            <v-col>
                <v-checkbox v-for="item in filteredItems(1,3)" :key="item" :label="item" :value="item" v-model="comm_used"></v-checkbox>
            </v-col>
            <v-col>
                <v-checkbox v-for="item in filteredItems(2,3)" :key="item" :label="item" :value="item" v-model="comm_used"></v-checkbox>
            </v-col>
            <v-col>
                <v-checkbox v-for="item in filteredItems(3,3)" :key="item" :label="item" :value="item" v-model="comm_used"></v-checkbox>
            </v-col>
        </v-row>
        <v-select label="Do you produce an annual report?" :items="yn" v-model="annualreport"></v-select>
        <v-file-input v-if="annualreport" label="Please upload your annual report here."></v-file-input>
    </div>
</template>

<script>
export default {
    data(){
        return {
            yn: [{text: "Yes", value: true},{text:"No", value: false}],
            staffonboard: null,
            annualreport: null,
            communications: ["Newsletter","Facebook","Instagram","Twitter","Youtube","Snapchat","Google+","Pinterest","Market websites","Newspaper","Other","None, we do not advertise our local sourcing of food we serve."],
            comm_used: []
        }
    },
    methods: {
        filteredItems(column, columns) {
            const self = this; // Enables us to pass this to the method
            const total = this.communications.length; // How many items
            const gap = Math.ceil(total / columns); // How many per col
            let top = (gap * column); // Top of the col
            const bottom = ((top - gap) + 1); // Bottom of the col
            top -= 1; // Adjust top back down one
            return self.communications.filter(item =>
                self.communications.indexOf(item) >= bottom
                && self.communications.indexOf(item) <= top,
            ); // Return the items for the given col
        },
    }
}
</script>

<style scoped>

</style>