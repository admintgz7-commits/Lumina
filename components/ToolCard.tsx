import Link from 'next/link';

interface Tool {
  id: string; name: string; tagline: string; logo: string;
  badge?: string; badgeLabel?: string; apiReady?: boolean;
  tags: string[]; priceType: string; priceDetails?: string;
}

function BadgeHtml({ tool }: { tool: Tool }) {
  if (!tool.badge) return null;
  const cls: Record<string, string> = { best: 'badge-best', new: 'badge-new', api: 'badge-api' };
  return <span className={`badge ${cls[tool.badge] || ''}`}>{tool.badgeLabel || tool.badge}</span>;
}

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/outil/${tool.id}`} className="card tool-card">
      <div className="tool-card-header">
        <img src={tool.logo} alt={tool.name} className="tool-logo" loading="lazy" />
        <div className="tool-meta">
          <div className="tool-name">{tool.name}</div>
          <div className="tool-tagline">{tool.tagline}</div>
        </div>
        <BadgeHtml tool={tool} />
      </div>
      <div className="tool-tags">
        {tool.tags.map((t, i) => <span key={i} className="tool-tag">{t}</span>)}
      </div>
      <div className="tool-card-footer">
        <span className="tool-price">{tool.priceType}</span>
        <span className="tool-price" style={{ color: 'var(--ink)' }}>{tool.priceDetails || 'Sur devis'}</span>
      </div>
    </Link>
  );
}
