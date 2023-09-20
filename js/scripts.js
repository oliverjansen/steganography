function handleFileSelect(evt) {
  var original = document.getElementById("original"),
    stego = document.getElementById("stego"),
    img = document.getElementById("img"),
    cover = document.getElementById("cover"),
    message = document.getElementById("message");
  if (!original || !stego) return;

  var files = evt.target.files; // FileList object

  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; (f = files[i]); i++) {
    // Only process image files.
    if (!f.type.match("image.*")) {
      continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function (theFile) {
      return function (e) {
        img.src = e.target.result;
        img.title = escape(theFile.name);
        stego.className = "half invisible";
        cover.src = "";
        message.innerHTML = "";
        message.parentNode.className = "invisible";
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}

function encode() {
  var uploadSection = document.getElementById("upload-section");
  var messageSection = document.getElementById("message-section");
  var hide = document.getElementById("hide");
  var read = document.getElementById("read");
  uploadSection.style.display = "block";
  messageSection.style.display = "block";
  hide.style.display = "block";
  read.style.display = "none";
  document.getElementById("file").value = "";
  document.getElementById("messageArea").style.display = "none";
}

function decode() {
  var uploadSection = document.getElementById("upload-section");
  var messageSection = document.getElementById("message-section");
  var hide = document.getElementById("hide");
  var read = document.getElementById("read");

  uploadSection.style.display = "block";
  messageSection.style.display = "none";
  hide.style.display = "none";
  read.style.display = "block";
  document.getElementById("stego").style.display = "none";
  document.getElementById("cover").value = "";
  document.getElementById("file").value = "";
  document.getElementById("text").value = "";
}

function hide() {
  var stego = document.getElementById("stego"),
    img = document.getElementById("img"),
    cover = document.getElementById("cover"),
    message = document.getElementById("message"),
    textarea = document.getElementById("text"),
    download = document.getElementById("download");

  var TextToBinary = textToBinary(textarea.value);

  console.log(TextToBinary);

  if (
    document.getElementById("file").files.length != 0 &&
    textarea.value != ""
  ) {
    if (img && TextToBinary) {
      document.getElementById("stego").style.display = "block";

      cover.src = steg.encode(TextToBinary, img);
      stego.className = "half";
      message.innerHTML = "";
      message.parentNode.className = "invisible";
      download.href = cover.src.replace("image/png", "image/octet-stream");
    }
  } else {
    if (document.getElementById("file").files.length == 0) {
      alert("Insert Image. ");
    } else {
      alert("Insert Message. ");
    }
  }
}

function read() {
  var img = document.getElementById("img"),
    cover = document.getElementById("cover"),
    message = document.getElementById("message"),
    textarea = document.getElementById("text");
  if (document.getElementById("file").files.length != 0) {
    if (img && textarea) {
      document.getElementById("messageArea").style.display = "block";

      message.innerHTML = binaryToText(steg.decode(img));
      if (message.innerHTML !== "") {
        message.parentNode.className = "";
        textarea.value = binaryToText(message.innerHTML);
        document.getElementById("file").value = "";
      } else {
        alert("No hidden message.");
        document.getElementById("file").value = "";
      }
    }
  } else {
  }
}

function textToBinary(string) {
  var decimalArray = [];
  for (i = 0; i < string.length; i++) {
    decimalArray.push(string.charCodeAt(i));
  }

  var binaryArray = [];
  for (i = 0; i < decimalArray.length; i++) {
    binaryArray.push([]);
    var currentNumber = decimalArray[i];
    if (currentNumber >= 128) {
      binaryArray[i].push(1);
      currentNumber -= 128;
    } else {
      binaryArray[i].push(0);
    }
    if (currentNumber >= 64) {
      binaryArray[i].push(1);
      currentNumber -= 64;
    } else {
      binaryArray[i].push(0);
    }
    if (currentNumber >= 32) {
      binaryArray[i].push(1);
      currentNumber -= 32;
    } else {
      binaryArray[i].push(0);
    }
    if (currentNumber >= 16) {
      binaryArray[i].push(1);
      currentNumber -= 16;
    } else {
      binaryArray[i].push(0);
    }
    if (currentNumber >= 8) {
      binaryArray[i].push(1);
      currentNumber -= 8;
    } else {
      binaryArray[i].push(0);
    }
    if (currentNumber >= 4) {
      binaryArray[i].push(1);
      currentNumber -= 4;
    } else {
      binaryArray[i].push(0);
    }
    if (currentNumber >= 2) {
      binaryArray[i].push(1);
      currentNumber -= 2;
    } else {
      binaryArray[i].push(0);
    }
    if (currentNumber >= 1) {
      binaryArray[i].push(1);
      currentNumber -= 1;
    } else {
      binaryArray[i].push(0);
    }

    binaryArray[i] = binaryArray[i].join("");
  }

  var binaryString = binaryArray.join(" ");
  return binaryString;
}

function binaryToText(binaryString) {
  var byteArray = binaryString.split(" ");
  var decimalArray = [];

  for (i = 0; i < byteArray.length; i++) {
    var decimalValue = 0;
    if (byteArray[i][0] == 1) {
      decimalValue += 128;
    }
    if (byteArray[i][1] == 1) {
      decimalValue += 64;
    }
    if (byteArray[i][2] == 1) {
      decimalValue += 32;
    }
    if (byteArray[i][3] == 1) {
      decimalValue += 16;
    }
    if (byteArray[i][4] == 1) {
      decimalValue += 8;
    }
    if (byteArray[i][5] == 1) {
      decimalValue += 4;
    }
    if (byteArray[i][6] == 1) {
      decimalValue += 2;
    }
    if (byteArray[i][7] == 1) {
      decimalValue += 1;
    }
    decimalArray.push(decimalValue);
  }

  var characterArray = [];
  for (i = 0; i < decimalArray.length; i++) {
    characterArray.push(String.fromCharCode(decimalArray[i]));
  }

  var textString = characterArray.join("");
  return textString;
}

window.onload = function () {
  document.getElementById("stego").style.display = "none";
  document.getElementById("messageArea").style.display = "none";

  document
    .getElementById("file")
    .addEventListener("change", handleFileSelect, false);
  document.getElementById("hide").addEventListener("click", hide, false);
  document.getElementById("read").addEventListener("click", read, false);
};
