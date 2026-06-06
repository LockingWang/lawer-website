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
  <section id="services" class="mt-16 scroll-mt-24" aria-labelledby="home-services-heading">
    <div class="relative left-1/2 -translate-x-1/2 w-screen bg-brand-50 py-14">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="home-services-heading" class="text-2xl font-semibold text-ink">
          服務領域
        </h2>
        <p class="mt-1 max-w-2xl text-sm text-ink/75">
          依您需求初步對應服務類型；實際個案仍須視事實與適用法令而定。
        </p>
        <div class="mt-8 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="card in practiceAreaCards"
            :key="card.title"
            class="flex h-full flex-col overflow-hidden rounded-xl border-t-[3px] border-accent-teal bg-navy-deep p-6 shadow-lg"
          >
            <UIcon
              :name="cardIcons[card.title] ?? 'i-lucide-scale'"
              class="h-7 w-7 shrink-0 text-accent-teal"
              aria-hidden="true"
            />
            <h3 class="mt-4 text-lg font-semibold text-white">
              {{ card.title }}
            </h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-white/70">
              {{ card.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
