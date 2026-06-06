<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { socialInstagramHref } from '~/utils/siteContact'
import type { InstagramStoriesResponse, InstagramStoryDto } from '~/utils/instagramApi'
import { instagramStoriesEndpoint } from '~/utils/instagramApi'

const placeholderBubbles = [
  { label: '法律知識', icon: 'i-lucide-book-open' },
  { label: '案件資訊', icon: 'i-lucide-file-text' },
  { label: '所內動態', icon: 'i-lucide-megaphone' }
] as const

const runtimeConfig = useRuntimeConfig()
const apiBase = computed(() => String(runtimeConfig.public.apiBase || '').trim())

const stories = ref<InstagramStoryDto[]>([])
const meta = ref<InstagramStoriesResponse['meta'] | null>(null)
const pending = ref(false)
const clientError = ref(false)

function storyImageUrl(s: InstagramStoryDto): string | null {
  return s.mediaType === 'VIDEO' ? (s.thumbnailUrl || s.mediaUrl) : (s.mediaUrl || s.thumbnailUrl)
}

const showStories = computed(() =>
  !pending.value && !clientError.value && meta.value?.source === 'graph' && stories.value.length > 0
)

onMounted(async () => {
  if (!apiBase.value) return
  pending.value = true
  clientError.value = false
  try {
    const data = await $fetch<InstagramStoriesResponse>(instagramStoriesEndpoint(apiBase.value))
    stories.value = data.stories || []
    meta.value = data.meta
  }
  catch {
    clientError.value = true
  }
  finally {
    pending.value = false
  }
})
</script>

<template>
  <section class="mt-16" aria-labelledby="home-ig-heading">
    <div class="relative left-1/2 -translate-x-1/2 w-screen bg-brand-50 py-14">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-20">

          <!-- 左：文字 -->
          <div class="flex-1">
            <p class="text-xs font-semibold tracking-widest text-accent-teal uppercase">
              Follow Us
            </p>
            <h2 id="home-ig-heading" class="mt-2 text-2xl font-semibold text-ink">
              掌握最新動態
            </h2>
            <p class="mt-3 max-w-xs leading-relaxed text-ink/70">
              定期分享法律知識、案件資訊與本所近況，歡迎追蹤互動。
            </p>
            <p class="mt-4 text-sm font-medium text-brand-600">
              @lawyerwusally
            </p>
            <NuxtLink
              :to="socialInstagramHref"
              external
              target="_blank"
              rel="noopener noreferrer"
              class="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-ink/12 bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-sm transition hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              <UIcon name="i-simple-icons-instagram" class="h-5 w-5 shrink-0" aria-hidden="true" />
              前往 Instagram
              <UIcon name="i-lucide-arrow-up-right" class="h-4 w-4 shrink-0 text-ink/40" aria-hidden="true" />
            </NuxtLink>
          </div>

          <!-- 右：限時動態泡泡 -->
          <div
            class="flex shrink-0 items-end justify-center gap-6 lg:justify-end"
            role="list"
            :aria-label="showStories ? '目前有效的限時動態' : 'Instagram 內容預覽'"
          >
            <!-- Loading -->
            <template v-if="pending">
              <div v-for="i in 3" :key="i" class="flex flex-col items-center gap-3" aria-hidden="true">
                <div
                  class="animate-pulse rounded-full bg-brand-200"
                  :style="{ width: i === 2 ? '88px' : '72px', height: i === 2 ? '88px' : '72px' }"
                />
                <div class="h-3 w-10 animate-pulse rounded-full bg-brand-200" />
              </div>
            </template>

            <!-- 真實限時動態 -->
            <template v-else-if="showStories">
              <div
                v-for="(s, idx) in stories.slice(0, 3)"
                :key="s.id"
                class="flex flex-col items-center gap-2"
                role="listitem"
              >
                <a
                  :href="s.permalink || socialInstagramHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block rounded-full bg-gradient-to-br from-brand-400 to-accent-teal p-[3px] ring-2 ring-white shadow-md transition hover:scale-105"
                  aria-label="開啟限時動態"
                >
                  <div
                    class="overflow-hidden rounded-full bg-surface"
                    :class="idx === 1 ? 'h-24 w-24' : 'h-20 w-20'"
                  >
                    <img
                      v-if="storyImageUrl(s)"
                      :src="storyImageUrl(s) || undefined"
                      alt=""
                      class="h-full w-full object-cover"
                      loading="lazy"
                      referrerpolicy="no-referrer"
                    >
                  </div>
                </a>
                <span class="text-xs text-neutral-sage">限時動態</span>
              </div>
            </template>

            <!-- 品牌佔位泡泡（API 未就緒或無動態） -->
            <template v-else>
              <div
                v-for="(bubble, idx) in placeholderBubbles"
                :key="bubble.label"
                class="flex flex-col items-center gap-2"
                role="listitem"
              >
                <div
                  class="rounded-full bg-gradient-to-br from-brand-400 to-accent-teal p-[3px] ring-2 ring-white shadow-md"
                  :class="idx === 1 ? 'scale-110' : ''"
                >
                  <div
                    class="flex items-center justify-center rounded-full bg-white"
                    :class="idx === 1 ? 'h-24 w-24' : 'h-20 w-20'"
                  >
                    <UIcon :name="bubble.icon" class="h-8 w-8 text-brand-500" aria-hidden="true" />
                  </div>
                </div>
                <span class="text-xs font-medium text-ink/55">{{ bubble.label }}</span>
              </div>
            </template>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
