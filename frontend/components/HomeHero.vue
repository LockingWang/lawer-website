<template>
  <section
    class="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    aria-labelledby="home-hero-heading"
  >
    <!-- 背景影片 -->
    <video
      class="absolute inset-0 h-full w-full object-cover"
      autoplay
      muted
      loop
      playsinline
      aria-hidden="true"
    >
      <source src="/videos/paper_work.mp4" type="video/mp4">
    </video>

    <!-- 遮罩 -->
    <div class="absolute inset-0 bg-black/55" aria-hidden="true" />

    <!-- 內容 -->
    <div class="relative z-10 mx-auto max-w-2xl px-6 text-center">
      <p class="text-sm font-medium text-accent-teal">
        專業 · 親民 · 可信
      </p>
      <h1
        id="home-hero-heading"
        class="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.25rem] lg:leading-tight"
      >
        來到本所，願您從此無憂無慮
      </h1>
      <p class="mt-4 text-lg leading-relaxed text-white/85">
        主持律師深耕<strong class="font-medium text-white">家事、校園與行政爭議、民刑事訴訟</strong>，以清楚溝通與穩健策略，陪您面對法律課題。
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <UButton to="/contact" color="primary" size="lg" icon="i-lucide-phone">
          聯繫本所
        </UButton>
        <UButton to="/firm" color="white" variant="outline" size="lg" icon="i-lucide-building-2">
          認識本所
        </UButton>
      </div>
    </div>
  </section>
</template>
