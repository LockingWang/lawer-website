<script setup lang="ts">
usePageSeo(
  '首頁',
  '專業可信、溫暖承接憂慮。無憂吳律事務所提供家事、校園與行政事件、民刑事等法律服務（高雄）。歡迎來電或聯繫本所；留言表單建置中。',
  { ogTitle: '無憂吳律事務所｜高雄法律服務（家事、訴訟諮詢）' }
)
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
    <!-- 頂部：Hero（左）＋ 最新消息（右） -->
    <div class="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-stretch">
      <MotionSection above-fold :delay="0.08">
        <HomeHero />
      </MotionSection>
      <MotionSection>
        <HomeNewsPick />
      </MotionSection>
    </div>

    <!-- 服務領域 -->
    <MotionSection>
      <HomeServices />
    </MotionSection>

    <!-- 創所理念 -->
    <MotionSection>
      <HomePhilosophy />
    </MotionSection>

    <!-- Instagram -->
    <MotionSection>
      <HomeInstagram />
    </MotionSection>

    <!-- 主持律師 -->
    <MotionSection>
      <HomeLawyerPreview />
    </MotionSection>

    <!-- 聯繫 CTA -->
    <MotionSection>
      <HomeCtaStrip />
    </MotionSection>
  </div>
</template>
