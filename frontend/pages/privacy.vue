<script setup lang="ts">
import { siteNameZh } from '~/utils/siteContact'

usePageSeo(
  '隱私權政策',
  `${siteNameZh}網站個人資料蒐集、處理與利用說明（條文將與主持律師定稿後更新）。`,
  { ogTitle: `隱私權政策｜${siteNameZh}` }
)
</script>

<template>
  <article class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
    <header>
      <h1 class="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        隱私權政策
      </h1>
      <p class="mt-3 text-sm text-neutral-sage">
        最後更新：建置中（條文待定稿）
      </p>
    </header>

    <div class="mt-10 space-y-6 text-ink/85 leading-relaxed">
      <section aria-labelledby="p1">
        <h2 id="p1" class="text-xl font-semibold text-ink">
          一、適用範圍
        </h2>
        <p class="mt-3">
          本政策說明您使用本網站時，我們如何處理與保護個人資料。正式條文將於網站與表單上線前，由事務所確認後刊登。
        </p>
      </section>
      <section aria-labelledby="p2">
        <h2 id="p2" class="text-xl font-semibold text-ink">
          二、蒐集目的與保存期間
        </h2>
        <p class="mt-3">
          未來若提供聯絡表單，蒐集目的將包括：回覆您的諮詢、案件聯繫所需之最小必要範圍。保存期間將依個資法與事務所內部規範載明。
        </p>
      </section>
      <section aria-labelledby="p3">
        <h2 id="p3" class="text-xl font-semibold text-ink">
          三、聯絡我們
        </h2>
        <p class="mt-3">
          若您對本政策有任何疑問，請透過
          <NuxtLink to="/contact" class="font-medium text-brand-600 underline underline-offset-2">
            聯繫本所
          </NuxtLink>
          與我們聯繫。
        </p>
      </section>
    </div>
  </article>
</template>
