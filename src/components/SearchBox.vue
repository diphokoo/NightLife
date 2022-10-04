<template>
    <div class="recSearchBox row">
        <div class="col-md-4">
            <h5 class="tHeader">Search Event</h5>
            <select class="form-select">
                <option selected>Kabza De Small Road Trip</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div> 
        <div class="col-md-4">
            <h5 class="tHeader">Place</h5>
            <select class="form-select">
                <option selected>JoJo Rooftop, Johannesb...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>
        <div class="col-md-4">
            <h5 class="tHeader">Time</h5>
            <select class="form-select">
                <option selected>Any date</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>
    </div>
</template>
<style scoped>

h5.tHeader {
    margin-top: 20px;
    margin-left: 10px;
} 

.form-select {
    color: white !important;
    background-color: transparent !important;
    border: 1px solid transparent !important;
}
</style>
<script>
    export default {
        name: 'Header',
        props: {
            SearchBox: Array,
        }
    }
</script>
