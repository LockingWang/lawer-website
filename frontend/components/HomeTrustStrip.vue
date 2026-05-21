<script setup lang="ts">
import { trustChips } from '~/utils/intruductionSeed'
</script>

<template>
  <section class="mt-12" aria-label="信任重點">
    <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-sage">
      專業經驗精選
    </p>
    <div
      class="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
    >
      <span
        v-for="chip in trustChips"
        :key="chip"
        class="snap-start whitespace-nowrap rounded-full border border-neutral-sage/40 bg-surface px-4 py-2.5 text-sm font-medium text-ink shadow-sm"
      >{{ chip }}</span>
    </div>
  </section>
</template>
