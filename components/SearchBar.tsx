'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ outils }: { outils: any[] }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.length < 2) { setResults([]); setOpen(false); return; }
    const q = query.toLowerCase();
    const found = outils.filter((o: any) =>
      o.name?.toLowerCase().includes(q) ||
      o.tagline?.toLowerCase().includes(q) ||
      o.tags?.some((t: string) => t.toLowerCase().includes(q)) ||
      o.category?.toLowerCase().includes(q)
    ).slice(0, 6);
    setResults(found);
    setOpen(true);
  }, [query, outils]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
      <div style={{ position: 'relative' }}>
        <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: .4 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Rechercher un outil IA…"
          style={{ width: '100%', padding: '11px 16px 11px 40px', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', font: 'inherit', fontSize: '14px', background: 'var(--surface)', transition: 'border-color .15s', outline: 'none' }}
          onFocus={() => results.length > 0 && setOpen(true)}
        />
      </div>

      {open && results.length > 0 && (
        <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', zIndex: 200, overflow: 'hidden' }}>
          {results.map((o: any) => (
            <button
              key={o.id}
              onClick={() => { router.push(`/outil/${o.id}`); setOpen(false); setQuery(''); }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderBottom: '1px solid var(--border)', background: 'none', cursor: 'pointer', textAlign: 'left', font: 'inherit', transition: 'background .1s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              <img src={o.logo} alt={o.name} style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover', border: '1px solid var(--border)', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)' }}>{o.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--ink-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.tagline}</div>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--ink-light)', flexShrink: 0 }}>{o.priceType}</span>
            </button>
          ))}
          <button
            onClick={() => { router.push(`/outils`); setOpen(false); }}
            style={{ width: '100%', padding: '10px 16px', fontSize: '12px', color: 'var(--accent)', fontWeight: 600, background: 'var(--surface-2)', border: 'none', cursor: 'pointer', textAlign: 'center', font: 'inherit' }}
          >
            Voir tous les résultats →
          </button>
        </div>
      )}

      {open && results.length === 0 && query.length >= 2 && (
        <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', zIndex: 200, padding: '16px', fontSize: '13px', color: 'var(--ink-muted)', textAlign: 'center' }}>
          Aucun résultat pour « {query} »
        </div>
      )}
    </div>
  );
}
