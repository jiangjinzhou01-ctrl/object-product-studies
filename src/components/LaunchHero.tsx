import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';
import { filmPoster, filmSources, posterSizes, productFilm } from '../data/homeHero';
import { SceneMedia } from './SceneMedia';

type Playback = 'poster' | 'loading' | 'playing' | 'paused' | 'ended' | 'error';

export default function LaunchHero() {
  const stage = useRef<HTMLElement>(null);
  const film = useRef<HTMLVideoElement>(null);
  const autoPlayed = useRef(false);
  const [readyPoster, setReadyPoster] = useState('');
  const [playback, setPlayback] = useState<Playback>('poster');

  const play = useCallback((automatic: boolean) => {
    const video = film.current;
    if (!video) return;
    const version = productFilm.versions.find((entry) => matchMedia(entry.media).matches)!;
    const src = import.meta.env.BASE_URL + 'assets/film/' + version.file;
    if (video.getAttribute('src') !== src || video.error) video.src = src;
    if (video.ended) video.currentTime = 0;
    setPlayback('loading');
    void video.play().catch((error: Error) => {
      if (film.current === video && error.name !== 'AbortError') {
        setPlayback(automatic && error.name === 'NotAllowedError' ? 'poster' : 'error');
      }
    });
  }, []);

  useEffect(() => {
    const element = stage.current;
    const video = film.current;
    if (!element || !video || !readyPoster) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    const breakpoints = filmSources.map((source) => matchMedia(source.media));
    function reset() {
      if (!video) return;
      video.pause();
      video.removeAttribute('src');
      video.load();
      setPlayback('poster');
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.pause();
        else if (
          entry.intersectionRatio >= 0.45 &&
          !autoPlayed.current &&
          !video.hasAttribute('src') &&
          !reduced.matches &&
          !breakpoints[0].matches &&
          !connection?.saveData &&
          !document.hidden
        ) {
          autoPlayed.current = true;
          play(true);
        }
      },
      { threshold: [0, 0.45] },
    );
    function visibility() {
      if (document.hidden) video?.pause();
    }
    observer.observe(element);
    reduced.addEventListener('change', reset);
    breakpoints.forEach((query) => query.addEventListener('change', reset));
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      reduced.removeEventListener('change', reset);
      breakpoints.forEach((query) => query.removeEventListener('change', reset));
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [play, readyPoster]);

  const canPause = playback === 'playing' || playback === 'loading';
  const label = canPause
    ? '暂停产品短片'
    : playback === 'ended'
      ? '重播产品短片'
      : playback === 'paused'
        ? '继续播放产品短片'
        : playback === 'error'
          ? '重试产品短片'
          : '播放产品短片';
  return (
    <>
      <aside className="portfolio-ribbon">
        <p>
          独立产品体验概念作品，仅用于设计与工程作品集展示。{' '}
          <Link to="/about">
            关于本项目
            <ChevronRight size={14} aria-hidden="true" />
          </Link>
        </p>
      </aside>
      <section className="launch-hero film-hero" ref={stage} aria-labelledby="launch-title">
        <div className="film-image" id="film-stage">
          <SceneMedia
            id={filmPoster}
            sources={filmSources}
            sizes={posterSizes}
            priority
            onPresent={setReadyPoster}
          />
          <video
            ref={film}
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            data-show={playback === 'playing' || playback === 'paused'}
            onPlaying={() => setPlayback('playing')}
            onPause={(event) => {
              if (!event.currentTarget.ended && event.currentTarget.hasAttribute('src'))
                setPlayback('paused');
            }}
            onEnded={() => setPlayback('ended')}
            onError={() => setPlayback('error')}
          />
        </div>
        <div className="film-layout">
          <div className="film-title">
            <h1 id="launch-title">iPhone 18 Pro</h1>
            <p>Pro 级影像</p>
          </div>
          <div className="film-actions">
            <p>
              A20 Pro 芯片
              <br />
              4800 万像素融合式主摄
            </p>
            <Link
              className="primary-action"
              to="/iphone/iphone-18-pro"
              aria-label="探索 iPhone 18 Pro"
            >
              深入了解
            </Link>
          </div>
        </div>
        <button
          type="button"
          className="film-control"
          aria-label={label}
          title={label}
          aria-controls="film-stage"
          disabled={!readyPoster}
          onClick={() => {
            if (canPause) film.current?.pause();
            else play(false);
          }}
        >
          {canPause ? (
            <Pause size={17} fill="currentColor" />
          ) : playback === 'ended' || playback === 'error' ? (
            <RotateCcw size={19} />
          ) : (
            <Play size={17} fill="currentColor" />
          )}
        </button>
        {playback === 'error' && (
          <p className="film-error" role="status">
            短片未能加载，可点按重试。
          </p>
        )}
      </section>
    </>
  );
}
