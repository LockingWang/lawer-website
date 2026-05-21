/**
 * 使用者「減少動態」偏好（企劃 §4.5、§8.7）。
 * SSR 固定為 `false`，僅在客戶端訂閱 `matchMedia`。
 */
export function usePrefersReducedMotion() {
  const prefersReducedMotion = ref(false)

  if (import.meta.server) {
    return { prefersReducedMotion }
  }

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mq.matches

  const onChange = () => {
    prefersReducedMotion.value = mq.matches
  }
  mq.addEventListener('change', onChange)
  onUnmounted(() => {
    mq.removeEventListener('change', onChange)
  })

  return { prefersReducedMotion }
}
