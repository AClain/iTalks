class GlobalProvider {
  getClientTheme = () => {
    let currentTheme = localStorage.getItem("theme");
    if (currentTheme === null) {
      localStorage.setItem("theme", "dark");
      currentTheme = "dark";
    }

    return currentTheme;
  };
}

export default new GlobalProvider();
