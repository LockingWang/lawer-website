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
  <div class="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

    <!-- Header -->
    <header class="border-b border-neutral-sage/30 pb-10">
      <p class="text-xs font-semibold tracking-widest text-accent-teal uppercase">
        Contact
      </p>
      <h1 class="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        聯繫本所
      </h1>
      <p class="mt-3 max-w-xl text-lg leading-relaxed text-ink/75">
        若您需要法律協助，歡迎來電或填寫下方表單，我們會盡快與您聯繫。
      </p>
    </header>

    <div class="mt-10 grid gap-6 lg:grid-cols-[1fr_400px] lg:items-start lg:gap-10">

      <!-- 左欄：聯絡資訊 -->
      <div class="space-y-6">

        <!-- 聯絡方式 -->
        <section
          class="rounded-2xl border border-neutral-sage/25 bg-white p-6 shadow-sm"
          aria-labelledby="contact-methods"
        >
          <h2 id="contact-methods" class="flex items-center gap-2 text-lg font-semibold text-ink">
            <UIcon name="i-lucide-phone" class="h-5 w-5 shrink-0 text-accent-teal" aria-hidden="true" />
            聯絡方式
          </h2>
          <PublicContactBlock class="mt-5" variant="default" />
        </section>

        <!-- 地圖 -->
        <section
          class="rounded-2xl border border-neutral-sage/25 bg-white p-6 shadow-sm"
          aria-labelledby="contact-map"
        >
          <h2 id="contact-map" class="flex items-center gap-2 text-lg font-semibold text-ink">
            <UIcon name="i-lucide-map-pin" class="h-5 w-5 shrink-0 text-accent-teal" aria-hidden="true" />
            事務所位置
          </h2>
          <p class="mt-2 text-sm text-ink/65">
            {{ addressSingleLine }}
          </p>
          <div class="mt-4 overflow-hidden rounded-xl border border-neutral-sage/25">
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
            class="mt-4"
          >
            在 Google 地圖開啟
          </UButton>
        </section>

        <!-- 社群媒體 -->
        <section
          class="rounded-2xl border border-neutral-sage/25 bg-white p-6 shadow-sm"
          aria-labelledby="contact-social"
        >
          <h2 id="contact-social" class="flex items-center gap-2 text-lg font-semibold text-ink">
            <UIcon name="i-lucide-share-2" class="h-5 w-5 shrink-0 text-accent-teal" aria-hidden="true" />
            社群媒體
          </h2>
          <p class="mt-2 text-sm text-ink/65">
            歡迎追蹤關注，掌握最新法律資訊與本所動態。
          </p>
          <SocialBrandLinks class="mt-4" variant="default" />
        </section>

        <!-- 電子名片 -->
        <section
          class="rounded-2xl border border-neutral-sage/25 bg-white p-6 shadow-sm"
          aria-labelledby="contact-card"
        >
          <h2 id="contact-card" class="flex items-center gap-2 text-lg font-semibold text-ink">
            <UIcon name="i-lucide-contact" class="h-5 w-5 shrink-0 text-accent-teal" aria-hidden="true" />
            電子名片
          </h2>
          <div class="mt-4 flex justify-center">
            <img
              :src="lawyerBusinessCardSrc"
              :alt="lawyerBusinessCardAlt()"
              width="1181"
              height="1181"
              class="w-full max-w-xs rounded-xl border border-neutral-sage/25 shadow-sm"
              loading="lazy"
              decoding="async"
            >
          </div>
        </section>

      </div>

      <!-- 右欄：留言表單（sticky） -->
      <section
        class="rounded-2xl border border-neutral-sage/25 bg-white p-6 shadow-sm lg:sticky lg:top-24"
        aria-labelledby="contact-form"
      >
        <h2 id="contact-form" class="flex items-center gap-2 text-lg font-semibold text-ink">
          <UIcon name="i-lucide-mail" class="h-5 w-5 shrink-0 text-accent-teal" aria-hidden="true" />
          線上留言
        </h2>
        <p class="mt-2 text-sm text-ink/65">
          填寫諮詢內容，律師確認後主動與您聯繫。
        </p>
        <ContactRequestForm class="mt-6" />
      </section>

    </div>
  </div>
</template>
