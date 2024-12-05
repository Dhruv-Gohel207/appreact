import React, { useState, useEffect } from "react";
import {Link} from "react-dom"

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    // let passwordArray;
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    alert("Show the password");
  };

  const savePassword = () => {
    setpasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full overflow-hidden w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#6b0182_100%)]" ></div>

      <div className="mycontainer px-4 sm:px-8">
        <div className="logo font-bold p-4 text-2xl md:text-3xl text-center">
          <span className="text-purple-800 font-bold">&lt;</span>
          <span className="text-white">Pass</span>
          <span className="text-purple-800 font-bold">MNGR/&gt;</span>
        </div>

        <p className="text-purple-400 text-center text-sm md:text-base">
          Your Own Password Manager
        </p>

        <div className="text-black flex flex-col p-4">
          <input
            placeholder="Enter Web URL"
            className="rounded-xl my-3 border border-purple-300 w-full p-2 text-sm md:text-base"
            type="text"
            name="site"
            value={form.site}
            onChange={handleChange}
          />

          <div className="flex flex-col md:flex-row md:gap-6">
            <input
              placeholder="Enter Username"
              className="rounded-xl my-3 border border-purple-300 w-full p-2 text-sm md:text-base"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
            <div className="relative">
              <input
                placeholder="Enter Password"
                className="rounded-xl my-3 border border-purple-300 w-full py-2 px-5 text-sm md:text-base"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="absolute text-black right-3 top-4 cursor-pointer"
                onClick={showPassword}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/dicvhxpz.json"
                  trigger="click"
                  colors="primary:#4f1091,secondary:#6c16c7"
                ></lord-icon>
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="text-white flex justify-center items-center gap-2 border-2 rounded-full py-2 px-4 mx-auto bg-purple-600 w-fit hover:bg-purple-400 hover:shadow-purple-500 hover:shadow-lg text-sm md:text-base"
          >
            <lord-icon
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="loop"
              delay="2000"
              colors="primary:#320a5c"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords text-white">
          <h1 className="text-2xl py-2">Your Passwords</h1>
            {passwordArray.length === 0 && <div>No Password to Show</div>}
            {passwordArray.length != 0 && <table className="table-auto w-full  overflow-hidden rounded-xl">
      <div className="absolute -inset-x-0 -z-30 h-full w-full items-center overflow-hidden px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#6b0182_100%)]" ></div>
            <thead className="bg-purple-900 border"> 
              <tr className="text-center">
                <th className="py-2" >Site/URL</th>
                <th className="py-2" >UserName</th>
                <th className="py-2" >Passwords</th>
              </tr>
            </thead>
            <tbody className="" >
                {passwordArray.map((item,index)=>{

                    return <tr className="text-center" key={index}>  
                 <td className="pt-4 border border-purple-500 pb-2">{item.site}</td>
                 <td className="pt-4 border border-purple-500 pb-2">{item.username}</td>
                 <td className="pt-4 border border-purple-500 pb-2">{item.password}</td>
              </tr>
            })}
              
            </tbody>
          </table>}
        </div>

      </div>
    </>
  );
};

export default Manager;
