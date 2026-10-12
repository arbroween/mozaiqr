import { QRCode } from "./qrcode.js";

function main() {
  const input = document.getElementById("text");
  const file = document.getElementById("image");
  const fileButton = document.getElementById("fileButton");
  const level = document.getElementById("correct-level");
  const button = document.getElementById("submit");
  const output = document.getElementById("output");
  let files;
  let qrcode;

  fileButton.addEventListener("dragenter", e => {
    e.stopPropagation();
    e.preventDefault();
  });
  fileButton.addEventListener("dragover", e => {
    e.stopPropagation();
    e.preventDefault();
  });
  fileButton.addEventListener("drop", e => {
    e.stopPropagation();
    e.preventDefault();

    files = e.dataTransfer.files;
  });

  file.addEventListener("change", function() {
    files = this.files;
  });

  button.addEventListener("click", () => {
    const text = input.value.trim();
    const image = files && files.length > 0 ? URL.createObjectURL(files[0]) : undefined;
    let correctLevel;
    if (level.value === "L") {
      correctLevel = QRCode.CorrectLevel.L;
    } else if (level.value === "Q") {
      correctLevel = QRCode.CorrectLevel.Q;
    } else if (level.value === "H") {
      correctLevel = QRCode.CorrectLevel.H;
    } else {
      correctLevel = QRCode.CorrectLevel.M;
    }
    if (qrcode) {
      qrcode.clear();
    }
    qrcode = new QRCode(output, {
      autoColor: Boolean(image),
      backgroundImage: image,
      correctLevel,
      dotScale: image ? 0.3 : 1.0,
      text: text.length > 0 ? text : "https://example.com",
    });
  });
}

document.addEventListener("DOMContentLoaded", main);
