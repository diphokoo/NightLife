<template>
    <div class="blog">
        <h3 class="blogH3">{{ blogHeader }}</h3>
        <div class="blogContent">
            <p>
                {{ blogP }}
            </p>
        </div>
        <div class="row blogCards">
            <div class="row">
                <div class="col-sm-4" v-for="blog in blogs" :key="blogs.id">
                    <div class="card" style="width: 18rem;">
                        <img :src="blog.cardimage" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">
                                {{ blog.cardtitle }}
                            </h5>
                            <p class="card-text">
                                {{ blog.cardtext }}
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
        },
        data() {
            return {
                blogHeader: 'Blog',
                blogP: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                blogs: [
                    {
                        id: 1,
                        cardimage: './assests/Blog/Image_1.png',
                        cardtitle: '6 Strategies to Find Your Conference Keynote and Other Speakers',
                        cardtext: 'Sekarang, kamu bisa produksi tiket fisik untuk eventmu bersama Bostiketbos. Hanya perlu mengikuti beberapa langkah mudah.'

                    },
                    {
                        id: 2,
                        cardimage: './assests/Blog/Image_2.png',
                        cardtitle: 'How Successfully Used Paid Marketing to Drive Incremental Ticket Sales',
                        cardtext: 'Sekarang, kamu bisa produksi tiket fisik untuk eventmu bersama Bostiketbos. Hanya perlu mengikuti beberapa langkah mudah.'
                    },
                    {
                        id: 3,
                        cardimage: './assests/Blog/Image_3.png',
                        cardtitle: 'Introducing Workspaces: Work smarter, not harder with new navigation',
                        cardtext: 'Sekarang, kamu bisa produksi tiket fisik untuk eventmu bersama Bostiketbos. Hanya perlu mengikuti beberapa langkah mudah.'
                    }
                ]
            }
        }
    }
</script>