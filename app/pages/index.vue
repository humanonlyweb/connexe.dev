<script setup lang="ts">
useHead({
  script: [
    {
      type: 'module',
      src: 'https://cdn.connexe.dev/widget.js',
      defer: true,
    },
  ],
})

const copiedIndex = ref<number | null>(null)

const snippets = [
  // oxlint-disable-next-line no-useless-concat
  `<script src="https://cdn.connexe.dev/widget.js"><` + `/script>`,
  `<connexe-article topic="Database connection in Nuxt"></connexe-article>`,
  `connexe-article {
  --ac-bg: #1a1a1a;
  --ac-text-main: #ffffff;
  --ac-text-muted: #8e8e8e;
  --ac-accent: #bef264;
  --ac-border: 1px solid #333;
}`,
]

async function copySnippet(index: number) {
  await navigator.clipboard.writeText(snippets[index]!)
  copiedIndex.value = index
  setTimeout(() => {
    copiedIndex.value = null
  }, 2000)
}

const articleTheme = ref<'light' | 'dark'>('dark')
const devTheme = ref<'light' | 'dark'>('dark')

function toggleArticleTheme() {
  articleTheme.value = articleTheme.value === 'dark' ? 'light' : 'dark'
}

function toggleDevTheme() {
  devTheme.value = devTheme.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div :class="$style.page">
    <section :class="$style.hero">
      <hgroup :class="$style.hero__content">
        <h1 :class="$style.hero__title">
          Connect content.<br />
          Surface&nbsp;<span :class="$style.hero__highlight">talent.</span>
        </h1>
        <p :class="$style.hero__subtitle">
          Drop-in Vue & Nuxt widgets that recommend related articles and showcase developers right
          inside your site.
        </p>
      </hgroup>
    </section>

    <section :class="$style.widget_section" aria-labelledby="widget-heading">
      <h2 id="widget-heading" :class="$style.widget_name">Article Widget</h2>
      <div :class="$style.demo">
        <div :class="$style.demo__widget" :data-theme="articleTheme">
          <button
            :class="$style.theme_toggle"
            type="button"
            aria-label="Toggle theme"
            @click="toggleArticleTheme"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="5" />
              <path
                d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
              />
            </svg>
          </button>
          <connexe-article
            :theme="articleTheme"
            topic="Validating Route Params Client-Side in Nuxt 4 with Zod"
          ></connexe-article>
        </div>

        <aside :class="$style.demo__docs" aria-labelledby="quickstart-heading">
          <h3 id="quickstart-heading" :class="$style.docs__title">Quick Start</h3>
          <ol :class="$style.docs__steps">
            <li>
              <span :class="$style.docs__step_label">Add the script</span>
              <div :class="$style.docs__code_wrapper">
                <div :class="$style.docs__code">
                  <code
                    ><span class="token-keyword">&lt;script&nbsp;</span>
                    <span class="token-property">src</span>=<span class="token-value"
                      >"https://cdn.connexe.dev/widget.js"</span
                    ><span class="token-keyword">&gt;&lt;/script&gt;</span></code
                  >
                </div>
                <button
                  :class="$style.copy_btn"
                  type="button"
                  @click="copySnippet(0)"
                  :aria-label="copiedIndex === 0 ? 'Copied!' : 'Copy to clipboard'"
                >
                  {{ copiedIndex === 0 ? '✓ copied' : 'copy' }}
                </button>
              </div>
            </li>
            <li>
              <span :class="$style.docs__step_label">Use the component</span>
              <div :class="$style.docs__code_wrapper">
                <div :class="$style.docs__code">
                  <pre><code><span class="token-keyword">&lt;connexe-article</span> <span class="token-property">topic</span>=<span class="token-value">"Database connection in Nuxt"</span><span class="token-keyword">&gt;&lt;/connexe-article&gt;</span>

<span class="token-keyword">&lt;connexe-article</span> <span class="token-property">topic</span>=<span class="token-value">"Vue routing and validation"</span> <span class="token-property">lang</span>=<span class="token-value">"en"</span> <span class="token-property">limit</span>=<span class="token-value">"3"</span><span class="token-keyword">&gt;&lt;/connexe-article&gt;</span></code></pre>
                </div>
                <button
                  :class="$style.copy_btn"
                  type="button"
                  @click="copySnippet(1)"
                  :aria-label="copiedIndex === 1 ? 'Copied!' : 'Copy to clipboard'"
                >
                  {{ copiedIndex === 1 ? '✓ copied' : 'copy' }}
                </button>
              </div>
            </li>
            <li>
              <span :class="$style.docs__step_label">Style with CSS variables</span>
              <div :class="$style.docs__code_wrapper">
                <div :class="$style.docs__code">
                  <code
                    ><span class="token-keyword">connexe-article</span> {
                    <span class="token-property">--ac-bg</span>:
                    <span class="token-value">#1a1a1a</span>;
                    <span class="token-property">--ac-text-main</span>:
                    <span class="token-value">#ffffff</span>;
                    <span class="token-property">--ac-text-muted</span>:
                    <span class="token-value">#8e8e8e</span>;
                    <span class="token-property">--ac-accent</span>:
                    <span class="token-value">#bef264</span>;
                    <span class="token-property">--ac-border</span>:
                    <span class="token-value">1px solid #333</span>; }</code
                  >
                </div>
                <button
                  :class="$style.copy_btn"
                  type="button"
                  @click="copySnippet(2)"
                  :aria-label="copiedIndex === 2 ? 'Copied!' : 'Copy to clipboard'"
                >
                  {{ copiedIndex === 2 ? '✓ copied' : 'copy' }}
                </button>
              </div>
            </li>
          </ol>
        </aside>
      </div>
    </section>

    <section :class="$style.widget_section" aria-labelledby="dev-widget-heading">
      <h2 id="dev-widget-heading" :class="$style.widget_name">Developer Widget</h2>
      <div :class="$style.demo">
        <div :class="$style.demo__widget" :data-theme="devTheme">
          <button
            :class="$style.theme_toggle"
            type="button"
            aria-label="Toggle theme"
            @click="toggleDevTheme"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="5" />
              <path
                d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
              />
            </svg>
          </button>
          <connexe-dev :theme="devTheme" skills="vue,nuxt,typescript"></connexe-dev>
        </div>

        <aside :class="$style.demo__docs" aria-labelledby="dev-quickstart-heading">
          <h3 id="dev-quickstart-heading" :class="$style.docs__title">Quick Start</h3>
          <ol :class="$style.docs__steps">
            <li>
              <span :class="$style.docs__step_label">Add the script</span>
              <div :class="$style.docs__code_wrapper">
                <div :class="$style.docs__code">
                  <code
                    ><span class="token-keyword">&lt;script&nbsp;</span>
                    <span class="token-property">src</span>=<span class="token-value"
                      >"https://cdn.connexe.dev/widget.js"</span
                    ><span class="token-keyword">&gt;&lt;/script&gt;</span></code
                  >
                </div>
                <button
                  :class="$style.copy_btn"
                  type="button"
                  @click="copySnippet(0)"
                  :aria-label="copiedIndex === 0 ? 'Copied!' : 'Copy to clipboard'"
                >
                  {{ copiedIndex === 0 ? '✓ copied' : 'copy' }}
                </button>
              </div>
            </li>
            <li>
              <span :class="$style.docs__step_label">Use the component</span>
              <div :class="$style.docs__code_wrapper">
                <div :class="$style.docs__code">
                  <code
                    ><span class="token-keyword">&lt;connexe-dev&nbsp;</span>
                    <span class="token-property">skills</span>=<span class="token-value"
                      >"vue,typescript"</span
                    ><span class="token-keyword">&gt;&lt;/connexe-dev&gt;</span></code
                  >
                </div>
                <button :class="$style.copy_btn" type="button" aria-label="Copy to clipboard">
                  copy
                </button>
              </div>
            </li>
          </ol>
        </aside>
      </div>
    </section>

    <section :class="$style.info_section" aria-labelledby="join-heading">
      <h2 id="join-heading" :class="$style.widget_name">Join the Network</h2>
      <div :class="$style.info_grid">
        <div :class="$style.info_card">
          <h3 :class="$style.info_card__title">Why add Connexe to your site?</h3>
          <div :class="$style.info_card__content">
            <p :class="$style.info_card__text">
              Connexe helps Vue & Nuxt content and developers get discovered.
            </p>
            <ul :class="$style.info_card__steps">
              <li>Recommend related Vue & Nuxt articles automatically</li>
              <li>Showcase Vue & Nuxt developers on your site to potential employers/clients</li>
              <li>Help visitors discover more Vue & Nuxt content</li>
              <li>Strengthen the Vue & Nuxt ecosystem together</li>
            </ul>
            <p :class="$style.info_card__text">
              It’s completely optional but together, we can boost content, talent, and visibility
              across the community.
            </p>
          </div>
        </div>

        <div :class="$style.info_card">
          <h3 :class="$style.info_card__title">How to add your content</h3>
          <ol :class="$style.info_card__steps">
            <li>
              Open a PR and edit either <code class="u-code-inline">data/content.json</code> or
              <code class="u-code-inline">data/portfolio.json</code>, following the format.
            </li>
            <li>
              Once approved, these will be automatically ingested and you'll be part of the network.
            </li>
          </ol>
          <a
            href="https://github.com/humanonlyweb/connexe.dev"
            target="_blank"
            rel="noopener noreferrer"
            :class="$style.info_card__button"
            >Join the Network</a
          >
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" module>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-text-muted);

  @media (max-width: 480px) {
    padding: var(--space-2xl) var(--space-sm);
  }
}

.hero {
  text-align: center;
  max-width: 720px;
  margin-bottom: var(--space-5xl);

  @media (max-width: 480px) {
    margin-bottom: var(--space-3xl);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  &__title {
    font-family: var(--bricolage-grotesque);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1;
    color: var(--color-text-main);
  }

  &__highlight {
    background: var(--gradient-brand);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__subtitle {
    font-size: var(--text-md);
    line-height: 1;
    color: var(--color-text-muted);
    max-width: 60ch;
  }
}

.widget_section {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  max-width: 900px;
  width: 100%;

  & + & {
    margin-top: var(--space-5xl);
  }
}

.widget_name {
  font-family: var(--bricolage-grotesque);
  font-size: var(--text-sm);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.theme_toggle {
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--space-2xl);
  height: var(--space-2xl);
  background: var(--color-bg-darker);
  border: 1px solid var(--color-border-hover);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-border);
    color: var(--color-brand-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand-primary);
    outline-offset: 2px;
  }
}

.demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  max-width: 900px;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg-transparent);
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  &__widget {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-2xl);
    min-height: 320px;
    background: var(--color-bg-widget);
    border-right: 1px solid var(--color-border);
    transition: background-color 0.3s ease;

    &[data-theme='light'] {
      background: var(--color-bg-light);

      .theme_toggle {
        background: var(--color-bg-white);
        border-color: var(--color-border-light);
        color: var(--color-text-muted-light);

        &:hover {
          border-color: var(--color-border-hover-light);
          color: var(--color-brand-primary);
        }
      }
    }

    @media (max-width: 768px) {
      padding-inline: var(--space-lg);
      min-height: auto;
      border-right: none;
      border-bottom: 1px solid var(--color-border);
    }
  }

  &__docs {
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);

    @media (max-width: 480px) {
      padding: var(--space-md);
    }
  }
}

.docs {
  &__title {
    font-family: var(--bricolage-grotesque);
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-brand-primary);
  }

  &__steps {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    list-style: none;
    counter-reset: step;

    li {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      counter-increment: step;

      &::before {
        content: counter(step);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--space-md);
        height: var(--space-md);
        font-size: var(--text-xs);
        font-weight: 600;
        color: var(--color-bg-base);
        background: var(--color-brand-primary);
        border-radius: 0;
        flex-shrink: 0;
      }
    }
  }

  &__step_label {
    font-size: var(--text-base);
    font-weight: 500;
    color: var(--color-text-main);
    margin-left: var(--space-xl);
    margin-top: calc(var(--space-xl) * -1);
  }

  &__code {
    padding: var(--space-sm) var(--space-md) var(--space-md);
    background: var(--color-bg-code);
    border: 1px solid var(--color-border);
    border-radius: 0;
    max-height: 120px;
    overflow-x: auto;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-border-hover);
    }

    pre {
      margin: 0;
      white-space: pre;
    }

    code {
      font-family: var(--font-mono);
      font-size: var(--text-sm);
      color: var(--color-code-text);
      white-space: pre;
    }
  }

  &__code_wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
  }
}

.copy_btn {
  align-self: flex-end;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs);
  padding: var(--space-2xs) var(--space-xs);
  background: transparent;
  border: none;
  color: var(--color-text-dim);
  font-size: var(--text-2xs); // 10px
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-brand-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand-primary);
    outline-offset: 2px;
  }
}

// Info Section
.info_section {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  max-width: 900px;
  width: 100%;
  margin-top: var(--space-6xl);

  @media (max-width: 480px) {
    margin-top: var(--space-4xl);
  }
}

.info_grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 0;
  row-gap: var(--space-md);
  max-width: 900px;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg-transparent);
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    row-gap: 0;
  }
}

.info_card {
  grid-row: 1 / -1;
  display: grid;
  grid-template-rows: subgrid;
  align-items: start;

  padding: var(--space-2xl);
  background: var(--color-bg-widget);
  border-right: 1px solid var(--color-border);

  &:last-child {
    border-right: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    grid-row: auto;
    gap: var(--space-md);

    padding: var(--space-lg);
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    min-height: auto;

    &:last-child {
      border-bottom: none;
    }
  }

  &__title {
    font-family: var(--bricolage-grotesque);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-text-main);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  &__text {
    font-size: var(--text-base);
    line-height: 1.6;
    color: var(--color-text-muted);
    max-width: 45ch;
  }

  &__steps {
    font-size: var(--text-base);
    line-height: 1.6;
    color: var(--color-text-muted);
    max-width: 45ch;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding-left: var(--space-lg);
    margin: 0;

    li {
      &::marker {
        color: var(--color-brand-primary);
        font-weight: 600;
        font-family: var(--font-mono);
      }
    }
  }

  &__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: var(--space-xs);
    padding: var(--space-sm) var(--space-xl);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-bg-darker);
    background: var(--gradient-brand);
    border: none;
    border-radius: var(--radius-sm);
    text-decoration: none;
    margin-top: var(--space-xl);
    transition: all 0.2s ease;

    &:active {
      transform: scale(0.99);
    }

    &:focus-visible {
      outline: 2px solid var(--color-brand-primary);
      outline-offset: 4px;
    }
  }
}
</style>
