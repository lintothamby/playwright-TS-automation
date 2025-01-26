import { test, expect } from "@playwright/test";

test.describe("Homepage Tests", () => {
  test("Should load homepage with correct title", async ({ page,baseURL }) => {
    // Navigate to the homepage using relative path
    await page.goto("/");
    await expect(page).toHaveTitle("Restful-booker-platform demo");
    //await expect(page.locator("text=Welcome to the Restful Booker Platform")).toBeVisible();
    await page.getByRole('heading', { name: 'Welcome to Restful Booker' })
});

test("Should navigate to Rooms section and book a room", async ({ page, baseURL }) => {
    // Navigate to the homepage using the base URL
    await page.goto("/");
  
    // Verify the Rooms section heading and click on it
    const roomsHeading = page.getByRole('heading', { name: 'Rooms' });
    await expect(roomsHeading).toBeVisible();
    await roomsHeading.click();
  
    // Book the first room
    //const roomSection = page.locator('.room').nth(0); // Target the first room section
    await page.getByRole('button', { name: 'Book this room' }).click();
    await expect(page.locator('.fa').first()).toBeVisible();
    await page.getByRole('button', { name: 'Book', exact: true }).click();
    await page.getByRole('heading', { name: 'single' }).click();
    await expect(page.locator('.fa').first()).toBeVisible();
    await page.getByRole('button', { name: 'Book', exact: true }).click();
    await page.getByText('CancelBook').click();
    await page.getByText('January').click();
    await page.getByText('January').click();
  });

});
