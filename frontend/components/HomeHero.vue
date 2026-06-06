<template>
  <section aria-labelledby="home-hero-heading" class="flex min-h-[320px] items-center py-10 lg:py-0">
    <div class="flex w-full items-center gap-10 lg:gap-16">
      <!-- 左：文字 -->
      <div class="flex-1">
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

      <!-- 右：裝飾插圖 -->
      <div class="relative hidden shrink-0 items-center justify-center lg:flex">
        <div class="absolute h-60 w-60 rounded-full border-2 border-dashed border-brand-200" aria-hidden="true" />
        <div class="flex h-52 w-52 items-center justify-center rounded-full bg-brand-50">
          <UIcon name="i-lucide-scale" class="h-28 w-28 text-brand-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  </section>
</template>
