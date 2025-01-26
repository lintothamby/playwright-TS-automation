export const XpathLocators = {
    homepage: {
      title: "Restful-booker-platform demo",
      headingH1: "//h1[text()='Welcome to Restful Booker Platform']",
      headingH4: "//h4[text()='Your one stop shop to practise Software Testing!']",
      imagesInJumbotron: "//div[@class='jumbotron']//img",
      buttonPrimary: "//button[contains(@class, 'btn btn-primary')]",
    },
    hotelInformation: {
      containerFluid: "//div[@class='container-fluid']",
      hotelImage: "//div[@class='container-fluid']//img[contains(@class, 'hotel-logoUrl')]",
      roomHeadings: "//div[@class='container-fluid']//div[contains(@class, 'row hotel-room-info')]//h3",
      roomInfoRows: "//div[@class='container-fluid']//div[contains(@class, 'row hotel-room-info')]",
      roomsText: "//div[@class='container-fluid']//h2[text()='Rooms']",
      roomsAvailableText: "Rooms available",
      //roomInfoRows: "//div[@class='row hotel-room-info']", // All rows containing room info
      roomTypeHeading: ".//h3", // Relative path to <h3> within a single room row
      wheelchairIcon: ".//span[contains(@class, 'fa fa-wheelchair wheelchair')]", // Relative path to wheelchair icon
    },
    roomBooking: {
    roomsTitleHeading: "//div[@class='container-fluid']//h2[text()='Rooms']",
    bookThisRoomButton: "//button[contains(text(),'Book this room')]",
    dateButton: "//button[not(contains(@class,'rbc-event-content'))]",
    firstNameInput: "//div[@class='input-group mb-3 room-booking-form']//input[@class='form-control room-firstname']",
    lastNameInput: "//div[@class='input-group mb-3 room-booking-form']//input[@class='form-control room-lastname']",
    emailInput: "//div[@class='input-group mb-3']//input[@class='form-control room-email']",
    phoneInput: "//div[@class='input-group mb-3']//input[@class='form-control room-phone']",
    bookButton: "//div[@class='input-group mb-3 room-booking-form']//button[contains(@class,'book-room') and text()='Book']",
    confirmationModal: "//div[contains(@class,'ReactModalPortal')]//div[contains(@class,'ReactModal__Overlay ReactModal__Overlay--after-open')]",
    bookingSuccessHeading: "//div[@class='col-sm-6 text-center']//h3[text()='Booking Successful!']",
    closeButton: "//div[@class='col-sm-12 text-center']//button[contains(@class,'btn-outline-primary') and text()='Close']",
        },
    contactUs: {
      contactSection: "//div[@class='row contact']",
      nameInput: "//input[@data-testid='ContactName']",
      emailInput: "//input[@data-testid='ContactEmail']",
      phoneInput: "//input[@data-testid='ContactPhone']",
      subjectInput: "//input[@data-testid='ContactSubject']",
      messageTextarea: "//textarea[@data-testid='ContactDescription']",
      submitButton: "//button[@id='submitContact']",
      contactAddress: "//div[@class='col-sm-5']//p",
    },
    mapSection: {
      mapContainer: "//div[@class='map']",
    },
    footer: {
      footerId: "//footer[@id='footer']",
      footerText: "//footer[@id='footer']//p",
    },
  };
  