import { useState } from "react";

// Types ======================

  type Props= {

    FormName:string,

    FormDataArray:[
      {
        Id:number,
        Text:string,
        Value:string,
        Type:string
      }
    ],

    ButtonText:string,

    onChange:(ID:number, Value:string)=>void
  }

// ======================
// ======================
// ======================

const Form = (
  {
    FormName,
    FormDataArray,
    ButtonText,
    onChange

  }:Props) => {

  // Variables ======================



  // ======================
  // ======================
  // ======================

  return(

    <form
          // onSubmit={onSubmit}
          className="w-full max-w-xl p-10 bg-gradient-to-tr from-[var(--c12)] via-[var(--c5)] to-[var(--c12)] border-[3px] border-[var(--c3)] shadow-2xl rounded-3xl flex flex-col items-center"
        >
          <h2 className="text-4xl font-bold mb-10 text-[var(--c3)]">{FormName}</h2>

          {FormDataArray?.map((item, index) => (

            <div className="w-full mb-6">
              <label className="block text-lg font-medium mb-2 text-[var(--c6)]">{item.Text}</label>
              <input
                type={item.Type}
                value={item.Value}
                onChange={(e)=>onChange(item.Id, e.target.value)}
                className="w-full px-4 py-3 rounded-xl shadow-sm border-2 border-[var(--c6)] bg-[var(--c4)] text-[var(--c5)] focus:outline-none focus:ring-2 focus:ring-[var(--c6)]"
              />
            </div>


          ))}

          <button
            type="submit"
            className="mt-6 px-6 py-3 font-semibold rounded-xl transition duration-300 bg-[var(--c10)] text-white hover:bg-[var(--c11)]"
          >{ButtonText}</button>
        </form>

  )
  
}

export default Form;