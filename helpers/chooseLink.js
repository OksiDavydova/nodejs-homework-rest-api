function chooseLink(nodeEnv) {
  switch (nodeEnv) {
    case "development":
      return "https://e19b-176-105-198-179.ngrok.io";

    case "test":
      return "http://localhost:5000";

    case "production":
      return "https://hw-06-dnoksi.herokuapp.com";

    default:
      return "https://e19b-176-105-198-179.ngrok.io";
  }
}

module.exports = chooseLink;
