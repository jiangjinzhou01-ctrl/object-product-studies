import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Check } from 'lucide-react';
import { phones } from '../data/phones';
import { Media } from '../components/Media';
import { mediaUrl } from '../data/media';
import { Eyebrow, ArrowLink, CompareEntry } from '../components/UI';
import Specifications from '../components/Specifications';
import { useNarrative } from '../hooks/useNarrative';
const product = phones[0];
const chapters = [
  {
    label: '01 / INDUSTRIAL DESIGN',
    title: '每一次握持，\n都是设计的起点。',
    body: '一体式铝金属机身，连接镜头平台与机身轮廓。把目光从屏幕移开，看材料如何共同构成一件随身物品。',
    media: 'iphone-18-pro-black',
    stat: 'Aluminum',
    note: '铝金属一体式设计',
  },
  {
    label: '02 / CAMERA SYSTEM',
    title: '光，有了\n更多表达。',
    body: '48MP Fusion 主摄引入可变光圈，从 ƒ/1.48 到 ƒ/4.0。摄影的选择，始于进光量与景深之间。超广角与长焦镜头，延伸取景的可能。',
    media: 'iphone-18-pro-rear',
    stat: '48MP',
    note: '三枚 Fusion 后置相机',
  },
  {
    label: '03 / DISPLAY',
    title: '让内容，\n自然发生。',
    body: '6.3 英寸 Super Retina XDR OLED 显示屏，支持最高 120Hz 的 ProMotion 自适应刷新率。从阅读到滚动，每一次操作都与内容连贯相接。',
    media: 'iphone-18-pro-glacier',
    stat: '120Hz',
    note: 'ProMotion 自适应刷新率上限',
  },
];
export default function PhoneStory() {
  const { container, active } = useNarrative();
  const [finish, setFinish] = useState(product.availableFinishes[0]);
  const available = product.availableFinishes.filter((f) => f.mediaId);
  const select = (f: typeof finish) => {
    if (f.mediaId) {
      const img = new Image();
      img.src = mediaUrl(f.mediaId);
      void img.decode().catch(() => {});
    }
    setFinish(f);
  };
  return (
    <>
      <div className="product-subnav wrap">
        <Link to="/iphone">
          iPhone / <strong>18 Pro</strong>
        </Link>
        <div>
          <Link to="#design">设计</Link>
          <Link to="#finishes">外观</Link>
          <Link to="#specifications">技术规格</Link>
          <Link to="/compare?type=iphone">比较 ↗</Link>
        </div>
      </div>
      <section className="phone-hero dark">
        <div className="wrap phone-hero-grid">
          <div>
            <Eyebrow light>OBJECT STUDY 01 / 2026</Eyebrow>
            <p className="product-name">iPhone 18 Pro</p>
            <h1>
              Close to
              <br />
              extraordinary<span>.</span>
            </h1>
            <p className="hero-chinese">把目光，留给细节。</p>
            <Link to="#design" className="scroll-cue">
              向下探索 <ArrowDown size={16} />
            </Link>
          </div>
          <Media id={product.heroMedia} priority className="phone-hero-media" credit />
        </div>
        <div className="wrap hero-baseline">
          <span>一体式铝金属 / A20 Pro / 48MP Fusion</span>
          <span className="mono">A STUDY IN EVERYDAY PRECISION</span>
        </div>
      </section>
      <section className="phone-intro wrap" data-reveal>
        <span className="mono">FORM. FEELING. FUNCTION.</span>
        <h2>
          技术的进步，
          <br />
          最终回到手中的感受。
        </h2>
        <p>
          我们从实物出发，观察 iPhone 18 Pro 的材质、影像与显示。这里的文字是 OBJECT
          的独立编辑表达；硬件信息以 Apple 技术资料为依据。
        </p>
      </section>
      <div ref={container} id="design" className="narrative wrap">
        <div className="narrative-visual">
          <div className="narrative-frames">
            {chapters.map((c, i) => (
              <Media key={c.media} id={c.media} className={active === i ? 'is-active' : ''} />
            ))}
          </div>
          <div className="narrative-progress" aria-label={`当前章节 ${active + 1}，共 3 章`}>
            {chapters.map((c, i) => (
              <span key={c.label} className={active === i ? 'active' : ''}>
                {String(i + 1).padStart(2, '0')}
              </span>
            ))}
            <span>SCROLL TO OBSERVE ↓</span>
          </div>
        </div>
        <div className="narrative-copy">
          {chapters.map((c, i) => (
            <section key={c.label} data-chapter={i} className={active === i ? 'active' : ''}>
              <span className="mono">{c.label}</span>
              <h2>{c.title}</h2>
              <p>{c.body}</p>
              <div className="chapter-stat">
                {c.stat}
                <span>{c.note}</span>
              </div>
              <a
                className="source-inline"
                href={product.referenceSources[0].url}
                target="_blank"
                rel="noreferrer"
              >
                Apple 技术来源 ↗
              </a>
            </section>
          ))}
        </div>
      </div>
      <section id="finishes" className="finish-section">
        <div className="wrap finish-grid">
          <div className="finish-image">
            <Media key={finish.name} id={finish.mediaId!} credit />
            <span className="finish-caption mono">
              {finish.name.toUpperCase()} / REAL PHOTOGRAPH
            </span>
          </div>
          <div>
            <Eyebrow>MATERIAL & FINISH</Eyebrow>
            <h2>
              触感之外。
              <br />
              个性之内。
            </h2>
            <p>
              四种官方外观：Black、Silver、Glacier、Burgundy。这里提供两种有对应实拍的外观观察。
            </p>
            <fieldset className="finish-options">
              <legend>选择实拍外观</legend>
              {available.map((f) => (
                <label key={f.name} className={finish.name === f.name ? 'selected' : ''}>
                  <input
                    type="radio"
                    name="finish"
                    value={f.name}
                    checked={finish.name === f.name}
                    onChange={() => select(f)}
                  />
                  <span className="swatch" style={{ background: f.hex }}>
                    {finish.name === f.name && <Check size={14} />}
                  </span>
                  {f.name}
                </label>
              ))}
            </fieldset>
            <p className="caption" role="status">
              当前：{finish.name} · {finish.name === 'Glacier' ? '正面视角' : '背面视角'}
              <br />
              不同拍摄光线下，实物颜色可能存在差异。
            </p>
          </div>
        </div>
      </section>
      <section className="silicon-section dark">
        <div className="wrap silicon-grid">
          <div className="chip-object" aria-label="A20 Pro 芯片文字示意，非芯片照片">
            <span className="mono">APPLE SILICON</span>
            <strong>
              A20<span>Pro</span>
            </strong>
            <span className="mono">CHIP ARCHITECTURE / TYPE STUDY</span>
          </div>
          <div data-reveal>
            <Eyebrow light>PERFORMANCE IN CONTEXT</Eyebrow>
            <h2>
              看不见的性能。
              <br />
              感受得到的从容。
            </h2>
            <p>
              A20 Pro 配备 6 核 CPU、7 核 GPU 与 Dual 16 核 Neural
              Engine。性能应放在真实任务中理解，而非脱离使用条件的百分比。
            </p>
            <div className="inline-stats">
              <div>
                <strong>
                  6<span>核</span>
                </strong>
                <span>CPU</span>
              </div>
              <div>
                <strong>
                  7<span>核</span>
                </strong>
                <span>GPU</span>
              </div>
            </div>
            <a
              className="source-inline"
              href={product.referenceSources[0].url}
              target="_blank"
              rel="noreferrer"
            >
              查看官方芯片资料 ↗
            </a>
          </div>
        </div>
      </section>
      <Specifications product={product} />
      <CompareEntry />
      <section className="next-study wrap">
        <span className="mono">CONTINUE THE COLLECTION</span>
        <h2>视线，从手掌延伸到桌面。</h2>
        <ArrowLink to="/mac" solid>
          探索 Mac 研究
        </ArrowLink>
      </section>
    </>
  );
}
