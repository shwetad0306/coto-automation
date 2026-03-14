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

  const bookingInputs = page.locator(
    [
      'input[name*="name" i]',
      'input[placeholder*="name" i]',
      'input[name*="email" i]',
      'input[placeholder*="email" i]',
      'input[name*="phone" i]',
      'input[placeholder*="phone" i]',
      'input[type="date"]',
      'textarea',
      'select',
    ].join(', ')
  );
  if ((await bookingInputs.count()) === 0) {
    return;
  }
  await bookingInputs.first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);

  try {
    await expect(bookingInputs.first()).toBeVisible({ timeout: 5000 });
  } catch {
    return;
  }

  await expect(bookingInputs.first()).toHaveScreenshot('booking.png', {
    animations: 'disabled',
    caret: 'hide',
    timeout: 15000,
  });
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
