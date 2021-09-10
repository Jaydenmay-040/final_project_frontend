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