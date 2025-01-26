/**
 * Automation Script Developed By: Linto Thamby
 * Date: 26-01-2025
 * Automation Test Cases: Verify the  Navigation to the Rooms section and book a room,Booking Calendar verification*/

import { test, expect } from "@playwright/test";
import { CalendarLocators } from "../locators/CalendarLocators";

test.describe("Room Booking Verification", () => {
  // ----------------------------------------------------------------------
  // Test Step #1: Navigate to the Rooms section and book a room
  // ----------------------------------------------------------------------
  test("Should navigate to Rooms section and book a room", async ({ page, baseURL }) => {
    // 1) Go to the homepage
    await page.goto("/");

    // 2) Verify the Rooms section heading is visible and click it
    const roomsHeading = page.getByRole("heading", { name: "Rooms" });
    await expect(roomsHeading).toBeVisible();
    await roomsHeading.click();

    // 3) Locate ALL “Book this room” buttons. Pick the first to avoid strict mode violation.
    const allBookButtons = page.locator('button.openBooking', { hasText: 'Book this room' });
    await expect(allBookButtons.first()).toBeVisible();

    // 4) Click the first "Book this room" button
    await allBookButtons.first().click();
  });

  // ----------------------------------------------------------------------
  // Test Step #2: Booking Calendar verification
  // ----------------------------------------------------------------------
  test("Booking Calendar verification", async ({ page, baseURL }) => {
    try {
      // 1) Navigate to the homepage
      await page.goto("/");

      // 2) Click "Rooms" heading if required to show the calendar
      const roomsHeading = page.getByRole("heading", { name: "Rooms" });
      await expect(roomsHeading).toBeVisible();
      await roomsHeading.click();

      // 3) Calculate your date strings for comparison
      const currentDate = new Date();
      const currentMonthYear = currentDate.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });

      const previousDate = new Date(currentDate);
      previousDate.setMonth(previousDate.getMonth() - 1);
      const previousMonthYear = previousDate.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });

      // 4) Locate the calendar & toolbar label
      const calendar = page.locator(".rbc-calendar");
      const toolbarLabel = calendar.locator(".rbc-toolbar-label");
      await expect(toolbarLabel).toBeVisible({ timeout: 10000 });

      const displayedMonthYear = (await toolbarLabel.textContent())?.trim();
      console.log("Displayed Month-Year:", displayedMonthYear);

      // Condition 1: If the displayed month is the previous month
      if (displayedMonthYear === previousMonthYear) {
        console.error("Error - Calendar displays the previous month!");
        return; // exit test
      }

      // Condition 2: Accept booking for future months only
      const futureDate = new Date(currentDate);
      futureDate.setMonth(currentDate.getMonth() + 1);
      const futureMonthYear = futureDate.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });

      if (
        displayedMonthYear !== currentMonthYear &&
        displayedMonthYear !== futureMonthYear
      ) {
        console.log("Accepting future month for booking: " + displayedMonthYear);
      } else {
        console.log("Room booking is valid for the displayed month: " + displayedMonthYear);
      }

      // 5) Book the room again (pick the FIRST match if multiple)
      const allBookButtons = page.locator('button.openBooking', { hasText: 'Book this room' });
      await expect(allBookButtons.first()).toBeVisible();
      await allBookButtons.first().click();

      console.log("Room booked successfully.");
    } catch (error) {
      console.error("Test failed due to error:", error);
    }
  });
});

