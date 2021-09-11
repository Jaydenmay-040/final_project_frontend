document.querySelector(".post_btn").addEventListener("click", () => {
    console.log(
      window.localStorage.user_id,
      document.getElementById("post_entry").value,
      window.localStorage.username
    );
    fetch(`https://blooming-castle-04766.herokuapp.com/post/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: window.localStorage.user_id,
        words: document.getElementById("post_entry").value,
        username: window.localStorage.username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location = './home.html'
      });
  });

document.querySelector(".cancel_btn").addEventListener("click", () => {
    window.location = './home.html'
})

document.getElementById("search").addEventListener("keyup", (e) => {
  console.log(e.currentTarget.value);
  container = document.querySelector(".search_result");
  container.style.display = "flex";
  container.style.justifyContent = "center";
  renderSearch(e.currentTarget.value);
});

window.addEventListener("click", (e) => {
  if (e.currentTarget != document.querySelector(".search_result")) {
    document.querySelector(".search_result").style.display = "none";
  }
});

function renderSearch(username) {
  fetch(`https://blooming-castle-04766.herokuapp.com/search/${username}/`)
    .then((res) => res.json())
    .then((data) => {
      window.localStorage.profile_user_id = user.user_id;
      console.log(data);
      users = data.users;
      container = document.querySelector(".search_result");
      container.innerHTML = "";
      container.style.display = "flex";
      users.forEach((user) => {
        img = user.profile_img;
        if (user.profile_img) {
          window.localStorage.profile_view_img = user.profile_img;
        } else {
          window.localStorage.profile_view_img = "/images/profile.jpg";
        }
        container.innerHTML += `
        <div class="resultItem">
          <img src="${window.localStorage.profile_view_img}" alt="" class="resultImg" />
          <p class="resultUsername">${user.username}</p>
        </div>
        `;
        document.querySelectorAll(".resultItem").forEach((item) => {
          item.addEventListener("click", (e) => {
            window.localStorage.profile =
              e.currentTarget.querySelector(".resultUsername").innerHTML;
            window.location = "./profile.html";
          });
        });
      });
    });
}