export const bookingXpath = {
roomBooking: {
    roomsTitleHeading: "//div[@class='container-fluid']//h2[text()='Rooms']",
   // roomsTitleHeading: "//h2[text()='Rooms']",
    bookThisRoomButton: "//button[contains(text(),'Book this room')]",
    dateButton: "//button[not(contains(@class,'rbc-event-content'))]",
    firstNameInput: "//input[@class='room-firstname']",
    lastNameInput: "//input[@class='room-lastname']",
    emailInput: "//input[@class='room-email']",
    phoneInput: "//input[@class='room-phone']",
    bookButton: "//button[contains(@class,'book-room') and text()='Book']",
    confirmationModal: "//div[contains(@class,'confirmation-modal')]",
    bookingSuccessHeading: "//h3[text()='Booking Successful!']",
    closeButton: "//button[text()='Close']",
    },
}
