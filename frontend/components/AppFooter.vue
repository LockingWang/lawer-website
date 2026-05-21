<script setup lang="ts">
import {
  footerLegalNav,
  mainNav,
  siteNameEn,
  siteNameZh,
  socialLineOfficialQrSrc
} from '~/utils/siteContact'
</script>

<template>
  <footer class="border-t border-neutral-sage/30 bg-navy-deep text-surface">
    <div class="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:flex lg:flex-wrap lg:items-start lg:justify-between lg:gap-10 lg:space-y-0 lg:px-8 lg:py-12">
      <!-- 1. 聯絡資訊（手機首區） -->
      <div class="space-y-3 lg:max-w-xs">
        <p class="text-xs font-semibold uppercase tracking-wider text-accent-soft/90">
          聯絡方式
        </p>
        <p class="text-lg font-semibold leading-snug">
          {{ siteNameZh }}
        </p>
        <p class="text-sm text-surface/80">
          {{ siteNameEn }}
        </p>
        <address class="not-italic text-sm leading-relaxed">
          <PublicContactBlock variant="inverse" />
        </address>
      </div>

      <!-- 2. 網站地圖式連結（與 Header 同路由） -->
      <div class="space-y-3 lg:min-w-[200px]">
        <p class="text-xs font-semibold uppercase tracking-wider text-accent-soft/90">
          網站導覽
        </p>
        <nav class="flex flex-col gap-1" aria-label="頁尾導覽">
          <NuxtLink
            v-for="item in mainNav"
            :key="`foot-${item.to}`"
            :to="item.to"
            class="min-h-[44px] rounded-md px-1 py-2.5 text-sm font-medium text-surface/95 outline-none ring-white/30 transition hover:text-white hover:underline focus-visible:ring-2"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>

      <!-- 3. 社群（Facebook／Instagram 品牌色按鈕） -->
      <div class="space-y-3 lg:min-w-[220px]">
        <p class="text-xs font-semibold uppercase tracking-wider text-accent-soft/90">
          社群媒體
        </p>
        <p class="text-xs text-surface/75">
          另開新分頁前往官方帳號；圖示配色依各平台常見品牌識別。
        </p>
        <SocialBrandLinks variant="inverse" />
      </div>

      <!-- 4. 官方 LINE QR -->
      <div class="space-y-3 lg:max-w-[220px]">
        <p class="text-xs font-semibold uppercase tracking-wider text-accent-soft/90">
          官方 LINE
        </p>
        <p class="text-sm text-surface/85">
          掃描加入官方 LINE。若需一併查看名片與聯絡方式，請至
          <NuxtLink
            to="/contact#business-card"
            class="font-medium text-surface underline decoration-white/40 underline-offset-2 hover:text-white"
          >
            聯繫本所—電子名片
          </NuxtLink>
          。
        </p>
        <img
          :src="socialLineOfficialQrSrc"
          width="160"
          height="160"
          class="mx-auto w-40 max-w-[160px] rounded-md border border-white/20 bg-surface p-1 shadow-sm sm:mx-0"
          alt="官方 LINE 加入好友 QR Code"
          loading="lazy"
          decoding="async"
        >
      </div>
    </div>

    <div class="border-t border-white/10 px-4 py-4 sm:px-6 lg:px-8">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-surface/70">
        <NuxtLink
          v-for="legal in footerLegalNav"
          :key="legal.to"
          :to="legal.to"
          class="min-h-[44px] inline-flex items-center underline decoration-white/30 underline-offset-2 hover:text-white"
        >
          {{ legal.label }}
        </NuxtLink>
      </div>
    </div>

    <div class="border-t border-white/10 py-4 text-center text-xs text-surface/60">
      © {{ new Date().getFullYear() }} {{ siteNameZh }} · 網站建置中
    </div>
  </footer>
</template>
