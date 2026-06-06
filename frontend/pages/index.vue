<script setup lang="ts">
usePageSeo(
  '首頁',
  '專業可信、溫暖承接憂慮。無憂吳律事務所提供家事、校園與行政事件、民刑事等法律服務（高雄）。歡迎來電或聯繫本所；留言表單建置中。',
  { ogTitle: '無憂吳律事務所｜高雄法律服務（家事、訴訟諮詢）' }
)
</script>

<template>
  <div>
    <MotionSection above-fold :delay="0.08">
      <HomeHero />
    </MotionSection>
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
    <MotionSection>
      <HomeNewsPick />
    </MotionSection>
    <MotionSection>
      <HomeTrustStrip />
    </MotionSection>
    <MotionSection>
      <HomeServices />
    </MotionSection>
    <MotionSection>
      <HomePhilosophy />
    </MotionSection>
    <MotionSection>
      <HomeInstagram />
    </MotionSection>
    <MotionSection>
      <HomeLawyerPreview />
    </MotionSection>
    <MotionSection>
      <HomeCtaStrip />
    </MotionSection>
    </div>
  </div>
</template>
