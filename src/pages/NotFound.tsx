import { ArrowLink, Eyebrow } from '../components/UI';
export default function NotFound() {
  return (
    <section className="not-found wrap">
      <Eyebrow>INDEX / 404</Eyebrow>
      <h1>
        这件物品，
        <br />
        还未被收录。
      </h1>
      <p>链接可能已变化，回到首页继续探索。</p>
      <ArrowLink to="/" solid>
        返回首页
      </ArrowLink>
    </section>
  );
}
