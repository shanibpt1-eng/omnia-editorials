# Omnia Content Intelligence (OCI) — Deployment & Security Verification

**Target Domain:** `intelligence.omniastores.com`  
**Location:** `/oci-platform`  
**Purpose:** Standalone, isolated blogs and content distribution platform for Omnia Stores.

---

## 1. System Architecture & Component Verification

| Component | Path | Status | Verification |
|---|---|---|---|
| **Shared Core & Security** | `packages/shared` | **PASSED** | AES-256-GCM Vault & SSRF protection tested via Vitest |
| **Database & Schema** | `packages/database` | **PASSED** | Prisma schema, multi-tenancy models, and in-memory repository compiled |
| **Integrations & Adapters** | `packages/integrations` | **PASSED** | Headless blog syndicator, draft safeguard, and AEO sampler tested |
| **Worker Queue Engine** | `apps/worker` | **PASSED** | BullMQ processor for AEO scans and syndication tested |
| **Modular REST API** | `apps/api` | **PASSED** | Versioned `/api/v1` routes with zero-tampering guarantees tested |
| **Executive Dashboard** | `apps/web` | **PASSED** | Next.js 15 Tailwind UI built successfully |

---

## 2. Zero-Storefront Tampering Guarantee

The primary requirement is that OCI functions as a **standalone publishing and content spreading engine** that **does not touch or interfere with the live ecommerce website (`omniastores.com` / `omniastores.ae`)**:
1. **Decoupled Architecture**: All article generation, SEO audits, and media publishing occur within `intelligence.omniastores.com`.
2. **Headless Magazine Syndication**: Content is broadcast to the dedicated editorial network (`the-omnia-edit.com` or custom headless subdomains) with high-equity backlinks linking back to `omniastores.com` products and luxury bridal collections.
3. **Draft-First Shopify Safeguard**: Direct Shopify publishing requires explicit organization credentials and is hardcoded to stage articles as `isPublished: false` (Drafts), preventing unapproved changes to live storefronts.

---

## 3. Production Deployment via Docker Compose

```bash
cd oci-platform

# 1. Configure environment variables
cp .env.example .env
# Edit .env with your master encryption key and API credentials

# 2. Launch production stack
docker compose up -d --build

# 3. Verify services
docker compose ps
curl https://intelligence.omniastores.com/api/v1/health
```

---

## 4. Backup & Disaster Recovery Runbook

### PostgreSQL Database Backup
```bash
docker exec -t oci-postgres pg_dump -U oci_admin oci_production | gzip > oci_backup_$(date +%Y%m%d_%H%M%S).sql.gz
```

### PostgreSQL Database Restore
```bash
gunzip < oci_backup_20261021.sql.gz | docker exec -i oci-postgres psql -U oci_admin -d oci_production
```
