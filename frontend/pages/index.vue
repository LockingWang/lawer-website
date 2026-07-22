<script setup lang="ts">
usePageSeo(
  '高雄律師事務所｜家事・職場性騷擾／霸凌調查',
  '無憂吳律事務所｜高雄苓雅區律師事務所。吳佩珊律師提供家事事件（離婚、監護權、扶養）、校園事件調查、職場性騷擾調查、職場霸凌調查、行政爭訟與民刑事訴訟等法律服務，歡迎來電預約諮詢。',
  { ogTitle: '無憂吳律事務所｜高雄律師・家事、職場性騷擾／霸凌調查、民刑事訴訟' }
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
