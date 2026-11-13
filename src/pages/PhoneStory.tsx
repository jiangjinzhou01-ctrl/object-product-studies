import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Media } from '../components/Media';
import { Eyebrow, ArrowLink, Metric, CompareEntry } from '../components/UI';
import Specifications from '../components/Specifications';
import CameraStudy from '../components/CameraStudy';
import { phones } from '../data/phones';
import { mediaUrl } from '../data/media';
import { useNarrative } from '../hooks/useNarrative';
const chapters = [
  {
    number: '01',
    label: 'FORM',
    title: '从轮廓，到触感。',
    body: '铝金属一体式机身，将镜头区域与机身连接成一个完整的形体。轮廓的转折、光的落点，让一件熟悉的物品呈现新的表情。',
    media: 'phone-pro-hero',
    caption: '酒红色 iPhone 18 Pro 与 Pro Max 官方合照',
  },
  {
    number: '02',
    label: 'PERSPECTIVE',
    title: '让目光，多一层自由。',
    body: '三枚 4800 万像素 Fusion 相机，从广阔风景到近处纹理，提供不同的观察方式。主摄的可变光圈，为进光与景深增加一份主动控制。',
    media: 'phone-pro-landscape',
    caption: 'Apple 发布的 iPhone 18 Pro 拍摄样张；画面效果受拍摄条件影响',
  },
  {
    number: '03',
    label: 'FINISH',
    title: '色彩，是另一种表达。',
    body: '黑色、银色、冰川色与酒红色。相同的轮廓，因表面与光线，形成各自的气质。选一种与你的日常相处的颜色。',
    media: 'phone-pro-finishes',
    caption: '四款官方配色合照：Black / Silver / Glacier / Burgundy',
  },
];
const gallery = [
  { media: 'phone-pro-hero', label: '正面与背面', caption: '酒红色 iPhone 18 Pro 与 Pro Max 合照' },
  { media: 'phone-pro-finishes', label: '四款配色', caption: 'iPhone 18 Pro 系列官方配色合照' },
  { media: 'phone-pro-lowlight', label: '影像样张', caption: 'Apple 公布的低光样张，非本站拍摄' },
];
export default function PhoneStory() {
  const product = phones[0],
    { container, active } = useNarrative();
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const next = new Image();
    next.src = mediaUrl(gallery[(slide + 1) % gallery.length].media);
  }, [slide]);
  return (
    <>
      <nav className="product-nav" aria-label="iPhone 18 Pro 章节">
        <Link to="/iphone">
          iPhone <span>/ 18 Pro</span>
        </Link>
        <div>
          <Link to="#design">设计</Link>
          <Link to="#camera">影像</Link>
          <Link to="#gallery">图集</Link>
          <Link to="#specifications">技术规格</Link>
          <Link className="mini-button" to="/compare">
            比较
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </nav>
      <section className="phone-intro">
        <div className="wrap phone-intro-grid">
          <div className="phone-intro-copy">
            <Eyebrow light>设计与影像，进一步。</Eyebrow>
            <h1>iPhone 18 Pro.</h1>
            <p>把光，握在手里。</p>
            <Link className="text-link light-link" to="#design">
              从设计开始
              <ArrowDown size={16} />
            </Link>
          </div>
          <Media
            id="phone-pro-hero"
            priority
            className="phone-intro-photo"
            sizes="(max-width:760px) 100vw, 70vw"
          />
          <span className="media-caption">iPhone 18 Pro 与 Pro Max / 官方产品图</span>
        </div>
      </section>
      <section className="metrics-row wrap" aria-label="iPhone 18 Pro 核心规格">
        <Metric value="A20 Pro" label="核心，向前一步" />
        <Metric value="48MP" label="三枚 Fusion 相机" />
        <Metric value="6.3″" label="Super Retina XDR" note="按标准矩形测量，实际可视区域较小" />
        <Metric value="120Hz" label="ProMotion 最高刷新率" />
      </section>
      <div ref={container} className="phone-narrative wrap" id="design">
        <div className="narrative-visual">
          <div className={'narrative-stage ' + (active === 1 ? 'landscape-stage' : '')}>
            <Media id={chapters[active].media} key={active} />
            <span className="narrative-count">
              0{active + 1}
              <span> / 03</span>
            </span>
          </div>
          <p className="media-caption">{chapters[active].caption}</p>
          <div
            className="narrative-progress"
            role="progressbar"
            aria-label="当前设计章节"
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuenow={active + 1}
          >
            {chapters.map((c, i) => (
              <span key={c.number} className={active === i ? 'active' : ''} />
            ))}
          </div>
        </div>
        <div className="narrative-chapters">
          {chapters.map((c, i) => (
            <article key={c.number} data-chapter={i}>
              <span className="overline">
                {c.number} / {c.label}
              </span>
              <h2>{c.title}</h2>
              <p>{c.body}</p>
              {i === 2 && (
                <div className="finish-labels">
                  {product.availableFinishes.map((f) => (
                    <span key={f.name}>
                      <i style={{ background: f.hex }} />
                      {f.name}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
      <CameraStudy source={product.referenceSources[1].url} />
      <section className="gallery-section wrap" id="gallery">
        <div className="section-head">
          <div>
            <span className="overline">TAKE ANOTHER LOOK</span>
            <h2>换个视角，再看一次。</h2>
          </div>
          <div className="gallery-controls">
            <button
              className="icon-button"
              aria-label="上一张产品图"
              onClick={() => setSlide((slide + gallery.length - 1) % gallery.length)}
            >
              <ChevronLeft />
            </button>
            <span>
              {slide + 1} / {gallery.length}
            </span>
            <button
              className="icon-button"
              aria-label="下一张产品图"
              onClick={() => setSlide((slide + 1) % gallery.length)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        <div className="gallery-stage">
          <Media key={slide} id={gallery[slide].media} sizes="(max-width:760px) 100vw, 85vw" />
        </div>
        <div className="gallery-foot">
          <div className="gallery-tabs" role="group" aria-label="产品图集">
            {gallery.map((g, i) => (
              <button key={g.media} aria-pressed={slide === i} onClick={() => setSlide(i)}>
                {g.label}
              </button>
            ))}
          </div>
          <p aria-live="polite">{gallery[slide].caption}</p>
        </div>
      </section>
      <section className="chip-note wrap">
        <div className="chip-type" aria-label="A20 Pro">
          A20
          <br />
          <em>Pro.</em>
        </div>
        <div>
          <Eyebrow>COMPUTE / CREATE / REPEAT</Eyebrow>
          <h2>
            好的性能，
            <br />
            让创作少一分等待。
          </h2>
          <p>
            6 核 CPU 与 7 核
            GPU，为图像处理、游戏与日常任务提供计算基础。性能的意义，在于你想做的事能够顺利发生。
          </p>
          <ArrowLink to="#specifications">查看硬件信息</ArrowLink>
        </div>
      </section>
      <Specifications product={product} />
      <CompareEntry />
    </>
  );
}
