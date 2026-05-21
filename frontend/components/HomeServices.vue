<script setup lang="ts">
import { practiceAreaCards } from '~/utils/intruductionSeed'
</script>

<template>
  <section id="services" class="mt-16 scroll-mt-24" aria-labelledby="home-services-heading">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 id="home-services-heading" class="text-2xl font-semibold text-ink">
          服務領域
        </h2>
        <p class="mt-1 max-w-2xl text-sm text-ink/75">
          依您需求初步對應服務類型；實際個案仍須視事實與適用法令而定。
        </p>
      </div>
      <NuxtLink
        to="/firm"
        class="mt-2 inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-brand-600 hover:underline sm:mt-0"
      >
        完整本所介紹
        <UIcon name="i-lucide-arrow-right" class="h-4 w-4" aria-hidden="true" />
      </NuxtLink>
    </div>
    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="card in practiceAreaCards"
        :key="card.title"
        :to="card.to"
        class="group flex flex-col rounded-xl border border-neutral-sage/35 bg-surface p-5 shadow-sm transition hover:border-brand-500/40 hover:shadow-md"
      >
        <h3 class="text-lg font-semibold text-ink group-hover:text-brand-700">
          {{ card.title }}
        </h3>
        <p class="mt-2 flex-1 text-sm leading-relaxed text-ink/80">
          {{ card.desc }}
        </p>
        <span class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
          了解更多
          <UIcon name="i-lucide-chevron-right" class="h-4 w-4" aria-hidden="true" />
        </span>
      </NuxtLink>
    </div>
  </section>
</template>
