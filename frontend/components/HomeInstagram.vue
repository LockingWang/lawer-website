<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { socialInstagramHref } from '~/utils/siteContact'
import type { InstagramStoriesResponse, InstagramStoryDto } from '~/utils/instagramApi'
import { instagramStoriesEndpoint } from '~/utils/instagramApi'

/** 靜態限動預覽占位（API 無資料或失敗時 §2.6 備援） */
const storyPlaceholders = [
  { label: '公告', tone: 'from-brand-500 to-brand-600' },
  { label: '活動', tone: 'from-accent-soft to-brand-500' },
  { label: '分享', tone: 'from-accent-teal to-brand-600' }
] as const

const runtimeConfig = useRuntimeConfig()
const apiBase = computed(() => String(runtimeConfig.public.apiBase || '').trim())

const stories = ref<InstagramStoryDto[]>([])
const meta = ref<InstagramStoriesResponse['meta'] | null>(null)
const pending = ref(false)
const clientError = ref(false)

function storyImageUrl(s: InstagramStoryDto): string | null {
  if (s.mediaType === 'VIDEO') {
    return s.thumbnailUrl || s.mediaUrl
  }
  return s.mediaUrl || s.thumbnailUrl
}

function formatStoryTime(iso: string): string {
  if (!iso) {
    return '限時動態'
  }
  try {
    const d = new Date(iso)
    return new Intl.DateTimeFormat('zh-Hant', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d)
  }
  catch {
    return '限時動態'
  }
}

const showApiFallback = computed(() => {
  if (!apiBase.value) {
    return true
  }
  if (pending.value) {
    return false
  }
  if (clientError.value) {
    return true
  }
  if (!meta.value) {
    return true
  }
  if (meta.value.source === 'error' || meta.value.source === 'disabled') {
    return true
  }
  return stories.value.length === 0
})

onMounted(async () => {
  if (!apiBase.value) {
    return
  }
  pending.value = true
  clientError.value = false
  try {
    const url = instagramStoriesEndpoint(apiBase.value)
    const data = await $fetch<InstagramStoriesResponse>(url)
    stories.value = data.stories || []
    meta.value = data.meta
  }
  catch {
    clientError.value = true
    meta.value = {
      source: 'error',
      fetchedAt: new Date().toISOString(),
      message: '無法連線至後端 IG 代理'
    }
  }
  finally {
    pending.value = false
  }
})
</script>

<template>
  <section class="mt-16" aria-labelledby="home-ig-heading">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <h2 id="home-ig-heading" class="text-2xl font-semibold text-ink">
        Instagram 限時動態
      </h2>
      <p class="text-xs text-neutral-sage">
        資料經後端代理（企劃 §2.6）；失敗時仍可前往 IG。
      </p>
    </div>

    <div class="mt-6 rounded-2xl border border-dashed border-neutral-sage/50 bg-surface-muted/40 p-6 sm:p-8">
      <div v-if="apiBase && pending" class="flex flex-wrap justify-center gap-4 sm:justify-start">
        <div
          v-for="i in 3"
          :key="i"
          class="h-[4.5rem] w-[4.5rem] animate-pulse rounded-full bg-neutral-sage/25 ring-2 ring-white"
          aria-hidden="true"
        />
        <p class="w-full text-center text-sm text-ink/70 sm:text-left">
          載入限時動態中…
        </p>
      </div>

      <div
        v-else-if="apiBase && !showApiFallback && stories.length"
        class="space-y-4"
      >
        <div
          class="-mx-2 flex gap-4 overflow-x-auto pb-2 pt-1 sm:mx-0"
          role="list"
          aria-label="目前有效的 Instagram 限時動態"
        >
          <div
            v-for="s in stories"
            :key="s.id"
            class="w-[5.5rem] flex-shrink-0"
            role="listitem"
          >
            <a
              v-if="storyImageUrl(s)"
              :href="s.permalink || socialInstagramHref"
              target="_blank"
              rel="noopener noreferrer"
              class="group block outline-none ring-brand-500/30 focus-visible:ring-2"
              :aria-label="`開啟限時動態（${formatStoryTime(s.timestamp)}）`"
            >
              <div class="rounded-full bg-gradient-to-br from-brand-500 to-accent-soft p-[3px] shadow-sm ring-2 ring-white">
                <div class="relative aspect-square overflow-hidden rounded-full bg-surface">
                  <img
                    :src="storyImageUrl(s) || undefined"
                    :alt="`Instagram 限時動態 ${formatStoryTime(s.timestamp)}`"
                    class="h-full w-full object-cover transition group-hover:opacity-95"
                    loading="lazy"
                    referrerpolicy="no-referrer"
                  >
                </div>
              </div>
              <p class="mt-2 truncate text-center text-xs text-neutral-sage">
                {{ formatStoryTime(s.timestamp) }}
              </p>
            </a>
            <div v-else class="text-center text-xs text-neutral-sage">
              （無預覽圖）
            </div>
          </div>
        </div>
        <p v-if="meta?.source === 'graph'" class="text-xs text-neutral-sage">
          共 {{ stories.length }} 則 · 快取約 90 秒更新（後端設定）
        </p>
      </div>

      <template v-else>
        <div class="flex flex-wrap items-center justify-center gap-6 sm:justify-start">
          <div
            v-for="(s, i) in storyPlaceholders"
            :key="s.label"
            class="flex flex-col items-center gap-2"
          >
            <div
              class="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-gradient-to-br p-[3px] shadow-sm ring-2 ring-white"
              :class="s.tone"
              aria-hidden="true"
            >
              <div class="flex h-full w-full items-center justify-center rounded-full bg-surface text-xs font-semibold text-ink/80">
                {{ s.label }}
              </div>
            </div>
            <span class="text-xs text-neutral-sage">占位 {{ i + 1 }}</span>
          </div>
        </div>
        <p class="mt-6 text-center text-sm text-ink/75 sm:text-left">
          <template v-if="!apiBase">
            尚未設定 <code class="rounded bg-surface px-1 text-xs">NUXT_PUBLIC_API_BASE</code>，無法載入後端限動；請至 Instagram 觀看即時動態。
          </template>
          <template v-else-if="meta?.source === 'disabled'">
            後端尚未設定 Instagram Graph 憑證（<code class="rounded bg-surface px-1 text-xs">INSTAGRAM_IG_USER_ID</code>／<code class="rounded bg-surface px-1 text-xs">INSTAGRAM_ACCESS_TOKEN</code>）。限時動態請至 Instagram 觀看。
          </template>
          <template v-else-if="meta?.source === 'error' || clientError">
            目前無法取得限時動態（API 錯誤或網路問題）。請直接前往 Instagram 查看最新內容。
          </template>
          <template v-else>
            目前沒有有效的限時動態（可能已超過 24 小時）。請至 Instagram 觀看最新動態。
          </template>
        </p>
      </template>

      <div class="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-start">
        <NuxtLink
          :to="socialInstagramHref"
          external
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] px-5 py-3 text-base font-semibold text-white shadow-md transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:flex-initial sm:px-6"
        >
          <UIcon name="i-simple-icons-instagram" class="h-6 w-6 shrink-0 text-white" aria-hidden="true" />
          前往 Instagram
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
