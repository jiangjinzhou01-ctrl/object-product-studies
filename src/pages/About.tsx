import { ArrowUpRight } from 'lucide-react';
import { Media } from '../components/Media';
import { Eyebrow, ArrowLink } from '../components/UI';
import { disclaimerEn, disclaimerZh } from '../data/site';
export default function About() {
  return (
    <>
      <section className="about-intro wrap">
        <Eyebrow>ABOUT OBJECT / EDITION 02</Eyebrow>
        <h1>
          一件日常。
          <br />
          很多值得追问的事。
        </h1>
        <div className="about-opening">
          <span className="overline">DESIGN + ENGINEERING</span>
          <p>
            OBJECT
            是一本可以交互的产品观察手册。以真实产品为起点，用编辑设计、摄影与前端工程，重新组织我们看待科技的方式。
          </p>
        </div>
      </section>
      <section className="about-image wrap">
        <Media id="phone-17-detail" priority sizes="100vw" />
        <p className="media-caption">观察从细节开始 / iPhone 17 官方产品图</p>
      </section>
      <section className="about-principles wrap">
        <div>
          <Eyebrow>THE POINT OF VIEW</Eyebrow>
          <h2>
            少一点喧哗。
            <br />
            多一点理解。
          </h2>
        </div>
        <div>
          {[
            ['01', '产品先于效果', '让真实硬件、可核查的数据与内容的阅读顺序，决定页面的构图。'],
            ['02', '交互帮助选择', '比较、图集、工作流切换与滚动叙事，都应给出清晰的状态和结果。'],
            [
              '03',
              '细节构成体验',
              '键盘操作、减少动态效果、移动端顺序与图片尺寸预留，同样属于设计。',
            ],
          ].map(([n, title, body]) => (
            <article key={n}>
              <span className="overline">{n}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="case-section" id="engineering">
        <div className="wrap">
          <div className="case-heading">
            <Eyebrow light>BEHIND THE EXPERIENCE</Eyebrow>
            <h2>
              从观察，
              <br />
              到一个完整的网站。
            </h2>
          </div>
          <div className="case-rows">
            {[
              [
                '研究',
                'Apple 官方技术规格与发布资料形成事实层。每个型号拥有独立数据记录、来源 URL 和核查日期。',
              ],
              [
                '视觉',
                '中性色调与清晰网格建立秩序；产品颜色只在局部成为主角。首页、手机和电脑章节拥有各自的叙事节奏。',
              ],
              [
                '工程',
                'React、严格 TypeScript、Vite 与路由拆分。规格、摄影来源与比较逻辑独立于页面布局。',
              ],
              [
                '响应式',
                '桌面用留白与并置建立关系；移动端重新安排阅读顺序，保留完整功能。图像以实际宽度生成响应式版本。',
              ],
              [
                '验证',
                'Playwright 覆盖导航、比较、图集、工作流、七种视口与可访问性。生产构建通过 GitHub Actions 发布至 Pages。',
              ],
            ].map(([title, body], i) => (
              <div key={title}>
                <span className="overline">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <a
            className="button button-light"
            href={
              import.meta.env.VITE_SOURCE_REPOSITORY ||
              'https://github.com/jiangjinzhou01-ctrl/object-product-studies'
            }
            target="_blank"
            rel="noreferrer"
          >
            查看完整源代码
            <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
      <section className="independence wrap">
        <Eyebrow>INDEPENDENCE, CLEARLY STATED</Eyebrow>
        <h2>独立观察，独立表达。</h2>
        <p>{disclaimerZh}</p>
        <p lang="en">{disclaimerEn}</p>
        <p>
          产品名称用于事实说明，官方产品图与摄影作品的版权归各自权利人。设计、文案与工程由本作品独立完成。这里不提供购买、支付或账号登录服务。
        </p>
        <ArrowLink to="/credits">查看影像与信息来源</ArrowLink>
      </section>
    </>
  );
}
