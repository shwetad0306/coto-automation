import { test, expect } from '@playwright/test';
import { pause } from './helpers/pause';

test('visual: home page', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await pause(page);

  await expect(page).toHaveScreenshot('home.png', { fullPage: true });
});

test('visual: booking page', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await pause(page);

  const sessionCta = page.getByRole('button', { name: /Get Your Private Session/i });
  await sessionCta.click();
  await page.waitForLoadState('domcontentloaded');
  await pause(page);

  await expect(page).toHaveScreenshot('booking.png', { fullPage: true });
});

test('visual: experts section', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await pause(page);

  const expertsHeading = page.getByRole('heading', { name: /Meet Our Top Experts|Experts/i });
  if ((await expertsHeading.count()) === 0) {
    return;
  }

  await expertsHeading.first().scrollIntoViewIfNeeded();
  await pause(page);

  const section = expertsHeading.first().locator('..');
  await expect(section).toHaveScreenshot('experts-section.png');
});
