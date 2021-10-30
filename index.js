const app = document.querySelector("#app");
const css = document.querySelector("#css");

const spaResolver = async (location) => {
  const currentLocation =
    location === undefined || location === "/" ? "signup" : location;
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

const dataHandler = () => {
  const data = document.querySelectorAll("INPUT").forEach((input) => {
    console.log("ID:", input.id, "VALUE:", input.value);
  });
};

window.addEventListener("popstate", (e) => {
  spaResolver(e.currentTarget.location.pathname.substring(1));
});

const formAction = () => {
  const form = document.querySelector("FORM");
  console.log(form);
};
