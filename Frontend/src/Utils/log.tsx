const log = (...values:any[]) => {

  if(import.meta.env.DEV)
  {
    console.log(...values)
  }

}

export default log;