import { test, expect } from '@playwright/test';
import { pause } from '../helpers/pause';

test('form fields have accessible names', async ({ page }) => {
  await page.goto('/');
  await pause(page);

  const fields = page.locator('input, select, textarea');
  if ((await fields.count()) === 0) {
    return;
  }

  const count = await fields.count();
  for (let i = 0; i < count; i += 1) {
    const field = fields.nth(i);
    if (!(await field.isVisible())) {
      continue;
    }
    await expect(field).toHaveAccessibleName(/.+/);
    await pause(page);
  }
});
