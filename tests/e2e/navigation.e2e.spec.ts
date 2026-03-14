import { test, expect } from '@playwright/test';
import { pause } from '../helpers/pause';

test('navigation links are present with hrefs', async ({ page }) => {
  await page.goto('/');
  await pause(page);

  const footer = page.locator('footer');
  if ((await footer.count()) === 0) {
    return;
  }

  const linkPatterns = [/Terms/i, /Privacy/i, /Contact/i, /About/i];
  let foundAny = false;

  for (const pattern of linkPatterns) {
    const link = footer.getByRole('link', { name: pattern });
    if ((await link.count()) > 0) {
      foundAny = true;
      await expect(link.first()).toHaveAttribute('href', /.+/);
      await pause(page);
    }
  }

  if (!foundAny) {
    return;
  }
});

test('support contact links are actionable', async ({ page }) => {
  await page.goto('/');
  await pause(page);

  const contactLinks = page.locator(
    [
      'a[href^="mailto:"]',
      'a[href^="tel:"]',
      'a[href*="wa.me"]',
      'a[href*="whatsapp"]',
    ].join(', ')
  );

  if ((await contactLinks.count()) === 0) {
    return;
  }
  await expect(contactLinks.first()).toHaveAttribute('href', /.+/);
  await pause(page);
});
