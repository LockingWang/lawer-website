<script setup lang="ts">
import {
  addressSingleLine,
  emailDisplay,
  emailMailtoHref,
  phoneDisplay,
  phoneTelHref
} from '~/utils/siteContact'
</script>

<template>
  <section class="mt-16" aria-label="立即聯繫">
    <div class="overflow-hidden rounded-2xl shadow-lg">
      <div class="flex flex-col sm:flex-row">

        <!-- 左：電話 -->
        <div class="flex flex-col justify-center bg-navy-deep px-8 py-10 sm:w-1/2 lg:px-12">
          <p class="text-xs font-semibold tracking-widest text-accent-teal uppercase">
            立即來電
          </p>
          <p class="mt-3 text-xl font-semibold text-white">
            歡迎致電洽詢
          </p>
          <a
            :href="phoneTelHref"
            class="mt-4 inline-flex min-h-[52px] items-center gap-3 text-3xl font-bold tabular-nums tracking-tight text-white transition hover:text-accent-soft"
            aria-label="`撥打 ${phoneDisplay}`"
          >
            <UIcon name="i-lucide-phone" class="h-7 w-7 shrink-0 text-accent-teal" aria-hidden="true" />
            {{ phoneDisplay }}
          </a>
          <p class="mt-5 flex items-center gap-1.5 text-sm text-white/45">
            <UIcon name="i-lucide-map-pin" class="h-4 w-4 shrink-0" aria-hidden="true" />
            {{ addressSingleLine }}
          </p>
        </div>

        <!-- 右：線上留言 -->
        <div class="flex flex-col justify-center border-t border-neutral-sage/20 bg-surface px-8 py-10 sm:w-1/2 sm:border-l sm:border-t-0 lg:px-12">
          <p class="text-xs font-semibold tracking-widest text-brand-500 uppercase">
            線上諮詢
          </p>
          <p class="mt-3 text-xl font-semibold text-ink">
            留下您的需求
          </p>
          <p class="mt-3 text-sm leading-relaxed text-ink/65">
            填寫諮詢表單，說明案件概況，律師確認後主動與您聯繫。
          </p>
          <div class="mt-6">
            <UButton
              to="/contact"
              color="primary"
              size="lg"
              icon="i-lucide-mail"
            >
              前往聯繫本所
            </UButton>
          </div>
          <a
            :href="emailMailtoHref"
            class="mt-4 inline-flex items-center gap-1.5 text-xs text-neutral-sage transition hover:text-brand-600"
          >
            <UIcon name="i-lucide-at-sign" class="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {{ emailDisplay }}
          </a>
        </div>

      </div>
    </div>
  </section>
</template>
