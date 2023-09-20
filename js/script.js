// Section 1: For file choose

let choose_img_Btn = document.querySelector(".choose_img button");
let choose_Input = document.querySelector(".choose_img input");

// This method help us to choose image from choose btn to choose hidden button
choose_img_Btn.addEventListener("click", () => choose_Input.click());

// Section 2: dispaly the choosen image
let imgSrc = document.querySelector(".view_img img");
choose_Input.addEventListener("change", () => {
  let file = choose_Input.files[0];
  if (!file) return; //If there is not anything on the file then return null
  imgSrc.src = URL.createObjectURL(file); //this method display the image

  //After load the image on the side then enabled the editing functionality
  imgSrc.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disabled");
  });
});

//Section 3: Show which filter is active
let filter_buttons = document.querySelectorAll(".icons_room button");
let slider = document.querySelector(".slider input");
let filter_name = document.querySelector(".filter_info .name");
let slider_value = document.querySelector(".filter_info .value");

let brightness = 100,
  contrast = 100,
  saturate = 100,
  invert = 0,
  blur = 0;

filter_buttons.forEach((element) => {
  element.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");
    element.classList.add("active");
    filter_name.innerText = element.id;
    if (element.id === "brightness") {
      slider.max = "200";
      slider.value = brightness;
      slider_value.innerText = `${brightness}`;
    } else if (element.id === "contrast") {
      slider.max = "200";
      slider.value = contrast;
      slider_value.innerText = `${contrast}`;
    } else if (element.id === "contrast") {
      slider.max = "200";
      slider.value = saturate;
      slider_value.innerText = `${saturate}`;
    } else if (element.id === "invert") {
      slider.max = "100";
      slider.value = invert;
      slider_value.innerText = `${invert}`;
    } else if (element.id === "blur") {
      slider.max = "100";
      slider.value = blur;
      slider_value.innerText = `${blur}`;
    }
  });
});

slider.addEventListener("input", () => {
  slider_value.innerText = `${slider.value}%`;
  let sliderState = document.querySelector(".icons_room .active");
  if (sliderState.id === "brightness") {
    brightness = slider.value;
  } else if (sliderState.id === "contrast") {
    contrast = slider.value;
  } else if (sliderState.id === "saturate") {
    saturate = slider.value;
  } else if (sliderState.id === "invert") {
    invert = slider.value;
  } else if (sliderState.id === "blur") {
    blur = slider.value;
  }
  imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
});

// Section 4: Rotate the image by left, right, x-axis and y-axis
let rotate_btns = document.querySelectorAll(".icons_room1 button");
let rotate = 0,
  flip_x = 1,
  flip_y = 1;

rotate_btns.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.id === "rotate_left") {
      rotate -= 90;
    } else if (element.id === "rotate_right") {
      rotate += 90;
    } else if (element.id === "flip_x") {
      flip_x = flip_x === 1 ? -1 : 1;
    } else if (element.id === "flip_y") {
      flip_y = flip_y === 1 ? -1 : 1;
    }

    imgSrc.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`;
  });
});

// Reset the edit
let reset = document.querySelector(".reset");

reset.addEventListener("click", () => {
  brightness = "100";
  saturate = "100";
  contrast = "100";
  invert = "0";
  blur = "0";
  rotate = 0;
  flip_x = 1;
  flip_y = 1;
  imgSrc.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`;
  imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
});

// Save the file
let save = document.querySelector(".save");
save.addEventListener("click", () => {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = imgSrc.naturalWidth;
  canvas.height = imgSrc.naturalHeight;
  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(flip_x, flip_y);
  ctx.drawImage(
    imgSrc,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
});
