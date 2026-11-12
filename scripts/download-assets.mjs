import fs from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const definitions = JSON.parse(await fs.readFile('docs/asset-definitions.json', 'utf8'));
await fs.mkdir('.cache/press', { recursive: true });
for (const asset of definitions) {
  const target = '.cache/press/' + asset.originalFile;
  try {
    await fs.access(target);
    continue;
  } catch {
    /* download absent original */
  }
  execFileSync(
    'curl',
    ['--fail', '--location', '--max-time', '60', '--output', target, asset.originalUrl],
    { stdio: 'inherit' },
  );
}
