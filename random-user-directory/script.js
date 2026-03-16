const container = document.getElementsByClassName("card-grid");
const refreshBtn = document.getElementById("refresh-btn");
container;
function getUserByApi() {
  fetch("https://randomuser.me/api/0.8/?results=3")
    .then((rawdata) => rawdata.json()) //implicit return
    .then((data) => {

      document.querySelector(".card-grid").innerHTML = "";
      data.results.forEach((elem) => {
        // 1. Create the main card div
        const card = document.createElement("div");
        card.className = "profileCard";


        const img = document.createElement("img");
        img.src = elem.user.picture.medium || "https://via.placeholder.com/80";
        img.className = "avatar";
        img.alt = "User Avatar";

        const name = document.createElement("h3");
        name.textContent = `${elem.user.name.title} ${elem.user.name.first} ${elem.user.name.last}`;


        const email = document.createElement("p");
        email.textContent = elem.user.email;


        const tagContainer = document.createElement("div");
        tagContainer.className = "tags";

        const cell = document.createElement("span");
        cell.className = "tag";
        cell.textContent = elem.user.cell;
        tagContainer.appendChild(cell);

   
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(email);
        card.appendChild(tagContainer);

        document.querySelector(".card-grid").appendChild(card);
      });
    })
    .catch((err) => console.log(err));
}
getUserByApi();
refreshBtn.addEventListener("click", () => {
  refreshBtn.classList.add("spinning")
  getUserByApi();
  setTimeout(() => {
                refreshBtn.classList.remove("spinning");
            }, 1000);
});
