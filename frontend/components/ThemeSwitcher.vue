<script setup lang="ts">
import { useTheme, THEMES } from '~/composables/useTheme'

const { theme, applyTheme } = useTheme()
const open = ref(false)
const containerRef = ref<HTMLElement | null>(null)

function toggle(e: MouseEvent) {
  e.stopPropagation()
  open.value = !open.value
}

function select(id: typeof THEMES[number]['id']) {
  applyTheme(id)
  open.value = false
}

function handleOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', handleOutside, true))
onUnmounted(() => document.removeEventListener('click', handleOutside, true))
</script>

<template>
  <div ref="containerRef" class="relative">
    <!-- 觸發按鈕 -->
    <button
      type="button"
      :aria-expanded="open"
      aria-haspopup="menu"
      aria-label="切換色彩主題"
      class="flex h-9 w-9 items-center justify-center rounded-lg text-ink/55 transition hover:bg-surface-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
      @click="toggle"
    >
      <UIcon name="i-lucide-palette" class="h-[18px] w-[18px]" />
    </button>

    <!-- 下拉面板 -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-1"
    >
      <div
        v-if="open"
        role="menu"
        class="absolute right-0 top-full z-50 mt-2 w-44 origin-top-right rounded-xl border border-neutral-sage/20 bg-surface p-2 shadow-lg"
      >
        <p class="px-2 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-sage">
          色彩主題
        </p>

        <button
          v-for="t in THEMES"
          :key="t.id"
          type="button"
          role="menuitem"
          class="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition hover:bg-surface-muted"
          :class="theme === t.id ? 'text-ink font-medium' : 'text-ink/70'"
          @click="select(t.id)"
        >
          <!-- 色塊（墨綠金顯示雙色漸層） -->
          <span
            class="relative flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-inset ring-black/10"
            :style="'swatchAccent' in t
              ? `background: linear-gradient(135deg, ${t.swatch} 50%, ${t.swatchAccent} 50%)`
              : `background: ${t.swatch}`"
          >
            <UIcon
              v-if="theme === t.id"
              name="i-lucide-check"
              class="h-3 w-3 text-white drop-shadow-sm"
            />
          </span>

          <span class="flex-1 leading-tight">
            {{ t.label }}
            <span class="block text-[11px] font-normal text-neutral-sage">{{ t.description }}</span>
          </span>
        </button>
      </div>
    </Transition>
  </div>
</template>
