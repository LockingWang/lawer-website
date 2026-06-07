<script setup lang="ts">
import { useTheme, THEMES } from '~/composables/useTheme'

const { theme, applyTheme } = useTheme()
</script>

<template>
  <div class="flex gap-2 px-1">
    <button
      v-for="t in THEMES"
      :key="t.id"
      type="button"
      :aria-label="`切換至${t.label}主題`"
      :aria-pressed="theme === t.id"
      class="flex flex-col items-center gap-1.5 rounded-lg p-1.5 transition hover:bg-surface-muted"
      @click="applyTheme(t.id)"
    >
      <span
        class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full ring-2 transition"
        :class="theme === t.id ? 'ring-brand-500' : 'ring-transparent'"
        :style="'swatchAccent' in t
          ? `background: linear-gradient(135deg, ${t.swatch} 50%, ${t.swatchAccent} 50%)`
          : `background: ${t.swatch}`"
      >
        <UIcon
          v-if="theme === t.id"
          name="i-lucide-check"
          class="h-4 w-4 text-white drop-shadow-sm"
        />
      </span>
      <span class="text-[11px] leading-none text-ink/60">{{ t.label }}</span>
    </button>
  </div>
</template>
