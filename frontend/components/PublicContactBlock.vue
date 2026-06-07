<script setup lang="ts">
import {
  addressLines,
  emailDisplay,
  emailMailtoHref,
  faxDisplay,
  phoneDisplay,
  phoneTelHref
} from '~/utils/siteContact'

const props = withDefaults(
  defineProps<{
    /** default：內頁一般文字；muted：淺灰底區塊；inverse：深藍底（與 Footer 一致） */
    variant?: 'default' | 'muted' | 'inverse'
  }>(),
  { variant: 'default' }
)
</script>

<template>
  <dl
    class="space-y-4 text-sm leading-relaxed"
    :class="{
      'text-ink/90': props.variant === 'default' || props.variant === 'muted',
      'text-surface/90': props.variant === 'inverse'
    }"
  >
    <div>
      <dt
        class="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide"
        :class="props.variant === 'inverse' ? 'text-accent-soft/90' : 'text-neutral-sage'"
      >
        <UIcon name="i-lucide-phone" class="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden="true" />
        電話
      </dt>
      <dd class="mt-1">
        <a
          :href="phoneTelHref"
          class="inline-flex min-h-[44px] items-center text-base font-semibold underline underline-offset-2"
          :class="props.variant === 'inverse'
            ? 'text-surface decoration-accent-soft/80 hover:text-white'
            : 'text-brand-600 decoration-brand-500/30 hover:text-brand-700'"
        >
          {{ phoneDisplay }}
        </a>
      </dd>
    </div>
    <div>
      <dt
        class="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide"
        :class="props.variant === 'inverse' ? 'text-accent-soft/90' : 'text-neutral-sage'"
      >
        <UIcon name="i-lucide-printer" class="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden="true" />
        傳真
      </dt>
      <dd class="mt-1 tabular-nums">
        {{ faxDisplay }}
      </dd>
    </div>
    <div>
      <dt
        class="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide"
        :class="props.variant === 'inverse' ? 'text-accent-soft/90' : 'text-neutral-sage'"
      >
        <UIcon name="i-lucide-mail" class="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden="true" />
        Email
      </dt>
      <dd class="mt-1">
        <a
          :href="emailMailtoHref"
          class="inline-flex min-h-[44px] items-center break-all font-medium underline underline-offset-2"
          :class="props.variant === 'inverse'
            ? 'text-surface decoration-accent-soft/80 hover:text-white'
            : 'text-brand-600 decoration-brand-500/30 hover:text-brand-700'"
        >
          {{ emailDisplay }}
        </a>
      </dd>
    </div>
    <div>
      <dt
        class="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide"
        :class="props.variant === 'inverse' ? 'text-accent-soft/90' : 'text-neutral-sage'"
      >
        <UIcon name="i-lucide-map-pin" class="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden="true" />
        地址
      </dt>
      <dd class="mt-1">
        {{ addressLines.join('') }}
      </dd>
    </div>
  </dl>
</template>
