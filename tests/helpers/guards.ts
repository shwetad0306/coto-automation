import { type Locator } from '@playwright/test';

export async function skipIfMissing(locator: Locator, reason: string): Promise<void> {
  if ((await locator.count()) === 0) {
    return;
  }
}
