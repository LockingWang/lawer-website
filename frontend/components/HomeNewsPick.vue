<script setup lang="ts">
import { getNewsListCoverSrc, newsPlaceholders } from '~/data/newsPlaceholders'

const picks = computed(() => newsPlaceholders.slice(0, 3))
</script>

<template>
  <section class="mt-4" aria-labelledby="home-news-heading">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <h2 id="home-news-heading" class="text-2xl font-semibold text-ink">
        最新消息
      </h2>
      <NuxtLink
        to="/news"
        class="inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
      >
        查看全部
        <UIcon name="i-lucide-arrow-right" class="h-4 w-4" aria-hidden="true" />
      </NuxtLink>
    </div>
    <ul class="mt-8 divide-y divide-neutral-sage/25 rounded-xl border border-neutral-sage/30 bg-surface">
      <li
        v-for="item in picks"
        :key="item.slug"
      >
        <NuxtLink
          :to="`/news/${item.slug}`"
          class="flex gap-4 px-5 py-5 transition hover:bg-surface-muted/50 sm:items-start sm:gap-5"
        >
          <div
            class="relative size-20 shrink-0 overflow-hidden rounded-md border border-neutral-sage/25 bg-surface-muted sm:size-24"
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
          <div class="min-w-0 flex-1">
            <h3 class="font-semibold text-ink hover:text-brand-700 hover:underline">
              {{ item.title }}
            </h3>
            <p class="mt-1 line-clamp-2 text-sm text-ink/75">
              {{ item.excerpt }}
            </p>
            <time class="mt-2 block text-sm tabular-nums text-neutral-sage" :datetime="item.date">{{ item.date }}</time>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
