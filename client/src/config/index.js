module.exports = {
  host:
    process.env.NODE_ENV === "production"
      ? window.location.protocol + "//" + window.location.hostname + ":5000"
      : "http://localhost:5000/",
};
