class UserManager {
  constructor() {
    this.container = document.getElementById("userList");
    document.querySelector(".resetBtn").addEventListener("click",()=>{
      this.resetUser();
    })
    this.users = [];
    this.originalUsers = [];
    this.searchQuery();
  }

  async fetchUsers() {
    try {
      this.container.innerHTML = "Loading...";
      const stored = localStorage.getItem("users");
      if (stored) {
        this.users = JSON.parse(stored);
        this.originalUsers = [...this.users];
        this.renderUsers();
        return
      }
      else{
        
      }

      const res = await fetch("https://jsonplaceholder.typicode.com/users");

      if (res.status === 404) {
        throw new Error("User not found");
      }

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      console.log(res);

      const data = await res.json();
      console.log(data);

      this.users = data;
      this.originalUsers = [...data];

      localStorage.setItem("users", JSON.stringify(this.originalUsers));
      this.renderUsers();
    } catch (err) {
      this.container.innerHTML = err.message;
      console.log(err);
    }
  }

  renderUsers(users = this.users) {
    if (users.length === 0) {
      this.container.innerHTML = "No users found";
      return;
    }

    this.container.innerHTML = "";
    users.forEach((user) => {
      //   console.log(user);

      const card = document.createElement("div");
      card.classList.add("user-card");

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("user-info");

      const name = document.createElement("strong");
      name.textContent = user.name;

      const email = document.createElement("span");
      email.textContent = user.email;

      infoDiv.appendChild(name);
      infoDiv.appendChild(email);

      // delete button
      const btn = document.createElement("button");
      btn.textContent = "Delete";

      btn.addEventListener("click", () => {
        this.deleteUser(user.id);
      });

      card.appendChild(infoDiv);
      card.appendChild(btn);

      this.container.appendChild(card);
    });
  }
  deleteUser(id) {
    console.log(id);
    if (!confirm("Are you sure?")) return;
    this.users = this.users.filter((user) => user.id != id);
    this.originalUsers = this.originalUsers.filter((user) => user.id !== id);

    localStorage.setItem("users", JSON.stringify(this.originalUsers));

    this.renderUsers();
  }
  searchQuery() {
    document.querySelector("#searchInput").addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      console.log(query);

      const filtered = this.originalUsers.filter((user) =>
        user.name.toLowerCase().includes(query),
      );

      this.renderUsers(filtered);
    });
  }
  resetUser() {
    localStorage.removeItem("users");
    this.fetchUsers(true);
  }
}

const app = new UserManager();
app.fetchUsers();
