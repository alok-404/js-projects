const container = document.querySelector(".card-grid");
const errorBox = document.querySelector(".errorBox");
const refreshBtn = document.getElementById("refresh-btn");

async function getUserByApi() {
  try {
    container.innerHTML = "Loading users...";
    errorBox.innerHTML = "";

    const res = await fetch("https://randomuser.me/api/?results=3");


    

    if (!res.ok) {
      throw new Error("API FAILED");
    }

    const data = await res.json();


    

    const users = data.results || [];

      container.innerHTML = "";

      if(users.length === 0){container.innerHTML = "No users found"}
      else{
         users.forEach((user) => {

      const card = document.createElement("div");
      card.className = "profileCard";

      const img = document.createElement("img");
      img.src = user.picture.large || "https://via.placeholder.com/80";
      img.className = "avatar";
      img.alt = "User Avatar";

      const name = document.createElement("h3");
      name.textContent = `${user.name.title} ${user.name.first} ${user.name.last}`;

      const email = document.createElement("p");
      email.textContent = user.email;

      const tagContainer = document.createElement("div");
      tagContainer.className = "tags";

      const cell = document.createElement("span");
      cell.className = "tag";
      cell.textContent = user.cell;
      tagContainer.appendChild(cell);

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(email);
      card.appendChild(tagContainer);

     container.appendChild(card);
    });
      }

   
  } catch (error) {
    container.innerHTML = "";
    errorBox.innerHTML = "Failed to load users";
    console.log(error);
  }
}
getUserByApi();

refreshBtn.addEventListener("click",async () => {
  refreshBtn.classList.add("spinning");
 await getUserByApi();
refreshBtn.classList.remove("spinning");

});
