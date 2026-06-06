<script setup lang="ts">
import {
  firmIntroLead,
  foundingPhilosophy,
  foundingPhilosophySectionTitle,
  lawyerNameNick,
  lawyerNameZh,
  practiceAreaCards,
  practiceAreasSummary,
  trustChips
} from '~/utils/intruductionSeed'
import {
  lawyerPhotoProfessionalAlt,
  lawyerPhotoProfessionalSrc
} from '~/utils/lawyerPhotos'
import { addressSingleLine, siteNameZh } from '~/utils/siteContact'

usePageSeo(
  '本所介紹',
  `${siteNameZh}創所理念與服務範疇。專長：${practiceAreasSummary}。${addressSingleLine}。`,
  { ogTitle: `本所介紹｜${siteNameZh}` }
)

const cardIcons: Record<string, string> = {
  '家事事件': 'i-lucide-heart-handshake',
  '校園與調查': 'i-lucide-graduation-cap',
  '行政爭議': 'i-lucide-landmark',
  '民事訴訟': 'i-lucide-scale',
  '刑事訴訟': 'i-lucide-shield-check'
}
</script>

<template>
  <div>
    <!-- 全寬標題區 -->
    <div class="bg-brand-700">
      <div class="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <p class="text-xs font-semibold tracking-widest text-accent-teal uppercase">
          Sallywu Attorneys-At-Law
        </p>
        <h1 class="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          本所介紹
        </h1>
        <p class="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
          {{ firmIntroLead }}
        </p>
      </div>
    </div>

    <!-- 主要內容 -->
    <div class="mx-auto max-w-5xl space-y-16 px-4 py-14 sm:px-6 lg:px-8">

      <!-- 創所理念 -->
      <section aria-labelledby="firm-philosophy">
        <h2 id="firm-philosophy" class="text-2xl font-semibold text-ink">
          {{ foundingPhilosophySectionTitle }}
        </h2>
        <div class="mt-6 rounded-2xl border-l-4 border-brand-500 bg-brand-50 p-8">
          <p class="text-lg leading-relaxed text-ink/85">
            {{ foundingPhilosophy }}
          </p>
        </div>
      </section>

      <!-- 服務領域 -->
      <section aria-labelledby="firm-services">
        <h2 id="firm-services" class="text-2xl font-semibold text-ink">
          服務領域
        </h2>
        <p class="mt-2 text-ink/70">
          {{ practiceAreasSummary }}
        </p>
        <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="card in practiceAreaCards"
            :key="card.title"
            class="flex flex-col rounded-xl border-t-2 border-t-accent-teal bg-white p-5 shadow-sm"
          >
            <div class="flex items-center gap-2.5">
              <UIcon
                :name="cardIcons[card.title] ?? 'i-lucide-scale'"
                class="h-5 w-5 shrink-0 text-accent-teal"
                aria-hidden="true"
              />
              <h3 class="font-semibold text-ink">
                {{ card.title }}
              </h3>
            </div>
            <p class="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
              {{ card.desc }}
            </p>
          </div>
        </div>
        <p class="mt-4 text-xs text-ink/45">
          各服務領域之實際個案仍須視事實與適用法令而定，以上僅供初步參考。
        </p>
      </section>

      <!-- 主持律師 -->
      <section aria-labelledby="firm-lawyer">
        <h2 id="firm-lawyer" class="text-2xl font-semibold text-ink">
          主持律師
        </h2>
        <div class="mt-6 overflow-hidden rounded-2xl bg-brand-700 shadow-lg">
          <div class="flex flex-col sm:flex-row">
            <div class="flex flex-1 flex-col justify-center p-7 lg:p-10">
              <span
                class="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80"
              >
                主持律師
              </span>
              <h3 class="mt-4 text-2xl font-semibold text-white">
                {{ lawyerNameZh }}
              </h3>
              <p class="mt-0.5 text-sm font-medium text-accent-teal">
                {{ lawyerNameNick }}
              </p>
              <div class="mt-5 flex flex-wrap gap-2">
                <span
                  v-for="chip in trustChips"
                  :key="chip"
                  class="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/65"
                >
                  {{ chip }}
                </span>
              </div>
              <UButton
                to="/lawyer"
                color="white"
                icon="i-lucide-user"
                class="mt-7 self-start"
              >
                完整律師介紹
              </UButton>
            </div>
            <div class="h-56 w-full shrink-0 sm:h-auto sm:w-48 lg:w-56">
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

      <!-- 聯絡資訊 -->
      <section
        aria-labelledby="firm-contact"
        class="rounded-2xl border border-neutral-sage/30 bg-white p-8 shadow-sm"
      >
        <h2 id="firm-contact" class="text-2xl font-semibold text-ink">
          聯絡本所
        </h2>
        <PublicContactBlock class="mt-6" variant="default" />
        <div class="mt-8 flex flex-wrap gap-3">
          <UButton to="/contact" color="primary" icon="i-lucide-mail" size="lg">
            前往聯繫頁
          </UButton>
          <UButton to="/lawyer" color="gray" variant="outline" icon="i-lucide-user">
            律師介紹
          </UButton>
        </div>
      </section>

    </div>
  </div>
</template>
