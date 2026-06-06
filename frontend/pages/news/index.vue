<script setup lang="ts">
import { getNewsListCoverSrc, newsPlaceholders } from '~/data/newsPlaceholders'
import { siteNameZh } from '~/utils/siteContact'

usePageSeo(
  '最新消息',
  `${siteNameZh}最新公告、活動資訊與法律知識分享。`,
  { ogTitle: `最新消息｜${siteNameZh}` }
)
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

    <header class="border-b border-neutral-sage/30 pb-8">
      <p class="text-xs font-semibold tracking-widest text-accent-teal uppercase">
        News
      </p>
      <h1 class="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        最新消息
      </h1>
      <p class="mt-3 text-ink/70">
        公告、活動資訊與法律知識分享，持續更新中。
      </p>
    </header>

    <ul class="mt-8 space-y-4">
      <li
        v-for="item in newsPlaceholders"
        :key="item.slug"
      >
        <NuxtLink
          :to="`/news/${item.slug}`"
          class="group flex gap-5 rounded-2xl border border-neutral-sage/25 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          <!-- 縮圖 -->
          <div class="relative size-24 shrink-0 overflow-hidden rounded-xl bg-surface-muted">
            <img
              :src="getNewsListCoverSrc(item)"
              alt=""
              width="320"
              height="320"
              class="h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            >
          </div>

          <!-- 內文 -->
          <div class="min-w-0 flex-1 py-0.5">
            <time
              class="inline-flex items-center gap-1.5 text-xs tabular-nums text-neutral-sage"
              :datetime="item.date"
            >
              <UIcon name="i-lucide-calendar" class="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {{ item.date }}
            </time>
            <h2 class="mt-2 text-base font-semibold leading-snug text-ink transition group-hover:text-brand-700">
              {{ item.title }}
            </h2>
            <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/65">
              {{ item.excerpt }}
            </p>
            <span class="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
              閱讀全文
              <UIcon
                name="i-lucide-arrow-right"
                class="h-4 w-4 transition duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </NuxtLink>
      </li>
    </ul>

  </div>
</template>
