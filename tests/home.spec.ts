import { test, expect } from '@playwright/test';
import { pause } from './helpers/pause';

test('home page shows key CTAs', async ({ page }) => {
  await page.goto('/');
  await pause(page);

  await expect(page).toHaveURL(/coto\.world/i);

  const sessionCta = page.getByRole('button', { name: /Get Your Private Session/i });
  await expect(sessionCta).toBeVisible();
  await pause(page);

  const searchBox = page.getByRole('textbox', { name: /search/i });
  if ((await searchBox.count()) > 0) {
    await expect(searchBox.first()).toBeVisible();
    await pause(page);
  }
});
