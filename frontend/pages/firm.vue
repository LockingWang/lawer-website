<script setup lang="ts">
import {
  foundingPhilosophy,
  foundingPhilosophySectionTitle,
  firmIntroLead,
  lawyerNameZh,
  practiceAreaCards,
  practiceAreasSummary
} from '~/utils/intruductionSeed'
import { addressSingleLine, siteNameZh } from '~/utils/siteContact'

usePageSeo(
  '本所介紹',
  `${siteNameZh}創所理念與服務範疇。專長：${practiceAreasSummary}。${addressSingleLine}。`,
  { ogTitle: `本所介紹｜${siteNameZh}` }
)
</script>

<template>
  <article class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:max-w-5xl lg:px-8 lg:py-14">
    <header>
      <h1 class="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        本所介紹
      </h1>
      <p class="mt-3 text-lg text-ink/80">
        {{ firmIntroLead }}
      </p>
    </header>

    <section class="mt-10 rounded-xl border border-neutral-sage/35 bg-surface-muted/50 p-6" aria-labelledby="firm-lawyer-lead">
      <h2 id="firm-lawyer-lead" class="text-lg font-semibold text-ink">
        主持律師
      </h2>
      <p class="mt-2 text-ink/85">
        {{ lawyerNameZh }}（{{ siteNameZh }}代表）
      </p>
      <UButton to="/lawyer" class="mt-4" color="primary" variant="soft" icon="i-lucide-user">
        律師完整學經歷與證照
      </UButton>
    </section>

    <section class="mt-10" aria-labelledby="firm-areas">
      <h2 id="firm-areas" class="text-xl font-semibold text-ink">
        服務領域概述
      </h2>
      <p class="mt-3 leading-relaxed text-ink/85">
        {{ practiceAreasSummary }}
      </p>
    </section>

    <section class="mt-12" aria-labelledby="firm-services-detail">
      <h2 id="firm-services-detail" class="text-xl font-semibold text-ink">
        服務項目一覽
      </h2>
      <p class="mt-2 text-sm text-ink/70">
        與首頁服務摘要同一資料來源（<code class="rounded bg-surface-muted px-1">intruductionSeed.practiceAreaCards</code>）。
      </p>
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div
          v-for="card in practiceAreaCards"
          :key="card.title"
          class="rounded-lg border border-neutral-sage/30 bg-surface p-4 shadow-sm"
        >
          <h3 class="font-semibold text-ink">
            {{ card.title }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-ink/80">
            {{ card.desc }}
          </p>
        </div>
      </div>
    </section>

    <section class="mt-12" aria-labelledby="firm-philosophy">
      <h2 id="firm-philosophy" class="text-xl font-semibold text-ink">
        {{ foundingPhilosophySectionTitle }}
      </h2>
      <blockquote class="mt-4 border-l-4 border-brand-500/70 bg-surface-muted/80 py-3 pl-4 pr-3 text-ink/90 leading-relaxed">
        {{ foundingPhilosophy }}
      </blockquote>
    </section>

    <section class="mt-12 rounded-xl border border-neutral-sage/35 bg-surface p-6 shadow-sm" aria-labelledby="firm-contact">
      <h2 id="firm-contact" class="text-lg font-semibold text-ink">
        聯絡本所
      </h2>
      <p class="mt-1 text-sm text-ink/70">
        以下與全站頁尾、聯繫頁同一資料來源（<code class="rounded bg-surface-muted px-1">siteContact.ts</code>）。
      </p>
      <PublicContactBlock class="mt-4" variant="default" />
      <div class="mt-6 flex flex-wrap gap-3">
        <UButton to="/contact" color="primary" icon="i-lucide-mail">
          前往聯繫頁
        </UButton>
      </div>
    </section>

    <footer class="mt-12 flex flex-wrap gap-3 border-t border-neutral-sage/30 pt-8">
      <UButton to="/lawyer" color="primary" icon="i-lucide-user">
        律師介紹
      </UButton>
      <UButton to="/contact" color="gray" variant="outline" icon="i-lucide-mail">
        聯繫本所
      </UButton>
    </footer>
  </article>
</template>
