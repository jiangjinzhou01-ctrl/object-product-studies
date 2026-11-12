import { ArrowUpRight } from 'lucide-react';
import { Eyebrow } from '../components/UI';
import { Media } from '../components/Media';
import { mediaAssets } from '../data/media';
import { products } from '../data/products';
export default function Credits() {
  return (
    <div className="credits-page wrap">
      <div className="document-heading">
        <Eyebrow>SOURCES & CREDITS</Eyebrow>
        <h1>
          每个细节，
          <br />
          都有出处。
        </h1>
        <p>
          产品信息来自 Apple
          官方技术资料与新闻稿。图像来自对应产品的官方新闻稿与技术支持资料，已本地处理为响应式
          WebP。
        </p>
      </div>
      <section className="source-disclosure">
        <h2>关于图像的使用</h2>
        <p>
          本版依用户要求采用 Apple 新闻稿与技术支持公开媒体素材。版权归 Apple Inc.，并非 Creative
          Commons
          或公共领域；本站未获得单独授权，不将个人、非商用用途视为自动授权。每张图像保留公开来源与版权说明。页面中的裁切不改变设备设计或颜色。
        </p>
        <p>官方产品图与拍摄样张均明确区分。主观设计观察是本站原创文字，技术参数以来源为准。</p>
      </section>
      <section className="reference-section">
        <div className="section-head">
          <h2>产品资料</h2>
          <span className="overline">FACT CHECK</span>
        </div>
        {products.map((p) => (
          <article key={p.id} className="reference-row">
            <h3>{p.name}</h3>
            <div>
              {p.referenceSources.map((s) => (
                <a key={s.id} href={s.url} target="_blank" rel="noreferrer">
                  <span>
                    {s.title}
                    <small>核查日期 {s.verifiedAt}</small>
                  </span>
                  <ArrowUpRight size={17} />
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>
      <section className="asset-section">
        <div className="section-head">
          <h2>影像索引</h2>
          <span className="overline">{mediaAssets.length} ORIGINAL ASSETS</span>
        </div>
        <div className="credit-grid">
          {mediaAssets.map((a, i) => (
            <article key={a.id} id={a.id}>
              <Media id={a.id} sizes="(max-width:760px) 100vw, 30vw" />
              <span className="overline">
                FIG. {String(i + 1).padStart(2, '0')} / {a.author}
              </span>
              <h3>{a.alt}</h3>
              <p>{a.license}</p>
              <div>
                <a href={a.source} target="_blank" rel="noreferrer">
                  原始页面
                  <ArrowUpRight size={14} />
                </a>
                <a href={a.originalUrl} target="_blank" rel="noreferrer">
                  原始图像
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="type-credits">
        <h2>字体与图标</h2>
        <p>
          Inter Variable · SIL Open Font License 1.1。中文采用系统字体回退。Lucide 图标 · ISC
          License。原创代码 · MIT。第三方图像不适用代码许可。
        </p>
        <a href={import.meta.env.BASE_URL + 'licenses/Inter-OFL.txt'}>Inter 字体许可</a>
      </section>
    </div>
  );
}
