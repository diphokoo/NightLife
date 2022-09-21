<template>
    <div class="headerColor">
        <img id="imgHeader" src="./assests/kabzanPhori-PhotoRoom.png"> 
    </div>
</template>

<style scoped>
    img#imgHeader {
        /* left: 24px; */
        position: absolute;
        margin-left: 135px;
        margin-top: -23px;
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
