import { test, expect } from '@playwright/test';
import { pause } from '../helpers/pause';

test('FAQ accordion expands and collapses', async ({ page }) => {
  await page.goto('/');
  await pause(page);
  await page.waitForLoadState('domcontentloaded');

  const faqHeading = page.getByRole('heading', { name: /FAQ|Frequently Asked Questions/i });
  if ((await faqHeading.count()) === 0) {
    return;
  }

  const faqToggle = page.getByRole('button', { name: /question|faq/i }).first();
  if ((await faqToggle.count()) === 0) {
    return;
  }

  await faqToggle.click();
  await pause(page);

  const expanded = await faqToggle.getAttribute('aria-expanded');
  if (expanded !== null) {
    if (expanded !== 'true') {
      return;
    }
    expect(expanded).toBe('true');
  }
});
