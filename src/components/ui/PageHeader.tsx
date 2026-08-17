'use client';

import React from 'react';

interface PageHeaderProps {
  category?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  statusCluster?: React.ReactNode;
}

export function PageHeader({
  category = 'NovaID · NICRS',
  title,
  subtitle,
  actions,
  statusCluster
}: PageHeaderProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '10.5px', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--ink-label)', marginBottom: '4px' }}>
            {category}
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '30px', fontWeight: 500, letterSpacing: '-0.2px', margin: 0, color: 'var(--ink)' }}>
            {title}
          </h1>
        </div>

        {actions && <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>{actions}</div>}
      </div>

      {(subtitle || statusCluster) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginTop: '2px' }}>
          {subtitle && (
            <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--ink-muted)', maxWidth: '720px' }}>
              {subtitle}
            </p>
          )}
          {statusCluster && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{statusCluster}</div>}
        </div>
      )}
    </div>
  );
}
