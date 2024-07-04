// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

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
    });
  }

  // Function to refresh the color of the time-blocks based on past(red), present(blue), or future(green)
  function refresh() {
    $(".time-block").each(function () {
      const blockHour = parseInt(this.id.split("-")[1]);
      if (blockHour == currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else {
        $(this).removeClass("past present").addClass("future");
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
  refresh();

  // Call updateTime once per second to update the time in the header
  setInterval(updateTime, 1000);
});
