import { test, expect } from '@playwright/test';
import { pause } from '../helpers/pause';

const thresholdMs = Number(process.env.COTO_DCL_THRESHOLD_MS ?? 8000);

test('home page domcontentloaded under threshold', async ({ page }) => {
  await page.goto('/');
  await pause(page);
  await page.waitForLoadState('domcontentloaded');
  await pause(page);

  const timing = await page.evaluate(() => {
    const entry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (!entry) {
      return null;
    }
    return {
      domContentLoaded: entry.domContentLoadedEventEnd,
    };
  });

  if (!timing?.domContentLoaded) {
    return;
  }

  expect(timing.domContentLoaded).toBeLessThanOrEqual(thresholdMs);
});
