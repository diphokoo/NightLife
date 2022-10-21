<template>
    <div class="headerColor">
        <img id="imgHeader" src="./assests/kabzanPhori-PhotoRoom.png">
        <i class="fa-solid fa-chevron-right"></i>
        <i class="fa-solid fa-chevron-left"></i>

        <h2 class="subheader"> {{ subheader }} </h2>
        <p class="dscP">{{ subParagraph }}</p>
    
        <button class="tickets">{{ tickets }}</button>
        <button class="learn">{{ learn }}</button>
    
    </div>
</template>

<style scoped>


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

    .tickets {
        position: absolute;
        width: 182px;
        height: 60px;
        left: 812px;
        top: 441px;

        background: #F5167E;
        box-shadow: 0px 10px 50px rgba(61, 55, 241, 0.25);
        border-radius: 50px;
    }
    
    .learn {
        box-sizing: border-box;

        position: absolute;
        width: 182px;
        height: 60px;
        left: 1014px;
        top: 441px;

        
        filter: drop-shadow(0px 10px 50px rgba(61, 55, 241, 0.25));
        border-radius: 50px;
    }
    </style> 
<script>
    export default {
        name: 'Headers',
        props: {
            Headers: Array,
        },
        data() {
            return {
                subheader: "Kabza De Small ft Maphorisa - Road Trip",
                subParagraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
                tickets: "Get Tickets",
                learn: "Learn More"
            }
        }
    }
</script>
