const profileInfo = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const reposInfo = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToRepos = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");
const username = "Hyuuga81";
console.clear();

//Async function to get github profile information
const getProfileInfo = async function () {
    const infoRequest = await fetch(`https://api.github.com/users/${username}`);
    const userData = await infoRequest.json();
    console.log(userData);

    displayUserInfo(userData);
};

getProfileInfo();

//Function to display profile information
const displayUserInfo = function (userData) {
    const div = document.createElement("div"); 
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${userData.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${userData.name}</p>
    <p><strong>Bio:</strong> ${userData.bio}</p>
    <p><strong>Location:</strong> ${userData.location}</p>
    <p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
  </div> `;

  profileInfo.append(div);
  getRepoInfo();
};

//Async function to get repo information
const getRepoInfo = async function () {
    const repoRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoRequest.json();
    console.log(repoData);
    displayRepoInfo(repoData);
};

//Function to display information about each repo
const displayRepoInfo = function (repos) {
    filterInput.classList.remove("hide");
    for (const item of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${item.name}</h3>`

        repoList.append(li);
    }
};

//Event listener for click on repo list
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoInfo(repoName);

    }
});

//Async function to grab info about specific repo
const specificRepoInfo = async function(repoName) {
    const specRequest = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specRequest.json();
    // console.log(repoInfo);

    const fetchLanguages =  await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    // console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    console.log(languages);
    displaySpecRepo(repoInfo, languages);
};

//Function to display specific repo info
const displaySpecRepo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    repoData.append(div);
    repoData.classList.remove("hide");
    repoList.classList.add("hide");
    backToRepos.classList.remove("hide");
};

//Event listener for click on back button
backToRepos.addEventListener("click", function () {
    reposInfo.classList.remove("hide");
    repoData.classList.add("hide");
    backToRepos.classList.add("hide");
    repoList.classList.remove("hide");
    // filterInput.value = ""; tried to force all repos to appear without backspacing search text
});

//Input event listener for filterInput
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    // console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const lowerSearchText = searchText.toLowerCase();

    for (const repo of repos) {
        const lowerRepoText = repo.innerText.toLowerCase();
        if (lowerRepoText.includes(lowerSearchText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});