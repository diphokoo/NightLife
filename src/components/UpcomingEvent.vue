<template>
 <div class="upcomingEvents">
    <nav class="navbar navbar-expand-lg navbar-light">
    <h4 class="navbar-brand" href="#">Upcoming Events</h4>

    <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
        
            <li class="nav-item dropdown bg-light">
                <select class="form-select" aria-label="Default select example">
                    <option selected>Weekdays</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </li>
            <li class="nav-item dropdown bg-light">
                <select class="form-select" aria-label="Default select example">
                    <option selected>Event Type</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </li>
            <li class="nav-item dropdown bg-light">
                <select class="form-select" aria-label="Default select example">
                    <option selected>Any Category</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </li>
        </ul>
    </div>
    </nav>
 </div>

</template>

<style scoped>
    
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
</style>

<script>
    export default {
        name: 'UpcomingEvent',
        props: {
            UpcomingEvent: Array,
        }
    }
</script>
