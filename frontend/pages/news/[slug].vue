<script setup lang="ts">
import { getNewsBySlug } from '~/data/newsPlaceholders'
import { siteNameZh } from '~/utils/siteContact'

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const article = computed(() => getNewsBySlug(slug.value))

watchEffect(() => {
  const a = article.value
  if (a) {
    usePageSeo(
      a.title,
      a.excerpt,
      { ogTitle: `${a.title}｜最新消息｜${siteNameZh}` }
    )
  }
  else {
    usePageSeo(
      '找不到這則訊息',
      `您所請求的訊息不存在或已下架。請返回${siteNameZh}最新消息列表。`,
      { ogTitle: `找不到這則訊息｜${siteNameZh}` }
    )
  }
})
</script>

<template>
  <article class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
    <template v-if="article">
      <NuxtLink
        to="/news"
        class="inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
      >
        <UIcon name="i-lucide-arrow-left" class="h-4 w-4" aria-hidden="true" />
        返回列表
      </NuxtLink>
      <header class="mt-6">
        <time class="text-sm tabular-nums text-neutral-sage" :datetime="article.date">{{ article.date }}</time>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {{ article.title }}
        </h1>
        <p class="mt-4 text-lg leading-relaxed text-ink/85">
          {{ article.excerpt }}
        </p>
      </header>
      <figure
        v-if="article.imageSrc?.trim()"
        class="mt-8 flex max-h-[min(55vh,520px)] min-h-[12rem] items-center justify-center overflow-hidden rounded-xl border border-neutral-sage/25 bg-surface-muted shadow-sm"
      >
        <img
          :src="article.imageSrc.trim()"
          :alt="`${article.title} 封面圖`"
          width="1200"
          height="675"
          class="max-h-[min(55vh,520px)] w-full object-contain object-center"
          loading="eager"
          decoding="async"
        >
      </figure>
      <div
        class="prose-news max-w-none border-t border-neutral-sage/25 pt-8 text-ink/90"
        :class="article.imageSrc?.trim() ? 'mt-8' : 'mt-10'"
      >
        <p
          v-for="(para, i) in article.paragraphs"
          :key="i"
          class="leading-relaxed"
          :class="{ 'mt-5': i > 0 }"
        >
          {{ para }}
        </p>
      </div>
    </template>

    <template v-else>
      <h1 class="text-2xl font-semibold text-ink">
        找不到這則訊息
      </h1>
      <p class="mt-4 text-ink/80">
        請確認網址是否正確，或返回最新消息列表。
      </p>
      <UButton to="/news" class="mt-6" color="primary">
        返回最新消息
      </UButton>
    </template>
  </article>
</template>
