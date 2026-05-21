<script setup lang="ts">
import { phoneDisplay, phoneTelHref } from '~/utils/siteContact'
</script>

<template>
  <section class="mt-16" aria-label="立即聯繫">
    <div class="rounded-2xl bg-navy-deep px-6 py-10 text-surface shadow-lg sm:px-10">
      <div class="mx-auto flex max-w-4xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm font-medium text-accent-soft">
            需要即時協助？
          </p>
          <p class="mt-2 text-2xl font-semibold tracking-tight">
            歡迎來電洽詢
          </p>
          <a
            :href="phoneTelHref"
            class="mt-3 inline-flex min-h-[48px] items-center gap-2 text-3xl font-bold tabular-nums tracking-tight text-white underline decoration-accent-soft/60 decoration-2 underline-offset-4 hover:decoration-white"
          >
            <UIcon name="i-lucide-phone" class="h-8 w-8 shrink-0 text-accent-soft" aria-hidden="true" />
            {{ phoneDisplay }}
          </a>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <UButton to="/contact" color="primary" size="xl" icon="i-lucide-mail" class="justify-center">
            聯繫本所
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>
