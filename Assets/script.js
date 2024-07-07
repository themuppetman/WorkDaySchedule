$(function () {
  // Set local settings if needed
  const localSettings = {};
  dayjs.locale(localSettings);

  // Get the current hour in 24-hour time using Day.js
  const currentHour = dayjs().hour();

  // A function to change the color of the time-blocks based on past, present, or future
  function hourlyColor() {
    $(".time-block").each(function () {
      const blockHour = parseInt(this.id.split("-")[1]);
      $(this).toggleClass("past", blockHour < currentHour);
      $(this).toggleClass("present", blockHour === currentHour);
      $(this).toggleClass("future", blockHour > currentHour);
    });
  }

  // Function to save user input in local storage only when the save button is clicked
  function textSave() {
    $(".saveBtn").on("click", function () {
      const key = $(this).parent().attr("id");
      const value = $(this).siblings(".description").val();
      localStorage.setItem(key, value);
      $(this).addClass("saved");
      setTimeout(() => {
        $(this).removeClass("saved");
      }, 500);
    });
  }

  // Load saved data from local storage
  function loadSavedData() {
    $(".time-block").each(function () {
      const key = $(this).attr("id");
      const savedValue = localStorage.getItem(key);
      if (savedValue) {
        $(this).find(".description").val(savedValue);
      }
    });
  }

  // Function to display the current date and time in the header of the page
  function updateTime() {
    const dateElement = $("#currentDay");
    const timeElement = $("#currentTime");
    const currentDay = dayjs().format("dddd, MMMM D, YYYY");
    const currentTime = dayjs().format("h:mm:ss A");
    dateElement.text(currentDay);
    timeElement.text(currentTime);
  }

  // Call main functions to run
  hourlyColor();
  textSave();
  loadSavedData();

  // Call updateTime once per second to update the time in the header
  setInterval(updateTime, 1000);
});
