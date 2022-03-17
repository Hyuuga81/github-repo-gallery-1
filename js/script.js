const userProfile = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const username = "Hyuuga81";
console.clear();

//Async function to access github profile info
const getProfile = async function () {
    const res = await fetch (
        `https://api.github.com/users/${username}`
    );
    const data = await res.json();
    console.log(data);
    getUserInfo(data);
};

getProfile();

/*Function to display user information*/
const getUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
    `;
    userProfile.append(div);
    getRepos();
}

//FUnction to fetch your repos from github
const getRepos = async function () {
    const request = await fetch(`https://api.github.com/users/${username}/repos?sort=newest&per_page=100`);
    const repoInfo = await request.json();
    console.log(repoInfo);
    displayRepos(repoInfo);
};

//Function to display repo information
const displayRepos = function (repos) {
    for (const item of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("item");
        repoItem.innerHTML = `<h3>${item.name}</h3>`;
        repoList.append(repoItem);
    }
    
};
