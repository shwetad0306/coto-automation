import type { Page } from '@playwright/test';

const stepDelayMs = Number(process.env.COTO_STEP_DELAY_MS ?? 400);

export async function pause(page: Page): Promise<void> {
  if (stepDelayMs <= 0) {
    return;
  }
  await page.waitForTimeout(stepDelayMs);
}
