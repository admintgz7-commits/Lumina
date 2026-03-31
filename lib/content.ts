import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

function readJSON(filePath: string) {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf-8')); } catch { return null; }
}

function normalizeTags(arr: any[], key = 'tag'): string[] {
  if (!arr || !Array.isArray(arr)) return [];
  return arr.map(item => {
    if (typeof item === 'string') return item;
    if (typeof item === 'object' && item[key]) return item[key];
    return String(item);
  });
}

export function getAllOutils() {
  const dir = path.join(CONTENT_DIR, 'outils');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.json')).map(f => {
    const data = readJSON(path.join(dir, f));
    if (!data) return null;
    return { ...data, id: data.identifiant || data.id, tags: normalizeTags(data.tags || []), features: normalizeTags(data.features || [], 'feature'), useCases: normalizeTags(data.useCases || [], 'useCase'), sector: Array.isArray(data.sector) ? data.sector : [data.sector].filter(Boolean) };
  }).filter(Boolean);
}

export function getOutilById(id: string) { return getAllOutils().find((o: any) => o.id === id) || null; }
export function getAllOutilTags(): string[] { const s = new Set<string>(); getAllOutils().forEach((o: any) => o.tags?.forEach((t: string) => s.add(t))); return Array.from(s).sort(); }
export function getAllCategories(): string[] { const s = new Set<string>(); getAllOutils().forEach((o: any) => { if (o.category) s.add(o.category); }); return Array.from(s).sort(); }

export function getAllArticles() {
  const dir = path.join(CONTENT_DIR, 'articles');
  if (!fs.existsSync(dir)) return [];
  const months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  const parseDate = (d: string) => { if (!d) return 0; const p = d.split(' '); return (parseInt(p[1]) || 2026) * 100 + months.indexOf(p[0]); };
  return fs.readdirSync(dir).filter(f => f.endsWith('.json')).map(f => {
    const data = readJSON(path.join(dir, f));
    if (!data) return null;
    return { ...data, tags: normalizeTags(data.tags || []), sections: data.sections || [] };
  }).filter(Boolean).sort((a: any, b: any) => parseDate(b.date) - parseDate(a.date));
}

export function getArticleBySlug(slug: string) { return getAllArticles().find((a: any) => a.slug === slug) || null; }
export function getAllArticleTags(): string[] { const s = new Set<string>(); getAllArticles().forEach((a: any) => a.tags?.forEach((t: string) => s.add(t))); return Array.from(s).sort(); }

export function getAllSecteurs() {
  const dir = path.join(CONTENT_DIR, 'secteurs');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.json')).map(f => readJSON(path.join(dir, f))).filter(Boolean);
}

export function getSecteurById(id: string) { return getAllSecteurs().find((s: any) => s.id === id) || null; }

export function getAllSelections() {
  const dir = path.join(CONTENT_DIR, 'selections');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.json')).map(f => readJSON(path.join(dir, f))).filter(Boolean);
}

export function getSelectionBySlug(slug: string) { return getAllSelections().find((s: any) => s.slug === slug) || null; }

export function getGlossaire() {
  const data = readJSON(path.join(CONTENT_DIR, 'glossaire', 'glossaire.json'));
  if (!data) return { terms: [] };
  return { ...data, terms: (data.terms || []).sort((a: any, b: any) => a.term.localeCompare(b.term, 'fr')) };
}

export function getHomePage() { return readJSON(path.join(CONTENT_DIR, 'pages', 'home.json')) || {}; }
export function getSiteSettings() { return readJSON(path.join(CONTENT_DIR, 'pages', 'settings.json')) || {}; }
export function getFaqPage() { return readJSON(path.join(CONTENT_DIR, 'pages', 'faq.json')) || { faqs: [] }; }
export function getEquipePage() { return readJSON(path.join(CONTENT_DIR, 'pages', 'equipe.json')) || {}; }
