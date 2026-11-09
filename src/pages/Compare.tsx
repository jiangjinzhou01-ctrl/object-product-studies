import { handleTabKey } from '../lib/tabs';
import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Copy, RotateCcw, X, Check, ArrowLeftRight } from 'lucide-react';
import { products } from '../data/products';
import { Media } from '../components/Media';
import { Eyebrow } from '../components/UI';
import type { Family } from '../types/product';
export default function Compare() {
  const [params, setParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const family: Family = params.get('type') === 'mac' ? 'mac' : 'iphone';
  const options = products.filter((p) => p.family === family);
  const ids = params.has('models')
    ? params.get('models')!.split(',').slice(0, 2)
    : options.slice(0, 2).map((p) => p.id);
  const selection = [0, 1].map((_, i) =>
    options.find((p) => p.id === ids[i] && (i === 0 || ids[i] !== ids[0])),
  );
  const count = selection.filter(Boolean).length;
  const onlyDiff = params.get('diff') === '1' && count === 2;
  const update = (values: (string | undefined)[], type = family, diff = onlyDiff) => {
    setParams({
      type,
      models: values.map((v) => v ?? '').join(','),
      ...(diff ? { diff: '1' } : {}),
    });
    setCopied(false);
    setCopyFailed(false);
  };
  const setModel = (index: number, value: string) => {
    const next = selection.map((p) => p?.id);
    next[index] = value;
    update(next);
  };
  const rows = Array.from(new Set(options.flatMap((p) => p.specifications.map((s) => s.key))))
    .map((key) => {
      const values = selection.map((p) => p?.specifications.find((s) => s.key === key));
      const label = options.flatMap((p) => p.specifications).find((s) => s.key === key)!.label;
      return {
        key,
        label,
        values,
        different: count === 2 && values[0]?.value !== values[1]?.value,
      };
    })
    .filter((row) => !onlyDiff || row.different);
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopyFailed(true);
    }
  };
  return (
    <div className="compare-page wrap">
      <div className="compare-heading">
        <Eyebrow>THE COMPARISON DESK</Eyebrow>
        <h1>
          并排看，<span>更清楚。</span>
        </h1>
        <p>从真实的规格出发，找到适合日常的差别。</p>
      </div>
      <div className="compare-toolbar">
        <div
          className="compare-family"
          role="tablist"
          onKeyDown={handleTabKey}
          aria-label="比较产品类型"
        >
          {(['iphone', 'mac'] as const).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={f === family}
              tabIndex={f === family ? 0 : -1}
              onClick={() =>
                update(
                  products
                    .filter((p) => p.family === f)
                    .slice(0, 2)
                    .map((p) => p.id),
                  f,
                  false,
                )
              }
            >
              {f === 'iphone' ? 'iPhone' : 'Mac'}
            </button>
          ))}
        </div>
        <div className="compare-tools">
          <button
            onClick={() => {
              setParams({ type: family });
              setCopied(false);
            }}
          >
            <RotateCcw size={15} />
            重置比较
          </button>
          <button aria-label={copied ? '链接已复制' : '复制比较链接'} onClick={() => void share()}>
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span role="status">{copied ? '链接已复制' : '复制比较链接'}</span>
          </button>
        </div>
      </div>
      {copyFailed && (
        <label className="share-fallback">
          请复制此链接
          <input readOnly value={window.location.href} onFocus={(e) => e.currentTarget.select()} />
        </label>
      )}
      <div className="compare-selection">
        <div className="selection-label">
          <ArrowLeftRight size={24} />
          <span className="mono">SIDE BY SIDE</span>
          <p>
            两个型号。
            <br />
            同一把标尺。
          </p>
        </div>
        {selection.map((p, i) => (
          <div className="compare-product" key={i}>
            <div className="compare-product-top">
              <label htmlFor={`model-${i}`}>产品 {i + 1}</label>
              {p && (
                <button
                  className="icon-button"
                  onClick={() => setModel(i, '')}
                  aria-label={`清除产品 ${i + 1}`}
                >
                  <X size={17} />
                </button>
              )}
            </div>
            <select
              id={`model-${i}`}
              value={p?.id ?? ''}
              onChange={(e) => setModel(i, e.target.value)}
              aria-label={`产品 ${i + 1} 型号`}
            >
              <option value="">选择一个型号</option>
              {options.map((o) => (
                <option
                  key={o.id}
                  value={o.id}
                  disabled={selection.some((s, j) => j !== i && s?.id === o.id)}
                >
                  {o.name}
                </option>
              ))}
            </select>
            {p ? (
              <>
                <Media id={p.heroMedia} sizes="(max-width: 700px) 44vw, 30vw" />
                <h2>{p.name}</h2>
                <p>{p.tagline}</p>
              </>
            ) : (
              <div className="compare-empty">
                <span>＋</span>
                <p>从上方选择一个型号</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="comparison-controls">
        <label>
          <input
            type="checkbox"
            checked={onlyDiff}
            disabled={count < 2}
            onChange={(e) =>
              update(
                selection.map((p) => p?.id),
                family,
                e.target.checked,
              )
            }
          />
          只看差异
        </label>
        <span role="status" aria-live="polite">
          {count === 2
            ? `${onlyDiff ? '正在显示差异' : '已选择 2 个型号'} · ${rows.length} 项参数`
            : '选择两个型号，查看差异'}
        </span>
        <span className="mobile-table-hint">左右滑动查看 ↔</span>
      </div>
      {count > 0 ? (
        <div
          className="comparison-scroll"
          role="region"
          aria-label="产品规格比较表，可横向滚动"
          tabIndex={0}
        >
          <table>
            <caption className="sr-only">
              {family === 'iphone' ? 'iPhone' : 'Mac'} 技术规格比较。差异项以浅橙色标识。
            </caption>
            <thead>
              <tr>
                <th scope="col">规格 / SPECIFICATION</th>
                {selection.map((p, i) => (
                  <th scope="col" key={i}>
                    {p?.name ?? '尚未选择'}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className={row.different ? 'is-different' : ''}>
                  <th scope="row">
                    {row.label}
                    {row.different && (
                      <span className="difference-dot" role="img" aria-label="有差异" />
                    )}
                  </th>
                  {row.values.map((spec, i) => (
                    <td key={i}>
                      {spec ? (
                        <>
                          <span>{spec.value}</span>
                          <a
                            href={
                              selection[i]?.referenceSources.find((s) => s.id === spec.sourceId)
                                ?.url
                            }
                            aria-label={`${selection[i]?.name} ${row.label}来源`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            ↗
                          </a>
                        </>
                      ) : (
                        <span className="caption">尚未选择</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="compare-zero">
          <h2>比较桌已清空。</h2>
          <p>选择型号，开始新一轮观察。</p>
        </div>
      )}
      <div className="compare-footnotes">
        <p>
          <span className="difference-key" />
          浅橙色标记规格差异，不代表性能排名。
        </p>
        <p>
          显示屏对角线按标准矩形测量，实际可视区域更小。续航是 Apple
          特定测试条件下的上限，实际结果因使用、配置和网络条件而异。内存与存储为可选配置，不代表单一标配。
        </p>
        <p>
          核实日期：2026-11-09。每个参数旁的 ↗ 可直达官方来源。
          <Link to="/credits">查看来源索引</Link>
        </p>
      </div>
    </div>
  );
}
