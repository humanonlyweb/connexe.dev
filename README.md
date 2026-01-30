# Connexe

A network for sharing and recommending Vue & Nuxt content and talent across the ecosystem.

## Prerequisites

1. [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages)
2. [Node.js](https://nodejs.org/) v24+
3. [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) v4.61.0+

## Setup

### 1. Install dependencies

```bash
bun install
```

### 2. Create Vectorize indexes

Create two vector indexes: one for content (articles) and one for developers.

```bash
# Content index (1024 dimensions for bge-large-en-v1.5 model)
npx wrangler vectorize create connexe-content-index --dimensions=1024 --metric=cosine
npx wrangler vectorize create-metadata-index connexe-content-index --property-name=lang --type=string

# Developer index
npx wrangler vectorize create connexe-developer-index --dimensions=1024 --metric=cosine
npx wrangler vectorize create-metadata-index connexe-developer-index --property-name=lang --type=string
```

### 3. Create KV namespace

```bash
npx wrangler kv namespace create CONTENT_STORE
```

Copy the output `id` to your `wrangler.jsonc` file.

### 4. Create R2 bucket (optional, for assets)

```bash
npx wrangler r2 bucket create connexe-assets
```

### 5. Configure environment variables

Copy `.env.example` to `.env` and set your ingest secret:

```bash
cp .env.example .env
```

Edit `.env`:

```
NUXT_CONNEXE_INGEST_SECRET=your-secret-key-here
```

### 6. Update wrangler.jsonc

Ensure your `wrangler.jsonc` has the correct bindings:

```jsonc
{
  "vectorize": [
    {
      "binding": "CONNEXE_CONTENT_VECTOR_INDEX",
      "index_name": "connexe-content-index",
    },
    {
      "binding": "CONNEXE_DEVELOPER_VECTOR_INDEX",
      "index_name": "connexe-developer-index",
    },
  ],
  "kv_namespaces": [
    {
      "binding": "CONTENT_STORE",
      "id": "YOUR_KV_NAMESPACE_ID",
    },
  ],
}
```

## Development

```bash
bun run dev
```

> **Note:** Vectorize and AI bindings require remote access. You'll see warnings about this in local dev.

## API Endpoints

### Ingest Content

```
POST /api/injest/content
Header: x-connexe-ingest-secret: <your-secret>
Body: [{ id, title, description, url, tags, lang, category }]
```

### Ingest Developers

```
POST /api/injest/developer
Header: x-connexe-ingest-secret: <your-secret>
Body: [{ id, name, avatar, intro, skills, github, lang }]
```

> **Note:** Content and developer IDs must be **64 bytes or less** due to Cloudflare Vectorize limitations. Keep IDs short and descriptive (e.g., `layered-architecture-nuxt-part-1` instead of `a-layered-architecture-for-nuxt-fullstack-applications-part-1-server-side`).

### Get Content Recommendations

```
GET /api/recommend/content?topic=<topic>&limit=5&lang=en
```

### Get Developer Recommendations

```
GET /api/recommend/developer?skills=vue,typescript&limit=5&lang=en
```

## Deployment

```bash
bun run build
npx wrangler deploy
```

## Widgets

Embed Connexe widgets on your site:

```html
<script src="https://cdn.connexe.dev/widget.js"></script>

<!-- Article recommendations -->
<connexe-article topic="Vue routing"></connexe-article>

<!-- Developer spotlight -->
<connexe-dev skills="vue,typescript"></connexe-dev>
```

## License

MIT
