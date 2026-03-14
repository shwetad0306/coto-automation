import { test, expect } from '@playwright/test';
import { pause } from './helpers/pause';

test('mobile home shows primary CTA and navigation', async ({ page }) => {
  await page.goto('/');
  await pause(page);

  const sessionCta = page.getByRole('button', { name: /Get Your Private Session/i });
  await expect(sessionCta).toBeVisible();
  await pause(page);

  const logo = page.getByRole('link', { name: /coto logo/i }).first();
  await expect(logo).toBeVisible();
  await pause(page);
});
