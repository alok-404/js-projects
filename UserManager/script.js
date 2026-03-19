class UserManager {
  constructor() {
    this.container = document.querySelector("#userList");
    document.querySelector(".resetBtn").addEventListener("click", () => {
      this.resetUser();
    });
    this.Themebtn = document.getElementById("themeToggle");
    document.querySelector("#addBtn").addEventListener("click", () => {
      const name = document.querySelector("#nameInput").value.trim();
      const email = document.querySelector("#emailInput").value.trim();

      if (!name || !email) {
        alert("Name and Email cannot be empty !");
        return;
      }

      if (email.length < 3 || name.length < 3) {
        alert("Invalid Name or Email");
        return;
      }
      // console.log(name,email);

      this.addUser(name, email);

      document.querySelector("#nameInput").value = "";
      document.querySelector("#emailInput").value = "";
    });

    this.users = [];
    this.originalUsers = [];
    this.searchQuery();
  }
  init() {
    this.loadTheme();
    this.handleThemeToggle();
    this.fetchUsers();
  }
  async fetchUsers() {
    const loader = document.createElement("div");
    loader.classList.add("loading-spinner");
    loader.textContent = "Loading...";

    this.container.innerHTML = "";
    this.container.appendChild(loader);

    try {
      const stored = localStorage.getItem("users");
      if (stored) {
        this.users = JSON.parse(stored);
        this.originalUsers = [...this.users];
        this.renderUser();
        return;
      }
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (res.status === 404) {
        throw new Error("User not found");
      }

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();

      this.users = data;
      this.originalUsers = [...data];
      localStorage.setItem("users", JSON.stringify(this.originalUsers));
      this.renderUser();
    } catch (err) {
      this.container.innerHTML = err.message;
      console.log(err);
    }
  }
  renderUser(users = this.users) {
    if (users.length === 0) {
      this.container.innerHTML = "No User Found";
      return;
    }

    this.container.innerHTML = "";

    users.forEach((user) => {
      const card = document.createElement("div");
      card.classList.add("user-card");

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("user-info");

      // name
      const name = document.createElement("strong");
      name.textContent = user.name;

      // email
      const email = document.createElement("span");
      email.textContent = user.email;

      // EDIT INPUT (hidden)
      const input = document.createElement("input");
      input.value = user.name;
      input.style.display = "none";

      // SAVE BUTTON (hidden)
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.style.display = "none";
      saveBtn.style.background = "#22c55e";

      // EDIT BUTTON
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.style.background = "#3b82f6";

      // DELETE BUTTON
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";

      // 👉 Edit click
      editBtn.addEventListener("click", () => {
        name.style.display = "none";
        input.style.display = "block";
        saveBtn.style.display = "inline-block";
        editBtn.style.display = "none";
      });

      // 👉 Save click
      saveBtn.addEventListener("click", () => {
        const newName = input.value.trim();
        if (!newName) return;

        this.editUser(user.id, newName);
      });

      // 👉 Delete click
      deleteBtn.addEventListener("click", () => {
        this.deleteUser(user.id);
      });

      // append info
      infoDiv.appendChild(name);
      infoDiv.appendChild(input);
      infoDiv.appendChild(email);

      // append everything
      card.appendChild(infoDiv);
      card.appendChild(editBtn);
      card.appendChild(saveBtn);
      card.appendChild(deleteBtn);

      this.container.appendChild(card);
    });
  }
  deleteUser(id) {
    console.log(id);
    if (!confirm("Are you sure?")) return;
    this.users = this.users.filter((user) => user.id !== id);
    this.originalUsers = this.originalUsers.filter((user) => user.id !== id);

    localStorage.setItem("users", JSON.stringify(this.originalUsers));

    this.renderUser();
  }
  searchQuery() {
    document.querySelector("#searchInput").addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();

      const filtered = this.originalUsers.filter((user) =>
        user.name.toLowerCase().includes(query),
      );
      this.renderUser(filtered);
    });
  }
  resetUser() {
    localStorage.removeItem("users");
    this.users = [];
    this.originalUsers = [];
    this.fetchUsers();
  }

  addUser(name, email) {
    console.log(name);
    console.log(email);

    const newUser = {
      id: Date.now(),
      name,
      email,
    };
    this.users.push(newUser);
    this.originalUsers.push(newUser);

    localStorage.setItem("users", JSON.stringify(this.originalUsers));
    this.renderUser();
  }

  editUser(id, newName) {
    this.users = this.users.map((user) =>
      user.id === id ? { ...user, name: newName } : user,
    );

    this.originalUsers = this.originalUsers.map((user) =>
      user.id === id ? { ...user, name: newName } : user,
    );

    localStorage.setItem("users", JSON.stringify(this.originalUsers));

    this.renderUser();
  }
  loadTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }
  handleThemeToggle() {
    const btn = document.getElementById("themeToggle");

    btn.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark-theme");

      if (isDark) {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        localStorage.setItem("theme", "light");
      } else {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
      }
    });
  }
}

const app = new UserManager();
app.init();
