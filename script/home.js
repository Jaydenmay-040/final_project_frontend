function dropdown() {
    document.getElementById("dropdown_content").style.display = "none";
    document.getElementById("notification").style.display = "flex";
    // document.getElementById("notifications").style.display = "none";
}

function dropup() {
    document.getElementById("dropdown_content").style.display = "flex";
    document.getElementById("notification").style.display = "none";
    document.getElementById("notifications").style.display = "block";
}



function feed() {
    fetch(`https://blooming-castle-04766.herokuapp.com/posts/2`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('p', data);
        postsArray = data.posts;
        document.querySelector(".postContainer").innerHTML = "";
        postsArray.forEach(posts => {

            posts.forEach((post) => {
                console.log('p',post)
              document.querySelector(
                ".postContainer"
              ).innerHTML += `<div class="feed_card">
                                <div class="user_info">
                                    <img class="user_icon" src="${post.profile_img}" alt="">
                                    <h1 class="username">${post.username}</h1>
                                </div>
                                <div class="post">
                                    <p class="post_content">${post.words}</p>
                                </div>
                                <div class="reactions">
                                    <img id="react" src="https://img.icons8.com/ios/24/000000/like--v1.png"/>
                                    <img id="dm" src="https://img.icons8.com/ios/50/000000/sent.png"/>
                                    <img id="comment" src="https://img.icons8.com/ios/26/000000/comments.png"/>
                                </div>
                                <div id="post_content">
                                    <div class="content">
                                    <div class="delete">
                                        <img id="delete" src="https://img.icons8.com/ios-filled/29/000000/delete-sign--v1.png"/>
                                    </div>
                                    <div id="top_post">
                                        <div class="post_info">
                                        <img class="post_icon" src="./images/Capture.PNG" alt="">
                                        <h1 class="post_username">${post.username}</h1>
                                        </div>
                                        <div class="post_post">
                                        <p class="post_post_content">${post.words}</p>
                                        </div>
                                        <div class="post_reactions">
                                        <img id="post_react" src="https://img.icons8.com/ios/24/000000/like--v1.png"/>
                                        <img id="post_dm" src="https://img.icons8.com/ios/50/000000/sent.png"/>
                                        </div>
                                    </div>
                                    <div class="bottom_comments">
                                        <div class="comments">
                                        
                                        </div>
                                        <div class="add_comment">
                                        <img src="https://img.icons8.com/ios-glyphs/29/000000/happy--v1.png"/>
                                        <input class="entryComment" type="text" placeholder="Add a comment..."/>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div> `;
                                document.querySelectorAll('#comment').forEach(button => {
                                    button.addEventListener('click', () => {
                                        document.getElementById('post_content').classList.toggle('active')
                                    })
                                })
    
                                document.querySelectorAll('#delete').forEach(button => {
                                    button.addEventListener('click', () => {
                                        document.getElementById('post_content').classList.toggle('active')
                                    })
                                })
                                
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
                  comments = data.comment
                  comments.forEach(comment => {
                      if (comment.post_id == post.post_id)
                      document.querySelector(".comments").innerHTML += `
                        <div class="comment">
                            <h1 class="user_name">${comment.username} <span class="user_comment">${comment.comment}</span></h1>
                        </div>
                      `;
                  })
                });
            });
        })
      });
  }
  
  feed();