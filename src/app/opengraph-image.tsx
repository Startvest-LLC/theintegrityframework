import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'The Integrity Framework Directory — a trust signal for sub-enterprise AI tools.';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#1e293b',
          color: '#f1f5f9',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 18,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#94a3b8',
            fontWeight: 600,
          }}
        >
          theintegrityframework.org
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.05,
              color: '#ffffff',
              maxWidth: 1000,
            }}
          >
            A trust signal for sub-enterprise AI tools, where SOC 2 does not apply.
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              color: '#cbd5e1',
              maxWidth: 1000,
              lineHeight: 1.4,
            }}
          >
            A public directory of products evaluated against the Integrity Framework v1.0.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#94a3b8',
            fontSize: 18,
          }}
        >
          <div style={{ display: 'flex', gap: 24 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  display: 'flex',
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: '#b87333',
                }}
              />
              Bronze
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  display: 'flex',
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: '#a3afbd',
                }}
              />
              Silver
            </span>
          </div>
          <div style={{ display: 'flex' }}>Published by Startvest LLC</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
