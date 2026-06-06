<script setup lang="ts">
import { newsPlaceholders } from '~/data/newsPlaceholders'

const picks = computed(() => newsPlaceholders.slice(0, 3))
</script>

<template>
  <section class="flex h-full flex-col" aria-labelledby="home-news-heading">
    <div class="flex items-end justify-between">
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
    <ul class="mt-4 flex-1 divide-y divide-neutral-sage/25 rounded-xl border border-neutral-sage/30 bg-surface">
      <li
        v-for="item in picks"
        :key="item.slug"
      >
        <NuxtLink
          :to="`/news/${item.slug}`"
          class="block px-5 py-4 transition hover:bg-surface-muted/50"
        >
          <time class="text-xs tabular-nums text-neutral-sage" :datetime="item.date">{{ item.date }}</time>
          <h3 class="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-ink hover:text-brand-700">
            {{ item.title }}
          </h3>
          <p class="mt-1 line-clamp-2 text-xs leading-relaxed text-ink/60">
            {{ item.excerpt }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
