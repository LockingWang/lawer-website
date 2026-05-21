<script setup lang="ts">
import {
  lawyerPhotoFriendlyAlt,
  lawyerPhotoFriendlySrc
} from '~/utils/lawyerPhotos'
</script>

<template>
  <section
    class="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12"
    aria-labelledby="home-hero-heading"
  >
    <div>
      <p class="text-sm font-medium text-accent-teal">
        專業 · 親民 · 可信
      </p>
      <h1
        id="home-hero-heading"
        class="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.25rem] lg:leading-tight"
      >
        來到本所，願您從此無憂無慮
      </h1>
      <p class="mt-4 max-w-xl text-lg leading-relaxed text-ink/85">
        主持律師深耕<strong class="font-medium text-ink">家事、校園與行政爭議、民刑事訴訟</strong>，以清楚溝通與穩健策略，陪您面對法律課題。
      </p>
      <div class="mt-6 flex flex-wrap gap-3">
        <UButton to="/contact" color="primary" size="lg" icon="i-lucide-phone">
          聯繫本所
        </UButton>
        <UButton to="/firm" color="gray" variant="outline" size="lg" icon="i-lucide-building-2">
          認識本所
        </UButton>
      </div>
    </div>
    <!-- 1432×2006；object-contain 確保人物不被裁切 -->
    <figure
      class="relative mx-auto aspect-[1432/2006] w-full max-w-[min(100%,320px)] overflow-hidden rounded-2xl border border-neutral-sage/30 bg-surface-muted shadow-sm lg:mx-0 lg:max-w-md"
    >
      <img
        :src="lawyerPhotoFriendlySrc"
        :alt="lawyerPhotoFriendlyAlt()"
        width="1432"
        height="2006"
        class="h-full w-full object-contain object-center"
        decoding="async"
        fetchpriority="high"
      >
    </figure>
  </section>
</template>
