const userContainerDiv = document.querySelector(".userContainer");
const submitBtn = document.querySelector("#btn");
const nameTag = document.querySelector("#name");
const emailTag = document.querySelector("#email");
const passwordTag = document.querySelector("#password");

const showData = (data) => {
  userContainerDiv.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user");
    userDiv.innerHTML = `<input type="text" class="uName" value="${data[i].name}" disabled/>
        <input type="email" class ="uEmail" value="${data[i].email}" disabled/>
        <input type="text" class="uPassword" value="${data[i].password}" disabled/>
        <i class="fa-solid fa-pen-to-square active"></i>
        <i class="fa-solid fa-floppy-disk "></i>
        <i class="fa-regular fa-trash-can"></i>`;
    userContainerDiv.append(userDiv);
  }
  const input = document.querySelectorAll(".userContainer .user");
  for (let i = 0; i < input.length; i++) {
    const name_input = input[i].children[0];
    const email_input = input[i].children[1];
    const password_input = input[i].children[2];
    const editTag = input[i].children[3];
    const saveTag = input[i].children[4];
    const deleteTag = input[i].children[5];
    editTag.addEventListener("click", () => {
      editTag.classList.remove("active");
      saveTag.classList.add("active");
      name_input.disabled = false;
      password_input.disabled = false;
      name_input.style.cssText =
        "background-color: #0bff07; font-style: italic;";
      password_input.style.cssText =
        "background-color: #0bff07; font-style: italic;";
    });
    saveTag.addEventListener("click", () => {
      saveTag.classList.remove("active");
      editTag.classList.add("active");
      name_input.disabled = true;
      password_input.disabled = true;
      name_input.style.cssText =
        "background-color: aquamarine; font-style: normal;";
      password_input.style.cssText =
        "background-color: aquamarine; font-style: normal;";

      const newData = {
        name: name_input.value,
        email: email_input.value,
        password: password_input.value,
      };
      putData(newData);
    });
    deleteTag.addEventListener("click", (e) => {
      const toDelete = { email: email_input.value };
      deleteData(toDelete);
      const target = e.target;
      target.parentElement.remove();
    });
  }
};

const putData = async (newData) => {
  const respone = await fetch("https://nodecrud-4okl.onrender.com/users", {
    method: "PUT",
    body: JSON.stringify(newData),
  });
};
const deleteData = async (toDelete) => {
  const respone = await fetch("https://nodecrud-4okl.onrender.com/users", {
    method: "DELETE",
    body: JSON.stringify(toDelete),
  });
};

const getData = async () => {
  const respone = await fetch("https://nodecrud-4okl.onrender.com/users");
  const data = await respone.json();
  showData(data);
};

const postData = async () => {
  const inputData = {
    name: nameTag.value,
    email: emailTag.value,
    password: passwordTag.value,
  };
  const respone = await fetch("https://nodecrud-4okl.onrender.com/users");
  const data = await respone.json();
  const hasEmail = data.find((item) => item.email === inputData.email);

  if (hasEmail) {
    alert("email is already exist! try again");
    return;
  }
  const post = await fetch("https://nodecrud-4okl.onrender.com/users", {
    method: "POST",
    body: JSON.stringify(inputData),
  });
  getData();
};

const clearInput = () => {
  nameTag.value = "";
  emailTag.value = "";
  passwordTag.value = "";
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (nameTag.value && emailTag.value && passwordTag.value) {
    const validEmail = emailTag.value
      .split("")
      .slice(emailTag.value.length - 10, emailTag.value.length)
      .join("");
    if (validEmail === "@gmail.com") {
      postData();
      clearInput();
    } else {
      alert("wrong at '@gmail.com'");
    }
  } else {
    alert("Please fill all input field!");
  }
});

getData();
