import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
export default function NotFound() {
  return (
    <section className="not-found wrap">
      <span className="overline">OBJECT / 404</span>
      <h1>
        这一页，
        <br />
        还没有被定义。
      </h1>
      <p>你可以回到产品索引，继续这场观察。</p>
      <Link className="button" to="/">
        回到首页
        <ArrowUpRight size={17} />
      </Link>
    </section>
  );
}
