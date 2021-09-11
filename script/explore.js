function renderPosts() {
    fetch("https://blooming-castle-04766.herokuapp.com/post/")
      .then((res) => res.json())
      .then((data) => {
        console.log('Hey man', data);
        posts = data.posts;
        posts = posts.sort((firstEl, secondEl) => {
          return firstEl.post_id < secondEl.post_id;
        });
        console.log(posts);
        document.querySelector(".postContainer").innerHTML = "";
        posts.forEach((post) => {
          if (post.user_id != window.localStorage.user_id) {
            document.querySelector(
              ".postContainer"
            ).innerHTML += `<div class="feed_card">
                                <div class="user_info">
                                    <img class="user_icon" src="./images/img1.png" alt="">
                                    <h1 class="username">${post.username}</h1>
                                </div>
                                <div class="post">
                                    <p class="post_content">${post.words}</p>
                                </div>
                                <div class="reactions">
                                <i class="fas fa-heart like" id="${post.post_id}"></i>
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
                                        <i class="fas fa-heart like" id="${post.post_id}"></i>
                                        </div>
                                    </div>
                                    <div class="bottom_comments">
                                        <div class="comments"></div>
                                        <div class="add_comment">
                                        <img src="https://img.icons8.com/ios-glyphs/29/000000/happy--v1.png"/>
                                        <input class="entryComment" type="text" placeholder="Add a comment..."/>
                                        <button class="comment_button">enter</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div> `;
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
            document.querySelectorAll(".like").forEach((button) => {
                button.addEventListener("click", (e) => {
                  e.currentTarget.classList.add("active");
                  like(e.currentTarget.id);
                });
            });
              document.querySelectorAll(".comment_button").forEach((button) => {
                button.addEventListener("click", (e) => {
                  sendNewComment(e.currentTarget);
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
                comments.forEach((comment) => {
                  if (comment.post_id == post.post_id) {
                    document
                      .getElementById(`${post.post_id}`)
                      .querySelector(".comments").innerHTML += `
                    <div class="comment">
                        <h1 class="user_name">${comment.username} <span class="user_comment">${comment.comment}</span></h1>
                    </div>
                    `;
                  }
                  document
                    .querySelectorAll(".user_name")
                    .forEach((username) => {
                      username.addEventListener("click", (e) => {
                        window.localStorage["profile"] =
                          e.currentTarget.innerHTML;
                        window.location = "./profile.html";
                      });
                    });
                });
              });
          }
        });
        getLike();
      });
  }
  
  renderPosts();
  
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
    comment = element.parentElement.querySelector(".entryComment").value;
    element.parentElement.parentElement.querySelector(
      ".comments"
    ).innerHTML += `<div class="comment">
                      <h1 class="user_name">${window.localStorage.username} <span class="user_comment">${comment}</span></h1>
                    </div>`;
    document.querySelectorAll(".user_name").forEach((username) => {
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
        console.log('this', data);
      });
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