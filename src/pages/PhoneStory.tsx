import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import FinishViewer from '../components/FinishViewer';
import { SceneMedia } from '../components/SceneMedia';
import { ArrowLink, Metric, CompareEntry } from '../components/UI';
import Specifications from '../components/Specifications';
import CameraStudy from '../components/CameraStudy';
import { phones } from '../data/phones';
import { ImageViewer } from '../components/ImageViewer';
import { useNarrative } from '../hooks/useNarrative';
const chapters = [
  {
    number: '01',
    label: '机身设计',
    title: '铝金属一体成型。',
    body: '铝金属一体式机身，将镜头区域与机身连接成一个完整的形体。轮廓的转折、光的落点，让一件熟悉的物品呈现新的表情。',
    media: 'phone-pro-hero',
    caption: '酒红色 iPhone 18 Pro 与 Pro Max 官方合照',
  },
  {
    number: '02',
    label: '镜头系统',
    title: '四档可变光圈。',
    body: '三枚 4800 万像素 Fusion 相机，从广阔风景到近处纹理，提供不同的观察方式。主摄的可变光圈，为进光与景深增加一份主动控制。',
    media: 'phone-pro-landscape',
    caption: 'Apple 发布的 iPhone 18 Pro 拍摄样张；画面效果受拍摄条件影响',
  },
  {
    number: '03',
    label: '表面与颜色',
    title: '四款机身配色。',
    body: '黑色与银色沿用中性色调，冰川蓝色与勃艮第酒红色则延伸到镜头平台与边框。',
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
  const [narrativePhoto, setNarrativePhoto] = useState(chapters[0].media);
  const [galleryPhoto, setGalleryPhoto] = useState(gallery[0].media);
  const currentChapter =
    chapters.find((chapter) => chapter.media === narrativePhoto) ?? chapters[0];
  const currentGallery = gallery.find((item) => item.media === galleryPhoto) ?? gallery[0];
  return (
    <>
      <nav className="product-nav" aria-label="iPhone 18 Pro 章节">
        <Link to="/iphone">iPhone 18 Pro</Link>
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
      <FinishViewer />
      <section
        className="metrics-row wrap"
        data-reveal="stagger"
        aria-label="iPhone 18 Pro 核心规格"
      >
        <Metric value="A20 Pro" label="芯片" />
        <Metric value="48MP" label="三枚 Fusion 相机" />
        <Metric value="6.3″" label="Super Retina XDR" note="按标准矩形测量，实际可视区域较小" />
        <Metric value="120Hz" label="ProMotion 最高刷新率" />
      </section>
      <div ref={container} className="phone-narrative wrap" id="design">
        <div className="narrative-visual">
          <div className="narrative-stage">
            <SceneMedia id={chapters[active].media} onPresent={setNarrativePhoto} />
          </div>
          <p className="media-caption">{currentChapter.caption}</p>
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
            <article key={c.number} data-chapter={i} data-reveal="heading">
              <p className="exhibit-label">{c.label}</p>
              <h2>{c.title}</h2>
              <p>{c.body}</p>
              {i === 2 && (
                <div className="finish-labels">
                  {product.availableFinishes.map((f) => (
                    <span key={f.name}>
                      <i style={{ background: f.hex }} />
                      {f.label ?? f.name}
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
        <div className="section-head" data-reveal="heading">
          <div>
            <h2>产品与影像图集</h2>
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
          <SceneMedia
            id={gallery[slide].media}
            sizes="(max-width:760px) 100vw, 85vw"
            onPresent={setGalleryPhoto}
          />
          <ImageViewer id={currentGallery.media} label={currentGallery.caption} />
        </div>
        <div className="gallery-foot">
          <div className="gallery-tabs" role="group" aria-label="产品图集">
            {gallery.map((g, i) => (
              <button key={g.media} aria-pressed={slide === i} onClick={() => setSlide(i)}>
                {g.label}
              </button>
            ))}
          </div>
          <p aria-live="polite">{currentGallery.caption}</p>
        </div>
      </section>
      <section className="chip-note wrap" id="performance" data-reveal="stagger">
        <div className="chip-type" aria-label="A20 Pro">
          A20
          <br />
          <em>Pro.</em>
        </div>
        <div>
          <p className="exhibit-label">处理器</p>
          <h2>影像背后的计算。</h2>
          <p>6 核 CPU 与 7 核 GPU，承担影像处理、游戏图形和其他应用的计算任务。</p>
          <ArrowLink to="#specifications">查看硬件信息</ArrowLink>
        </div>
      </section>
      <Specifications product={product} />
      <CompareEntry />
    </>
  );
}
