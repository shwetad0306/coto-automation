import { test, expect } from '@playwright/test';
import { pause } from '../helpers/pause';

test('home page loads without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });

  await page.goto('/');
  await pause(page);
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1500);
  await pause(page);

  const normalized = errors.filter(
    (message) => !/Failed to load resource: the server responded with a status of 503/i.test(message)
  );

  expect(
    normalized,
    `Console errors found: ${normalized.join(' | ')}`
  ).toHaveLength(0);
});
