<template>
    <div>
        <div class="article" v-for="article in articles">
            <h2>
                <router-link :to="article.path">
                    {{ article.frontmatter.title }}
                </router-link>
            </h2>
            <p>{{ article.frontmatter.description }}</p>
            <p class="date">UnZan in {{ article.frontmatter.date }}</p>
        </div>
    </div>
</template>
<style scoped>
    .article {
        margin: 50px 0;
    }
    .date {
        text-align: end;
    }
</style>
<script>
export default {
    computed: {
        articles() {
            var articlesRaw = this.$site.pages
                .filter(x => x.path.startsWith(this.$route.path) && !x.frontmatter.article_index)
                .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
                
            return articlesRaw.map((article)=>{article.frontmatter.date = article.frontmatter.date.split("T")[0];return article});
        }
    }
}
</script>