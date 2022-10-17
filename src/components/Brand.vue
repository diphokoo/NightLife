<template>
    <div class="brand">
        <h3 class="brandH3">Our partners</h3>
        <div class="brandContent">
            <p>
            {{ brandContent }} 
            </p>
        </div>
        <div class="BrandList">
            <div class="row d-flex justify-content-center">
                <div class="col-lg-2 col-md-6">
                    <img src="./assests/Brands/image_20.png" class="brandImg">
                </div>

                <div class="col-lg-2 col-md-6">
                    <img src="./assests/Brands/image_19.png" class="brandImg" style="margin-top: 5px;">
                </div>

                <div class="col-lg-2 col-md-6">
                    <img src="./assests/Brands/image_18.png" class="brandImg" style="margin-top: 15px;">
                </div>

                <div class="col-lg-2 col-md-6">
                    <img src="./assests/Brands/image_17.png" class="brandImg" style="margin-top: -10px;">
                </div>

                <div class="col-lg-2 col-md-6">
                    <img src="./assests/Brands/image_16.png" class="brandImg" style="margin-top: -36px; margin-left: 60px;">
                </div>
            </div>
            <div class="row d-flex justify-content-center secondRow">
                <div class="col-sm-3 col-md-3">
                    <img src="./assests/Brands/image_15.png" class="brandImg" style="margin-top: -35px;">
                </div>
                <div class="col-sm-3 col-md-3">
                    <img src="./assests/Brands/image_14.png" class="brandImg">
                </div>
                <div class="col-sm-3 col-md-3">
                    <img src="./assests/Brands/image_5.png" class="brandImg">
                </div>
                <div class="col-sm-3 col-md-3">
                    <img src="./assests/Brands/image_4.png" class="brandImg">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
        export default {
        name: 'Brand',
        props: {
            Brand: Array,
        },
         data() {
            return {
                brandContent: 'We had the pleasure of working with industry-defining brands. These are just some of them.' 
            }
         }
    }
</script>