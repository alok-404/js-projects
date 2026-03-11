function createToaster(config) {
  return function (str) {
    let div = document.createElement("div");
    div.textContent = str;
    div.className = ` inline-block ${config.theme === "dark" ? "bg-gray-800 text-white" : "bg-white-100 text-black"} bg-${config.theme} text-white px-6 py-3 rounded shadow-lg pointer-event-none`;

    if (config.positionX != "left" || config.positionY !== "top") {
      document.querySelector(".parent").className += `${
        config.positionX === "right" ? "fixed right-5" : "fixedleft-5"
      } ${
        config.positionY === "bottom" ? "fixed bottom-5" : "fixed top-5"
      }`;
    }

    document.querySelector(".parent").appendChild(div);
    setTimeout(() => {
      document.querySelector(".parent").removeChild(div);
    }, config.duration * 1000);
  };
}

let toaster = createToaster({
  positionX: "right",
  positionY: "top",
  theme: "dark",
  duration: 3,
});

let toaster2 = createToaster({
  positionX: "right",
  positionY: "top",
  theme: "red-600",
  duration: 3,
});
let toaster3 = createToaster({
  positionX: "right",
  positionY: "top",
  theme: "blue-600",
  duration: 3,
});

toaster("Download Done");
setTimeout(() => {
  toaster2("Youtube Notification");
}, 1500);
setTimeout(() => {
  toaster3("Facebook Notification");
}, 2000);
