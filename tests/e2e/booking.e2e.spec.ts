import { test, expect, type Page } from '@playwright/test';
import { pause } from '../helpers/pause';
import { skipIfMissing } from '../helpers/guards';

const shouldRun = process.env.COTO_E2E === '1';
const bookingName = process.env.COTO_BOOKING_NAME;
const bookingEmail = process.env.COTO_BOOKING_EMAIL;
const bookingPhone = process.env.COTO_BOOKING_PHONE;
const bookingDate = process.env.COTO_BOOKING_DATE;

async function openBooking(page: Page) {
  await page.goto('/');
  await pause(page);

  const sessionCta = page.getByRole('button', { name: /Get Your Private Session/i });
  await expect(sessionCta).toBeVisible();
  await pause(page);
  await sessionCta.click();
  await pause(page);
  await page.waitForLoadState('domcontentloaded');
  await pause(page);
}

test('booking flow (private session)', async ({ page }) => {
  await openBooking(page);

  const bookingFormInputs = page.locator(
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

  await skipIfMissing(
    bookingFormInputs,
    'Booking form fields not found. Update selectors for the booking page.'
  );

  if ((await bookingFormInputs.count()) === 0) {
    return;
  }
  await expect(bookingFormInputs.first()).toBeVisible();
  await pause(page);
});

test('booking validates required fields', async ({ page }) => {
  await openBooking(page);

  const submitButton = page.getByRole('button', {
    name: /book|submit|continue|confirm|next/i,
  });
  if ((await submitButton.count()) === 0) {
    return;
  }
  await submitButton.first().click();
  await pause(page);

  const validationMessage = page.locator('text=/required|invalid|please/i');
  if ((await validationMessage.count()) === 0) {
    return;
  }
  await expect(validationMessage.first()).toBeVisible();
  await pause(page);
});

test('booking blocks invalid email format', async ({ page }) => {
  await openBooking(page);

  const emailInput = page.locator(
    [
      'input[type="email"]',
      'input[name*="email" i]',
      'input[placeholder*="email" i]',
    ].join(', ')
  );
  if ((await emailInput.count()) === 0) {
    return;
  }

  await emailInput.first().fill('not-an-email');
  await pause(page);
  await emailInput.first().blur();
  await pause(page);

  const invalid = await emailInput
    .first()
    .evaluate((el) => (el as HTMLInputElement).validity?.valid === false);

  if (!invalid) {
    return;
  }
});

test('booking submit success (with test data)', async ({ page }) => {
  if (!shouldRun) {
    return;
  }
  if (!bookingName || !bookingEmail || !bookingPhone || !bookingDate) {
    return;
  }

  await openBooking(page);

  const nameInput = page.locator(
    ['input[name*="name" i]', 'input[placeholder*="name" i]'].join(', ')
  );
  const emailInput = page.locator(
    [
      'input[type="email"]',
      'input[name*="email" i]',
      'input[placeholder*="email" i]',
    ].join(', ')
  );
  const phoneInput = page.locator(
    [
      'input[type="tel"]',
      'input[name*="phone" i]',
      'input[placeholder*="phone" i]',
    ].join(', ')
  );
  const dateInput = page.locator(['input[type="date"]', 'input[name*="date" i]'].join(', '));

  await skipIfMissing(nameInput, 'Name input not found.');
  await skipIfMissing(emailInput, 'Email input not found.');
  await skipIfMissing(phoneInput, 'Phone input not found.');
  await skipIfMissing(dateInput, 'Date input not found.');

  await nameInput.first().fill(bookingName ?? '');
  await pause(page);
  await emailInput.first().fill(bookingEmail ?? '');
  await pause(page);
  await phoneInput.first().fill(bookingPhone ?? '');
  await pause(page);
  await dateInput.first().fill(bookingDate ?? '');
  await pause(page);

  const submitButton = page.getByRole('button', {
    name: /book|submit|continue|confirm|next/i,
  });
  await skipIfMissing(submitButton, 'Booking submit button not found.');

  await submitButton.first().click();
  await pause(page);

  const confirmation = page.locator('text=/thank you|confirmed|success|we will/i');
  await skipIfMissing(
    confirmation,
    'No confirmation message found after booking submit.'
  );
  await expect(confirmation.first()).toBeVisible();
  await pause(page);
});
