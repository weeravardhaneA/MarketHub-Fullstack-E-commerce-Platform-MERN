const isDev = process.env.NODE_ENV !== "production";

const log = (...value) => {

  if(isDev)
  {
    console.log(...value);
  }

}

module.exports = log;