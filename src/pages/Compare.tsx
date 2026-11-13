import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeftRight, ArrowUpRight, Check, Copy, RotateCcw, X } from 'lucide-react';
import { Media } from '../components/Media';
import { Eyebrow } from '../components/UI';
import { products } from '../data/products';
import { handleTabKey } from '../lib/tabs';
import type { Family } from '../types/product';
export default function Compare() {
  const [params, setParams] = useSearchParams();
  const family: Family = params.get('type') === 'mac' ? 'mac' : 'iphone';
  const options = products.filter((p) => p.family === family),
    defaults = options.slice(0, 2).map((p) => p.id);
  const raw = params.has('models') ? (params.get('models') ?? '').split(',') : defaults;
  const ids = [0, 1].map((i) => (options.some((p) => p.id === raw[i]) ? raw[i] : ''));
  if (ids[0] === ids[1]) ids[1] = '';
  const selected = ids.map((id) => options.find((p) => p.id === id));
  const complete = selected.every(Boolean),
    differencesOnly = params.get('diff') === '1' && complete;
  const canonical = new URLSearchParams({
    type: family,
    models: ids.join(','),
    ...(differencesOnly ? { diff: '1' } : {}),
  }).toString();
  const search = params.toString();
  useEffect(() => {
    if (search !== canonical) setParams(canonical, { replace: true });
  }, [search, canonical, setParams]);
  const [copied, setCopied] = useState(false),
    [copyFallback, setCopyFallback] = useState('');
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2400);
    return () => clearTimeout(id);
  }, [copied]);
  function update(next: string[], category: Family = family, diff = differencesOnly) {
    setCopied(false);
    setCopyFallback('');
    setParams({
      type: category,
      models: next.join(','),
      ...(diff && next.every(Boolean) ? { diff: '1' } : {}),
    });
  }
  const keys = [...new Set(options.flatMap((p) => p.specifications.map((s) => s.key)))];
  const rows = keys.map((key) => {
    const specs = selected.map((p) => p?.specifications.find((s) => s.key === key));
    return {
      key,
      label: options.flatMap((p) => p.specifications).find((s) => s.key === key)!.label,
      specs,
      different: complete && Boolean(specs[0] && specs[1]) && specs[0]?.value !== specs[1]?.value,
    };
  });
  const shown = rows.filter((r) => !differencesOnly || r.different);
  const count = rows.filter((r) => r.different).length;
  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopyFallback(window.location.href);
    }
  }
  return (
    <div className="compare-page wrap">
      <div className="compare-heading">
        <div>
          <Eyebrow>产品比较</Eyebrow>
          <h1>
            看见不同，
            <br />
            <span>选得更准。</span>
          </h1>
        </div>
        <p>
          没有一种标准答案。
          <br />
          从真正重要的细节，找到适合你的选择。
        </p>
      </div>
      <div className="compare-toolbar">
        <div
          className="segmented"
          role="tablist"
          aria-label="比较产品类型"
          onKeyDown={handleTabKey}
        >
          {(['iphone', 'mac'] as const).map((f) => (
            <button
              key={f}
              id={'compare-' + f}
              role="tab"
              aria-selected={family === f}
              aria-controls="comparison-panel"
              tabIndex={family === f ? 0 : -1}
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
        <div className="toolbar-actions">
          <button onClick={() => update(defaults, family, false)}>
            <RotateCcw size={15} />
            重置比较
          </button>
          <button onClick={share}>
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span>{copied ? '链接已复制' : '复制比较链接'}</span>
          </button>
        </div>
      </div>
      {copyFallback && (
        <div className="copy-fallback" role="status">
          <label htmlFor="share-url">请选中下方链接复制</label>
          <input id="share-url" readOnly value={copyFallback} onFocus={(e) => e.target.select()} />
        </div>
      )}
      <section id="comparison-panel" role="tabpanel" aria-labelledby={'compare-' + family}>
        <div className="comparison-selectors">
          <div className="selector-note">
            <span className="overline">选择比较型号</span>
            <p>
              选择两个型号
              <br />
              看见它们的不同
            </p>
            <button
              className="text-link"
              onClick={() => update([ids[1], ids[0]])}
              disabled={!ids.some(Boolean)}
            >
              <ArrowLeftRight size={16} />
              交换位置
            </button>
          </div>
          {[0, 1].map((slot) => (
            <div className="compare-product" key={slot}>
              <div className="selector-line">
                <label htmlFor={'product-' + slot}>产品 {slot + 1}</label>
                <button
                  className="clear-product"
                  aria-label={'清除产品 ' + (slot + 1)}
                  disabled={!ids[slot]}
                  onClick={() => {
                    const next = [...ids];
                    next[slot] = '';
                    update(next);
                  }}
                >
                  <X size={16} />
                </button>
              </div>
              <select
                id={'product-' + slot}
                aria-label={'产品 ' + (slot + 1) + ' 型号'}
                value={ids[slot]}
                onChange={(e) => {
                  const next = [...ids];
                  next[slot] = e.target.value;
                  update(next);
                }}
              >
                <option value="">选择一个型号</option>
                {options.map((p) => (
                  <option key={p.id} value={p.id} disabled={ids[1 - slot] === p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              {selected[slot] ? (
                <>
                  <div
                    className={
                      'compare-image ' +
                      (selected[slot]!.id === 'iphone-18-pro' ? 'dark-image' : '')
                    }
                  >
                    <Media id={selected[slot]!.heroMedia} sizes="(max-width:760px) 40vw, 30vw" />
                  </div>
                  <span className="overline">
                    {selected[slot]!.chip} / {selected[slot]!.releaseDate.slice(0, 4)}
                  </span>
                </>
              ) : (
                <div className="compare-empty-slot">
                  <span>0{slot + 1}</span>
                  <p>
                    为这个位置，
                    <br />
                    选一件日常。
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="difference-bar">
          <label>
            <input
              type="checkbox"
              checked={differencesOnly}
              disabled={!complete}
              onChange={(e) => update(ids, family, e.target.checked)}
            />
            <span>只看差异</span>
          </label>
          <span aria-live="polite">
            {complete ? count + ' 项参数差异' : '选择两个型号以比较差异'}
          </span>
        </div>
        {!ids.some(Boolean) ? (
          <div className="empty-comparison">
            <h2>比较桌已清空。</h2>
            <p>在上方选择型号，重新开始一次比较。</p>
            <button className="button" onClick={() => update(defaults, family, false)}>
              恢复默认型号
              <RotateCcw size={16} />
            </button>
          </div>
        ) : (
          <div className="comparison-scroll" tabIndex={0} role="region" aria-label="规格比较表">
            <table>
              <caption className="sr-only">
                {family === 'iphone' ? 'iPhone' : 'Mac'} 技术规格比较
              </caption>
              <thead>
                <tr>
                  <th scope="col">技术规格</th>
                  {selected.map((p, i) => (
                    <th key={i} scope="col">
                      {p?.name ?? '尚未选择'}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shown.map((r) => (
                  <tr key={r.key} className={r.different ? 'is-different' : ''}>
                    <th scope="row">
                      {r.label}
                      {r.different && <span className="diff-dot" role="img" aria-label="有差异" />}
                    </th>
                    {r.specs.map((s, i) => (
                      <td key={i}>
                        {s?.value ?? '—'}
                        {s?.note && <small>{s.note}</small>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="compare-sources">
          <p>
            基于官方技术资料。配置范围不代表每种组合均可购买；续航测试条件与实际使用存在差异。本站不提供性能排名或购买服务。
          </p>
          <div>
            {selected.filter(Boolean).map((p) => (
              <a key={p!.id} href={p!.referenceSources[0].url} target="_blank" rel="noreferrer">
                {p!.name} · 数据来源
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
