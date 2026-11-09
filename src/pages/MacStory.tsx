import { handleTabKey } from '../lib/tabs';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Code2, Film, PenTool, ArrowUpRight } from 'lucide-react';
import { macs } from '../data/macs';
import { Media } from '../components/Media';
import { Eyebrow, ArrowLink, CompareEntry } from '../components/UI';
import Specifications from '../components/Specifications';
const product = macs[0];
const workflows = [
  {
    name: '构建',
    icon: Code2,
    title: '从一行代码，到完整想法。',
    body: 'M5 的 10 核 CPU 与统一内存，构成编写、调试与多任务工作的硬件基础。选择内存与存储时，让项目规模、工具链和本地数据决定配置。',
    label: 'CODE / COMPILE / ITERATE',
    stat: '10',
    unit: '核 CPU',
  },
  {
    name: '剪辑',
    icon: Film,
    title: '把创作，放在时间线上。',
    body: '媒体引擎支持 H.264、HEVC、ProRes 与 ProRes RAW 硬件加速。剪辑体验取决于素材编码、分辨率和项目复杂度；芯片只是工作流的一部分。',
    label: 'CAPTURE / EDIT / EXPORT',
    stat: 'ProRes',
    unit: '硬件加速',
  },
  {
    name: '设计',
    icon: PenTool,
    title: '在细节与全局之间，自由切换。',
    body: 'Liquid Retina XDR 支持 P3 广色域与 ProMotion。可连接外部显示器，为设计画布与参考资料安排独立空间。色彩工作仍需正确的应用与显示设置。',
    label: 'OBSERVE / DESIGN / REFINE',
    stat: 'P3',
    unit: '广色域',
  },
];
const ports = [
  {
    name: 'Thunderbolt 4',
    detail: '3 个 USB-C 接口，支持 Thunderbolt 4 与 USB4，数据传输速率最高 40Gb/s。',
    number: '03',
  },
  { name: 'HDMI', detail: '独立 HDMI 接口，用于连接兼容的显示器与视频设备。', number: '01' },
  { name: 'SDXC', detail: 'SDXC 卡槽，帮助照片与视频素材从存储卡进入工作流。', number: '01' },
  { name: 'MagSafe 3', detail: '磁吸充电接口，让 Thunderbolt 端口保留给其他设备。', number: '01' },
  { name: '3.5mm', detail: '3.5mm 耳机插孔，支持高阻抗耳机。', number: '01' },
];
export default function MacStory() {
  const [flow, setFlow] = useState(0);
  const [port, setPort] = useState(0);
  const active = workflows[flow];
  return (
    <>
      <div className="product-subnav wrap">
        <Link to="/mac">
          Mac / <strong>MacBook Pro</strong>
        </Link>
        <div>
          <Link to="#workflow">工作流</Link>
          <Link to="#display">显示屏</Link>
          <Link to="#connections">连接</Link>
          <Link to="#specifications">规格</Link>
        </div>
      </div>
      <section className="mac-hero wrap">
        <div className="mac-hero-top">
          <Eyebrow>OBJECT STUDY 02 / MACBOOK PRO M5</Eyebrow>
          <span className="mono">14 INCHES. A WORLD OF POSSIBILITIES.</span>
        </div>
        <div className="mac-hero-heading">
          <h1>
            Space for
            <br />
            <span>what’s next.</span>
          </h1>
          <div>
            <p>
              为想法，
              <br />
              留出更大空间。
            </p>
            <Link to="#workflow" className="scroll-cue">
              进入工作流 <ArrowDown size={16} />
            </Link>
          </div>
        </div>
        <div className="mac-hero-photo">
          <Media id={product.heroMedia} priority credit sizes="100vw" />
          <span className="mac-photo-label mono">MACBOOK PRO / 14″ / M5 / SPACE BLACK</span>
          <div className="mac-photo-title">
            A studio.
            <br />
            Wherever you are.
          </div>
        </div>
        <div className="mac-hero-foot mono">
          <span>14.2″ LIQUID RETINA XDR</span>
          <span>APPLE M5</span>
          <span>DESIGNED FOR THE WORK IN BETWEEN.</span>
        </div>
      </section>
      <section id="workflow" className="workflow-section wrap">
        <div className="workflow-heading">
          <Eyebrow>01 / A WORKFLOW IN THREE ACTS</Eyebrow>
          <h2>
            你的创作方式。
            <br />
            你的工作空间。
          </h2>
        </div>
        <div className="workflow-layout">
          <div
            className="workflow-controls"
            role="tablist"
            onKeyDown={handleTabKey}
            aria-label="选择工作流"
          >
            {workflows.map((w, i) => (
              <button
                key={w.name}
                role="tab"
                id={`workflow-tab-${i}`}
                aria-selected={flow === i}
                tabIndex={flow === i ? 0 : -1}
                aria-controls="workflow-content"
                onClick={() => setFlow(i)}
              >
                <span className="mono">0{i + 1}</span>
                <w.icon size={21} />
                <span>{w.name}</span>
                <ArrowUpRight size={18} />
              </button>
            ))}
          </div>
          <div
            className="workflow-content"
            id="workflow-content"
            role="tabpanel"
            aria-labelledby={`workflow-tab-${flow}`}
          >
            <span className="mono">{active.label}</span>
            <h3>{active.title}</h3>
            <p>{active.body}</p>
            <div className="workflow-stat">
              <strong>{active.stat}</strong>
              <span>{active.unit}</span>
            </div>
            <a
              className="source-inline"
              href={product.referenceSources[0].url}
              target="_blank"
              rel="noreferrer"
            >
              核对官方技术资料 ↗
            </a>
          </div>
        </div>
      </section>
      <section className="mac-display dark" id="display">
        <div className="wrap">
          <div className="display-heading">
            <Eyebrow light>02 / WINDOW TO YOUR WORK</Eyebrow>
            <h2>
              每一寸，
              <br />
              都为专注。
            </h2>
            <p>
              Liquid Retina XDR。
              <br />
              让视野，成为想法的一部分。
            </p>
          </div>
          <div className="display-photo">
            <Media id={product.heroMedia} />
            <span className="display-size">
              14.2<span>″</span>
            </span>
          </div>
          <div className="display-facts">
            <div>
              <span className="mono">RESOLUTION</span>
              <strong>3024 × 1964</strong>
              <p>原生分辨率</p>
            </div>
            <div>
              <span className="mono">ADAPTIVE REFRESH</span>
              <strong>
                120<span>Hz</span>
              </strong>
              <p>ProMotion 刷新率上限</p>
            </div>
            <div>
              <span className="mono">PEAK HDR</span>
              <strong>
                1600<span>nits</span>
              </strong>
              <p>HDR 内容峰值亮度</p>
            </div>
          </div>
          <p className="caption">
            尺寸按标准矩形测量，实际可视区域较小。峰值 HDR 亮度适用于 HDR 内容。照片展示真实 M5
            机型，画面中的零售标签不构成当前价格信息。
          </p>
        </div>
      </section>
      <section className="mac-performance wrap">
        <div className="performance-heading">
          <Eyebrow>03 / APPLE SILICON</Eyebrow>
          <h2>
            有实力。
            <br />
            也有持续创作的余地。
          </h2>
        </div>
        <div className="performance-grid">
          <div className="performance-graphic">
            <span className="mono">APPLE SILICON / TYPOGRAPHIC STUDY</span>
            <strong>
              M5
              <span>
                10-CORE CPU
                <br />
                10-CORE GPU
              </span>
            </strong>
            <div className="memory-lines" aria-hidden="true">
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
            <span className="caption">芯片文字与结构示意，非硬件照片。</span>
          </div>
          <div>
            <h3>配置，围绕你的任务选择。</h3>
            <p>
              16GB、24GB 或 32GB 统一内存；512GB 至 4TB SSD
              选项。这里的容量是可配置范围，实际可选组合以 Apple 技术资料为准。
            </p>
            <div className="battery-stat">
              <span className="mono">UP TO / VIDEO STREAMING</span>
              <strong>
                24<span>小时</span>
              </strong>
              <p>Apple 视频流播放测试上限。实际续航因配置、软件与使用方式而异。</p>
            </div>
            <a
              className="source-inline"
              href={product.referenceSources[0].url}
              target="_blank"
              rel="noreferrer"
            >
              查看测试条件与配置 ↗
            </a>
          </div>
        </div>
      </section>
      <section className="ports-section" id="connections">
        <div className="wrap ports-grid">
          <div>
            <Eyebrow>04 / CONNECTION INDEX</Eyebrow>
            <h2>
              连接，
              <br />
              保持直接。
            </h2>
            <p>
              从相机存储卡到外接屏幕，
              <br />
              接口让工作流少一步中转。
            </p>
            <div className="port-detail" role="status" aria-live="polite">
              <strong>
                {ports[port].number}
                <span>× {ports[port].name}</span>
              </strong>
              <p>{ports[port].detail}</p>
            </div>
          </div>
          <div className="port-index" role="group" aria-label="选择接口说明">
            {ports.map((p, i) => (
              <button key={p.name} aria-pressed={port === i} onClick={() => setPort(i)}>
                <span className="mono">0{i + 1}</span>
                <span>{p.name}</span>
                <span>{port === i ? '−' : '＋'}</span>
              </button>
            ))}
            <span className="caption">接口索引，仅用于说明；并非机身位置或比例示意。</span>
          </div>
        </div>
      </section>
      <Specifications product={product} />
      <CompareEntry family="mac" />
      <section className="next-study wrap">
        <span className="mono">ANOTHER PERSPECTIVE</span>
        <h2>把工作空间，带向更广的日常。</h2>
        <ArrowLink to="/mac#macbook-air-15-m4" solid>
          认识 MacBook Air M4
        </ArrowLink>
      </section>
    </>
  );
}
