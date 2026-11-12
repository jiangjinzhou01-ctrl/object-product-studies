import { useParams, Link } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { stories } from '../data/stories';
import { Media } from '../components/Media';
import { Eyebrow } from '../components/UI';
import NotFound from './NotFound';
export default function Article() {
  const { slug } = useParams(),
    story = stories.find((s) => s.slug === slug);
  if (!story) return <NotFound />;
  const next = stories.find((s) => s.slug !== slug)!;
  return (
    <article className="article-page">
      <header className="article-heading wrap">
        <Link className="text-link" to="/">
          <ArrowLeft size={16} />
          回到 OBJECT
        </Link>
        <Eyebrow>
          {story.category} / {story.readTime}
        </Eyebrow>
        <h1>{story.title}</h1>
        <p>{story.teaser}</p>
        <div className="article-byline">
          <span>OBJECT EDITORIAL</span>
          <span>独立设计观察 · 2026</span>
        </div>
      </header>
      <div className="article-image wrap">
        <Media id={story.media} priority sizes="90vw" />
      </div>
      <div className="article-body">
        <p className="article-lead">{story.intro}</p>
        {story.sections.map((s, i) => (
          <section key={s.title}>
            <span className="overline">0{i + 1}</span>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </section>
        ))}
        <aside>
          <span className="overline">REFERENCE</span>
          <p>本文为独立编辑观察。涉及的技术事实可在官方资料中核查。</p>
          <a href={story.source} target="_blank" rel="noreferrer" className="text-link">
            查看官方技术资料
            <ArrowUpRight size={16} />
          </a>
        </aside>
        <Link className="next-article" to={'/journal/' + next.slug}>
          <span className="overline">NEXT READING</span>
          <strong>{next.title}</strong>
          <ArrowUpRight />
        </Link>
      </div>
    </article>
  );
}
