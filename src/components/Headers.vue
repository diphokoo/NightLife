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
