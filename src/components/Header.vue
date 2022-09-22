<template>
    <div class="headerColor">
        <img id="imgHeader" src="./assests/kabzanPhori-PhotoRoom.png">
        <i class="fa-solid fa-chevron-right"></i>
        <i class="fa-solid fa-chevron-left"></i>

        <h2 class="subheader"> Kabza De Small ft Maphorisa - Road Trip </h2>
        <p class="dscP">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
    </div>
</template>

<style scoped>
    img#imgHeader {
        /* left: 24px; */
        position: absolute;
        margin-left: 135px;
        margin-top: -22px;
    }

    i.fa-solid.fa-chevron-right {
        position: absolute;
        width: 40px;
        height: 20px;
        left: 1264px;
        top: 295px;
        font-size: 60px;
        color: #3D37F1;
        /* transform: rotate(-90deg); */
    }

    i.fa-solid.fa-chevron-left {
        position: absolute;
        width: 40px;
        height: 20px;
        left: 90px;
        top: 255px;
        font-size: 60px;
        color: #EDA046;
        /* transform: rotate(90deg); */
    }

    .subheader {
        position: absolute;
        width: 443px;
        height: 98px;
        left: 820px;
        top: 218px;

        font-family: 'Proxima Nova';
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 49px;
    }

    .dscP {
        position: absolute;
        width: 443px;
        height: 69px;
        left: 820px;
        top: 342px;

        font-family: 'Proxima Nova';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 130%;
        /* or 23px */
    }
        
    </style>
<script>
    export default {
        name: 'Header',
        props: {
            Headers: Array,
        }
    }
</script>
