const profileInfo = document.querySelector(".overview");
const username = "Hyuuga81";
console.clear();

const getProfileInfo = async function () {
    const infoRequest = await fetch(`https://api.github.com/users/${username}`);
    const userData = await infoRequest.json();
    console.log(userData);

    displayUserInfo(userData);
};

getProfileInfo();

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
};

