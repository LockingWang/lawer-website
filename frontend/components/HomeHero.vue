<template>
  <section aria-labelledby="home-hero-heading" class="relative flex min-h-[320px] items-center overflow-hidden py-10 lg:py-0">

    <!-- 背景天秤裝飾（桌面版，絕對定位不佔版面） -->
    <div
      class="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 select-none lg:block"
      aria-hidden="true"
    >
      <div class="relative flex items-center justify-center">
        <div class="absolute h-80 w-80 rounded-full border border-brand-500/10" />
        <div class="absolute h-56 w-56 rounded-full border border-brand-500/[0.08]" />
        <UIcon name="i-lucide-scale" class="h-60 w-60 text-brand-500/[0.09]" />
      </div>
    </div>

    <!-- 前景文字 -->
    <div class="relative max-w-xl">
      <p class="text-sm font-medium tracking-widest text-brand-500 uppercase">
        專業 · 親民 · 可信
      </p>
      <h1
        id="home-hero-heading"
        class="mt-3 text-4xl font-semibold leading-tight tracking-tight text-ink lg:text-[2.6rem]"
      >
        我們用法律，<br>守護您的權益與未來
      </h1>
      <p class="mt-4 max-w-lg text-lg leading-relaxed text-ink/70">
        提供家事、校園與行政事件、民刑事等多元法律服務，以清楚溝通與穩健策略，陪您面對每一個重要時刻。
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <UButton to="/firm" color="primary" size="lg">
          了解服務領域
        </UButton>
        <UButton to="/contact" size="lg" variant="outline" color="primary">
          聯絡我們
        </UButton>
      </div>
    </div>

  </section>
</template>
