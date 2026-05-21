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
  <div class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:max-w-5xl lg:px-8 lg:py-14">
    <header>
      <h1 class="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        聯繫本所
      </h1>
      <p class="mt-3 max-w-2xl text-ink/80">
        若您需要法律協助，歡迎先來電或寄信；亦可使用下方留言表單（經後端驗證與寄信，請於 <code class="rounded bg-surface-muted px-1 text-sm">frontend/.env</code> 設定 <code class="rounded bg-surface-muted px-1 text-sm">NUXT_PUBLIC_API_BASE</code> 指向 Railway 或本機 API）。
      </p>
    </header>

    <div class="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
      <div class="space-y-10">
        <section class="rounded-xl border border-neutral-sage/40 bg-surface p-6 shadow-sm" aria-labelledby="contact-methods">
          <h2 id="contact-methods" class="text-lg font-semibold text-ink">
            聯絡方式
          </h2>
          <p class="mt-1 text-sm text-ink/70">
            與全站頁尾、本所／律師頁同一資料來源（<code class="rounded bg-surface-muted px-1">siteContact.ts</code>）。
          </p>
          <PublicContactBlock class="mt-4" variant="default" />
        </section>

        <section
          id="business-card"
          class="rounded-xl border border-neutral-sage/40 bg-surface p-6 shadow-sm"
          aria-labelledby="contact-business-card"
        >
          <h2 id="contact-business-card" class="text-lg font-semibold text-ink">
            電子名片
          </h2>
          <p class="mt-1 text-sm leading-relaxed text-ink/70">
            以下為事務所提供之名片圖檔，方便您儲存或轉傳。若與本頁「聯絡方式」文字不一致，以<strong class="font-medium text-ink">文字區塊與頁尾</strong>為準（亦利於螢幕閱讀器與搜尋引擎）。
          </p>
          <figure class="mt-5 mx-auto max-w-sm">
            <img
              :src="lawyerBusinessCardSrc"
              :alt="lawyerBusinessCardAlt()"
              width="1181"
              height="1181"
              class="w-full rounded-lg border border-neutral-sage/30 bg-surface-muted object-contain shadow-sm"
              loading="lazy"
              decoding="async"
            >
            <figcaption class="mt-2 text-center text-xs text-ink/60">
              圖檔內之 LINE QR 請以足夠尺寸顯示後再掃描；全站頁尾亦提供官方 LINE QR（<code class="rounded bg-surface-muted px-1">line-official-qr.png</code>）。
            </figcaption>
          </figure>
        </section>

        <section class="rounded-xl border border-neutral-sage/40 bg-surface p-6 shadow-sm" aria-labelledby="contact-map">
          <h2 id="contact-map" class="text-lg font-semibold text-ink">
            位置與地圖
          </h2>
          <p class="mt-2 text-sm leading-relaxed text-ink/80">
            {{ addressSingleLine }}
          </p>
          <div class="mt-4 overflow-hidden rounded-lg border border-neutral-sage/40 bg-surface-muted shadow-sm">
            <div class="relative aspect-[4/3] w-full max-h-[min(70vh,520px)] min-h-[200px]">
              <iframe
                :src="googleMapsEmbedSrc"
                class="absolute left-0 top-0 h-full w-full border-0"
                title="Google 地圖：事務所位置"
                width="600"
                height="450"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div class="mt-4 flex flex-wrap items-center gap-3">
            <UButton
              :to="googleMapsPlaceSearchHref"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              variant="soft"
              icon="i-lucide-external-link"
            >
              在 Google 地圖開啟（新分頁）
            </UButton>
            <p class="text-xs text-ink/60">
              嵌入地圖由 Google 提供；若無法顯示請改點上方按鈕。
            </p>
          </div>
        </section>

        <section class="rounded-xl border border-neutral-sage/40 bg-surface p-6 shadow-sm" aria-labelledby="contact-social">
          <h2 id="contact-social" class="text-lg font-semibold text-ink">
            社群媒體
          </h2>
          <p class="mt-1 text-xs text-ink/70">
            另開新分頁前往官方帳號；加入 LINE 請掃描頁尾或下方電子名片內 QR。
          </p>
          <SocialBrandLinks class="mt-4" variant="default" />
        </section>
      </div>

      <section class="rounded-xl border border-neutral-sage/40 bg-surface p-6 shadow-sm lg:sticky lg:top-24 lg:self-start" aria-labelledby="contact-form">
        <h2 id="contact-form" class="text-lg font-semibold text-ink">
          線上留言
        </h2>
        <p class="mt-1 text-sm text-ink/70">
          建議欄位依企劃書 §2.5；送出時呼叫後端 <code class="rounded bg-surface-muted px-1">POST /api/contact</code>（未設定 API 基底時僅前端模擬成功）。
        </p>
        <ContactRequestForm class="mt-6" />
      </section>
    </div>
  </div>
</template>
