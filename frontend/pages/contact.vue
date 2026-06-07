<script setup lang="ts">
import {
  addressSingleLine,
  googleMapsEmbedSrc,
  googleMapsPlaceSearchHref,
  phoneDisplay,
  siteNameZh
} from '~/utils/siteContact'
import {
  lawyerBusinessCardAlt,
  lawyerBusinessCardSrc
} from '~/utils/lawyerPhotos'

usePageSeo(
  '聯繫本所',
  `留言表單、電話 ${phoneDisplay}、${addressSingleLine}。亦可於 Google 地圖查看事務所位置。`,
  { ogTitle: `聯繫本所｜${siteNameZh}` }
)
</script>

<template>
  <div>

    <!-- ── 正式頁首 ─────────────────────────────────────── -->
    <div class="bg-brand-700">
      <div class="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <p class="text-xs font-semibold tracking-[0.22em] text-accent-soft/75 uppercase">
          Contact Us
        </p>
        <h1 class="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          聯繫本所
        </h1>
        <p class="mt-4 max-w-lg text-base leading-relaxed text-surface/75">
          無論您面臨何種法律困境，本所均提供完整諮詢服務。
          請選擇下列任一管道與本所聯繫，我們將盡速安排回覆。
        </p>
      </div>
    </div>

    <!-- ── 主要內容（單欄） ───────────────────────────────── -->
    <div class="mx-auto max-w-4xl space-y-6 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

      <!-- 聯絡方式 -->
      <section
        class="rounded-2xl border border-neutral-sage/25 bg-white shadow-sm"
        aria-labelledby="contact-methods"
      >
        <div class="flex items-start gap-4 border-b border-neutral-sage/20 px-8 py-6">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10">
            <UIcon name="i-lucide-phone" class="h-5 w-5 text-brand-500" aria-hidden="true" />
          </span>
          <div>
            <h2 id="contact-methods" class="text-lg font-semibold text-ink">聯絡方式</h2>
            <p class="mt-1 text-sm leading-relaxed text-ink/60">
              來電或寄信是最快速的諮詢管道，本所工作日內均有專人接聽與回覆。
            </p>
          </div>
        </div>
        <div class="px-8 py-6">
          <PublicContactBlock variant="default" />
        </div>
      </section>

      <!-- 事務所位置 -->
      <section
        class="rounded-2xl border border-neutral-sage/25 bg-white shadow-sm"
        aria-labelledby="contact-map"
      >
        <div class="flex items-start gap-4 border-b border-neutral-sage/20 px-8 py-6">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10">
            <UIcon name="i-lucide-map-pin" class="h-5 w-5 text-brand-500" aria-hidden="true" />
          </span>
          <div>
            <h2 id="contact-map" class="text-lg font-semibold text-ink">事務所位置</h2>
            <p class="mt-1 text-sm leading-relaxed text-ink/60">
              {{ addressSingleLine }}，位於高雄市苓雅區，交通便捷。
            </p>
          </div>
        </div>
        <div class="px-8 py-6">
          <div class="overflow-hidden rounded-xl border border-neutral-sage/20">
            <div class="relative aspect-video w-full">
              <iframe
                :src="googleMapsEmbedSrc"
                class="absolute inset-0 h-full w-full border-0"
                title="Google 地圖：事務所位置"
                width="600"
                height="450"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <UButton
            :to="googleMapsPlaceSearchHref"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            variant="soft"
            icon="i-lucide-external-link"
            class="mt-5"
          >
            在 Google 地圖開啟
          </UButton>
        </div>
      </section>

      <!-- 社群媒體 -->
      <section
        class="rounded-2xl border border-neutral-sage/25 bg-white shadow-sm"
        aria-labelledby="contact-social"
      >
        <div class="flex items-start gap-4 border-b border-neutral-sage/20 px-8 py-6">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10">
            <UIcon name="i-lucide-share-2" class="h-5 w-5 text-brand-500" aria-hidden="true" />
          </span>
          <div>
            <h2 id="contact-social" class="text-lg font-semibold text-ink">社群媒體</h2>
            <p class="mt-1 text-sm leading-relaxed text-ink/60">
              追蹤本所社群頁面，掌握最新法律知識與事務所動態，
              亦可透過私訊提出初步詢問。
            </p>
          </div>
        </div>
        <div class="px-8 py-6">
          <SocialBrandLinks variant="default" />
        </div>
      </section>

      <!-- 電子名片 -->
      <section
        class="rounded-2xl border border-neutral-sage/25 bg-white shadow-sm"
        aria-labelledby="contact-card"
      >
        <div class="flex items-start gap-4 border-b border-neutral-sage/20 px-8 py-6">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10">
            <UIcon name="i-lucide-contact" class="h-5 w-5 text-brand-500" aria-hidden="true" />
          </span>
          <div>
            <h2 id="contact-card" class="text-lg font-semibold text-ink">電子名片</h2>
            <p class="mt-1 text-sm leading-relaxed text-ink/60">
              掃描或儲存下方名片，即可快速將本所加入您的聯絡人，方便日後聯繫。
            </p>
          </div>
        </div>
        <div class="flex justify-center px-8 py-8">
          <img
            :src="lawyerBusinessCardSrc"
            :alt="lawyerBusinessCardAlt()"
            width="1181"
            height="1181"
            class="w-full max-w-sm rounded-xl border border-neutral-sage/25 shadow-sm"
            loading="lazy"
            decoding="async"
          >
        </div>
      </section>

      <!-- 線上留言（置底） -->
      <section
        class="rounded-2xl border border-brand-500/25 bg-white shadow-sm"
        aria-labelledby="contact-form"
      >
        <div class="border-b border-neutral-sage/20 px-8 py-6">
          <div class="flex items-start gap-4">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10">
              <UIcon name="i-lucide-mail" class="h-5 w-5 text-brand-500" aria-hidden="true" />
            </span>
            <div>
              <h2 id="contact-form" class="text-lg font-semibold text-ink">線上留言諮詢</h2>
              <p class="mt-1 text-sm leading-relaxed text-ink/60">
                若不便來電，請填寫下方表單，律師審閱後將以電話或電子郵件主動與您聯繫。
              </p>
            </div>
          </div>
        </div>
        <div class="px-8 py-8">
          <ContactRequestForm />
        </div>
      </section>

    </div>
  </div>
</template>
