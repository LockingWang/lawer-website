<script setup lang="ts">
import {
  educationItems,
  lawyerHomeTagline,
  lawyerNameNick,
  lawyerNameZh,
  licenseItems,
  positionItems,
  practiceAreasSummary,
  trustChips
} from '~/utils/intruductionSeed'
import {
  lawyerPhotoProfessionalAlt,
  lawyerPhotoProfessionalSrc
} from '~/utils/lawyerPhotos'
import { addressSingleLine, phoneDisplay, phoneTelHref, siteNameZh } from '~/utils/siteContact'

usePageSeo(
  '律師介紹',
  `${lawyerNameZh}（${lawyerNameNick}）學經歷、專長與現職。${practiceAreasSummary}。${addressSingleLine}。`,
  { ogTitle: `律師介紹｜${lawyerNameZh}｜${siteNameZh}` }
)
</script>

<template>
  <article class="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

    <!-- Header：文字左，照片右 -->
    <header class="grid gap-10 lg:grid-cols-[1fr_280px] lg:items-start">
      <div>
        <p class="text-xs font-semibold tracking-widest text-accent-teal uppercase">
          主持律師
        </p>
        <h1 class="mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {{ lawyerNameZh }}
        </h1>
        <p class="mt-1 text-lg font-medium text-brand-600">
          {{ lawyerNameNick }}
        </p>
        <p class="mt-5 text-lg leading-relaxed text-ink/80">
          {{ lawyerHomeTagline }}
        </p>
        <div class="mt-5 flex flex-wrap gap-2">
          <span
            v-for="chip in trustChips"
            :key="chip"
            class="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-sm text-brand-700"
          >
            {{ chip }}
          </span>
        </div>
        <p class="mt-5 text-sm text-ink/65">
          專長：<span class="font-medium text-ink">{{ practiceAreasSummary }}</span>
        </p>
      </div>

      <!-- 照片 -->
      <div class="overflow-hidden rounded-2xl border border-neutral-sage/20 shadow-md aspect-[4/5]">
        <img
          :src="lawyerPhotoProfessionalSrc"
          :alt="lawyerPhotoProfessionalAlt()"
          width="896"
          height="1195"
          class="h-full w-full object-cover object-top"
          loading="eager"
          decoding="async"
        >
      </div>
    </header>

    <!-- 學經歷卡片 -->
    <div class="mt-14 space-y-5">

      <div class="rounded-2xl border border-neutral-sage/25 bg-white p-6 shadow-sm">
        <h2 class="flex items-center gap-2 text-lg font-semibold text-ink">
          <UIcon name="i-lucide-graduation-cap" class="h-5 w-5 shrink-0 text-accent-teal" aria-hidden="true" />
          學歷
        </h2>
        <ul class="mt-4 space-y-2.5">
          <li
            v-for="line in educationItems"
            :key="line"
            class="flex items-start gap-2.5 leading-relaxed text-ink/85"
          >
            <UIcon name="i-lucide-check" class="mt-0.5 h-4 w-4 shrink-0 text-accent-teal" aria-hidden="true" />
            {{ line }}
          </li>
        </ul>
      </div>

      <div class="rounded-2xl border border-neutral-sage/25 bg-white p-6 shadow-sm">
        <h2 class="flex items-center gap-2 text-lg font-semibold text-ink">
          <UIcon name="i-lucide-briefcase" class="h-5 w-5 shrink-0 text-accent-teal" aria-hidden="true" />
          現職與委任
        </h2>
        <ul class="mt-4 space-y-2.5">
          <li
            v-for="line in positionItems"
            :key="line"
            class="flex items-start gap-2.5 leading-relaxed text-ink/85"
          >
            <UIcon name="i-lucide-check" class="mt-0.5 h-4 w-4 shrink-0 text-accent-teal" aria-hidden="true" />
            {{ line }}
          </li>
        </ul>
      </div>

      <div class="rounded-2xl border border-neutral-sage/25 bg-white p-6 shadow-sm">
        <h2 class="flex items-center gap-2 text-lg font-semibold text-ink">
          <UIcon name="i-lucide-award" class="h-5 w-5 shrink-0 text-accent-teal" aria-hidden="true" />
          證照與專業進修
        </h2>
        <ul class="mt-4 space-y-2.5">
          <li
            v-for="line in licenseItems"
            :key="line"
            class="flex items-start gap-2.5 leading-relaxed text-ink/85"
          >
            <UIcon name="i-lucide-check" class="mt-0.5 h-4 w-4 shrink-0 text-accent-teal" aria-hidden="true" />
            {{ line }}
          </li>
        </ul>
      </div>

    </div>

    <!-- CTA -->
    <footer class="mt-12 overflow-hidden rounded-2xl bg-navy-deep shadow-lg">
      <div class="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-xs font-semibold tracking-widest text-accent-teal uppercase">
            立即聯繫
          </p>
          <p class="mt-2 text-xl font-semibold text-white">
            歡迎預約諮詢
          </p>
          <a
            :href="phoneTelHref"
            class="mt-3 inline-flex items-center gap-2 text-2xl font-bold tabular-nums text-white transition hover:text-accent-soft"
          >
            <UIcon name="i-lucide-phone" class="h-6 w-6 shrink-0 text-accent-teal" aria-hidden="true" />
            {{ phoneDisplay }}
          </a>
        </div>
        <div class="flex flex-col gap-3 sm:items-end">
          <UButton to="/contact" color="primary" size="lg" icon="i-lucide-mail">
            前往聯繫本所
          </UButton>
          <UButton to="/firm" variant="ghost" class="text-white/60 hover:text-white" icon="i-lucide-building-2">
            本所介紹
          </UButton>
        </div>
      </div>
    </footer>

  </article>
</template>
