import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function ready(page: Page, allImages = false) {
  await expect(page.locator('main h1')).toBeVisible();
  await page.evaluate(async (all) => {
    await document.fonts.ready;
    if (all) Array.from(document.images).forEach((i) => (i.loading = 'eager'));
    await Promise.all(
      Array.from(document.images)
        .filter(
          (i) =>
            all ||
            (i.getBoundingClientRect().top < innerHeight && i.getBoundingClientRect().bottom > 0),
        )
        .map((i) => i.decode().catch(() => {})),
    );
  }, allImages);
}
const routes = [
  '/',
  '/iphone',
  '/iphone/iphone-18-pro',
  '/mac',
  '/mac/macbook-pro-m6',
  '/compare',
  '/about',
  '/credits',
  '/journal/the-language-of-material',
  '/journal/a-display-in-context',
];
for (const route of routes) {
  test('route ' + route + ' loads its complete content and images', async ({ page }) => {
    const errors: string[] = [],
      failed: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('response', (r) => {
      if (r.status() >= 400 && new URL(r.url()).origin === new URL(page.url()).origin)
        failed.push(r.url());
    });
    await page.goto('/#' + route);
    await expect(page.locator('main h1')).toHaveCount(1);
    await ready(page, true);
    expect(
      await page
        .locator('img')
        .evaluateAll((images) => images.filter((i) => !i.naturalWidth).map((i) => i.src)),
    ).toEqual([]);
    expect(errors).toEqual([]);
    expect(failed).toEqual([]);
    await expect(page.locator('footer')).toContainText('与 Apple Inc. 无隶属');
  });
}

test('comparison selects, swaps, shares, restores, clears and resets', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#/compare');
  const first = page.getByRole('combobox', { name: '产品 1 型号' }),
    second = page.getByRole('combobox', { name: '产品 2 型号' });
  await expect(first).toHaveValue('iphone-18-pro');
  await expect(second).toHaveValue('iphone-17');
  await page.getByRole('button', { name: '交换位置' }).click();
  await expect(first).toHaveValue('iphone-17');
  await page.getByLabel('只看差异', { exact: true }).click();
  await expect(page.getByLabel('只看差异', { exact: true })).toBeChecked();
  await expect(page.locator('tbody tr:not(.is-different)')).toHaveCount(0);
  await expect(page).toHaveURL(/diff=1/);
  await page.reload();
  await expect(first).toHaveValue('iphone-17');
  await expect(page.getByLabel('只看差异', { exact: true })).toBeChecked();
  await page.getByRole('button', { name: '复制比较链接' }).click();
  await expect(page.getByRole('button', { name: '链接已复制' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('diff=1');
  await page.getByRole('button', { name: '清除产品 1' }).click();
  await expect(first).toHaveValue('');
  await expect(page.getByLabel('只看差异', { exact: true })).toBeDisabled();
  await page.getByRole('button', { name: '清除产品 2' }).click();
  await expect(page.getByText('比较桌已清空。')).toBeVisible();
  await page.getByRole('button', { name: '恢复默认型号' }).click();
  await expect(first).toHaveValue('iphone-18-pro');
  await first.selectOption('');
  await first.selectOption('iphone-18-pro');
  await expect(first).toHaveValue('iphone-18-pro');
  await page.getByRole('button', { name: '重置比较' }).click();
  await expect(page.getByLabel('只看差异', { exact: true })).not.toBeChecked();
});

test('Mac comparison is category safe and does not turn missing data into a difference', async ({
  page,
}) => {
  await page.goto('/#/compare');
  await page.getByRole('tab', { name: 'Mac', exact: true }).click();
  await expect(page.getByRole('combobox', { name: '产品 1 型号' })).toHaveValue('macbook-pro-m6');
  await expect(page.getByRole('combobox', { name: '产品 2 型号' })).toHaveValue(
    'macbook-air-13-m5',
  );
  await expect(page.locator('table')).toContainText('Apple M6');
  await expect(page.locator('table')).toContainText('Apple M5');
  const refresh = page
    .locator('tbody tr')
    .filter({ has: page.getByRole('rowheader', { name: '自适应刷新率' }) });
  await expect(refresh).not.toHaveClass(/is-different/);
  await page.getByRole('combobox', { name: '产品 2 型号' }).selectOption('macbook-air-15-m5');
  await page.reload();
  await expect(page.getByRole('combobox', { name: '产品 2 型号' })).toHaveValue(
    'macbook-air-15-m5',
  );
  await expect(page.locator('table')).toContainText('1.51kg');
  await page.goto('/#/compare?type=mac&models=iphone-17,unknown&diff=1');
  await expect(page.getByText('比较桌已清空。')).toBeVisible();
  await expect(page.getByLabel('只看差异', { exact: true })).not.toBeChecked();
  await page.goto('/#/compare?type=iphone&models=iphone-17,iphone-17');
  await expect(page.getByRole('combobox', { name: '产品 2 型号' })).toHaveValue('');
});

test('copy failure gives a usable manual sharing link', async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('denied')) },
      configurable: true,
    }),
  );
  await page.goto('/#/compare');
  await page.getByRole('button', { name: '复制比较链接' }).click();
  await expect(page.getByLabel('请选中下方链接复制')).toHaveValue(/#\/compare\?/);
});

test('mobile navigation manages focus, scroll locking, Escape and routing', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#/');
  const open = page.getByRole('button', { name: '打开导航' });
  await open.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button', { name: '关闭导航' })).toBeFocused();
  expect(await page.locator('body').evaluate((e) => e.style.overflow)).toBe('hidden');
  for (let i = 0; i < 9; i++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate((e) => e.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Shift+Tab');
  expect(await dialog.evaluate((e) => e.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(open).toBeFocused();
  expect(await page.locator('body').evaluate((e) => e.style.overflow)).toBe('');
  await open.click();
  await dialog.getByRole('link', { name: '01 iPhone' }).click();
  await expect(page).toHaveURL(/#\/iphone$/);
  await expect(dialog).not.toBeVisible();
  await expect(page.locator('h1')).toContainText('口袋里的');
});

test('gallery switches genuine views with keyboard and stable image bounds', async ({ page }) => {
  await page.goto('/#/iphone/iphone-18-pro');
  const stage = page.locator('.gallery-stage');
  await stage.scrollIntoViewIfNeeded();
  const before = await stage.boundingBox();
  await page.getByRole('button', { name: '下一张产品图' }).click();
  await expect(stage.locator('img')).toHaveAttribute('src', /phone-pro-finishes/);
  await expect(page.getByRole('button', { name: '四款配色', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByRole('button', { name: '影像样张', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(stage.locator('img')).toHaveAttribute('src', /phone-pro-lowlight/);
  await page.getByRole('button', { name: '上一张产品图' }).click();
  await expect(stage.locator('img')).toHaveAttribute('src', /phone-pro-finishes/);
  expect((await stage.boundingBox())!.height).toBe(before!.height);
});

test('scroll narratives follow the reading position on desktop and mobile', async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.goto('/#/iphone/iphone-18-pro');
    await ready(page);
    for (let i = 0; i < 3; i++) {
      await page.locator('[data-chapter="' + i + '"]').evaluate((e) => {
        window.scrollTo({
          top:
            e.getBoundingClientRect().top +
            scrollY -
            innerHeight * (innerWidth < 760 ? 0.54 : 0.35),
          behavior: 'instant',
        });
      });
      await expect(page.locator('.narrative-stage img')).toHaveAttribute(
        'src',
        new RegExp(['phone-pro-hero', 'phone-pro-landscape', 'phone-pro-finishes'][i]),
      );
    }
  }
});

test('workflow and connection tabs change useful content and support keyboard', async ({
  page,
}) => {
  await page.goto('/#/mac/macbook-pro-m6');
  await page.getByRole('tab', { name: '02 视觉设计' }).click();
  await expect(page.locator('#workflow-panel')).toContainText('P3');
  await expect(page.locator('.workflow-image img')).toHaveAttribute('src', /mac-pro-design/);
  await page.getByRole('tab', { name: '02 视觉设计' }).focus();
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: '03 开发构建' })).toBeFocused();
  await expect(page.locator('.workflow-image img')).toHaveAttribute('src', /mac-pro-code/);
  await page.getByRole('tab', { name: 'SDXC 03' }).click();
  await expect(page.locator('#port-panel')).toContainText('相机');
  await page.keyboard.press('Home');
  await expect(page.getByRole('tab', { name: 'Thunderbolt 4 01' })).toBeFocused();
  await expect(page.locator('#port-panel')).toContainText('40Gb/s');
});

test('explorer is keyboard operable and leads to the selected model', async ({ page }) => {
  await page.goto('/#/');
  const explorer = page.locator('#explorer');
  await explorer.getByRole('tab', { name: 'iPhone', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(explorer.getByRole('tab', { name: 'Mac', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await explorer.getByRole('button', { name: /MacBook Air 15/ }).click();
  await expect(explorer.getByRole('tabpanel').locator('img')).toHaveAttribute(
    'src',
    /mac-air-15-front/,
  );
  await explorer.getByRole('link', { name: '查看产品' }).click();
  await expect(page).toHaveURL(/#\/mac#macbook-air-15-m5$/);
  await expect(page.locator('#macbook-air-15-m5')).toBeInViewport();
});

test('anchor links retain the route; technical details expand and collapse', async ({ page }) => {
  await page.goto('/#/');
  await page.getByRole('link', { name: '向下，发现更多' }).click();
  await expect(page).toHaveURL(/#\/#objects/);
  await expect(page.locator('#objects')).toBeInViewport();
  await page.goto('/#/iphone/iphone-18-pro');
  await page.getByRole('link', { name: '技术规格', exact: true }).click();
  await expect(page).toHaveURL(/#\/iphone\/iphone-18-pro#specifications/);
  await expect(page.locator('#specifications')).toBeInViewport();
  await expect(page.locator('.spec-list>div')).toHaveCount(6);
  await page.getByRole('button', { name: '查看全部参数' }).click();
  expect(await page.locator('.spec-list>div').count()).toBeGreaterThan(6);
  await expect(page.getByRole('button', { name: '收起参数' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await page.getByRole('button', { name: '收起参数' }).click();
  await expect(page.locator('.spec-list>div')).toHaveCount(6);
});

test('unknown routes recover and edition-one Mac links remain valid', async ({ page }) => {
  await page.goto('/#/unknown');
  await expect(page.locator('main')).toContainText('404');
  await page.getByRole('link', { name: '回到首页', exact: true }).click();
  await expect(page).toHaveURL(/#\/$/);
  await page.goto('/#/mac/macbook-pro-m5');
  await expect(page).toHaveURL(/#\/mac$/);
});

for (const width of [360, 390, 430, 768, 1024, 1440, 1920]) {
  test(
    'responsive ' + width + 'px: complete layouts stay within the viewport',
    async ({ page }) => {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      for (const route of routes) {
        await page.goto('/#' + route);
        await ready(page);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
          width + 'px ' + route,
        ).toBe(true);
      }
    },
  );
}

for (const route of [
  '/',
  '/iphone/iphone-18-pro',
  '/mac/macbook-pro-m6',
  '/compare',
  '/about',
  '/credits',
]) {
  test('WCAG accessibility ' + route, async ({ page }) => {
    await page.goto('/#' + route);
    await ready(page);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  });
}

test('mobile menu and comparison have no automated accessibility violations', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#/');
  await page.getByRole('button', { name: '打开导航' }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press('Escape');
  await page.goto('/#/compare');
  await ready(page);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test('reduced motion and mobile table keyboard scrolling remain usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/#/iphone/iphone-18-pro');
  await ready(page);
  expect(
    await page
      .locator('.narrative-stage .media')
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe('none');
  await page.goto('/#/compare');
  const region = page.getByRole('region', { name: '规格比较表，可横向滚动' });
  await region.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => region.evaluate((e) => e.scrollLeft)).toBeGreaterThan(0);
  await page.getByRole('button', { name: '清除产品 2' }).click();
  await expect(page.getByRole('combobox', { name: '产品 2 型号' })).toHaveValue('');
});

test('visual evidence captures both screen sizes and active interaction states', async ({
  page,
}) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    for (const [name, route] of [
      ['home', '/'],
      ['iphone', '/iphone/iphone-18-pro'],
      ['mac', '/mac/macbook-pro-m6'],
      ['compare', '/compare'],
    ]) {
      await page.goto('/#' + route);
      await ready(page, true);
      await page.screenshot({
        path: 'reports/screenshots/' + name + '-' + width + '.png',
        fullPage: true,
        animations: 'disabled',
      });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#/');
  await ready(page);
  await page.getByRole('button', { name: '打开导航' }).click();
  await page.screenshot({ path: 'reports/screenshots/navigation-mobile.png' });
  await page.keyboard.press('Escape');
  await page.goto('/#/iphone/iphone-18-pro');
  await ready(page, true);
  await page.locator('[data-chapter="1"]').evaluate((e) =>
    window.scrollTo({
      top: e.getBoundingClientRect().top + scrollY - innerHeight * (innerWidth < 760 ? 0.54 : 0.35),
      behavior: 'instant',
    }),
  );
  await expect(page.locator('.narrative-stage img')).toHaveAttribute('src', /phone-pro-landscape/);
  await page.screenshot({
    path: 'reports/screenshots/narrative-mobile.png',
    animations: 'disabled',
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.locator('[data-chapter="1"]').evaluate((e) =>
    window.scrollTo({
      top: e.getBoundingClientRect().top + scrollY - innerHeight * (innerWidth < 760 ? 0.54 : 0.35),
      behavior: 'instant',
    }),
  );
  await page.screenshot({
    path: 'reports/screenshots/narrative-desktop.png',
    animations: 'disabled',
  });
  await page.goto('/#/mac/macbook-pro-m6');
  await ready(page, true);
  await page.getByRole('tab', { name: '02 视觉设计' }).click();
  await page
    .locator('.workflow-tabs')
    .evaluate((e) => e.scrollIntoView({ block: 'start', behavior: 'instant' }));
  await page.screenshot({
    path: 'reports/screenshots/workflow-desktop.png',
    animations: 'disabled',
  });
});

test('cold homepage load reserves media space', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, '__layoutShiftScore', { value: 0, writable: true });
    new PerformanceObserver((list) => {
      for (const raw of list.getEntries()) {
        const e = raw as PerformanceEntry & { hadRecentInput: boolean; value: number };
        if (!e.hadRecentInput) {
          const state = window as unknown as { __layoutShiftScore: number };
          state.__layoutShiftScore += e.value;
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
