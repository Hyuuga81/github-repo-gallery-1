const profileInfo = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
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
    for (const item of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${item.name}</h3>`

        repoList.append(li);
    }
};

