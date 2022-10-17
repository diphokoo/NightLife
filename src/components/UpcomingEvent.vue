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
        <div class="col-4">
            1
        </div>
    </div>

    <a class="btn loadMore" href="#" role="button">Load More</a>
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

.card.col-5 {
    margin-left: 30px;
    margin-bottom: 10px;
    padding-bottom: 25px;
}

.cards.row {
    padding-left: 140px;
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
                Event: [
                    {
                        id: 1,
                        day: 14,
                        month: 'APR',
                        eventName: 'Wonder Girls 2010 Wonder Girls World Tour San Francisco',
                        description: 'We’ll get you directly seated and inside for you to enjoy the show.',
                        image: './assests/Events/Card1.png'

                    },
                    {
                        id: 2,
                        day: 20,
                        month: 'AUG',
                        eventName: 'JYJ 2011 JYJ Worldwide Concert Barcelona',
                        description: 'Directly seated and inside for you to enjoy the show.',
                        image: './assests/Events/Card2.png'
                    },
                    {
                        id: 3,
                        day: 18,
                        month: 'SEP',
                        eventName: '2011 Super Junior SM Town Live 10 World Tour New York City',
                        description: 'Directly seated and inside for you to enjoy the show.',
                        image: './assests/Events/Card3.png'
                    },
                    {
                        id: 4,
                        day: 14,
                        month: 'APR',
                        eventName: 'Wonder Girls 2010 Wonder Girls World Tour San Francisco',
                        description: 'We’ll get you directly seated and inside for you to enjoy the show.',
                        image: './assests/Events/Card4.png'
                    },
                    {
                        id: 5,
                        day: 20,
                        month: 'AUG',
                        eventName: 'JYJ 2011 JYJ Worldwide Concert Barcelona',
                        description: 'Directly seated and inside for you to enjoy the show.',
                        image: './assests/Events/Card5.png'
                    },
                    {
                        id: 6,
                        day: 18,
                        month: 'SEP',
                        eventName: '2011 Super Junior SM Town Live 10 World Tour New York City',
                        description: 'Directly seated and inside for you to enjoy the show.',
                        image: './assests/Events/Card6.png'
                    }
                ]
            }
        }
        
    }


</script>
