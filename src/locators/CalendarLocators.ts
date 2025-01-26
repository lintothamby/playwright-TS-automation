// Calendar Elements  Xpaths

export const CalendarLocators = {
    // Use a simple CSS locator for the main <div class="rbc-calendar">
    calendarContainer: '.rbc-calendar',
  
    // Then use relative XPaths for elements INSIDE that container
    // The leading "." in .// means "search inside the already-located parent"
    calendarHeader: 'xpath=.//span[contains(@class,"rbc-toolbar-label")]',
    todayButton:    'xpath=.//button[normalize-space(text())="Today"]',
    backButton:     'xpath=.//button[normalize-space(text())="Back"]',
    nextButton:     'xpath=.//button[normalize-space(text())="Next"]',
  };
  
  