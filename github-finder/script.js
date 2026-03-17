const input = document.querySelector("#username");
const searchBtn = document.querySelector("#search-btn");
const profileContainer = document.querySelector(".profile-container");
const errorBox = document.querySelector(".errorBox");

 //input logic [handeling inputs here]
function inputLogic() {
  let username = input.value.trim();
  // console.log(username);

  if (username === "") {
    errorBox.innerHTML = "Input can't be empty.";
    return;
  }
  if (username.length < 3) {
    errorBox.innerHTML = "Input cannot be less then 3";
    return;
  }

  errorBox.innerHTML = "";

  return username;
}

//input btn listeners
searchBtn.addEventListener("click", () => {
  const username = inputLogic();
  if (!username) return;

  getProifleByApi(username);
});
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    const username = inputLogic();
    if (!username) return;

    getProifleByApi(username);
  }
});

//fetch api code
async function getProifleByApi(username) {
  //   console.log(username);
  try {
    profileContainer.innerHTML = "Loading info...";
    errorBox.innerHTML = "";

    let res = await fetch(`https://api.github.com/users/${username}`);
    let reposRes = await fetch(
      `https://api.github.com/users/${username}/repos`,
    );

    if (res.status === 404) {
      throw new Error("User not found");
    }

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    if (reposRes.status === 404) {
      throw new Error("User not found");
    }

    if (!reposRes.ok) {
      throw new Error("Something went wrong");
    }

    let data = await res.json(); //data parse hogya;
    let reposData = await reposRes.json(); //data parse hogya;

    renderUi(data, reposData);
  } catch (error) {
    console.log(error);

    if (error.message === "User not found") {
      errorBox.innerHTML = "User not found";
    } else {
      errorBox.innerHTML = "Check your internet or try again";
    }

    profileContainer.innerHTML = "";
  }
}

function renderUi(data, repos) {
  console.log(data, repos);
  {
    profileContainer.innerHTML = "";
    const card = document.createElement("div");
    card.className = "profile-card";
    const img = document.createElement("img");
    img.src = data.avatar_url || "https://via.placeholder.com/100";
    const name = document.createElement("h2");
    name.textContent = data.name || data.login;
    const bio = document.createElement("p");
    bio.className = "bio";
    bio.textContent = data.bio || "No bio available";
    const stats = document.createElement("div");
    stats.className = "stats";
    function createStat(value, label) {
      const div = document.createElement("div");
      const count = document.createElement("h3");
      count.textContent = value;
      const text = document.createElement("p");
      text.textContent = label;
      div.appendChild(count);
      div.appendChild(text);
      return div;
    }
    stats.appendChild(createStat(data.followers, "Followers"));
    stats.appendChild(createStat(data.following, "Following"));
    stats.appendChild(createStat(data.public_repos, "Repos"));
    const location = document.createElement("p");
    location.className = "location";
    location.textContent = data.location || "Location not available";
    const repoHeading = document.createElement("h3");
    repoHeading.textContent = "Top Repositories";
    const repoList = document.createElement("div");
    repoList.className = "repo-list";
    if (repos.length === 0) {
      const empty = document.createElement("p");
      empty.textContent = "No repositories found";
      repoList.appendChild(empty);
    } else {
      repos.slice(0, 5).forEach((repo) => {
        const repoItem = document.createElement("div");
        repoItem.className = "repo-item";
        const repoName = document.createElement("a");
        repoName.textContent = repo.name;
        repoName.href = repo.html_url;
        repoName.target = "_blank";
        const stars = document.createElement("span");
        stars.textContent = `⭐ ${repo.stargazers_count}`;
        repoItem.appendChild(repoName);
        repoItem.appendChild(stars);
        repoList.appendChild(repoItem);
      });
    }
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(bio);
    card.appendChild(stats);
    card.appendChild(location);
    card.appendChild(repoHeading);
    card.appendChild(repoList);
    profileContainer.appendChild(card);
  }
}

