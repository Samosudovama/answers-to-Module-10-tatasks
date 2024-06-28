const btn = document.querySelector(".j-btn-test");

function toggleIcon(element) {
  element.classList.toggle("active");

  if (element.classList.contains("active")) {
    document.querySelector(".btn_icon_2").style.display = "block";
    document.querySelector(".btn_icon_1").style.display = "none";
  } else {
    document.querySelector(".btn_icon_2").style.display = "none";
    document.querySelector(".btn_icon_1").style.display = "block";
  }
}
