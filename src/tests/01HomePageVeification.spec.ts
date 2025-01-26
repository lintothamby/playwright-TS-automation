import { test, expect } from "@playwright/test";
import { XpathLocators } from "../locators/XpathLocators";
let firstButtonText: string | null = null;
test.describe("Restful Booker Platform Tests", () => {
    test("Verify homepage", async ({ page,baseURL }) => {
      // Navigate to homepage
      await page.goto("/");
      
      // Verify title
      await expect(page).toHaveTitle(XpathLocators.homepage.title);
  
      // Verify headings
      const headingH1 = page.locator(XpathLocators.homepage.headingH1);
      await expect(headingH1).toBeVisible();
  
      const headingH4 = page.locator(XpathLocators.homepage.headingH4);
      await expect(headingH4).toBeVisible();
  
      // Verify images in jumbotron
      const images = page.locator(XpathLocators.homepage.imagesInJumbotron);
      await expect(images).toHaveCount(4); // Assuming there are 4 images
  
      // Verify primary button
      const primaryButton = page.locator(XpathLocators.homepage.buttonPrimary);
      await expect(primaryButton).toBeVisible();
    });
  
    test("Verify hotel information", async ({ page }) => {
      // Navigate to homepage
      await page.goto("/");
  
      // Verify hotel image
      const hotelImage = page.locator(XpathLocators.hotelInformation.hotelImage);
      await expect(hotelImage).toBeVisible();
  
      // Verify "Rooms" text
      const roomsText = page.locator(XpathLocators.hotelInformation.roomsText);
      await expect(roomsText).toBeVisible();
  });
test.describe("Restful Booker Platform - Hotel Room Information", () => {
  test("Store, filter, and compare room types and buttons dynamically", async ({ page }) => {
    // Navigate to the homepage (baseURL is automatically prepended)
    await page.goto("/");

    // Wait for the page to fully load
    await page.waitForLoadState("networkidle");

    // Verify "Rooms" text is visible
    const roomsText = page.locator(XpathLocators.hotelInformation.roomsText);
    await expect(roomsText).toBeVisible();

    // Locate all <h3> elements with room types
    const roomTypeElements = page.locator(XpathLocators.hotelInformation.roomHeadings);
    const roomCount = await roomTypeElements.count();

    // Debugging: Log the number of <h3> elements found
    console.log(`Number of room types found: ${roomCount}`);

    // Initialize arrays to store room types and "Book this room" button statuses
    let roomTypes: string[] = [];
    let bookButtonsAvailable: boolean[] = [];

    // Fetch the text content of all <h3> elements and corresponding button visibility
    for (let i = 0; i < roomCount; i++) {
      const roomType = await roomTypeElements.nth(i).innerText();
      roomTypes.push(roomType.trim());

      // Locate the "Book this room" button for the current room
      const bookButton = page.locator(XpathLocators.hotelInformation.roomInfoRows)
        .nth(i)
        .locator("button:has-text('Book this room')");

      const isButtonVisible = await bookButton.isVisible();
      bookButtonsAvailable.push(isButtonVisible);

      // Store the text of the first button in the global variable
      if (i === 0 && isButtonVisible) {
        firstButtonText = await bookButton.innerText();
      }
    }

    // Filter and log room types
    const uniqueRoomTypes = [...new Set(roomTypes)];
    console.log(`Unique Room Types: ${uniqueRoomTypes.join(" / ")}`);

    if (uniqueRoomTypes.length === 1) {
      console.log(`All rooms are of the same type: ${uniqueRoomTypes[0]}`);
    } else {
      console.log(`Available Room Types: ${uniqueRoomTypes.join(" / ")}`);
    }

    // Filter "Book this room" buttons and log statuses
    const roomsWithButtons = roomTypes.filter((_, index) => bookButtonsAvailable[index]);
    console.log(`Rooms with 'Book this room' button: ${roomsWithButtons.join(" / ")}`);

    const roomsWithoutButtons = roomTypes.filter((_, index) => !bookButtonsAvailable[index]);
    console.log(`Rooms without 'Book this room' button: ${roomsWithoutButtons.join(" / ")}`);

    // Log the first button's text value
    console.log(`Text of the first 'Book this room' button: ${firstButtonText}`);

    // Assert that the room types array is not empty
    expect(roomTypes.length).toBeGreaterThan(0);

    // Assert that the first button text is stored
    expect(firstButtonText).not.toBeNull();
  });
});
test.describe("Restful Booker Platform - Contact Us Section Tests", () => {
        test("Verify Contact Us section form elements", async ({ page }) => {
          // Navigate to the homepage
          await page.goto("/");
      
          // Verify the visibility of the Name input text box
          const nameInput = page.locator(XpathLocators.contactUs.nameInput);
          await expect(nameInput).toBeVisible();
      
          // Verify the visibility of the Email input text box
          const emailInput = page.locator(XpathLocators.contactUs.emailInput);
          await expect(emailInput).toBeVisible();
      
          // Verify the visibility of the Contact Phone text box
          const phoneInput = page.locator(XpathLocators.contactUs.phoneInput);
          await expect(phoneInput).toBeVisible();
      
          // Verify the visibility of the Subject input text box
          const subjectInput = page.locator(XpathLocators.contactUs.subjectInput);
          await expect(subjectInput).toBeVisible();
      
          // Verify the visibility of the Message textarea
          const messageTextarea = page.locator(XpathLocators.contactUs.messageTextarea);
          await expect(messageTextarea).toBeVisible();
      
          // Verify the visibility of the Submit button
          const submitButton = page.locator(XpathLocators.contactUs.submitButton);
          await expect(submitButton).toBeVisible();
        });
      });
  
    test("Verify footer", async ({ page }) => {
      // Navigate to homepage
      await page.goto("/");
  
      // Verify footer visibility
      const footer = page.locator(XpathLocators.footer.footerId);
      await expect(footer).toBeVisible();
  
      // Verify footer text
      const footerText = page.locator(XpathLocators.footer.footerText);
      await expect(footerText).toBeVisible();
    });
  });
