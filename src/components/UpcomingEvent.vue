<template>
 <div class="upcomingEvents">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Upcoming Events</a>

    <div class="collapse navbar-collapse float-right">
        <ul class="navbar-nav">
        
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="weekDays" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Weekdays
            </a>
            <div class="dropdown-menu" aria-labelledby="weekDays">
                <a class="dropdown-item" href="#">Monday</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
            </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="eventType" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Event Type
            </a>
            <div class="dropdown-menu" aria-labelledby="eventType">
                <a class="dropdown-item" href="#">Monday</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
            </div>
        </li>

        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="anyCategory" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Any Category
            </a>
            <div class="dropdown-menu" aria-labelledby="anyCategory">
                <a class="dropdown-item" href="#">Monday</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
            </div>
        </li>
        </ul>
    </div>
    </nav>
 </div>

</template>

<script>
    export default {
        name: 'UpcomingEvent',
        props: {
            UpcomingEvent: Array,
        }
    }
</script>
