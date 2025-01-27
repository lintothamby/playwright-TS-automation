/**
 * Automation Script Developed By: Linto Thamby
 * Date: 26-01-2025
 * Automation Test Cases: Verify the  drag-select valid dates, fill booking form, and verify success message*/

import { test, expect } from '@playwright/test';

test('drag-select valid dates, fill booking form, and verify success message', async ({ page }) => {
  // 1. Go to the homepage (or the page containing your calendar).
  await page.goto('/');

  // 2. Verify the Rooms section heading is visible and click it.
  const roomsTitleHeading = page.getByRole('heading', { name: 'Rooms' });
  await expect(roomsTitleHeading).toBeVisible();
  await roomsTitleHeading.click();

  // 3. Pick the first "Book this room" button if multiple exist.
  const roomBookButtons = page.locator('button', { hasText: 'Book this room' });
  await expect(roomBookButtons.first()).toBeVisible();
  await roomBookButtons.first().click();

  // 4. Identify all date-cell buttons excluding “Unavailable.”
  const allDateButtons = page.getByRole('button').filter({
    hasNot: page.locator('.rbc-event-content', { hasText: 'Unavailable' }),
  });

  // 5. Pick two valid date buttons to drag between.
  const startDateButton = allDateButtons.nth(0);
  const endDateButton = allDateButtons.nth(2);

  // 6. Drag from the start date to the end date.
  const startBox = await startDateButton.boundingBox();
  const endBox = await endDateButton.boundingBox();
  if (!startBox || !endBox) {
    throw new Error('Could not locate bounding boxes for start or end date!');
  }

  await page.mouse.move(
    startBox.x + startBox.width / 2,
    startBox.y + startBox.height / 2
  );
  await page.mouse.down();
  await page.mouse.move(
    endBox.x + endBox.width / 2,
    endBox.y + endBox.height / 2,
    { steps: 10 }
  );
  await page.mouse.up();

  // 7. Fill the booking form inputs.
  await page.locator('.room-firstname').fill('John');
  await page.locator('.room-lastname').fill('Doe');
  await page.locator('.room-email').fill('john.doe@example.com');
  await page.locator('.room-phone').fill('+1 555 123 4567');

  // 8. Click the "Book" button on the form.
  await page.locator('button.book-room', { hasText: 'Book' }).click();

  // 9. Verify the "Booking Successful!" message.
  //    Because the success modal shows <h3>Booking Successful!</h3>, we can use any
  //    of the following approaches:
  //    - A direct heading locator by text
  //    - Or verifying the modal element's presence and text
  //    - Or checking for the text "Congratulations! Your booking has been confirmed for:" etc.
  const successModal = page.locator('.confirmation-modal'); // the modal container
  await expect(successModal).toBeVisible();

  // Check specifically for the heading text
  const bookingSuccessHeading = successModal.getByRole('heading', { name: 'Booking Successful!' });
  await expect(bookingSuccessHeading).toBeVisible();

  // Optionally, check the date range text
  await expect(successModal).toContainText('Congratulations! Your booking has been confirmed for:');
  //await expect(successModal).toContainText('2025-01-23 - 2025-02-01');

  // 10. (Optional) click the "Close" button to dismiss the modal
  await successModal.getByRole('button', { name: 'Close' }).click();

  // 11. (Optional) verify that the modal disappears
  await expect(successModal).toBeHidden();
});
