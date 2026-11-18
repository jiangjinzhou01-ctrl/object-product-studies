import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, ChevronRight } from 'lucide-react';
import { Media } from '../components/Media';
import { SceneMedia } from '../components/SceneMedia';
import { ImageViewer } from '../components/ImageViewer';
import { ArrowLink, Metric } from '../components/UI';
import Specifications from '../components/Specifications';
import { macs } from '../data/macs';
import { handleTabKey } from '../lib/tabs';

const workflows = [
  {
    id: 'motion',
    label: '动态影像',
    app: 'Adobe After Effects',
    title: '画面在时间线上成形。',
    body: '在合成、时间线与预览之间查看图层和关键帧。M6 配有 12 核 CPU 和 12 核 GPU，应用的实际表现随项目而变。',
    media: 'mac-pro-motion',
  },
  {
    id: 'design',
    label: '视觉设计',
    app: 'Pixelmator Pro',
    title: '在同一块屏幕上看色彩与细节。',
    body: '画布旁可以保留图层和调色工具。Liquid Retina XDR 支持 P3 广色域，为需要观察色彩和明暗层次的工作提供显示空间。',
    media: 'mac-pro-design',
  },
  {
    id: 'code',
    label: '开发构建',
    app: 'Xcode',
    title: '把代码和它的结果并排放。',
    body: '在编辑器旁预览应用。统一内存从 16GB 起，固态硬盘从 1TB 起，选型时可按项目的内存与存储需求比较。',
    media: 'mac-pro-code',
  },
] as const;

const ports = [
  {
    name: 'Thunderbolt 4',
    detail: '三个端口，最高 40Gb/s。连接外置存储、显示器与兼容扩展设备。',
    short: '3 个端口',
  },
  {
    name: 'HDMI',
    detail: '一个 HDMI 端口，为外接屏幕与演示提供直接连接。分辨率与刷新率组合见官方规格。',
    short: '外接显示',
  },
  {
    name: 'SDXC',
    detail: '通过 SDXC 卡插槽直接导入相机中的照片和视频。',
    short: '卡槽',
  },
  {
    name: 'MagSafe 3',
    detail: '独立磁吸充电接口。机身还配有支持高阻抗耳机的 3.5 毫米插孔。',
    short: '电源',
  },
];

function Workbench() {
  const [workflow, setWorkflow] = useState(0);
  const [presented, setPresented] = useState<string>(workflows[0].media);
  const visibleWorkflow = workflows.find((item) => item.media === presented) ?? workflows[0];

  return (
    <section className="workflow-section workbench wrap" id="workflow">
      <div className="section-head" data-reveal="heading">
        <div>
          <p className="exhibit-label">专业应用</p>
          <h2>工作台的三种打开方式。</h2>
        </div>
      </div>
      <div className="workbench-layout">
        <div
          className="workbench-tabs"
          role="tablist"
          aria-label="选择专业工作流"
          onKeyDown={handleTabKey}
        >
          {workflows.map((item, index) => (
            <button
              key={item.id}
              id={'workflow-tab-' + item.id}
              aria-label={item.label}
              role="tab"
              aria-controls="workflow-panel"
              aria-selected={workflow === index}
              tabIndex={workflow === index ? 0 : -1}
              onClick={() => setWorkflow(index)}
            >
              <span>
                {item.label}
                <small>{item.app}</small>
              </span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div
          id="workflow-panel"
          role="tabpanel"
          aria-labelledby={'workflow-tab-' + workflows[workflow].id}
        >
          <div className="workflow-image">
            <SceneMedia
              id={workflows[workflow].media}
              sizes="(max-width:760px) 94vw, 69vw"
              onPresent={setPresented}
            />
            <ImageViewer
              id={visibleWorkflow.media}
              label={visibleWorkflow.app + ' · MacBook Pro'}
            />
          </div>
          <div className="workbench-caption" key={presented} data-scene-copy>
            <p className="exhibit-label">{visibleWorkflow.app}</p>
            <h3>{visibleWorkflow.title}</h3>
            <p>{visibleWorkflow.body}</p>
          </div>
        </div>
      </div>
      <p className="media-caption">Apple 官方应用场景图。具体应用性能与项目和配置有关。</p>
    </section>
  );
}

export default function MacStory() {
  const product = macs[0];
  const [port, setPort] = useState(0);

  return (
    <div className="mac-story">
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
      <section className="mac-plate wrap">
        <div className="mac-plate-heading" data-reveal="heading">
          <div>
            <p className="exhibit-label">14 英寸 · M6</p>
            <h1>
              MacBook Pro<em>.</em>
            </h1>
          </div>
          <div>
            <p>屏幕、性能和接口，怎样在一台便携的设备里组成工作台。</p>
            <Link className="text-link" to="#workflow">
              进入工作流
              <ArrowDown size={16} />
            </Link>
          </div>
        </div>
        <div className="mac-plate-visual">
          <Media id="mac-pro-front" priority sizes="(max-width:760px) 91vw, 850px" />
          <ImageViewer id="mac-pro-front" label="MacBook Pro M6 · 官方产品图" />
        </div>
        <div className="mac-plate-caption">
          <span>14.2 英寸 Liquid Retina XDR</span>
          <span>深空黑色与银色</span>
        </div>
      </section>

      <section
        className="metrics-row wrap"
        data-reveal="stagger"
        aria-label="MacBook Pro M6 核心规格"
      >
        <Metric value="12 核" label="CPU / Apple M6" />
        <Metric value="12 核" label="GPU / Apple M6" />
        <Metric value="1.55 kg" label="整机重量" />
        <Metric
          value="24 小时"
          label="最长流媒体视频播放"
          note="Apple 实验室测试，实际续航视使用情况而定"
        />
      </section>

      <Workbench />

      <section className="display-section display-study" id="display">
        <div className="wrap">
          <div className="display-study-heading" data-reveal="heading">
            <div>
              <p className="exhibit-label">Liquid Retina XDR</p>
              <h2>
                明与暗，
                <br />
                都清楚可见。
              </h2>
            </div>
            <p>屏幕支持 P3 广色域与最高 120Hz 的 ProMotion 自适应刷新率。</p>
          </div>
          <Media id="mac-pro-display" sizes="90vw" reveal="image" />
          <div className="display-facts" data-reveal="stagger">
            <Metric value="1,600 尼特" label="HDR 峰值亮度" />
            <Metric value="120Hz" label="ProMotion 最高刷新率" />
            <Metric value="P3" label="广色域" />
          </div>
          <p className="media-caption">
            亮度为 HDR 峰值。屏幕尺寸按标准矩形测量，详细条件见官方规格。
          </p>
        </div>
      </section>
      <section className="ports-section wrap" id="connect">
        <div className="section-head" data-reveal="heading">
          <div>
            <p className="exhibit-label">机身两侧</p>
            <h2>接口，逐个看。</h2>
          </div>
          <p>点选机身上的位置，查看接口用途。</p>
        </div>
        <div className="ports-image">
          <Media id="mac-pro-ports" sizes="90vw" />
          <div className="port-hotspots" role="group" aria-label="点选图中接口">
            {ports.map((item, index) => (
              <button
                key={item.name}
                className={'port-hotspot port-hotspot-' + index}
                aria-label={'选择 ' + item.name + ' 接口'}
                aria-pressed={port === index}
                onClick={() => setPort(index)}
              >
                <span className="hotspot-ring" />
                {port === index && <span className="hotspot-label">{item.name}</span>}
              </button>
            ))}
          </div>
        </div>
        <div className="ports-controls">
          <div role="tablist" aria-label="了解连接接口" onKeyDown={handleTabKey}>
            {ports.map((item, index) => (
              <button
                role="tab"
                id={'port-tab-' + index}
                aria-controls="port-panel"
                aria-selected={port === index}
                tabIndex={port === index ? 0 : -1}
                key={item.name}
                onClick={() => setPort(index)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div role="tabpanel" id="port-panel" aria-labelledby={'port-tab-' + port}>
            <div key={port} data-scene-copy>
              <span className="overline">{ports[port].short}</span>
              <h3>{ports[port].name}</h3>
              <p>{ports[port].detail}</p>
            </div>
          </div>
        </div>
      </section>
      <Specifications product={product} />
      <section className="next-product wrap">
        <div>
          <p className="exhibit-label">MacBook Air · M5</p>
          <h2>更轻的选择。</h2>
          <p>13 与 15 英寸两种尺寸，采用无风扇设计。</p>
          <ArrowLink to="/mac#macbook-air-13-m5">探索 MacBook Air</ArrowLink>
        </div>
        <Media id="mac-air-pair" reveal="image" />
      </section>
    </div>
  );
}
