<template>
    <div class="recSearchBox row">
        <div class="col-md-4">
            <h5 class="tHeader">{{ eventTitle }}</h5>
            <ejs-dropdownlist id='dropdownlist' class="dropDown" popupHeight="200px" popupWidth="250px" :dataSource='Event' placeholder='Select a Event' style="color: white;"></ejs-dropdownlist>
        </div> 
        <div class="col-md-4">
            <h5 class="tHeader">{{ eventVenue }}</h5>
            <ejs-dropdownlist id='dropdownlist' class="dropDown" popupHeight="200px" popupWidth="250px" :dataSource='Venue' placeholder='Select a Venue' style="color: white;"></ejs-dropdownlist>

        </div>
        <div class="col-md-4">
            <h5 class="tHeader">{{ eventTime }}</h5>
            <ejs-dropdownlist id='dropdownlist' class="dropDown" popupHeight="200px" popupWidth="250px" :dataSource='selectDate' placeholder='Select a Date' style="color: white;"></ejs-dropdownlist>
        </div>
    </div>
</template>
<style scoped>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
h5.tHeader {
    margin-top: 20px;
    margin-left: 10px;
} 

.dropDown {
    color: white !important;
}

</style>
<script>
    import { DropDownListComponent } from "@syncfusion/ej2-vue-dropdowns";
    
    
    export default{
        name: 'SearchB',
        props: {
            SearchB: Object,
        },
        components: {
        "ejs-dropdownlist": DropDownListComponent
        },
        data () {
        return {
            Event: [
                'Kabza de Small Road Trip', 
                'Spring Fiesta', 
                'Ultra South Africa', 
                'Durban July', 
                'Fill Up FNB'
            ],
            Venue: [
                'Jojo Rooftop',
                'Capello',
                'Kong',
                'Long street DK',
                'Zone 6'
            ],
            selectDate:[
                'Monday', 
                'Tuesday', 
                'Wednesday', 
                'Thursday', 
                'Friday', 
                'Saturday', 
                'Sunday'
            ],
            eventTitle: 'Search Event',
            eventVenue: 'Place',
            eventTime: 'Time'

         }
        }
    }
</script>
