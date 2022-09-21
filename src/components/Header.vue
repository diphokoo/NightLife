<template>
    <div class="headerColor">
        <img id="imgHeader" src="./assests/kabzanPhori-PhotoRoom.png">
        <i class="fa-solid fa-chevron-right"></i>
    </div>
</template>

<style scoped>
    img#imgHeader {
        /* left: 24px; */
        position: absolute;
        margin-left: 135px;
        margin-top: -22px;
    }

    i.fa-solid.fa-chevron-right[data-v-c970699f] {
        position: absolute;
        width: 40px;
        height: 20px;
        left: 1264px;
        top: 295px;
        font-size: 60px;
        border: 2.33333px solid #3D37F1;
        color: #3D37F1;
        /* transform: rotate(-90deg); */
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
