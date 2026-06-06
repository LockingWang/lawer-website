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

      <!-- 右：影片框 -->
      <div class="relative hidden shrink-0 lg:block" aria-hidden="true">
        <!-- 偏移裝飾邊框 -->
        <div class="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border-2 border-brand-200" />
        <!-- 影片容器 16:9 -->
        <div class="relative w-72 aspect-video overflow-hidden rounded-2xl shadow-lg">
          <video
            autoplay
            muted
            loop
            playsinline
            class="h-full w-full object-cover"
          >
            <source src="/videos/paper_work.mp4" type="video/mp4">
          </video>
          <!-- 品牌色薄膜，讓影片融入配色 -->
          <div class="absolute inset-0 bg-brand-700/15" />
        </div>
      </div>
    </div>
  </section>
</template>
