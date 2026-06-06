<script setup lang="ts">
import { practiceAreaCards } from '~/utils/intruductionSeed'

const cardIcons: Record<string, string> = {
  '家事事件': 'i-lucide-heart-handshake',
  '校園與調查': 'i-lucide-graduation-cap',
  '行政爭議': 'i-lucide-landmark',
  '民事訴訟': 'i-lucide-scale',
  '刑事訴訟': 'i-lucide-shield-check'
}
</script>

<template>
  <section id="services" class="mt-14 scroll-mt-24" aria-labelledby="home-services-heading">
    <h2 id="home-services-heading" class="text-2xl font-semibold text-ink">
      服務領域
    </h2>
    <p class="mt-1 max-w-2xl text-sm text-ink/75">
      依您需求初步對應服務類型；實際個案仍須視事實與適用法令而定。
    </p>
    <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <div
        v-for="card in practiceAreaCards"
        :key="card.title"
        class="flex flex-col overflow-hidden rounded-xl border-t-2 border-t-accent-teal bg-white p-4 shadow-sm"
      >
        <div class="flex items-center gap-2">
          <UIcon
            :name="cardIcons[card.title] ?? 'i-lucide-scale'"
            class="h-5 w-5 shrink-0 text-accent-teal"
            aria-hidden="true"
          />
          <h3 class="text-sm font-semibold text-ink">
            {{ card.title }}
          </h3>
        </div>
        <p class="mt-2 flex-1 text-xs leading-relaxed text-ink/65">
          {{ card.desc }}
        </p>
      </div>
    </div>
  </section>
</template>
