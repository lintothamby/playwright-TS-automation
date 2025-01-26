import { test, expect } from '@playwright/test';
import { CalendarLocators } from '../locators/CalendarLocators';

test.describe('Calendar Navigation Verification', () => {
  test('Verify calendar default behavior and navigation buttons', async ({ page }) => {
    // 1) Navigate to the homepage
    await page.goto('/');

    // 2) Click "Rooms" so we can see multiple "Book this room" buttons
    const roomsHeading = page.getByRole('heading', { name: 'Rooms' });
    await expect(roomsHeading).toBeVisible();
    await roomsHeading.click();

    // 3) Click the FIRST "Book this room" button to reveal the calendar
    //    This is necessary if the calendar only appears after booking action.
    const allBookButtons = page.locator('button.openBooking', { hasText: 'Book this room' });
    await expect(allBookButtons.first()).toBeVisible();
    await allBookButtons.first().click();

    // 4) Now wait for the .rbc-calendar to appear
    //    Increase timeout if your environment is slow
    await expect(page.locator('.rbc-calendar')).toBeVisible({ timeout: 10000 });

    // 5) Locate the main calendar container from CalendarLocators
    const calendarContainer = page.locator(CalendarLocators.calendarContainer);
    // Confirm it's visible
    await expect(calendarContainer).toBeVisible();

    // 6) Build child locators for the header & nav buttons
    const calendarHeader = calendarContainer.locator(CalendarLocators.calendarHeader);
    const todayButton = calendarContainer.locator(CalendarLocators.todayButton);
    const backButton = calendarContainer.locator(CalendarLocators.backButton);
    const nextButton = calendarContainer.locator(CalendarLocators.nextButton);

    // 7) Verify they are visible
    await expect(calendarHeader).toBeVisible();
    await expect(todayButton).toBeVisible();
    await expect(backButton).toBeVisible();
    await expect(nextButton).toBeVisible();

    // 8) Optional: Check default month
    const currentDate = new Date();
    const currentMonthYear = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    await expect(calendarHeader).toHaveText(currentMonthYear);
    console.log(`Verified: Default calendar displays ${currentMonthYear}`);
    console.log(await page.content());
    // e.g. Test “Back”, “Today”, “Next” as before
    // ...
  });
});
