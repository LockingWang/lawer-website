<script setup lang="ts">
import { practiceAreaCards } from '~/utils/intruductionSeed'
</script>

<template>
  <section id="services" class="mt-16 scroll-mt-24" aria-labelledby="home-services-heading">
    <!-- 全寬背景區塊 -->
    <div class="relative left-1/2 -translate-x-1/2 w-screen bg-brand-50 py-12">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="home-services-heading" class="text-2xl font-semibold text-ink">
          服務領域
        </h2>
        <p class="mt-1 max-w-2xl text-sm text-ink/75">
          依您需求初步對應服務類型；實際個案仍須視事實與適用法令而定。
        </p>
        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="card in practiceAreaCards"
            :key="card.title"
            class="flex flex-col rounded-xl border border-brand-200 bg-surface p-5 shadow-sm"
          >
            <h3 class="text-lg font-semibold text-ink">
              {{ card.title }}
            </h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-ink/80">
              {{ card.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
