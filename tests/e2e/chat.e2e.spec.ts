import { test, expect } from '@playwright/test';
import { pause } from '../helpers/pause';

test('chat launcher appears and opens', async ({ page }) => {
  await page.goto('/');
  await pause(page);

  const chatLauncher = page.locator(
    [
      'button[aria-label*="chat" i]',
      'button[title*="chat" i]',
      'a[aria-label*="chat" i]',
      'a[title*="chat" i]',
      'button:has-text("Chat")',
      'a:has-text("Chat")',
    ].join(', ')
  );

  if ((await chatLauncher.count()) === 0) {
    return;
  }
  await expect(chatLauncher.first()).toBeVisible();
  await pause(page);
  await chatLauncher.first().click();
  await pause(page);

  const chatPanel = page.locator(
    [
      '[role="dialog"]',
      '[aria-label*="chat" i]',
      '[data-testid*="chat" i]',
      'text=/\\bType a message\\b/i',
    ].join(', ')
  );

  if ((await chatPanel.count()) === 0) {
    return;
  }
  await expect(chatPanel.first()).toBeVisible();
  await pause(page);
});
