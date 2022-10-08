<template>
    <div class="blog">
        <h3 class="blogH3">Blog</h3>
        <div class="blogContent">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            </p>
        </div>
        <div class="row blogCards">
            <div class="row">
                <div class="col-sm-4">
                    <div class="card" style="width: 18rem;">
                        <img src="./assests/Blog/Image_1.png" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">
                                6 Strategies to Find Your Conference Keynote and Other Speakers
                            </h5>
                            <p class="card-text">
                                Sekarang, kamu bisa produksi tiket fisik untuk eventmu bersama Bostiketbos. Hanya perlu mengikuti beberapa langkah mudah.
                            </p>
                        </div>
                    </div>
                                    </div>
                <div class="col-sm-4">
                    <div class="card" style="width: 18rem;">
                        <img src="./assests/Blog/Image_2.png" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">
                                How Successfully Used Paid Marketing to Drive Incremental Ticket Sales
                            </h5>
                            <p class="card-text">
                                Sekarang, kamu bisa produksi tiket fisik untuk eventmu bersama Bostiketbos. Hanya perlu mengikuti beberapa langkah mudah.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="card" style="width: 18rem;">
                        <img src="./assests/Blog/Image_3.png" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">
                                Introducing Workspaces: Work smarter, not harder with new navigation
                            </h5>
                            <p class="card-text">
                                Sekarang, kamu bisa produksi tiket fisik untuk eventmu bersama Bostiketbos. Hanya perlu mengikuti beberapa langkah mudah.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-link blogBtn">Load More</button>

    </div>
</template>

<script>
        export default {
        name: 'Blog',
        props: {
            Blog: Array,
        }
    }
</script>