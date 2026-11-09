import { Media } from '../components/Media';
import { mediaAssets } from '../data/media';
import { products } from '../data/products';
import { Eyebrow } from '../components/UI';
export default function Credits() {
  return (
    <div className="credits-page wrap">
      <div className="page-heading">
        <Eyebrow>THE SOURCE INDEX</Eyebrow>
        <h1>真实，皆有出处。</h1>
        <p>摄影有作者，参数有依据。感谢所有开放分享作品的摄影师。</p>
      </div>
      <section>
        <h2>摄影素材</h2>
        <p className="caption">
          以下照片均获相应许可允许网页展示。仅进行了响应式缩放、WebP
          转换及页面裁切，未生成设备、改变硬件或重新着色。CC BY-SA 衍生图片继续按相同许可提供。
        </p>
        <div className="credit-list">
          {mediaAssets.map((a) => (
            <article id={a.id} key={a.id}>
              <Media id={a.id} />
              <div>
                <span className="mono">{a.id}</span>
                <h3>{a.alt}</h3>
                <p>摄影：{a.author}</p>
                <p>
                  <a href={a.source} target="_blank" rel="noreferrer">
                    Wikimedia Commons 文件页 ↗
                  </a>{' '}
                  ·{' '}
                  <a href={a.licenseUrl} target="_blank" rel="noreferrer">
                    {a.license} ↗
                  </a>
                </p>
                <p className="caption">
                  文件：{a.filename}
                  <br />
                  网页使用：允许 · 署名要求：{a.attributionRequired ? '需要' : '不强制，仍予以署名'}
                  <br />
                  {a.modifications}
                  <br />
                  许可核实：{a.verifiedAt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="credit-sources">
        <h2>产品技术资料</h2>
        {products.map((p) => (
          <article key={p.id}>
            <h3>{p.name}</h3>
            {p.referenceSources.map((s) => (
              <p key={s.id}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.title} ↗
                </a>
                <span className="caption">核实于 {s.verifiedAt}</span>
              </p>
            ))}
          </article>
        ))}
      </section>
      <section className="credit-policy">
        <h2>关于素材选择</h2>
        <p>
          MacBook Pro M6
          已有官方资料，但本项目研究范围内未取得可核验许可的实拍，因此主故事选用实际拍摄的 MacBook
          Pro 14 英寸 M5。MacBook Air M5
          的候选照片含生成式清理元数据且编辑范围未明，因此采用实拍素材明确的 M4
          型号。没有用旧型号照片冒充新型号。
        </p>
        <p>
          照片中的展示桌、连接线或零售标签属于拍摄场景。其价格不用于本项目的产品说明。项目不提供购买渠道。
        </p>
        <h3>字体与图标</h3>
        <p>
          Inter Variable · SIL Open Font License 1.1（本地托管）；中文使用系统字体回退。Lucide Icons
          · ISC License。
        </p>
      </section>
    </div>
  );
}
