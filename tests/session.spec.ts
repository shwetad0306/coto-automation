import { test, expect } from '@playwright/test';
import { pause } from './helpers/pause';

test('Start private session flow', async ({ page }) => {

  await page.goto('/');
  await pause(page);

  const sessionCta = page.getByRole('button', { name: /Get Your Private Session/i });
  await expect(sessionCta).toBeVisible();
  await pause(page);
  await sessionCta.click();
  await pause(page);

  await page.waitForLoadState('domcontentloaded');
  await pause(page);

});
