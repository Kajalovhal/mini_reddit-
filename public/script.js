const baseURL = "http://localhost:3000"; // Update with your backend URL

async function signup() {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  try {
    const response = await fetch(`${baseURL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      alert("User signed up successfully");
    } else {
      const data = await response.json();
      alert(data.message);
    }
  } catch (error) {
    console.error("Error signing up:", error);
  }
}

async function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      showPostContainer();
    } else {
      const data = await response.json();
      alert(data.message);
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

async function createPost() {
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${baseURL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      alert("Post created successfully");
      fetchPosts();
    } else {
      const data = await response.json();
      alert(data.message);
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

async function fetchPosts() {
  try {
    const response = await fetch(`${baseURL}/posts`);
    const posts = await response.json();

    const postsList = document.getElementById("posts");
    postsList.innerHTML = "";

    posts.forEach((post) => {
      const li = document.createElement("li");
      li.textContent = post.title;
      postsList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function showPostContainer() {
  document.getElementById("signup-container").classList.add("hidden");
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("post-container").classList.remove("hidden");
  document.getElementById("posts-list").classList.remove("hidden");
  fetchPosts();
}

// Check if user is already logged in
const token = localStorage.getItem("token");
if (token) {
  showPostContainer();
}
