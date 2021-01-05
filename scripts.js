const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(user) {
  const request = await fetch(APIURL + user);
  const responseData = await request.json();

  createUserCard(responseData);

  getRepos(user);
}

async function getRepos(user) {
  const request = await fetch(APIURL + user + "/repos");
  const response = await request.json();

  createReposDiv(response);
}

function createUserCard(user) {
  const cardHTML = `<a href="${user.html_url}" target="_blank"><div class="card">
      <div class="profile-image">
        <img src="${user.avatar_url}" alt="${user.name}"/>
      </div>
      <div class="profile-infos">
          <h2>${user.name}</h2>
          <h3>@${user.login}</h3>
          <p>${user.bio}</p>
          <ul>
              <li><i class="fas fa-eye"></i>${user.followers}</li>
              <li><i class="far fa-eye"></i>${user.following}</li>
              <li><i class="fab fa-github"></i>${user.public_repos}</li>
          </ul>
          <div id="repos"></div>  
      </div>
    </div></a>
    `;

  main.innerHTML = cardHTML;
}

function createReposDiv(repos) {
  const reposEl = document.getElementById("repos");
  repos.forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");

    repoEl.innerText = repo.name;
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";

    reposEl.appendChild(repoEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);
    search.value = "";
  }
});
