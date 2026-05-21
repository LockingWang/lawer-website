<template>
  <div class="flex min-h-screen flex-col bg-surface-muted text-ink">
    <a
      href="#main-content"
      class="skip-to-main"
    >
      跳至主要內容
    </a>
    <AppHeader />
    <main id="main-content" class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
