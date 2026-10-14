import { QRCode } from "./qrcode.js";

const DEFAULT_URL = "https://example.com";

function escapeHTML(text) {
  return new Option(text).innerHTML;
}

function main() {
  const text = document.getElementById("text");
  const fileUpload = document.getElementById("file-upload");
  const fileZone = document.getElementById("file-zone");
  const level = document.getElementById("correction-level");
  const submit = document.getElementById("submit");
  const output = document.getElementById("output");
  let files;
  let qrcode = new QRCode(output, {text: DEFAULT_URL});

  function startDragging(event) {
    event.stopPropagation();
    event.preventDefault();
    fileZone.classList.add("dragging");
  }

  function stopDragging(event) {
    event.stopPropagation();
    event.preventDefault();
    fileZone.classList.remove("dragging");
  }

  function uploadFiles(fileList) {
    files = fileList;
    if (files && files.length > 0) {
      const [textNode] = Array.from(fileZone.childNodes)
        .filter(c => c.nodeName === "#text" && c.nodeValue.trim().length > 0);
      if (textNode) {
        textNode.nodeValue = `Sélectionné: ${escapeHTML(files[0].name)}`;
      }
      fileZone.classList.add("has-file");
    }
  }

  fileZone.addEventListener("dragenter", startDragging);
  fileZone.addEventListener("dragover", startDragging);
  fileZone.addEventListener("dragleave", stopDragging);
  fileZone.addEventListener("drop", event => {
    event.stopPropagation();
    event.preventDefault();
    uploadFiles(event.dataTransfer.files);
  });

  fileUpload.addEventListener("change", () => {
    uploadFiles(fileUpload.files);
  });

  submit.addEventListener("click", () => {
    const url = text.value.trim();
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

    qrcode.clear();
    qrcode = new QRCode(output, {
      autoColor: Boolean(image),
      backgroundImage: image,
      correctLevel,
      dotScale: image ? 0.3 : 1.0,
      text: url.length > 0 ? url : DEFAULT_URL,
    });
  });
}

document.addEventListener("DOMContentLoaded", main);
