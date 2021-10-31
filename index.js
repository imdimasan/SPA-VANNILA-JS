const app = document.querySelector("#app");
const css = document.querySelector("#css");

const spaResolver = async (location) => {
  const currentLocation =
    location === undefined || location === "/" || location === ""
      ? "signup"
      : location;
  const response = await fetch(`src/pages/${currentLocation}.html`);
  const html = await response.text();
  history.pushState(null, null, location);
  css.href = `src/styles/pages/${currentLocation}.css`;
  switch (location) {
    case "/":
      app.innerHTML = html;
      document.title = "ITRex - Lab. Sign Up Page";
      formAction();
      break;
    case "":
      app.innerHTML = html;
      document.title = "ITRex - Lab. Sign Up Page";
      formAction();
      break;
    case undefined:
      app.innerHTML = html;
      document.title = "ITRex - Lab. Sign Up Page";
      formAction();

      break;
    case "signin":
      app.innerHTML = html;
      document.title = "ITRex - Lab. Sign In Page";
      formAction();
      break;
    case "restore":
      app.innerHTML = html;
      document.title = "ITRex - Lab. Restore Password Page";
      formAction();
      break;
  }
};

const backwardHandler = () => {
  history.back();
};

window.addEventListener("popstate", (e) => {
  spaResolver(e.currentTarget.location.pathname.substring(1));
});

let validated = false;
const formAction = () => {
  const form = document.querySelector("FORM");

  form.addEventListener("change", (event) => {
    validateForm(event);
  });

  form.addEventListener("click", (event) => {
    showHidePassword(event);
  });
};

const validateForm = (event) => {
  switch (event.target.id) {
    case "firstname":
      if (
        validator.isAlpha(event.target.value) &&
        validator.isLength(event.target.value, { min: 1, max: 30 })
      ) {
        removeErrorMessage(event);
      } else {
        addErrorMessage(
          event,
          "Usually first name contains 1 symbol minimum and only letters"
        );
      }
      break;
    case "lastname":
      if (
        validator.isAlpha(event.target.value) &&
        validator.isLength(event.target.value, { min: 1, max: 30 })
      ) {
        removeErrorMessage(event);
      } else {
        addErrorMessage(
          event,
          "Usually last name contains 1 symbol minimum and only letters"
        );
      }
      break;
    case "email":
      if (validator.isEmail(event.target.value)) {
        removeErrorMessage(event);
      } else {
        addErrorMessage(
          event,
          "Looks like you don't want provide your email, but it needed"
        );
      }
      break;
    case "password":
      if (validator.isLength(event.target.value, { min: 8, max: 30 })) {
        removeErrorMessage(event);
      } else {
        addErrorMessage(
          event,
          "Password should contain minimum 8 symbols and maximum 30"
        );
      }
      break;
    case "confirm":
      if (validator.isLength(event.target.value, { min: 8, max: 30 })) {
        removeErrorMessage(event);
      } else {
        addErrorMessage(
          event,
          "Password should contain minimum 8 symbols and maximum 30"
        );
      }
      break;
  }
};

const showHidePassword = (event) => {
  if (event.target.className === "icon-eye") {
    event.target.classList.add("opened");
    event.target
      .closest("div")
      .querySelector("input")
      .setAttribute("type", "text");
  } else if (event.target.className === "icon-eye opened") {
    event.target.classList.remove("opened");
    event.target
      .closest("div")
      .querySelector("input")
      .setAttribute("type", "password");
  }
};

const dataHandler = () => {
  const data = document.querySelectorAll("INPUT").forEach((input) => {
    console.log("ID:", input.id, "VALUE:", input.value);
  });
};

const addErrorMessage = (event, message) => {
  const text = event.target.closest("div").querySelector("span");
  event.target.classList.add("error");
  text.setAttribute("style", "display:block");
  text.innerHTML = message;
};

const removeErrorMessage = (event) => {
  const text = event.target.closest("div").querySelector("span");
  event.target.classList.remove("error");
  text.setAttribute("style", "display");
  text.innerHTML = "";
};
