<script setup lang="ts">
import {
  educationItems,
  lawyerNameNick,
  lawyerNameZh,
  licenseItems,
  positionItems,
  practiceAreasSummary
} from '~/utils/intruductionSeed'
import {
  lawyerPhotoProfessionalAlt,
  lawyerPhotoProfessionalSrc
} from '~/utils/lawyerPhotos'
import { addressSingleLine, siteNameZh } from '~/utils/siteContact'

usePageSeo(
  '律師介紹',
  `${lawyerNameZh}（${lawyerNameNick}）學經歷、專長與現職。${practiceAreasSummary}。${addressSingleLine}。`,
  { ogTitle: `律師介紹｜${lawyerNameZh}｜${siteNameZh}` }
)
</script>

<template>
  <article class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
    <header class="flex flex-col gap-6 sm:flex-row sm:items-start">
      <!-- 896×1195；寬高比與容器一致時 contain 可滿版且不裁切 -->
      <figure
        class="mx-auto aspect-[896/1195] w-full max-w-sm shrink-0 overflow-hidden rounded-xl border border-neutral-sage/20 bg-surface-muted shadow-sm sm:mx-0 sm:max-w-md"
      >
        <img
          :src="lawyerPhotoProfessionalSrc"
          :alt="lawyerPhotoProfessionalAlt()"
          width="896"
          height="1195"
          class="h-full w-full object-contain object-center"
          loading="eager"
          decoding="async"
        >
      </figure>
      <div>
        <h1 class="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {{ lawyerNameZh }}
        </h1>
        <p class="mt-1 text-lg text-brand-600">
          {{ lawyerNameNick }}
        </p>
        <p class="mt-4 leading-relaxed text-ink/85">
          專長：<span class="font-medium text-ink">{{ practiceAreasSummary }}</span>
        </p>
      </div>
    </header>

    <section class="mt-10" aria-labelledby="lawyer-edu">
      <h2 id="lawyer-edu" class="text-xl font-semibold text-ink">
        學歷
      </h2>
      <ul class="mt-3 list-inside list-disc space-y-1 text-ink/85">
        <li v-for="line in educationItems" :key="line">
          {{ line }}
        </li>
      </ul>
    </section>

    <section class="mt-10" aria-labelledby="lawyer-pos">
      <h2 id="lawyer-pos" class="text-xl font-semibold text-ink">
        現職與委任
      </h2>
      <ul class="mt-3 list-inside list-disc space-y-2 text-ink/85">
        <li v-for="line in positionItems" :key="line">
          {{ line }}
        </li>
      </ul>
    </section>

    <section class="mt-10" aria-labelledby="lawyer-lic">
      <h2 id="lawyer-lic" class="text-xl font-semibold text-ink">
        證照與專業進修
      </h2>
      <ul class="mt-3 list-inside list-disc space-y-2 text-ink/85">
        <li v-for="line in licenseItems" :key="line">
          {{ line }}
        </li>
      </ul>
    </section>

    <section class="mt-12 rounded-xl border border-neutral-sage/35 bg-surface-muted/40 p-6" aria-labelledby="lawyer-contact-same-source">
      <h2 id="lawyer-contact-same-source" class="text-lg font-semibold text-ink">
        聯絡方式
      </h2>
      <p class="mt-1 text-sm text-ink/70">
        與頁尾、聯繫頁、本所介紹頁同一資料來源（<code class="rounded bg-surface-muted px-1">siteContact.ts</code>）。
      </p>
      <PublicContactBlock class="mt-4" variant="default" />
    </section>

    <footer class="mt-10 flex flex-wrap gap-3 border-t border-neutral-sage/30 pt-8">
      <UButton to="/firm" color="gray" variant="outline" icon="i-lucide-building-2">
        本所介紹
      </UButton>
      <UButton to="/contact" color="primary" size="lg" icon="i-lucide-phone">
        聯繫本所
      </UButton>
    </footer>
  </article>
</template>
