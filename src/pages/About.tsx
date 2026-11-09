import { sourceRepository } from '../data/site';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Eyebrow, ArrowLink } from '../components/UI';
export default function About() {
  return (
    <div className="about-page">
      <section className="wrap about-hero">
        <Eyebrow>THE THINKING BEHIND OBJECT</Eyebrow>
        <h1>
          观察物品。
          <br />
          <span>也观察设计本身。</span>
        </h1>
        <div className="about-hero-bottom">
          <span className="mono">
            DESIGN + ENGINEERING
            <br />
            INDEPENDENT CASE STUDY / 2026
          </span>
          <p>
            OBJECT / Product Studies
            是一个独立产品体验研究。从产品事实与摄影许可开始，探索编辑设计、交互叙事与前端工程如何共同构成一次完整体验。
          </p>
        </div>
      </section>
      <section className="about-system dark">
        <div className="wrap">
          <Eyebrow light>01 / DESIGN FOUNDATION</Eyebrow>
          <div className="about-system-grid">
            <h2>
              秩序，让产品
              <br />
              成为主角。
            </h2>
            <div>
              <p>
                以瑞士平面设计的网格、现代杂志的节奏和消费科技的精度为出发点。采用独立的 OBJECT
                字标、橙色索引与中英文字体层级，不使用 Apple 的标志或专有字体。
              </p>
              <div className="palette">
                <span style={{ background: '#f5f5f3', color: '#151515' }}>
                  PAPER
                  <br />
                  #F5F5F3
                </span>
                <span style={{ background: '#151515' }}>
                  INK
                  <br />
                  #151515
                </span>
                <span style={{ background: '#b83d20' }}>
                  INDEX
                  <br />
                  #B83D20
                </span>
              </div>
              <p className="caption">
                Inter Variable / 系统中文字体 · 12 栏网格 · 统一间距、缓动与时长 Token
              </p>
            </div>
          </div>
          <div className="type-specimen">
            Aa<span>物</span>
            <span className="mono">
              FORM FOLLOWS
              <br />
              UNDERSTANDING.
            </span>
          </div>
        </div>
      </section>
      <section className="case-sections wrap">
        <article>
          <span className="mono">02 / CONTENT & RESEARCH</span>
          <div>
            <h2>先确认真实，再决定表达。</h2>
            <p>
              产品参数取自 Apple
              技术规格与发布新闻稿，以结构化数据保存来源和核实日期。摄影仅采用许可清晰的真实照片，公开作者、许可与修改记录。
            </p>
            <p>
              M6 未取得可靠授权实拍；Air M5 候选照片包含范围不明的生成式清理。因此 Mac 研究采用 14
              英寸 MacBook Pro M5 与 MacBook Air M4 实拍型号。页面名称与照片型号保持一致。
            </p>
            <Link to="/credits">查看研究与许可索引 ↗</Link>
          </div>
        </article>
        <article>
          <span className="mono">03 / INFORMATION ARCHITECTURE</span>
          <div>
            <h2>从发现，到深入，再到选择。</h2>
            <p>
              首页建立编辑视角，分类页解释型号关系，两条产品故事以不同叙事呈现细节。比较工具将同类别规格并排，文章补充设计观察，来源索引提供事实入口。
            </p>
            <div className="architecture-map">
              <span>首页</span>
              <span>iPhone / Mac 分类</span>
              <span>产品故事 / 技术观察</span>
              <span>比较 / 来源</span>
            </div>
          </div>
        </article>
        <article>
          <span className="mono">04 / INTERACTION SYSTEM</span>
          <div>
            <h2>每一次交互，都有内容上的理由。</h2>
            <p>
              iPhone 使用 Sticky 摄影与分章文字联动，Mac
              则以横向工作流、独立的接口索引和显示章节建立工程叙事。外观切换只提供有真实对应照片的选项，不模拟
              360°。
            </p>
            <p>
              比较支持型号替换、清除、差异过滤、重置与链接分享。选择保存在 URL
              中，刷新后可恢复。移动导航利用原生 dialog 实现焦点约束、ESC 关闭与滚动锁定。
            </p>
          </div>
        </article>
        <article id="engineering">
          <span className="mono">05 / FRONTEND ARCHITECTURE</span>
          <div>
            <h2>内容、状态、界面，各司其职。</h2>
            <p>
              React + 严格 TypeScript +
              Vite。产品数据采用类别判别联合类型，摄影元数据独立维护。React Router
              按页面加载模块；Hash 路由使 GitHub Pages 的深层链接与刷新可靠工作。
            </p>
            <p>
              CSS 变量维护视觉与运动系统；IntersectionObserver 处理可见性与章节状态。动画主要使用
              opacity、transform，不依赖持续的全局滚动事件。
            </p>
            {sourceRepository ? (
              <a href={sourceRepository} target="_blank" rel="noreferrer">
                查看完整源代码 <ArrowUpRight size={14} />
              </a>
            ) : (
              <Link to="/compare">
                体验产品比较工具 <ArrowUpRight size={14} />
              </Link>
            )}
          </div>
        </article>
        <article>
          <span className="mono">06 / RESPONSIVE & PERFORMANCE</span>
          <div>
            <h2>小屏幕，同样值得认真设计。</h2>
            <p>
              移动端重新安排标题、摄影和信息顺序；长篇粘性叙事转为更紧凑的阅读节奏。比较表在独立区域横向滚动，页面本身保持稳定。
            </p>
            <p>
              原始照片转换为 480 / 960 / 1600 像素 WebP，配合
              srcset、sizes、尺寸预留、首图优先与非首屏懒加载。字体本地托管。prefers-reduced-motion
              关闭非必要的转场和滚动动画。
            </p>
          </div>
        </article>
        <article>
          <span className="mono">07 / VALIDATION & NEXT STEPS</span>
          <div>
            <h2>用可验证的结果，衡量完成度。</h2>
            <p>
              项目包含类型检查、ESLint、生产构建、Playwright 端到端流程、axe
              可访问性与七档视口检查。实际执行结果与截图记录在仓库
              docs/qa-results.md，未测项目会明确标示。
            </p>
            <p>
              后续方向：取得自主拍摄的多角度设备照片、补充更多配置与型号、开展真实用户任务测试，并在真实移动硬件上复核滚动流畅度。
            </p>
          </div>
        </article>
      </section>
      <section className="independence wrap">
        <Eyebrow>INDEPENDENT BY DESIGN</Eyebrow>
        <h2>
          一份作品。
          <br />
          一个独立视角。
        </h2>
        <p>
          Independent product experience concept. Unofficial design and engineering portfolio
          project. Not affiliated with or endorsed by Apple Inc.
        </p>
        <p>
          独立产品体验概念作品，仅用于个人设计与工程作品集展示，与 Apple Inc.
          无隶属、赞助或认可关系。
        </p>
        <ArrowLink to="/" solid>
          回到研究首页
        </ArrowLink>
      </section>
    </div>
  );
}
