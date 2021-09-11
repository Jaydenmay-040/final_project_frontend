  
function Login() {
    fetch(
      `https://blooming-castle-04766.herokuapp.com/user/${
        document.getElementById("loginUsername").value
      }`
    )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      user = data.user;
      console.log(user);
      let storage = window.localStorage;
      storage.user_id = user.user_id;
      storage.username = user.username;
      storage.email = user.email;
      storage.password = user.password;
      storage.first_name = user.first_name;
      storage.last_name = user.last_name;
      storage.profile_img = user.profile_img;
      window.location = "./home.html";
    });
  }
  
  function getToken() {
    fetch(`https://blooming-castle-04766.herokuapp.com/auth`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: document.getElementById("loginUsername").value,
        password: document.getElementById("loginPassword").value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.access_token) {
          Login();
        }
      });
  }
  
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    getToken();
});

function register() {
    console.log(
      document.getElementById("signupFirstname").value,
      document.getElementById("signupLastname").value,
      document.getElementById("signupEmail").value,
      document.getElementById("signupUsername").value,
      document.getElementById("signupPassword").value,
    );
    fetch(`https://blooming-castle-04766.herokuapp.com/user/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: document.getElementById("signupFirstname").value,
        last_name: document.getElementById("signupLastname").value,
        email: document.getElementById("signupEmail").value,
        username: document.getElementById("signupUsername").value,
        password: document.getElementById("signupPassword").value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location = './index.html'
      });
  }
  
  document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    register();
  });
