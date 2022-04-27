// Get element
const inputContainer = document.getElementById("input-container");
const inputTitleEl = document.getElementById("input-title");
const datePickerEl = document.getElementById("date-picker");

const countdownContainer = document.getElementById("countdown-container");
const contdownTitle = document.getElementById("title-info");
const countdownDate = document.querySelectorAll("span");
const countdownBtn = document.getElementById("reset-btn");

const completeContainer = document.getElementById("complete-container");
const completeTitle = document.getElementById("complete-info");
const completeDate = document.getElementById("date-end-number");
const completeBtn = document.getElementById("complete-btn");
// Variable
let inputTitle;
let inputDate;
let dateValue = Date;
let countdownActive;
let saveCountdown;

// Non function
const today = new Date().toJSON().slice("0", "10");
datePickerEl.setAttribute("min", today);

// Event
inputContainer.addEventListener("submit", pullDate);
countdownBtn.addEventListener("click", resetDom);
completeBtn.addEventListener("click", resetDom);

// Function
// ดึงข้อมูลที่กรอกจากฟอร์ม
function pullDate(event) {
  event.preventDefault();
  inputTitle = event.srcElement[0].value;
  inputDate = event.srcElement[1].value;

  console.log(inputDate);
  console.log(today);
  if (inputTitle === "" || inputDate === "") {
    Swal.fire({
      icon: "error",
      title: "หยุดก่อน!",
      text: "โปรดกรอกข้อมูลให้ครบ",
    });
  } else {
    dateValue = new Date(inputDate).getTime();
    console.log("Title", inputTitle, "inputDate", inputDate);
    console.log("getTime", dateValue);
    inputContainer.hidden = true;

    // สร้าง obj เก็บค่า ชื่อเรื่อง และ วันที่
    saveCountdown = {
      title: inputTitle,
      date: inputDate,
    };
    // เก็บข้อมูลลงใน localstorage
    localStorage.setItem("CountDown", JSON.stringify(saveCountdown));
    updateDom();
  }
}

// อัพเดท DOM ให้เริ่มนับถอยหลัง
function updateDom() {
  inputContainer.hidden = true;
  countdownActive = setInterval(function () {
    countdownContainer.hidden = false;
    const now = new Date().getTime();
    let distance = dateValue - now;
    contdownTitle.textContent = inputTitle;
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;

    if (distance < 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "เสร็จสิ้น",
        showConfirmButton: false,
        timer: 1500,
      });
      countdownContainer.hidden = true;
      completeTitle.textContent = inputTitle;
      inputDate = new Date(inputDate).toLocaleDateString();
      completeDate.textContent = inputDate;
      completeContainer.hidden = false;
      clearInterval(countdownActive);
    } else {
      const years = Math.floor(distance / year);
      const days = Math.floor(distance / day);
      const hours = Math.floor((distance % day) / hour);
      const minutes = Math.floor((distance % hour) / minute);
      const seconds = Math.floor((distance % minute) / second);

      countdownDate[0].textContent = days;
      countdownDate[1].textContent = hours;
      countdownDate[2].textContent = minutes;
      countdownDate[3].textContent = seconds;
    }
  }, 1000);
}

// รีเซ็ตการตั้งเวลา
function resetDom() {
  inputTitle = "";
  inputDate = "";
  dateValue = Date;
  clearInterval(countdownActive);
  localStorage.clear();
  location.reload();
}

// แสดงนับถอยหลัง
function activeCountdown() {
  if (localStorage.getItem("CountDown")) {
    saveCountdown = JSON.parse(localStorage.getItem("CountDown"));
    inputTitle = saveCountdown.title;
    inputDate = saveCountdown.date;
    dateValue = new Date(inputDate).getTime();
    updateDom();
  }
}

// เริ่มเมื่อโหลดหน้าต่าง
activeCountdown();
