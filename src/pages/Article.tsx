import { Link, useParams } from 'react-router-dom';
import { stories } from '../data/stories';
import { Media } from '../components/Media';
import { Eyebrow, ArrowLink } from '../components/UI';
import NotFound from './NotFound';
export default function Article() {
  const { slug } = useParams();
  const story = stories.find((s) => s.slug === slug);
  if (!story) return <NotFound />;
  return (
    <article className="article-page">
      <div className="wrap article-heading">
        <Link className="text-link" to="/">
          ← 返回研究首页
        </Link>
        <Eyebrow>
          {story.category} / {story.readTime}
        </Eyebrow>
        <h1>{story.title}</h1>
        <p>{story.teaser}</p>
        <span className="mono">OBJECT EDITORIAL · 2026.11.09</span>
      </div>
      <Media id={story.media} className="article-cover" priority credit />
      <div className="article-body">
        <p className="article-lead">{story.intro}</p>
        {story.sections.map((s, i) => (
          <section key={s.title}>
            <span className="mono">0{i + 1}</span>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </section>
        ))}
        <div className="editorial-note">
          <p>本文为 OBJECT 原创设计观察，并非 Apple 官方宣传文案。技术事实核实于 2026-11-09。</p>
          <a href={story.source} target="_blank" rel="noreferrer">
            阅读 Apple 技术来源 ↗
          </a>
        </div>
        <ArrowLink to="/iphone/iphone-18-pro" solid>
          继续探索 iPhone 18 Pro
        </ArrowLink>
      </div>
    </article>
  );
}
