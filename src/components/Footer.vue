<template>
    <div class="container my-">

<footer class="text-center text-lg-start border border-white mt-xl-5 pt-4">
<!-- Grid container -->
<div class="container p-4">
  <!--Grid row-->
  <div class="row">
    <!--Grid column-->
    <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
        <img src="./assests/Footer/nightclub.png" class="footerImg">

        <p class="">
            Nightclub is a lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
        <div class="row">
            <div class="col">
                <img src="./assests/Footer/facebook.png" class="nftImg">            </div>
            <div class="col">
                <img src="./assests/Footer/twitter.png" class="nftImg">
            </div>
            <div class="col">
                <img src="./assests/Footer/linkedin.png" class="nftImg">
            </div>
        </div>
    </div>
    <!--Grid column-->

    <!--Grid column-->
    <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
      <h5 class="mb-4">Plan Events</h5>

      <ul class="list-unstyled">
        <li>
          <a href="#!" class="text-white">Create</a>
        </li>
        <li>
          <a href="#!" class="text-white">Sell Tickets</a>
        </li>
        <li>
          <a href="#!" class="text-white">Online RSVP</a>
        </li>
        <li>
          <a href="#!" class="text-white">Online Events</a>
        </li>
      </ul>
    </div>
    <!--Grid column-->

    <!--Grid column-->
    <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
      <h5 class="text-uppercase mb-4">Careers</h5>

      <ul class="list-unstyled">
        <li>
          <a href="#!" class="text-white">Jobs</a>
        </li>
      </ul>
    </div>
    <!--Grid column-->

    <!--Grid column-->
    <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
      <h5 class="text-uppercase mb-4">Sign up to our newsletter</h5>

      <div class="form-outline form-white mb-4">
        <input type="email" id="form5Example2" class="form-control" />
        <label class="form-label" for="form5Example2">Email address</label>
      </div>

      <button type="submit" class="btn btn-outline-white btn-block">Subscribe</button>
    </div>
    <!--Grid column-->
  </div>
  <!--Grid row-->
</div>
<!-- Grid container -->

<!-- Copyright -->
<div class="text-center p-3 border-top border-white">
  © 2020 Copyright:
  <a class="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
</div>
<!-- Copyright -->
</footer>

</div>
<!-- End of .container -->
</template>

<script>
        export default {
        name: 'Footer',
        props: {
            Footer: Array,
        }
    }
</script>