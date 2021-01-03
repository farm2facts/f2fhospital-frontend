<template>
    <div>
        <v-row>
            <v-col>
                <v-text-field label="Identify the number of paid staff positions in your hospital food procurement and preparation."></v-text-field>
            </v-col>
        </v-row>
        <div class="form">
            <p>What staff positions do you have at your hospital? Identify all that apply.</p>
            <v-row>
                <v-checkbox class="check" v-model="mfy" label="Manager, full time, year round (only salaried)"></v-checkbox>
                <v-text-field class="textbox"
                    :disabled="!mfy"
                    label="Wage/salary (month)"
                    v-model="management.mfy"
                    ></v-text-field>
            </v-row>
            <v-row>
                <v-checkbox class="check" v-model="mpy" label="Manager, part time, year round"></v-checkbox>
                <v-text-field
                    :disabled="!mpy"
                    label="Wage/salary (month)"
                    v-model="management.mpy"
                    ></v-text-field>
            </v-row>
            <v-row>
                <v-checkbox class="check" v-model="mfs" label="Manager, full time, seasonal"></v-checkbox>
                <v-text-field
                    :disabled="!mfs"
                    label="Wage/salary (month)"
                    v-model="management.mfs"
                    ></v-text-field>
            </v-row>
            <v-row>
                <v-checkbox class="check" v-model="mps" label="Manager, part time, seasonal"></v-checkbox>
                <v-text-field
                    :disabled="!mps"
                    label="Wage/salary (month)"
                    v-model="management.mps"
                    ></v-text-field>
            </v-row>
            <v-row>
                <v-checkbox class="check" v-model="d" label="Dietician"></v-checkbox>
                <v-text-field
                    :disabled="!d"
                    label="Wage/salary (month)"
                    v-model="management.dietician"
                ></v-text-field>
            </v-row>
            <v-row>
                <v-checkbox class="check" v-model="c" label="Chef(s)"></v-checkbox>
                <v-text-field
                    :disabled="!c"
                    label="Wage/salary (month)"
                    v-model="management.chef"
                ></v-text-field>
            </v-row>
            <v-row>
                <v-checkbox class="check" v-model="pc" label="Prep Cook"></v-checkbox>
                <v-text-field
                    :disabled="!pc"
                    label="Wage/salary (month)"
                    v-model="management.prepcook"
                ></v-text-field>
            </v-row>
            <v-row>
                <v-checkbox class="check" v-model="da" label="Dietary Aid">
                    <template v-slot:prepend>
                        <v-tooltip bottom max-width="300">
                        <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                        </template>
                        room rep (stocking); ambassador (general kitchen help); Porter (dishwasher); cafeteria aid (cash registers); nrc aid, (nursing home); inventory coordinator (MIGHT USE SOFTWARE meets deliveries, stocks, orders from vendors, could be more then one depending on hospital). 
                        </v-tooltip>
                    </template>
                </v-checkbox>
                <v-text-field
                    :disabled="!da"
                    label="Wage/salary (month)"
                    v-model="management.dietaryaid"
                    ></v-text-field>
            </v-row>
            <v-row>
                <v-checkbox class="check" v-model="other" label="Other"></v-checkbox>
                <v-text-field
                    :disabled="!other"
                    label="Wage/salary (month)"
                    v-model="management.other"
                    ></v-text-field>
            </v-row>
        </div>
        <p>Average hours worked per week:</p>
        <v-row>
            <v-col>
                <v-text-field label="Salaried Staff, Hours/Week" v-model="management.salaried_staff_hours"></v-text-field>
            </v-col>
            <v-col>
                <v-text-field label="Hourly staff, Hours/Week" v-model="management.hourly_staff_hours"></v-text-field>
            </v-col>
        </v-row>
       <v-text-field label="Annual food procurement budget for facility." prefix="$" v-model="management.food_procurement_budget"></v-text-field>
       <v-text-field 
       label="Amount of annual food budget allocated for local good, fresh, value added or otherwise prepared and provided by local business." 
       prefix="$"
       v-model="management.food_budget_allocated"></v-text-field>
       <v-checkbox v-model="budgetincludes" label="Does your annual food procurement budget include chemicals, paper goods, and dietary supplements?"></v-checkbox>
       <v-text-field 
       label="What is your budget for chemicals, paper goods, and dietary supplements?" 
       prefix="$" 
       v-if="budgetincludes"
       v-model="management.chem_paper_dietary_budget"></v-text-field>
    </div>
</template>

<script>
export default {
    data(){
        const management = {
            num_staff: "",
            mfy: "",
            mpy: "",
            mfs: "",
            mps: "",
            dietician: "",
            chef: "",
            prepcook: "",
            dietaryaid: "",
            other: "",
            salaried_staff_hours: "",
            hourly_staff_hours: "",
            food_procurement_budget: "",
            food_budget_allocated: "",
            chem_paper_dietary_budget: ""
        }
        return {
            mfy: false,
            mpy: false,
            mfs: false,
            mps: false,
            d: false,
            c: false,
            pc: false,
            da: false,
            other: false,
            budgetincludes: false,
            management
        }
    },
    methods: {
        sendManagement(){
            console.log(this.management)
        }
    }
    
}
</script>

<style scoped>
.check {
    margin-right: 7%;
}
.form {
    margin: 3%;
}
</style>