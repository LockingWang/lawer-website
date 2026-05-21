<script setup lang="ts">
import { getNewsListCoverSrc, newsPlaceholders } from '~/data/newsPlaceholders'
import { siteNameZh } from '~/utils/siteContact'

usePageSeo(
  '最新消息',
  `${siteNameZh}公告、活動與文章。內容於網站專案內維護（企劃 §8.3）。`,
  { ogTitle: `最新消息｜${siteNameZh}` }
)
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
    <header>
      <h1 class="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        最新消息
      </h1>
      <p class="mt-3 text-ink/80">
        內容於網站專案內以資料模組維護（企劃 §8.3），每則訊息皆有獨立網址。
      </p>
    </header>

    <ul class="mt-10 divide-y divide-neutral-sage/30 border-t border-neutral-sage/30">
      <li
        v-for="item in newsPlaceholders"
        :key="item.slug"
        class="py-6"
      >
        <NuxtLink
          :to="`/news/${item.slug}`"
          class="group flex gap-4 rounded-lg outline-none ring-brand-500/30 focus-visible:ring-2 sm:gap-5"
        >
          <div
            class="relative size-20 shrink-0 overflow-hidden rounded-lg border border-neutral-sage/25 bg-surface-muted sm:size-24"
          >
            <img
              :src="getNewsListCoverSrc(item)"
              alt=""
              width="320"
              height="320"
              class="h-full w-full object-contain object-center"
              loading="lazy"
              decoding="async"
            >
          </div>
          <div class="min-w-0 flex-1 py-0.5">
            <time
              class="text-sm tabular-nums text-neutral-sage"
              :datetime="item.date"
            >{{ item.date }}</time>
            <h2 class="mt-1 text-lg font-semibold text-ink group-hover:text-brand-700 group-hover:underline">
              {{ item.title }}
            </h2>
            <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/75">
              {{ item.excerpt }}
            </p>
            <span class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
              閱讀全文
              <UIcon name="i-lucide-arrow-right" class="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
