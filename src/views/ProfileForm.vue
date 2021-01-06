<template>
    <div>
        <form-wizard class="form" title="Hospital Profile" subtitle="Please complete this form..." color="#008cff" stepSize="sm">
            <tab-content title="Summary" :beforeChange="sendSummary">
                <v-row>
                    <v-col>
                        <v-text-field v-model="summary.street_addr" label="Street Address"></v-text-field>
                        <v-select v-model="summary.state" :items="states" label="State"></v-select>
                        <v-text-field v-model="summary.hospital_name" label="Hospital Name"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="summary.city" label="City"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field v-model="summary.profile_name" label="Name for Hospital Profile"></v-text-field>
                        <v-text-field v-model="summary.year_founded" label="Year Founded"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="summary.profile_year" label="Year for Hospital Profile">
                            <template v-slot:prepend>
                                <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                                </template>
                                For comparing data across years, likely an accounting year, e.g. September to September
                                </v-tooltip>
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-select v-model="summary.part_of_HCO" :items="yn" label="Is your hospital part of a larger health care organization?"></v-select>
                        <v-select v-model="summary.other_healthcare_entities" :items="yn" label="Does hispital food staff provide prepared food to other health care entities?"></v-select>
                        <v-select v-model="summary.hospital_incorporated" :items="incorporated" label="How is the hospital incorporated?"></v-select>
                    </v-col>
                    <v-col>
                        <v-text-field v-if="summary.part_of_HCO" v-model="summary.HCO_name" label="HCO Name"></v-text-field>
                        <v-text-field v-if="summary.other_healthcare_entities" v-model="summary.name_other_entities" label="Please name these..."></v-text-field>
                    </v-col>
                </v-row>
                <v-text-field v-model="summary.member_of_associations" label="Please list any local, regional, state, or national associations of which your organization is a dues paying member."></v-text-field>
                <v-row>
                    <v-col>
                        <v-select v-model="summary.mission_statement_yn" :items="yn" label="Does your hospital food system have a mission statement?"></v-select>
                        <v-textarea v-if="summary.mission_statement_yn" label="Please provide your mission statement." v-model="summary.mission_statement"></v-textarea>
                    </v-col>
                    <v-col>
                        <v-select v-if="summary.mission_statement_yn" multiple v-model="summary.mission_statement_loc" :items="locations" label="Where is the mission statement located? (Select all that apply)"></v-select>
                        <v-text-field v-if="summary.mission_statement_yn" label="When was the mission statement written or last updated?" v-model="summary.mission_last_updated"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-select v-model="summary.food_procurement_policy" label="Who makes decisions on hospital food procurement policy?"></v-select>
                        <v-select v-model="summary.food_system_staff" label="Who makes decisions on hospital food system staffing?"></v-select>
                        <!-- TODO HOW DO I PASS FILE INFORMATION? -->
                        <v-file-input label="Upload Logo Here"></v-file-input>
                    </v-col>
                    <v-col>
                        <v-select v-model="summary.food_menus" label="Who makes decisions on hospital food menus?"></v-select>
                        <v-select v-model="summary.info_requests" label="Who responds to information requests from patients, staff, or visitors?"></v-select>
                    </v-col>
                </v-row>                
            </tab-content>
            <tab-content title="Management">
                <v-row>
                    <v-col>
                        <v-text-field label="Identify the number of paid staff positions in your hospital food procurement and preparation."></v-text-field>
                    </v-col>
                </v-row>
                <!-- <div> -->
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
                <!-- </div> -->
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
                <!-- <HospitalManagement /> -->
            </tab-content>
            <tab-content title="Vendors">
                <v-row>
                    <v-col>
                        <v-text-field dense label="How many local food vendors did you use during the previous year?" v-model="vendors.num_vendors"></v-text-field>
                    </v-col>
                </v-row>
                
                <v-row>
                    <v-col>
                        <p> If your food procurment spending is not tax exempt, please list your sales tax rate.</p>
                        <v-text-field dense label="State Amount" v-model="vendors.state_sales_tax"></v-text-field>
                        <v-text-field dense label="County Amount" v-model="vendors.county_sales_tax"></v-text-field>
                        <v-text-field dense label="Municipality Amount" v-model="vendors.municipality_sales_tax"></v-text-field>
                    </v-col>
                </v-row>
                <p>Identify whether the following product categories are exempt from sales tax.  Complete all that apply. </p>
                <v-data-table :headers="headers" :items="tax_exempt_categories" hide-default-footer>
                    <template v-slot:[`item.exempt`]="{ item }">
                        <v-simple-checkbox v-model="item.exempt">
                        </v-simple-checkbox>
                    </template>
                </v-data-table>
                <p>Services. Do you supply food for hospital service activities on the hospital campus? Select all that apply.</p>
                <v-checkbox v-for="item in ServiceItems" v-bind:key="item" :value="item" :label="item" v-model="vendors.services" dense>
                </v-checkbox>
                <v-select label="Does your hospital support USDA food security programs?" :items="yn" v-model="vendors.USDA_food_security"></v-select>
                <v-textarea v-if="vendors.USDA_food_security" label="Please explain how your hospital supports USDA food security programs" v-model="vendors.USDA_food_security_how"></v-textarea>
                <v-select label="Is Women, Infants, and Children Farmers Market Nutritional Program (WIC FMNP) available in your area, and does your hospital acceept?" :items="yn" v-model="vendors.accepts_WICFMNP"></v-select>
                <!-- <v-select label="Does your hospital accept WIC FMNP?" :items="yn" v-model="wicfmnp"></v-select> -->
                <v-text-field v-if="vendors.accepts_WICFMNP" label="Who offers WIC FMNP at your hospital?" v-model="vendors.who_offers_WICFMNP"></v-text-field>
                <v-select label="Is Senior Faarmers Market Nutritional Program (Senior FMNP) available in your area, and does your hospital accept??" v-model="vendors.accepts_seniorFMNP"></v-select>
                <v-text-field v-if="vendors.accepts_seniorFMNP" label="Who offers Senior FMNP at your hospital?" v-model="vendors.who_offers_seniorFMNP"></v-text-field>
                <v-select label="Is Women, Infants, and Children Cash Value Voucher (WIC CVV) available in your area, and does your hospital accept?" :items="yn" v-model="vendors.accepts_WICCVV"></v-select>
                <v-text-field v-if="vendors.accepts_WICCVV" label="Who offers WIC CVV at your hospital?" v-model="vendors.who_offers_WICCVV"></v-text-field>
                <v-select label="Does your hospital or vendors accept other vouchers, such as prescription vegetables, farm fresh vouchers, etc.?" :items="yn" v-model="vendors.accepts_vouchers"></v-select>
                <v-textarea v-if="vendors.accepts_vouchers" label="Please list these." v-model="vendors.list_vouchers_accepted"></v-textarea>
                <v-select label="Does your hospital offer an incentive program, such as double up food bucks, fresh checks, grow your SNAP, etc?" :items="yn" v-model="vendors.offers_incentive"></v-select>
                <v-textarea v-if="vendors.offers_incentive" label="Please list these." v-model="vendors.list_incentives_offered"></v-textarea>
                <!-- <HospitalVendors /> -->
            </tab-content>
            <tab-content title="Community">
                <v-select label="Are hospital staff members of the board of local food organizations?" :items="yn" v-model="community.staffonboard"></v-select>
                <v-textarea v-if="community.staffonboard" label="Identify the organization and staff person."></v-textarea>
                <v-textarea label="Please list up to five key partners (ex. sponsors, major funders, or event collaborators."></v-textarea>
                <!-- <v-checkbox v-for="item in communications" :key="item" :label="item"></v-checkbox> -->
                <p>Identify how you communicate about your food offerings. Select all that apply.</p>
                <v-row>
                    
                    <v-col>
                        <v-checkbox v-for="item in filteredItems(1,3)" :key="item" :label="item" :value="item" v-model="community.list_communications"></v-checkbox>
                    </v-col>
                    <v-col>
                        <v-checkbox v-for="item in filteredItems(2,3)" :key="item" :label="item" :value="item" v-model="community.list_communications"></v-checkbox>
                    </v-col>
                    <v-col>
                        <v-checkbox v-for="item in filteredItems(3,3)" :key="item" :label="item" :value="item" v-model="community.list_communications"></v-checkbox>
                    </v-col>
                </v-row>
                <v-select label="Do you produce an annual report?" :items="yn" v-model="community.has_annualreport"></v-select>
                <!-- TODO HOW TO PASS FILE INFO -->
                <v-file-input v-if="community.has_annualreport" label="Please upload your annual report here."></v-file-input>
                <!-- <HospitalCommunity /> -->
            </tab-content>
        </form-wizard>
        <v-select :items="states"></v-select>
    </div>
</template>
<script>
// /Users/rachelfu/Desktop/f2f-hospital-frontend/src/components/HospitalVendors.vue
import {mapActions} from 'vuex';
// import HospitalManagement from '@/components/HospitalManagement.vue';
// import HospitalVendors from '@/components/HospitalVendors.vue';
// import HospitalCommunity from '@/components/HospitalCommunity.vue';
export default {
    components: {
        // HospitalManagement,
        // HospitalVendors,
        // HospitalCommunity
    },
    data(){
        const summary = {
            street_addr: "",
            city: "",
            state: "",
            hospital_name: "",
            profile_year: "",
            profile_name: "",
            year_founded: "",
            part_of_HCO: null,
            HCO_name: "",
            other_healthcare_entities: null,
            name_other_entities: "",
            hospital_incorporated: "",
            member_of_associations: "",
            mission_statement_yn: null,
            mission_statement_loc: "",
            mission_statement: "",
            mission_last_updated: "",
            food_procurement_policy: "",
            food_menus: "",
            food_system_staff: "",
            info_requests: "",
            logo_name: "",
            logo_content_type: "",
            logo_data: ""
        }
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
        const vendors = {
            num_vendors: "",
            state_sales_tax: "",
            county_sales_tax: "",
            municipality_sales_tax: "",
            // produce_exempt: false,
            // meat_seafood_exempt: null,
            // dairy_exempt: null,
            // eggs_exempt: null,
            // plant_flower_exempt: null,
            // value_added_exempt: null,
            // prepared_exempt: null,
            // craft_art_services_exempt: null,
            // REMEMBER to also send over tax_exempt_categories
            services: [],
            USDA_food_security: null,
            USDA_food_security_how: "",
            accepts_WICFMNP: null,
            who_offers_WICFMNP: "",
            accepts_seniorFMNP: null,
            who_offers_seniorFMNP: "",
            accepts_WICCVV: null,
            who_offers_WICCVV: "",
            accepts_vouchers: null,
            list_vouchers_accepted: "",
            offers_incentive: null,
            list_incentives_offered: ""
        }
        const community = {
            staffonboard: null,
            list_org_staff: "",
            key_partners: "",
            list_communications: [],
            has_annualreport: null,
            annualreport: "",
        }
        // SUMMARY  
        const states = ['Alabama','Alaska', 'Arizona', 'Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
        // TODO how do I have them "explain" if they select the option "Other"
        const incorporated = ["Government","LLC","Non-profit","For profit","Partnership","Sole Propriertorship","Other"]
        const locations = ["Website","Manual","Market promotional materials","None of the above","Other"]

        // VENDORS
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
        const tax_exempt_categories = [
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
            summary,
            states,
            incorporated,
            locations,
            // MANAGEMENT
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
            management,
            // VENDORS
            headers,
            tax_exempt_categories,
            ServiceItems,
            selectedServices: [],
            yn: [{text: "Yes", value: true},{text:"No", value: false}],
            // supportsUSDA: null,
            // wicfmnp: null,
            // wiccvv: null,
            // acceptsvouchers: null,
            // offersincentives: null,
            vendors,
            // COMMUNITY
            // staffonboard: null,
            // annualreport: null,
            communications: ["Newsletter","Facebook","Instagram","Twitter","Youtube","Snapchat","Google+","Pinterest","Market websites","Newspaper","Other","None, we do not advertise our local sourcing of food we serve."],
            // comm_used: [],
            community
        }
    },
    methods: {
        ...mapActions(['newSummary']),
        sendSummary(){
            this.newSummary(this.$http, this.summary)
            // console.log(this.summary)
            return true
        },
        sendManagement(){
            console.log(this.management)
        },
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
.form {
    margin: 9%;
}
.check {
    margin-right: 7%;
}
</style>