<script setup lang="ts">
/**
 * 極輕進場動效（GSAP + ScrollTrigger，企劃 §8.7、§4.5）。
 * `aboveFold`：首屏區塊不用捲動觸發，避免進入頁面時「先顯示再隱藏再播」的閃爍。
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = withDefaults(
  defineProps<{
    /** 首屏區塊：載入後短延遲直接播放，不用 ScrollTrigger */
    aboveFold?: boolean
    /** 秒；可與兄弟區塊錯開極短時間 */
    delay?: number
  }>(),
  { aboveFold: false, delay: 0 }
)

const root = ref<HTMLElement | null>(null)
const { prefersReducedMotion } = usePrefersReducedMotion()

let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value || prefersReducedMotion.value) {
    return
  }

  gsap.registerPlugin(ScrollTrigger)

  const el = root.value
  ctx = gsap.context(() => {
    if (props.aboveFold) {
      gsap.from(el, {
        autoAlpha: 0,
        y: 16,
        duration: 0.5,
        ease: 'power2.out',
        delay: props.delay
      })
    }
    else {
      gsap.from(el, {
        autoAlpha: 0,
        y: 20,
        duration: 0.55,
        ease: 'power2.out',
        delay: props.delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          once: true
        }
      })
    }
  }, el)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <div ref="root" class="motion-section">
    <slot />
  </div>
</template>
