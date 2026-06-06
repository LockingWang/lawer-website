<script setup lang="ts">
import { lawyerHomeTagline, lawyerNameNick, lawyerNameZh } from '~/utils/intruductionSeed'
import {
  lawyerPhotoProfessionalAlt,
  lawyerPhotoProfessionalSrc
} from '~/utils/lawyerPhotos'
</script>

<template>
  <section class="mt-16" aria-labelledby="home-lawyer-heading">
    <h2 id="home-lawyer-heading" class="text-2xl font-semibold text-ink">
      主持律師
    </h2>

    <!-- 自 max-w-6xl 內滿版延伸至視窗寬；高度依形象照比例 896×1195 -->
    <div
      class="relative left-1/2 mt-6 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden bg-surface-muted"
    >
      <div
        class="mx-auto flex h-[min(85vh,calc(100vw*1195/896))] w-full max-h-[85vh] items-center justify-center"
      >
        <img
          :src="lawyerPhotoProfessionalSrc"
          :alt="lawyerPhotoProfessionalAlt()"
          width="896"
          height="1195"
          class="max-h-full max-w-full object-contain object-center"
          loading="lazy"
          decoding="async"
        >
      </div>
    </div>

    <div
      class="mt-8 rounded-2xl border border-neutral-sage/30 bg-surface p-6 shadow-sm sm:p-8"
    >
      <div class="text-center sm:text-left">
        <p class="text-sm font-medium text-brand-600">
          {{ lawyerNameNick }}
        </p>
        <h3 class="mt-1 text-2xl font-semibold text-ink">
          {{ lawyerNameZh }}
        </h3>
        <p class="mt-4 leading-relaxed text-ink/85">
          {{ lawyerHomeTagline }}
        </p>
        <UButton to="/lawyer" color="primary" variant="soft" class="mt-6" icon="i-lucide-user">
          完整律師介紹
        </UButton>
      </div>
    </div>
  </section>
</template>
