<template>
  <div :class="$style.layout">
    <a href="#main-content" :class="$style.skip_link">Skip to main content</a>
    <main id="main-content" :class="$style.main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" module>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-block: var(--space-5xl);
  padding-inline: var(--space-md);

  @media (max-width: 480px) {
    padding-block: var(--space-3xl);
  }
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: var(--max-content-width);
  margin: 0 auto;
}

.skip_link {
  position: absolute;
  top: -100%;
  left: var(--space-md);
  padding: var(--space-sm) var(--space-xl);
  background: var(--color-brand-primary);
  color: var(--color-bg-base);
  font-weight: 600;
  z-index: 1000;
  transition: top 0.2s;

  &:focus {
    top: var(--space-md);
    outline: 1px solid var(--color-brand-primary);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
}
</style>
