<template>
 <div class="upcomingEvents">
    <nav class="navbar navbar-expand-lg navbar-light">
    <h4 class="navbar-brand" href="#">{{ title }}</h4>

    <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">       
            <li class="nav-item dropdown bg-light">
                <ejs-dropdownlist id='dropdownlist' class="dropDown" popupHeight="200px" popupWidth="250px" :dataSource='weekdays' placeholder='Weekdats' style="color: white;"></ejs-dropdownlist>
            </li>
            <li class="nav-item dropdown bg-light">
                <ejs-dropdownlist id='dropdownlist' class="dropDown" popupHeight="200px" popupWidth="250px" :dataSource='eventType' placeholder='Event Type' style="color: white;"></ejs-dropdownlist>
            </li>
            <li class="nav-item dropdown bg-light">
                <ejs-dropdownlist id='dropdownlist' class="dropDown" popupHeight="200px" popupWidth="250px" :dataSource='category' placeholder='Any category' style="color: white;"></ejs-dropdownlist>
            </li>
        </ul>
    </div>
    </nav>

    <div class="cards row">
        <div class="card col-3" v-for="Event in Events" :key="Events.id">
            <img class="card-img-top" :src="Event.image_url">
            <div class="card-body row">
                <div class="col-sm-4">
                    <span class="month"> {{ Event.month }} </span>
                    <h5 class="date"> {{ Event.day }} </h5>
                </div>
                <div class="col-sm-8">
                    <p class="cardP1">
                        {{ Event.eventName }}
                    </p>
                    <br>
                    <br>
                    <p class="cardP2">
                        {{ Event.description }}
                    </p>
                </div>
            </div>
        </div>

        {{ Events.id }}
    </div>

    <a class="btn loadMore" href="#" role="button">{{ eventBtn }}</a>
</div>


</template>

<style scoped>
    @import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
    @import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
    @import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
.form-select {
    /* position: absolute; */
    width: 168px !important;
    height: 46px !important;
    left: 719px !important;
    top: 896px !important;
    background: #F2F4FF !important;
    border-radius: 50px !important;
    /* color: white; */
    color: #1D275F !important; 
}

li.nav-item.dropdown.bg-light {
    margin: 10px;
}

h4.navbar-brand {
    /* position: absolute; */
    width: 319px;
    height: 49px;
    left: 177px;
    top: 894px;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 49px;
    color: #242565 !important;
}

ul.navbar-nav {
    /* margin-right: -315px; */
    padding-left: 530px;
}


.cards.row {
    padding-left: 60px;
}



.card.col-3 {
    height: 310px;
    width: 330px;
    margin-top: 20px;
    margin-left: 20px;
}

.month {
    position: absolute;
    width: 25.59px;
    height: 15.16px;

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 11.3717px;
    line-height: 15px;
    text-align: center;

    color: #3D37F1;
}

.date {
    position: absolute;
    width: 28.43px;
    height: 36.96px;
    margin-top: 10px;
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 28.4293px;
    line-height: 37px;

    color: #000000;

}

.cardP1 {
    position: absolute;
    width: 241.65px;
    height: 45.49px;

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    margin-left: -53px;
    color: #000000;
}

.cardP2 {
    position: absolute;
    width: 241.65px;
    height: 39.8px;

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    margin-left: -53px;


    color: #6A6A6A;
}

.loadMore {
    box-sizing: border-box;
    position: absolute;
    width: 180px;
    height: 33px;
    left: 536px;
    margin-top: 25px;
    border: 1.5px solid #3D37F1;
    color: #3D37F1;
    filter: drop-shadow(0px 10px 50px rgba(61, 55, 241, 0.25));
    border-radius: 50px;
}


</style> 

<script>
    import { DropDownListComponent } from "@syncfusion/ej2-vue-dropdowns";

    export default {
        name: 'UpcomingEvent',
        props: {
            UpcomingEvent: Array,
        },
        components: {
        "ejs-dropdownlist": DropDownListComponent
        },
        data () {
            return {
                title: 'Upcoming Event',
                weekdays: [
                'Monday', 
                'Tuesday', 
                'Wednesday', 
                'Thursday', 
                'Friday', 
                'Saturday', 
                'Sunday'
                ],
                eventType:[
                    'concerts',
                    'club',
                    'bash'
                ],
                category:[
                    'Outdoor',
                    'Indoor'
                ],
                Events: [
                    {
                        id: 1,
                        day: 14,
                        month: 'APR',
                        eventName: 'Wonder Girls 2010 Wonder Girls World Tour San Francisco',
                        description: 'We’ll get you directly seated and inside for you to enjoy the show.',
                        image_url: "https://db3pap002files.storage.live.com/y4mq2AqZ6VeI1I3VEG453BQrhVa7K-d9avrNrMUwakGdf3r_dzetGGsvWWXQAphu8PwT-eHqY2VFsfWo51e6-AdJkChmDyi0LmFfhfmK1ze2msCuKvuP50mHj_VdE1LiD1hVLro2TjYmh_kOiTBqH3zDLBp51Nzhs_aw7PQU1PS863ME8t7aAC-IKOU68mdp81y?width=344&height=198&cropmode=none"

                    },
                    {
                        id: 2,
                        day: 20,
                        month: 'AUG',
                        eventName: 'JYJ 2011 JYJ Worldwide Concert Barcelona',
                        description: 'Directly seated and inside for you to enjoy the show.',
                        image_url: "https://db3pap002files.storage.live.com/y4m6xWXy5d_qYIXZPB3TRG66nNZz92OHksOMyHF6wPMD8dfiqWpc-UCCml14GkX5ueuwWYR4Wto9VgQYEM3FIMpl1esmZzR367X2ks8zC0rNnRD-GTMJdIJC5n3UThOFHapYPlAENgfnNu9hFPYLG-DoN64wXKhkytuGT6v46jPlWnGAnfKJqE8lgdQgWTuC3HK?width=344&height=198&cropmode=none"
                    },
                    {
                        id: 3,
                        day: 18,
                        month: 'SEP',
                        eventName: '2011 Super Junior SM Town Live 10 World Tour New York City',
                        description: 'Directly seated and inside for you to enjoy the show.',
                        image_url: "https://db3pap002files.storage.live.com/y4mCf5fPVSIrnS__g6aWDpHNKDHMYIVxuGTQNWr5CXjcLUCV2oKxZUS2fdEIYQLktkYty6PlqG06cBAcLyXFD2BMyRAU9oZQ0KadD7C5VZ15o9FEiH-vXechr_jfVrfdrDdcDxBCDPLSEoddwmPJgoGwU0dWo40wYAmbBwL2T5wt8zDTWuWGOZziMAcM7TNK_FY?width=344&height=198&cropmode=none"
                    },
                    {
                        id: 4,
                        day: 14,
                        month: 'APR',
                        eventName: 'Wonder Girls 2010 Wonder Girls World Tour San Francisco',
                        description: 'We’ll get you directly seated and inside for you to enjoy the show.',
                        image_url: "https://db3pap002files.storage.live.com/y4mF4XiAW8qysGE8aqdBy0JSPRWqf8n5oZOxermE7cPsuUrRnF_iWjoO8mrj2jbCDKrE-HwsAPKbfCDPXq8S6YQGSanuFlGz8VO4EDJ8cyT5qc6pmWO9ViQwnbKLpOYX3v-SSpjEVQaaeu6TQKBC50-ePYgo3Yld4_f4QU7LBeatod3-a5Gzbmm3KmE96Vc2-n3?width=344&height=198&cropmode=none"
                    },
                    {
                        id: 5,
                        day: 20,
                        month: 'AUG',
                        eventName: 'JYJ 2011 JYJ Worldwide Concert Barcelona',
                        description: 'Directly seated and inside for you to enjoy the show.',
                        image_url: "https://db3pap002files.storage.live.com/y4mm77y-Uxg8-YvxJ4fTQXOHjO2ErTR74WJmBpkVpAayZtqdI4Vy6V74_5UM9noOuH16TrJUsGTL3uR-pbpDDdGk25hTqPzlER55nKtIJsnG3U8BL0N5_A8DxX4a_1yoAm2dKk-JywLgpKhoxu8rgyAvTHrwpmpRiWTyaWFOET-4sOHdve3vJC-a3q5cLcXKfwu?width=344&height=198&cropmode=none"
                    },
                    {
                        id: 6,
                        day: 18,
                        month: 'SEP',
                        eventName: '2011 Super Junior SM Town Live 10 World Tour New York City',
                        description: 'Directly seated and inside for you to enjoy the show.',
                        image_url: "https://db3pap002files.storage.live.com/y4mrAOtzdsErQ-cF2xF6Q74vk_kOKuu_7df-lY8yK2fn054pK2vwI9PSXJCeNF3ImlgfCWzM5Ykcks7dK0dCXKnMz6AUqWij4qwg2HZveOQqjj8wRwJIugF-cpEBBCvJjs2pAAXNKnrmC78K4jxSjv6NE9TU5G0E7VQApyZgSkbGqN3FfcVPnj1TGTQ1ub5d-88?width=344&height=198&cropmode=none"
                    }
                ],
                eventBtn: "Load More"
            }
        }
        
    }


</script>
