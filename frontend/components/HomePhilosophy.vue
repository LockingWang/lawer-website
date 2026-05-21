<script setup lang="ts">
import { foundingPhilosophyExcerpt } from '~/utils/intruductionSeed'
</script>

<template>
  <section class="mt-16 rounded-2xl border border-neutral-sage/30 bg-surface-muted/60 px-6 py-10 sm:px-10" aria-labelledby="home-philosophy-heading">
    <div class="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
      <h2 id="home-philosophy-heading" class="text-2xl font-semibold text-ink">
        無憂無慮，是我們對您的承諾
      </h2>
      <p class="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink/85 lg:mx-0">
        {{ foundingPhilosophyExcerpt }}
      </p>
      <UButton to="/firm" color="primary" variant="soft" class="mt-6" icon="i-lucide-book-open">
        閱讀創所理念
      </UButton>
    </div>
  </section>
</template>
