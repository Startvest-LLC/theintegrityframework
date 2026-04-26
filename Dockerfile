# syntax=docker/dockerfile:1
#
# theintegrityframework — Azure App Service Docker image
# Mirrors adacompliancedocs's production-hardened pattern, slimmed down:
#   - Static directory: no Chromium, no DB driver, no MDX runtime reads
#   - ENTRYPOINT (not CMD) — Azure cannot override ENTRYPOINT
#   - Pre-built .next standalone output copied from build context
#   - FULL node_modules from deps stage (standalone tracing is incomplete)

# ============================================
# Stage 1: Install dependencies (Alpine/musl)
# ============================================
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./

RUN if [ -f package-lock.json ]; then \
      npm ci --omit=optional --no-audit --no-fund; \
    else \
      npm install --omit=optional --no-audit --no-fund; \
    fi

# ============================================
# Stage 2: Production runner (packaging only)
# ============================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"
ENV NODE_OPTIONS="--max-old-space-size=512"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Pre-built standalone output (built on CI runner, not inside Docker)
COPY --chown=nextjs:nodejs .next/standalone ./

# Drop standalone's traced node_modules (incomplete + wrong libc), use the deps stage instead
RUN rm -rf ./node_modules

COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

COPY --chown=nextjs:nodejs .next/static ./.next/static

COPY --chown=nextjs:nodejs public ./public

# Listings JSON is read at build time (zod parse) and statically baked into pages.
# Copying at runtime is unnecessary; left out intentionally.

COPY --chown=nextjs:nodejs entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh && chown nextjs:nodejs /app/entrypoint.sh

USER nextjs

EXPOSE 8080

STOPSIGNAL SIGTERM

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "const h=require('http');h.get('http://localhost:8080/api/health',(r)=>{process.exit(r.statusCode===200?0:1)}).on('error',()=>process.exit(1))"

# CRITICAL: ENTRYPOINT not CMD — Azure startup command cannot override this
ENTRYPOINT ["/app/entrypoint.sh"]
