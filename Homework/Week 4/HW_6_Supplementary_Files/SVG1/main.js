/* use this to test out your function */
window.onload = function() {
  changeColor("de-2", "#c81616");
  changeColor("lt-3", "#16d646");
  changeColor("si-9", "#2993c2");
    changeColor("is-4", "#c2ee0f");
};

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
  document.getElementById(id).style.fill = color;
}
