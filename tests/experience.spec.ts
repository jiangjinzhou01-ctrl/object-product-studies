import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
async function ready(page: Page, allImages = false) {
  await expect(page.locator('main h1')).toBeVisible();
  await page.evaluate(async (allImages) => {
    await document.fonts.ready;
    if (allImages)
      Array.from(document.images).forEach((img) => {
        img.loading = 'eager';
      });
    await Promise.all(
      Array.from(document.images)
        .filter((img) => {
          const box = img.getBoundingClientRect();
          return allImages || (box.top < innerHeight && box.bottom > 0);
        })
        .map((img) => img.decode().catch(() => {})),
    );
  }, allImages);
}
const routes = [
  '/',
  '/iphone',
  '/iphone/iphone-18-pro',
  '/mac',
  '/mac/macbook-pro-m5',
  '/compare',
  '/about',
  '/credits',
  '/journal/the-language-of-material',
  '/journal/a-display-in-context',
];
for (const route of routes) {
  test(`route ${route} renders and loads its visible photographs`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const failed: string[] = [];
    page.on('response', (r) => {
      if (r.status() >= 400 && new URL(r.url()).origin === new URL(page.url()).origin)
        failed.push(r.url());
    });
    await page.goto(`/#${route}`);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('main h1')).toBeVisible();
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        Array.from(document.images)
          .filter((i) => {
            const box = i.getBoundingClientRect();
            return i.loading !== 'lazy' || (box.top < innerHeight && box.bottom > 0);
          })
          .map((i) => i.decode().catch(() => {})),
      );
    });
    expect(errors).toEqual([]);
    expect(failed).toEqual([]);
    const broken = await page
      .locator('img')
      .evaluateAll((images) =>
        images.filter((i) => i.complete && !i.naturalWidth).map((i) => i.src),
      );
    expect(broken).toEqual([]);
  });
}

test('comparison is editable, shareable, reloadable, clearable and category-safe', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#/compare');
  await expect(page.getByRole('combobox', { name: '产品 1 型号' })).toHaveValue('iphone-18-pro');
  await expect(page.getByRole('combobox', { name: '产品 2 型号' })).toHaveValue('iphone-17');
  await page.getByLabel('只看差异', { exact: true }).click();
  await expect(page.getByLabel('只看差异', { exact: true })).toBeChecked();
  await expect(page.locator('tbody tr:not(.is-different)')).toHaveCount(0);
  await expect(page).toHaveURL(/diff=1/);
  await page.reload();
  await expect(page.getByLabel('只看差异', { exact: true })).toBeChecked();
  await page.getByRole('button', { name: '复制比较链接' }).click();
  await expect(page.getByRole('button', { name: '链接已复制' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('diff=1');
  await page.getByRole('button', { name: '清除产品 1' }).click();
  await expect(page.getByRole('combobox', { name: '产品 1 型号' })).toHaveValue('');
  await expect(page.getByLabel('只看差异', { exact: true })).toBeDisabled();
  await page.getByRole('button', { name: '清除产品 2' }).click();
  await expect(page.getByText('比较桌已清空。')).toBeVisible();
  await page.getByRole('combobox', { name: '产品 1 型号' }).selectOption('iphone-17');
  await expect(page.getByRole('combobox', { name: '产品 1 型号' })).toHaveValue('iphone-17');
  await page.getByRole('button', { name: '重置比较' }).click();
  await expect(page.getByRole('combobox', { name: '产品 1 型号' })).toHaveValue('iphone-18-pro');
  await page.getByRole('tab', { name: 'Mac', exact: true }).click();
  await expect(page.getByRole('combobox', { name: '产品 1 型号' })).toHaveValue('macbook-pro-m5');
  await expect(page.locator('table')).toContainText('Apple M4');
  await page.reload();
  await expect(page.getByRole('combobox', { name: '产品 2 型号' })).toHaveValue(
    'macbook-air-15-m4',
  );
  await page.goto('/#/compare?type=mac&models=iphone-17,unknown');
  await expect(page.getByRole('combobox', { name: '产品 1 型号' })).toHaveValue('');
  await expect(page.getByText('比较桌已清空。')).toBeVisible();
});

test('mobile navigation traps focus, closes with Escape, and navigates', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#/');
  const open = page.getByRole('button', { name: '打开导航' });
  await open.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button', { name: '关闭导航' })).toBeFocused();
  expect(await page.locator('body').evaluate((el) => el.style.overflow)).toBe('hidden');
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(open).toBeFocused();
  expect(await page.locator('body').evaluate((el) => el.style.overflow)).toBe('');
  await open.click();
  await dialog.getByRole('link', { name: '01 iPhone' }).click();
  await expect(page).toHaveURL(/#\/iphone$/);
  await expect(dialog).not.toBeVisible();
  await expect(page.locator('main h1')).toContainText('随身');
});

test('product finish updates real photo, supports keyboard and preserves layout', async ({
  page,
}) => {
  await page.goto('/#/iphone/iphone-18-pro');
  const section = page.locator('#finishes');
  await section.scrollIntoViewIfNeeded();
  const radio = page.getByRole('radio', { name: 'Glacier', exact: true });
  const before = await section.boundingBox();
  await radio.check();
  await expect(section.getByRole('img')).toHaveAttribute('src', /iphone-18-pro-glacier/);
  await expect(section.getByRole('status')).toContainText('Glacier');
  await page.getByRole('radio', { name: 'Black', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(radio).toBeChecked();
  const after = await section.boundingBox();
  expect(after!.height).toBeCloseTo(before!.height, 0);
});

test('scroll narratives change with viewport position; workflow and ports respond', async ({
  page,
}) => {
  await page.goto('/#/iphone/iphone-18-pro');
  for (let i = 0; i < 3; i++) {
    await page.locator(`[data-chapter="${i}"]`).scrollIntoViewIfNeeded();
    await expect(page.locator('.narrative-frames .is-active img')).toHaveAttribute(
      'src',
      new RegExp(['black', 'rear', 'glacier'][i]),
    );
  }
  await page.goto('/#/mac/macbook-pro-m5');
  await page.getByRole('tab', { name: '02 剪辑' }).click();
  await expect(page.getByRole('tabpanel')).toContainText('ProRes');
  await page.getByRole('button', { name: '03 SDXC' }).click();
  await expect(page.locator('.port-detail')).toContainText('存储卡');
});

test('in-page links retain the route and reach their section', async ({ page }) => {
  await page.goto('/#/');
  await page.getByRole('link', { name: '向下，发现更多' }).click();
  await expect(page).toHaveURL(/#\/#selected/);
  await expect(page.locator('#selected')).toBeInViewport();
  await page.goto('/#/iphone/iphone-18-pro');
  await page.getByRole('link', { name: '技术规格', exact: true }).click();
  await expect(page).toHaveURL(/#\/iphone\/iphone-18-pro#specifications/);
  await expect(page.locator('#specifications')).toBeInViewport();
});

for (const width of [360, 390, 430, 768, 1024, 1440, 1920]) {
  test(`responsive ${width}px: all main layouts avoid horizontal page overflow`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
    for (const route of [
      '/',
      '/iphone',
      '/iphone/iphone-18-pro',
      '/mac',
      '/mac/macbook-pro-m5',
      '/compare',
      '/about',
      '/credits',
    ]) {
      await page.goto(`/#${route}`);
      await expect(page.locator('main h1')).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        `${width}px ${route}`,
      ).toBe(true);
      await expect(page.locator('main h1')).toBeInViewport();
    }
    if (width === 390 || width === 1440) {
      await page.goto('/#/');
      await ready(page, true);
      await page.screenshot({
        path: `reports/screenshots/home-${width}.png`,
        fullPage: true,
        animations: 'disabled',
      });
    }
  });
}

for (const route of [
  '/',
  '/iphone/iphone-18-pro',
  '/mac/macbook-pro-m5',
  '/compare',
  '/about',
  '/credits',
]) {
  test(`WCAG accessibility ${route}`, async ({ page }) => {
    await page.goto(`/#${route}`);
    await expect(page.locator('main h1')).toBeVisible();
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  });
}

test('reduced motion and mobile comparison remain usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/#/iphone/iphone-18-pro');
  await page.locator('#design').scrollIntoViewIfNeeded();
  expect(
    await page
      .locator('.narrative-frames .media')
      .first()
      .evaluate((el) => getComputedStyle(el).transitionDuration),
  ).toBe('1e-05s');
  await page.goto('/#/compare');
  const region = page.getByRole('region', { name: '产品规格比较表，可横向滚动' });
  await region.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => region.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
  await page.getByRole('button', { name: '清除产品 2' }).click();
  await expect(page.getByRole('combobox', { name: '产品 2 型号' })).toHaveValue('');
});

test('visual review captures all critical states', async ({ page }) => {
  await page.goto('/#/iphone/iphone-18-pro');
  await ready(page);
  await page.screenshot({
    path: 'reports/screenshots/iphone-hero-desktop.png',
    animations: 'disabled',
  });
  await page.locator('[data-chapter="1"]').scrollIntoViewIfNeeded();
  await expect(page.locator('.narrative-frames .is-active img')).toHaveAttribute('src', /rear/);
  await ready(page);
  await page.screenshot({
    path: 'reports/screenshots/iphone-narrative-desktop.png',
    animations: 'disabled',
  });
  await page.goto('/#/mac/macbook-pro-m5');
  await ready(page);
  await page.screenshot({
    path: 'reports/screenshots/mac-hero-desktop.png',
    animations: 'disabled',
  });
  await page.locator('#display').scrollIntoViewIfNeeded();
  await page.screenshot({
    path: 'reports/screenshots/mac-display-desktop.png',
    animations: 'disabled',
  });
  await page.goto('/#/compare');
  await ready(page, true);
  await page.screenshot({
    path: 'reports/screenshots/compare-desktop.png',
    fullPage: true,
    animations: 'disabled',
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#/iphone/iphone-18-pro');
  await ready(page);
  await page.locator('[data-chapter="1"]').scrollIntoViewIfNeeded();
  await expect(page.locator('.narrative-frames .is-active img')).toHaveAttribute('src', /rear/);
  await page.screenshot({
    path: 'reports/screenshots/iphone-narrative-mobile.png',
    animations: 'disabled',
  });
  await page.goto('/#/compare');
  await ready(page, true);
  await page.screenshot({
    path: 'reports/screenshots/compare-mobile.png',
    fullPage: true,
    animations: 'disabled',
  });
  await page.goto('/#/');
  await ready(page);
  await page.getByRole('button', { name: '打开导航' }).click();
  await page.screenshot({
    path: 'reports/screenshots/navigation-mobile.png',
    animations: 'disabled',
  });
});

test('explorer and workflow tabs support arrow keys and update content', async ({ page }) => {
  await page.goto('/#/');
  const explorer = page.locator('#explorer');
  await explorer.scrollIntoViewIfNeeded();
  await explorer.getByRole('tab', { name: /iPhone/ }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(explorer.getByRole('tab', { name: /Mac/ })).toHaveAttribute('aria-selected', 'true');
  await expect(explorer.getByRole('tabpanel')).toContainText('MacBook Pro');
  await explorer.getByRole('button', { name: 'MacBook Air 15″ · M4', exact: true }).click();
  await expect(explorer.locator('h3')).toContainText('MacBook Air');
  await page.goto('/#/mac/macbook-pro-m5');
  await page.getByRole('tab', { name: '01 构建' }).focus();
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: '03 设计' })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('P3');
});

test('cold navigation reserves enough space to avoid layout shifts', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, '__layoutShiftScore', { value: 0, writable: true });
    new PerformanceObserver((list) => {
      for (const raw of list.getEntries()) {
        const entry = raw as PerformanceEntry & { hadRecentInput: boolean; value: number };
        if (!entry.hadRecentInput) {
          const state = window as unknown as { __layoutShiftScore: number };
          state.__layoutShiftScore += entry.value;
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto('/#/');
  await ready(page);
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
  expect(
    await page.evaluate(
      () => (window as unknown as { __layoutShiftScore: number }).__layoutShiftScore,
    ),
  ).toBeLessThan(0.05);
});
