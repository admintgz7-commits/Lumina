import Link from 'next/link';

interface Article {
  slug: string; title: string; coverPhoto: string; coverAlt?: string;
  sectorLabel: string; date?: string; readTime: string;
}

export default function BlogCard({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.slug}`} className="card blog-card">
      <img src={article.coverPhoto} alt={article.coverAlt || article.title} className="blog-card-img" loading="lazy" />
      <div className="blog-card-body">
        <div className="blog-card-label">{article.sectorLabel}</div>
        <div className="blog-card-title">{article.title}</div>
        <div className="blog-card-meta">
          <span>{article.date || ''}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
