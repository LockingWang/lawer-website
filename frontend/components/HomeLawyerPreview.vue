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

    <div class="mt-6 overflow-hidden rounded-2xl border border-neutral-sage/30 bg-surface-muted shadow-sm">
      <div class="flex flex-col sm:flex-row">
        <!-- 左：文字 -->
        <div class="flex flex-1 flex-col justify-center p-6 sm:p-8">
          <p class="text-sm font-medium text-brand-600">
            {{ lawyerNameNick }}
          </p>
          <h3 class="mt-1 text-2xl font-semibold text-ink">
            {{ lawyerNameZh }}
          </h3>
          <p class="mt-4 leading-relaxed text-ink/85">
            {{ lawyerHomeTagline }}
          </p>
          <UButton to="/lawyer" color="primary" variant="soft" class="mt-6 self-start" icon="i-lucide-user">
            完整律師介紹
          </UButton>
        </div>

        <!-- 右：照片 -->
        <div class="h-72 w-full shrink-0 sm:h-auto sm:w-56 lg:w-64">
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
