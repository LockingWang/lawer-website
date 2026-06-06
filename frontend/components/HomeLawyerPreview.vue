<script setup lang="ts">
import { lawyerHomeTagline, lawyerNameNick, lawyerNameZh, trustChips } from '~/utils/intruductionSeed'
import {
  lawyerPhotoProfessionalAlt,
  lawyerPhotoProfessionalSrc
} from '~/utils/lawyerPhotos'
</script>

<template>
  <section class="mt-16" aria-labelledby="home-lawyer-heading">
    <div class="overflow-hidden rounded-2xl bg-brand-700 shadow-lg">
      <div class="flex flex-col sm:flex-row">

        <!-- 左：文字 -->
        <div class="flex flex-1 flex-col justify-center p-8 lg:p-12">
          <span
            class="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white/80"
          >
            主持律師
          </span>
          <h2
            id="home-lawyer-heading"
            class="mt-4 text-3xl font-semibold tracking-tight text-white"
          >
            {{ lawyerNameZh }}
          </h2>
          <p class="mt-0.5 text-sm font-medium text-accent-teal">
            {{ lawyerNameNick }}
          </p>
          <p class="mt-5 max-w-sm leading-relaxed text-white/75">
            {{ lawyerHomeTagline }}
          </p>

          <!-- 信任徽章 -->
          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="chip in trustChips"
              :key="chip"
              class="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/65"
            >
              {{ chip }}
            </span>
          </div>

          <div class="mt-8">
            <UButton
              to="/lawyer"
              color="white"
              icon="i-lucide-user"
            >
              完整律師介紹
            </UButton>
          </div>
        </div>

        <!-- 右：照片 -->
        <div class="relative h-72 w-full shrink-0 sm:h-auto sm:w-56 lg:w-64">
          <!-- teal 左邊線裝飾 -->
          <div
            class="absolute inset-y-0 left-0 z-10 hidden w-1 bg-accent-teal/60 sm:block"
            aria-hidden="true"
          />
          <img
            :src="lawyerPhotoProfessionalSrc"
            :alt="lawyerPhotoProfessionalAlt()"
            width="896"
            height="1195"
            class="h-full w-full object-cover object-top"
            loading="lazy"
            decoding="async"
          >
        </div>

      </div>
    </div>
  </section>
</template>
