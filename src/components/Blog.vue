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
                        cardimage: 'https://db3pap002files.storage.live.com/y4mA_wOxUMDeMvGXdzJY0HJNuaZm7sG998ZbejhNsiSLzZiKEVWUseb_U-Svw2a_eUMI07qxw8OG93N3lADqzqf8vT6ofq5C0J5EqbsDC4xFIDkmYKyWTBEOZaSc92Bv6LOQTLSadwgb_YKAEmjLbIdA23-5n8HoLKs9tnklIr3ZVMbT0b3UOXkP-X8OVQCiS6b?width=343&height=210&cropmode=none',
                        cardtitle: '6 Strategies to Find Your Conference Keynote and Other Speakers',
                        cardtext: 'Sekarang, kamu bisa produksi tiket fisik untuk eventmu bersama Bostiketbos. Hanya perlu mengikuti beberapa langkah mudah.'

                    },
                    {
                        id: 2,
                        cardimage: 'https://db3pap002files.storage.live.com/y4mUH4LIMpgJ5JwiRTXRoRKC4F1WS3LNgIdo5LlB24pUrPCEONIzbiYC2ahTmL4itTxf0avmc0yIkA4VXP5hpf3SJFwBg2MsedqJ-YHvtozpOzH32Rfo2CmxFICAMIsIjpH5A8S1HVwkTwjq4R2jMtwGWBiFEOtcOVB2OzX39MW4MFQ3jUESE75_wi1SJDJ1kud?width=343&height=210&cropmode=none',
                        cardtitle: 'How Successfully Used Paid Marketing to Drive Incremental Ticket Sales',
                        cardtext: 'Sekarang, kamu bisa produksi tiket fisik untuk eventmu bersama Bostiketbos. Hanya perlu mengikuti beberapa langkah mudah.'
                    },
                    {
                        id: 3,
                        cardimage: 'https://db3pap002files.storage.live.com/y4mjb5Gnbd1Tw9G-_YLAIA8vaS4rfkexepfU8ZRqS1WAAwQjvPUXW2Xuauc6X3g6Xj_bRHYfxieBWoR27fOPPvlEDlhHfNtTVB20sT8xFXu6_owKFNv9iMYwEctX7_QosMcwhfci-P5dohHOSrmEmAyXV2lyy1WTuuPfOH-SHY2jzzeWzsG4JMJDVnv84gXd8NQ?width=343&height=210&cropmode=none',
                        cardtitle: 'Introducing Workspaces: Work smarter, not harder with new navigation',
                        cardtext: 'Sekarang, kamu bisa produksi tiket fisik untuk eventmu bersama Bostiketbos. Hanya perlu mengikuti beberapa langkah mudah.'
                    }
                ]
            }
        }
    }
</script>