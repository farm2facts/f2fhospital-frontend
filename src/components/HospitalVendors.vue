<template>
    <div>
        <v-row>
            <v-col>
                <v-text-field dense label="How many local food vendors did you use during the previous year?"></v-text-field>
            </v-col>
        </v-row>
        
        <v-row>
            <v-col>
                <p> If your food procurment spending is not tax exempt, please list your sales tax rate.</p>
                <v-text-field dense label="State Amount"></v-text-field>
                <v-text-field dense label="County Amount"></v-text-field>
                <v-text-field dense label="Municipality Amount"></v-text-field>
            </v-col>
        </v-row>
        <p>Identify whether the following product categories are exempt from sales tax.  Complete all that apply. </p>
        <v-data-table :headers="headers" :items="categories" hide-default-footer>
            
            <template v-slot:[`item.exempt`]="{ item }">
                <v-simple-checkbox v-model="item.exempt">
                </v-simple-checkbox>
            </template>
        </v-data-table>
        <p>Services. Do you supply food for hospital service activities on the hospital campus? Select all that apply.</p>
        <v-checkbox v-for="item in ServiceItems" v-bind:key="item" :value="item" :label="item" v-model="selectedServices" dense>
        </v-checkbox>
        <v-select label="Does your hospital support USDA food security programs?" :items="yn" v-model="supportsUSDA"></v-select>
        <v-textarea v-if="supportsUSDA" label="Please explain how your hospital supports USDA food security programs"></v-textarea>
        <v-select label="Is Women, Infants, and Children Farmers Market Nutritional Program (WIC FMNP) available in your area, and does your hospital acceept?" :items="yn" v-model="wicfmnp"></v-select>
        <!-- <v-select label="Does your hospital accept WIC FMNP?" :items="yn" v-model="wicfmnp"></v-select> -->
        <v-text-field v-if="wicfmnp" label="Who offers WIC FMNP at your hospital?"></v-text-field>
        <v-select label="Is Women, Infants, and Children Cash Value Voucher (WIC CVV) available in your area, and does your hospital accept?" :items="yn" v-model="wiccvv"></v-select>
        <v-text-field v-if="wiccvv" label="Who offers WIC CVV at your hospital?"></v-text-field>
        <v-select label="Does your hospital or vendors accept other vouchers, such as prescription vegetables, farm fresh vouchers, etc.?" :items="yn" v-model="acceptsvouchers"></v-select>
        <v-textarea v-if="acceptsvouchers" label="Please list these."></v-textarea>
        <v-select label="Does your hospital offer an incentive program, such as double up food bucks, fresh checks, grow your SNAP, etc?" :items="yn" v-model="offersincentives"></v-select>
        <v-textarea v-if="offersincentives" label="Please list these."></v-textarea>
        
    </div>
</template>

<script>
export default {
    data(){
        const ServiceItems = ["Youth-specific activities","Live music","Demonstrations (cooking or planting)","Skills workshops (physical or craft)","Community group meetings for excercise or other"]
        const headers = [
            {
                text: "Cateogry",
                value: "category"
            },
            {
                text: "Exempt",
                value: "exempt"
            },
        ]
        // const categories = ["Produce","Meat & Seafood","Dairy","Eggs","Plants & Flowers","Value-added","Prepared food","Craft/art/services"];
        const categories = [
            {
                category: "Produce",
                exempt: false,
            },
            {
                category: "Meat & Seafood",
                exempt: false,
            },
            {
                category: "Dairy",
                exempt: false,
            },
            {
                category: "Eggs",
                exempt: false,
            },
            {
                category: "Plants & Flowers",
                exempt: false,
            },
            {
                category: "Value-added",
                exempt: false,
            },
            {
                category: "Prepared Food",
                exempt: false,
            },
            {
                category: "Craft/art/services",
                exempt: false,
            },
        ]
        return {
            headers,
            categories,
            ServiceItems,
            selectedServices: [],
            yn: [{text: "Yes", value: true},{text:"No", value: false}],
            supportsUSDA: null,
            wicfmnp: null,
            wiccvv: null,
            acceptsvouchers: null,
            offersincentives: null,
        }
    }
}
</script>
<style scoped>

</style>