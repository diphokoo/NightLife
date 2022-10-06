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

    <div class="cards row">
        <div class="card col-5" style="width: 18rem;">
            <img src="./assests/poster1.jpg" class="card-img-top" alt="...">
            <div class="card-body row">
                <div class="col-sm-4">
                    <span class="month">APR</span>
                    <h5 class="date">14</h5>
                </div>
                <div class="col-sm-8">
                    <p class="cardP1">Wonder Girls 2010 Wonder <br>Girls World Tour San Francisco</p>
                        <br>
                        <br>
                    <p class="cardP2">We’ll get you directly seated and <br>inside for you to enjoy the show.</p>
                </div>
            </div>
        </div>

        <div class="card col-5" style="width: 18rem;">
            <img src="./assests/poster2.jpg" class="card-img-top" alt="...">
            <div class="card-body row">
                <div class="col-sm-4">
                    <span class="month">Aug</span>
                    <h5 class="date">20</h5>
                </div>
                <div class="col-sm-8">
                    <p class="cardP1">Wonder Girls 2010 Wonder <br>Girls World Tour San Francisco</p>
                        <br>
                        <br>
                    <p class="cardP2">We’ll get you directly seated and <br>inside for you to enjoy the show.</p>
                </div>
            </div>
        </div>


        <div class="card col-5" style="width: 18rem;">
            <img src="./assests/poster3.jfif" class="card-img-top" alt="...">
            <div class="card-body row">
                <div class="col-sm-4">
                    <span class="month">SEP</span>
                    <h5 class="date">18</h5>
                </div>
                <div class="col-sm-8">
                    <p class="cardP1">Wonder Girls 2010 Wonder <br>Girls World Tour San Francisco</p>
                        <br>
                        <br>
                    <p class="cardP2">We’ll get you directly seated and <br>inside for you to enjoy the show.</p>
                </div>
            </div>
        </div>
        <div class="card col-5" style="width: 18rem;">
            <img src="./assests/poster4.jpg" class="card-img-top" alt="...">
            <div class="card-body row">
                <div class="col-sm-4">
                    <span class="month">APR</span>
                    <h5 class="date">14</h5>
                </div>
                <div class="col-sm-8">
                    <p class="cardP1">Wonder Girls 2010 Wonder <br>Girls World Tour San Francisco</p>
                        <br>
                        <br>
                    <p class="cardP2">We’ll get you directly seated and <br>inside for you to enjoy the show.</p>
                </div>
            </div>
        </div>

        <div class="card col-5" style="width: 18rem;">
            <img src="./assests/poster5.jpg" class="card-img-top" alt="...">
            <div class="card-body row">
                <div class="col-sm-4">
                    <span class="month">AUG</span>
                    <h5 class="date">20</h5>
                </div>
                <div class="col-sm-8">
                    <p class="cardP1">Wonder Girls 2010 Wonder <br>Girls World Tour San Francisco</p>
                        <br>
                        <br>
                    <p class="cardP2">We’ll get you directly seated and <br>inside for you to enjoy the show.</p>
                </div>
            </div>
        </div>

        <div class="card col-5" style="width: 18rem;">
            <img src="./assests/poster6.jpg" class="card-img-top" alt="...">
            <div class="card-body row">
                <div class="col-sm-4">
                    <span class="month">SEP</span>
                    <h5 class="date">18</h5>
                </div>
                <div class="col-sm-8">
                    <p class="cardP1">Wonder Girls 2010 Wonder <br>Girls World Tour San Francisco</p>
                        <br>
                        <br>
                    <p class="cardP2">We’ll get you directly seated and <br>inside for you to enjoy the show.</p>
                </div>
            </div>
        </div>
    </div>

    <a class="btn loadMore" href="#" role="button">Load More</a>
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
    export default {
        name: 'UpcomingEvent',
        props: {
            UpcomingEvent: Array,
        }
    }
</script>
