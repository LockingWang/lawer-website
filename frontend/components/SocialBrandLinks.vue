<script setup lang="ts">
import { socialFacebookHref, socialInstagramHref } from '~/utils/siteContact'

/**
 * Facebook／Instagram 外連，圖示採各平台常見品牌色（Meta／IG 官方識別色系）。
 * LINE 僅提供 QR 時請使用頁尾「官方 LINE」區塊，不在此列。
 */
withDefaults(
  defineProps<{
    /** `inverse`：深底（頁尾）；`default`：淺底（聯繫頁） */
    variant?: 'default' | 'inverse'
  }>(),
  { variant: 'default' }
)

const ring =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
const ringInverse = `${ring} focus-visible:outline-white`
const ringDefault = `${ring} focus-visible:outline-brand-500`
</script>

<template>
  <div class="flex flex-wrap gap-3" role="list">
    <NuxtLink
      :to="socialFacebookHref"
      external
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
      :class="[
        'bg-[#1877F2]',
        variant === 'inverse' ? ringInverse : ringDefault
      ]"
      aria-label="無憂吳律事務所 Facebook（另開新分頁）"
      role="listitem"
    >
      <UIcon name="i-simple-icons-facebook" class="h-6 w-6 shrink-0 text-white" aria-hidden="true" />
      Facebook
    </NuxtLink>
    <NuxtLink
      :to="socialInstagramHref"
      external
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
      :class="[
        'bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737]',
        variant === 'inverse' ? ringInverse : ringDefault
      ]"
      aria-label="無憂吳律事務所 Instagram（另開新分頁）"
      role="listitem"
    >
      <UIcon name="i-simple-icons-instagram" class="h-6 w-6 shrink-0 text-white" aria-hidden="true" />
      Instagram
    </NuxtLink>
  </div>
</template>
