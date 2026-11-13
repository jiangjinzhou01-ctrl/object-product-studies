import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Media } from '../components/Media';
import { Eyebrow, ArrowLink, Metric } from '../components/UI';
import Specifications from '../components/Specifications';
import { macs } from '../data/macs';
import { mediaUrl } from '../data/media';
import { handleTabKey } from '../lib/tabs';
const workflows = [
  {
    id: 'motion',
    label: '动态影像',
    app: 'ADOBE AFTER EFFECTS',
    title: '让时间线上的想法，流动起来。',
    body: '从分层合成到动画编排，把你的工作放进更完整的画面。M6 的 12 核 CPU 与 12 核 GPU，是这张创作桌面的计算基础。',
    media: 'mac-pro-motion',
  },
  {
    id: 'design',
    label: '视觉设计',
    app: 'PIXELMATOR PRO',
    title: '从一层像素，到完整表达。',
    body: '组织图层，调整色彩，反复打磨细节。Liquid Retina XDR 显示屏支持 P3 广色域，为视觉工作提供清晰的观察空间。',
    media: 'mac-pro-design',
  },
  {
    id: 'code',
    label: '开发构建',
    app: 'XCODE',
    title: '把下一步想法，写成现实。',
    body: '在编辑器、模拟器与文档之间切换。16GB 起的统一内存与 1TB 起的固态硬盘，为项目提供工作空间。',
    media: 'mac-pro-code',
  },
];
const ports = [
  {
    name: 'Thunderbolt 4',
    detail: '三个端口，最高 40Gb/s。连接外置存储、显示器与兼容扩展设备。',
    short: '03 × TB4',
  },
  {
    name: 'HDMI',
    detail: '一个 HDMI 端口，为外接屏幕与演示提供直接连接。具体分辨率和刷新率组合请参阅官方规格。',
    short: '01 × HDMI',
  },
  { name: 'SDXC', detail: 'SDXC 卡插槽。让相机中的素材，进入下一段创作流程。', short: '01 × SDXC' },
  {
    name: 'MagSafe 3',
    detail: '独立磁吸充电接口。另配 3.5 毫米耳机插孔，支持高阻抗耳机。',
    short: 'POWER + AUDIO',
  },
];
export default function MacStory() {
  const product = macs[0],
    [workflow, setWorkflow] = useState(0),
    [port, setPort] = useState(0);
  useEffect(() => {
    const preload = new Image();
    preload.src = mediaUrl(workflows[(workflow + 1) % workflows.length].media);
  }, [workflow]);
  return (
    <>
      <nav className="product-nav" aria-label="MacBook Pro 章节">
        <Link to="/mac">
          MacBook Pro <span>/ M6</span>
        </Link>
        <div>
          <Link to="#workflow">工作流</Link>
          <Link to="#display">显示屏</Link>
          <Link to="#connect">连接</Link>
          <Link to="#specifications">技术规格</Link>
          <Link className="mini-button" to="/compare?type=mac">
            比较
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </nav>
      <section className="mac-intro">
        <div className="wrap">
          <div className="mac-intro-top">
            <Eyebrow>MacBook Pro · M6</Eyebrow>
            <span className="overline">14-INCH / BUILT FOR YOUR IDEAS</span>
          </div>
          <div className="mac-intro-heading">
            <h1>
              MacBook Pro.<span>把想法，推向更远。</span>
            </h1>
            <div>
              <p>
                从第一层画面，到最后一行代码。
                <br />
                专注，让创作自然展开。
              </p>
              <Link className="text-link" to="#workflow">
                进入工作状态
                <ArrowDown size={16} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mac-intro-image">
          <Media id="mac-pro-hero" priority sizes="100vw" />
        </div>
        <div className="mac-intro-foot wrap">
          <span>14.2 英寸 Liquid Retina XDR</span>
          <span>Apple M6 · 12 核 CPU / 12 核 GPU</span>
          <span>1.55 kg</span>
        </div>
      </section>
      <section className="metrics-row wrap" aria-label="MacBook Pro M6 核心规格">
        <Metric value="12 核" label="CPU / Apple M6" />
        <Metric value="12 核" label="GPU / Apple M6" />
        <Metric value="1.55 kg" label="整机重量" />
        <Metric
          value="24 小时"
          label="最长流媒体视频播放"
          note="Apple 实验室测试；实际续航因使用方式而异"
        />
      </section>
      <section className="workflow-section wrap" id="workflow">
        <div className="section-head">
          <div>
            <Eyebrow>01 / IN THE MAKING</Eyebrow>
            <h2>
              你的工作方式，
              <br />
              就是它的打开方式。
            </h2>
          </div>
          <p>
            三种工作场景，同一张桌面。
            <br />
            选择一个方向，看看创作如何展开。
          </p>
        </div>
        <div
          className="workflow-tabs"
          role="tablist"
          aria-label="选择专业工作流"
          onKeyDown={handleTabKey}
        >
          {workflows.map((w, i) => (
            <button
              key={w.id}
              id={'workflow-tab-' + w.id}
              role="tab"
              aria-controls="workflow-panel"
              aria-selected={workflow === i}
              tabIndex={workflow === i ? 0 : -1}
              onClick={() => setWorkflow(i)}
            >
              <span>0{i + 1}</span>
              {w.label}
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
        <div
          id="workflow-panel"
          role="tabpanel"
          aria-labelledby={'workflow-tab-' + workflows[workflow].id}
        >
          <div className="workflow-image">
            <Media key={workflow} id={workflows[workflow].media} sizes="90vw" />
          </div>
          <div className="workflow-description">
            <span className="overline">{workflows[workflow].app}</span>
            <h3>{workflows[workflow].title}</h3>
            <p>{workflows[workflow].body}</p>
          </div>
        </div>
        <p className="media-caption">
          Apple 官方应用场景图。用于说明工作方式，不代表本站进行了应用性能测试。
        </p>
      </section>
      <section className="display-section" id="display">
        <div className="wrap">
          <div className="display-heading">
            <Eyebrow light>02 / THE BIGGER PICTURE</Eyebrow>
            <h2>
              每一处细节，
              <br />
              都值得被看见。
            </h2>
            <p>
              14.2 英寸 Liquid Retina XDR。
              <br />
              从暗部层次，到明亮高光，让画面获得完整的表达。
            </p>
          </div>
          <Media id="mac-pro-display" sizes="90vw" />
          <div className="display-facts">
            <Metric value="1,600 尼特" label="HDR 峰值亮度" />
            <Metric value="120Hz" label="ProMotion 最高刷新率" />
            <Metric value="P3" label="广色域" />
          </div>
          <p className="media-caption">
            HDR 峰值亮度不代表全屏持续亮度；屏幕尺寸按标准矩形测量。详细条件见官方技术规格。
          </p>
        </div>
      </section>
      <section className="ports-section wrap" id="connect">
        <div className="section-head">
          <div>
            <Eyebrow>03 / STAY CONNECTED</Eyebrow>
            <h2>连接，直接一点。</h2>
          </div>
          <p>
            从素材导入，到屏幕延展。
            <br />
            让接口成为工作的一部分。
          </p>
        </div>
        <div className="ports-image">
          <Media id="mac-pro-ports" sizes="90vw" />
          <div className="port-hotspots" role="group" aria-label="点选图中接口">
            {ports.map((p, i) => (
              <button
                key={p.name}
                className={'port-hotspot port-hotspot-' + i}
                aria-label={'选择 ' + p.name + ' 接口'}
                aria-pressed={port === i}
                onClick={() => setPort(i)}
              >
                <span className="hotspot-ring" />
                {port === i && <span className="hotspot-label">{p.name}</span>}
              </button>
            ))}
          </div>
        </div>
        <div className="ports-controls">
          <div role="tablist" aria-label="了解连接接口" onKeyDown={handleTabKey}>
            {ports.map((p, i) => (
              <button
                role="tab"
                id={'port-tab-' + i}
                aria-controls="port-panel"
                aria-selected={port === i}
                tabIndex={port === i ? 0 : -1}
                key={p.name}
                onClick={() => setPort(i)}
              >
                {p.name}
                <span>0{i + 1}</span>
              </button>
            ))}
          </div>
          <div role="tabpanel" id="port-panel" aria-labelledby={'port-tab-' + port}>
            <span className="overline">{ports[port].short}</span>
            <h3>{ports[port].name}</h3>
            <p>{ports[port].detail}</p>
          </div>
        </div>
      </section>
      <Specifications product={product} />
      <section className="next-product wrap">
        <div>
          <Eyebrow>ANOTHER WAY TO WORK</Eyebrow>
          <h2>
            轻一点，
            <br />
            去远一点。
          </h2>
          <p>
            认识配备 M5 的 MacBook Air。
            <br />
            13 与 15 英寸，两种随行的方式。
          </p>
          <ArrowLink to="/mac#macbook-air-13-m5">探索 MacBook Air</ArrowLink>
        </div>
        <Media id="mac-air-pair" />
      </section>
    </>
  );
}
