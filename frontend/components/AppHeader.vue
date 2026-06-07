<script setup lang="ts">
import { mainNav } from '~/utils/siteContact'

/** 置於 `public/brand/`（來源：`images/firm-logo-horizontal.png`） */
const brandLogoSrc = '/brand/firm-logo-horizontal.png'
const brandLogoAlt = '無憂吳律事務所 Sally Wu Law Office Logo'

const route = useRoute()
const mobileOpen = ref(false)

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  }
)

function isActive(path: string) {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-neutral-sage/30 bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/90"
  >
    <div class="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
      <NuxtLink
        to="/"
        class="flex h-14 max-w-[min(380px,calc(100vw-5.5rem))] flex-shrink-0 items-center self-stretch rounded-md py-0.5 outline-none ring-brand-500/40 transition hover:opacity-90 focus-visible:ring-2 sm:h-16 sm:max-w-[min(440px,calc(100vw-6rem))] sm:py-1"
      >
        <img
          :src="brandLogoSrc"
          :alt="brandLogoAlt"
          width="200"
          height="48"
          decoding="async"
          class="h-full w-auto max-w-full object-contain object-left"
        >
      </NuxtLink>

      <!-- 桌面主導覽 -->
      <nav
        class="hidden items-center gap-1 lg:flex"
        aria-label="主選單"
      >
        <NuxtLink
          v-for="item in mainNav"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-3 py-2.5 text-sm font-medium outline-none transition min-h-[44px] flex items-center"
          :class="isActive(item.to)
            ? 'bg-brand-500/15 text-brand-700'
            : 'text-ink/85 hover:bg-surface-muted hover:text-ink'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- 色彩主題切換（桌面：在 nav 右側；手機：在漢堡左側） -->
      <ThemeSwitcher />

      <!-- 手機漢堡 -->
      <div class="flex items-center lg:hidden">
        <UButton
          color="gray"
          variant="ghost"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav-panel"
          class="!min-h-[44px] !min-w-[44px] justify-center"
          icon="i-lucide-menu"
          @click="mobileOpen = true"
        />
      </div>
    </div>

    <USlideover
      v-model="mobileOpen"
      side="right"
      class="lg:hidden"
    >
      <div id="mobile-nav-panel" class="flex h-full flex-col bg-surface p-4">
        <div class="mb-4 flex items-center justify-between gap-3">
          <img
            :src="brandLogoSrc"
            :alt="brandLogoAlt"
            width="200"
            height="48"
            decoding="async"
            class="h-11 w-auto max-w-[75%] object-contain object-left sm:h-12"
          >
          <UButton
            color="gray"
            variant="ghost"
            icon="i-lucide-x"
            class="!min-h-[44px] !min-w-[44px]"
            aria-label="關閉選單"
            @click="mobileOpen = false"
          />
        </div>
        <nav class="flex flex-1 flex-col gap-1" aria-label="主選單（手機）">
          <NuxtLink
            v-for="item in mainNav"
            :key="item.to"
            :to="item.to"
            class="rounded-lg px-4 py-3.5 text-base font-medium outline-none transition min-h-[48px] flex items-center"
            :class="isActive(item.to)
              ? 'bg-brand-500/15 text-brand-700'
              : 'text-ink hover:bg-surface-muted'"
            @click="mobileOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- 手機主題切換 -->
        <div class="mt-4 border-t border-neutral-sage/20 pt-4">
          <p class="mb-2 px-1 text-xs font-semibold uppercase tracking-widest text-neutral-sage">
            色彩主題
          </p>
          <ThemeSwitcherInline />
        </div>
      </div>
    </USlideover>
  </header>
</template>
