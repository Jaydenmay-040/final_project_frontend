if (window.localStorage["profile_img"] == "null") {
  window.localStorage.profile_img = "/images/profile.jpg";
}

function renderProfilePosts() {
  fetch(
    `https://blooming-castle-04766.herokuapp.com/user-info/${window.localStorage["profile"]}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log('whoa', data);
      user = data.user.user[0];
      console.log(user);
      window.localStorage.profile_user_id = user.user_id;
      if (user.profile_img) {
        window.localStorage.profile_view_img = user.profile_img;
      } else {
        window.localStorage.profile_view_img = "/images/profile.jpg";
      }
      posts = data.user.posts;
      followers = data.user.followers;
      following = data.user.following;

      console.log(posts);

      document.querySelector(".profile_container").innerHTML = `
      <div class="top">
          <img class="profile_img" src="${window.localStorage.profile_view_img}" alt="image of ${window.localStorage.profile}">
          <div class="right">
              <p class="row_one">
                  <h1 class="userName">${window.localStorage.profile}</h1>
              </p>
              <div class="row_two">
                  <p id="post"><span class="number">${posts.length}</span>post</p>
                  <p id="followers"><span class="follower_number">${followers.length}</span>followers</p>
                  <p id="following"><span class="number">${following.length}</span>following</p>
              </div>
              <div class="row_three">
                  <p class="bio">${user.first_name} ${user.last_name}</p>
              </div>
          </div>
      </div>
      <hr>
      `;
      if (window.localStorage["profile"] == window.localStorage["username"]) {
        document.querySelector(".row_three").innerHTML +=
          '<button class="edit_profile">Edit Profile</button>';
      } else {
        let result = followers.map((follower) => follower.follower);
        if (result.includes(parseInt(window.localStorage.user_id))) {
          document.querySelector(".top").innerHTML +=
            '<button class="follow_btn">Unfollow</button>';
          followBtn = document.querySelector(".follow_btn");
          followBtn.addEventListener("click", () => {
            if (followBtn.innerHTML == "Unfollow") {
              followBtn.innerHTML = "Follow";
              document.querySelector(".follower_number").innerHTML =
                parseInt(document.querySelector(".follower_number").innerHTML) -
                1;
              unfollow();
            } else {
              document.querySelector(".follower_number").innerHTML =
                parseInt(document.querySelector(".follower_number").innerHTML) +
                1;

              followBtn.innerHTML = "Unfollow";
              follow();
            }
          });
        } else {
          document.querySelector(".top").innerHTML +=
            '<button class="follow_btn">Follow</button>';
          followBtn = document.querySelector(".follow_btn");
          followBtn.addEventListener("click", () => {
            if (followBtn.innerHTML == "Follow") {
              document.querySelector(".follower_number").innerHTML =
                parseInt(document.querySelector(".follower_number").innerHTML) +
                1;

              followBtn.innerHTML = "Unfollow";
              follow();
            } else {
              followBtn.innerHTML = "Follow";
              document.querySelector(".follower_number").innerHTML =
                parseInt(document.querySelector(".follower_number").innerHTML) -
                1;
              unfollow();
            }
          });
        }
      }
      if (document.querySelector(".edit_profile")) {
        document.querySelector(".edit_profile").addEventListener("click", () => {
          toggleModal();
        });
      }
      posts.forEach((post) => {
        document.querySelector(".profile_content").innerHTML += 
                          `<div class="feed_card" id="${post.post_id}">
                            <div class="user_info">
                                <img class="user_icon" src="${window.localStorage.profile_view_img}" alt="">
                                <h1 class="username">${post.username}</h1>
                            </div>
                            <div class="post">
                                <p class="post_content">${post.words}</p>
                            </div>
                            <div class="reactions">
                                <i class="fas fa-heart like"></i>
                                <img id="comment" src="https://img.icons8.com/ios/26/000000/comments.png"/>
                            </div>
                            <div class="post_content_modal">
                                <div class="content">
                                <div class="delete">
                                    <img class="deleteBtn" src="https://img.icons8.com/ios-filled/29/000000/delete-sign--v1.png"/>
                                </div>
                                <div id="top_post">
                                    <div class="post_info">
                                    <img class="post_icon" src="${post.profile_img}" alt="">
                                    <h1 class="post_username">${post.username}</h1>
                                    </div>
                                    <div class="post_post">
                                    <p class="post_post_content">${post.words}</p>
                                    </div>
                                    <div class="post_reactions">
                                    <i class="fas fa-heart like"></i>
                                    </div>
                                </div>
                                <div class="bottom_comments">
                                    <div class="comments"></div>
                                    <div class="add_comment">
                                      <img src="https://img.icons8.com/ios-glyphs/29/000000/happy--v1.png"/>
                                      <input class="entry_comment" type="text" placeholder="Add a comment..."/>
                                      <button class="comment_button">enter</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                          </div>`;
                          document.querySelectorAll('#comment').forEach(button => {
                            button.addEventListener('click', (e) => {
                                e.currentTarget.parentElement.parentElement.querySelector('.post_content_modal').classList.toggle('active')
                            })
                        })

                        document.querySelectorAll('.deleteBtn').forEach(button => {
                            button.addEventListener('click', (e) => {
                                e.currentTarget.parentElement.parentElement.parentElement.classList.toggle('active')
                            })
                        })

        document.querySelectorAll(".username").forEach((username) => {
          username.addEventListener("click", (e) => {
            console.log(e.currentTarget.innerHTML);
            window.localStorage["profile"] = e.currentTarget.innerHTML;
            window.location = "./profile.html";
          });
        });
        // document.querySelectorAll(".emojiButton").forEach((button) => {
        //   button.addEventListener("click", (e) => {
        //     e.currentTarget.parentElement
        //       .querySelector(".emojiContainer")
        //       .classList.toggle("active");
        //   });
        // });
        // document.querySelectorAll(".emojiContainer").forEach((container) => {
        //   emojis.forEach((emoji) => {
        //     container.innerHTML += `<span class="emoji">&#${emoji}</span>`;
        //   });
        // });
        // document.querySelectorAll(".emoji").forEach((press) => {
        //   press.addEventListener("click", (e) => {
        //     e.currentTarget.parentElement.parentElement.querySelector(
        //       ".entryComment"
        //     ).value += e.currentTarget.innerHTML;
        //   });
        // });
        document.querySelectorAll(".comment_button").forEach((button) => {
          button.addEventListener("click", (e) => {
            sendNewComment(e.currentTarget);
          });
        });
        document.querySelectorAll(".like").forEach((button) => {
          button.addEventListener("click", (e) => {
            e.currentTarget.classList.add("active");
            like(e.currentTarget.parentElement.id);
          });
        });
        fetch(
          `https://blooming-castle-04766.herokuapp.com/comment/${post.post_id}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            comments = data.comment;
            console.log(comments);
            comments.forEach((comment) => {
              if (comment.post_id == post.post_id) {
                console.log(post.post_id)
                document
                  .getElementById(`${post.post_id}`)
                  .querySelector(".comments").innerHTML += `
                  <div class="comment">
                    <h1 class="user_name">${comment.username} <span class="user_comment">${comment.comment}</span></h1>
                  </div>`;
              }
              document
                .querySelectorAll(".user_name")
                .forEach((username) => {
                  username.addEventListener("click", (e) => {
                    console.log(e.currentTarget.innerHTML);
                  });
                });
            });
          });
      });
      getLike();
    });
}

renderProfilePosts()

function like(post_id) {
  console.log("post_id", post_id);
  console.log("user_id", window.localStorage["user_id"]);
  console.log(window.localStorage.user_id);
  fetch(`https://blooming-castle-04766.herokuapp.com/like/${post_id}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: window.localStorage.user_id,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(document.getElementById(`${post_id}`));
    });
}

function getLike() {
  fetch(
    `https://blooming-castle-04766.herokuapp.com/user-like/${parseInt(
      window.localStorage.user_id
    )}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      likes = data.likes;
      likes.forEach((like) => {
        document.querySelectorAll(".like").forEach((button) => {
          console.log("b", like.post_id);
          if (button.parentElement.id == like.post_id) {
            console.log("whoa");
            button.classList.add("active");
          }
        });
      });
    });
}

function sendNewComment(element) {
  comment = element.parentElement.querySelector(".entry_comment").value;
  console.log(comment)
  element.parentElement.parentElement.querySelector(
    ".comments"
  ).innerHTML += `<div class="comment">
                    <h1 class="user_name">${window.localStorage["username"]} <span class="user_comment">${comment}</span></h1>
                  </div>`;
  document.querySelectorAll(".commentUsername").forEach((username) => {
    username.addEventListener("click", (e) => {
      console.log(e.currentTarget.innerHTML);
      window.localStorage["profile"] = e.currentTarget.innerHTML;
    });
  });
  fetch(`https://blooming-castle-04766.herokuapp.com/comment/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id: element.parentElement.parentElement.id,
      comment: comment,
      user_id: window.localStorage["user_id"],
      username: window.localStorage["username"],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function popEdit() {
  document.querySelector(".editProfileInner").innerHTML += `
  <img class="deleteBtn fa-times" src="https://img.icons8.com/ios-filled/29/000000/delete-sign--v1.png">
  <div class="imgContainer">
    <img src="${window.localStorage["profile_img"]}" alt="" class="editImg"/>
    <div class="usernameDpChange">
      <p class="editUsername">${window.localStorage.username}</p>
      <input type="file" name="file" style="width: 0.1; height: 0.1; opacity: 0; position: absolute;" id="imgEntry"/>
      <label for="file">Change Profile Photo</label>
    </div>
  </div>
  <div class="firstNameContainer">
    <p class="firstNameHeading">First Name</p>
    <input type="text" id="firstNameEntry" value="${window.localStorage.first_name}"/>
  </div>
  <div class="lastNameContainer">
    <p class="lastNameHeading">Last Name</p>
    <input type="text" id="lastNameEntry" value="${window.localStorage.last_name}"/>
  </div>
  <div class="emailContainer">
    <p class="emailHeading">Email</p>
    <input type="text" id="emailEntry" value="${window.localStorage.email}"/>
  </div>
  <div class="usernameContainer">
    <p class="usernameHeading">Username</p>
    <input type="text" id="usernameEntry" value="${window.localStorage.username}" readonly/>
  </div>
  <div class="passwordContainer">
    <p class="passwordHeading">Password</p>
    <input type="text" id="passwordEntry" value="${window.localStorage.password}"/>
  </div>
  <button class="saveChanges">Save Changes</button>
  `;
  document.getElementById("imgEntry").addEventListener("change", () => {
    previewFile();
  });
  document.querySelector(".saveChanges").addEventListener("click", () => {
    editProfile();
  });
  document.querySelector(".fa-times").addEventListener("click", () => {
    toggleModal();
  });
}

function toggleModal() {
  document.querySelector(".editProfileOuter").classList.toggle("active");
}

popEdit();

function previewFile() {
  const file = document.getElementById("imgEntry").files[0];
  const preview = document.querySelector(".editImg");
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      // convert image file to base64 string
      preview.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

function editProfile() {
  console.log(
    document.getElementById("firstNameEntry").value,
    document.getElementById("lastNameEntry").value,
    document.getElementById("emailEntry").value,
    document.getElementById("usernameEntry").value,
    document.getElementById("passwordEntry").value,
    document.querySelector(".editImg").src
  );
  fetch(
    `https://blooming-castle-04766.herokuapp.com/user/${window.localStorage.user_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: document.getElementById("firstNameEntry").value,
        last_name: document.getElementById("lastNameEntry").value,
        email: document.getElementById("emailEntry").value,
        username: document.getElementById("usernameEntry").value,
        password: document.getElementById("passwordEntry").value,
        profile_img: document.querySelector(".editImg").src,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.localStorage.profile_img = document.querySelector(".editImg").src;
    });
}

function follow() {
  fetch(
    `https://blooming-castle-04766.herokuapp.com/follow/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followed: window.localStorage.profile_user_id,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function unfollow() {
  fetch(
    `https://blooming-castle-04766.herokuapp.com/follow/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followed: window.localStorage.profile_user_id,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
}

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