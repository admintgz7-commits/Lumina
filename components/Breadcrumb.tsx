import Link from 'next/link';

interface Crumb { label: string; href?: string; }

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Fil d'ariane" style={{ marginBottom: '24px' }}>
      <ol style={{ display: 'flex', alignItems: 'center', gap: '6px', listStyle: 'none', fontSize: '13px', color: 'var(--ink-muted)', flexWrap: 'wrap' }}>
        {crumbs.map((c, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {i > 0 && <span style={{ opacity: .4 }}>›</span>}
            {c.href && i < crumbs.length - 1
              ? <Link href={c.href} style={{ color: 'var(--ink-muted)', transition: 'color .15s' }} className="breadcrumb-link">{c.label}</Link>
              : <span style={{ color: i === crumbs.length - 1 ? 'var(--ink)' : 'var(--ink-muted)', fontWeight: i === crumbs.length - 1 ? 600 : 400 }}>{c.label}</span>
            }
          </li>
        ))}
      </ol>
    </nav>
  );
}
