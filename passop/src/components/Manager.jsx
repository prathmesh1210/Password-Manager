import React, { useState } from 'react'
import { useRef, useEffect } from 'react'

import  uuidv4  from 'uuid4';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: " ", password: " " })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");

        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }



    }, [])

    const copyText = (text) => {
        toast('Copy to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
           
        });
        navigator.clipboard.writeText(text)

    }

    const showpassword = () => {
        passwordRef.current.type = "text"

        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eyecross.png"
        }

    }

    const savepassword = () => {
        if (form.site.length >3 && form.username.length >3 && form.password.length>3){

            
            setPasswordArray([...passwordArray, {...form , id:uuidv4()}])
            localStorage.setItem("password", JSON.stringify([...passwordArray, {...form , id :uuidv4()}]))
            console.log(passwordArray)
            setform({site:" " , username:" " , password:" "})
            toast('Password Saved successfully!', {
            position: "top-right",
            autoClose: 5000,    
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            
        });
 

    }
    }

    const deletepassword=(id)=>{
        console.log (' Deleting password with id ' , id)
        let c = confirm (" Do you really want to Delete this password? ")
        if (c){
            setPasswordArray(passwordArray.filter(item=>item.id!== id))
            localStorage.setItem("Passwords " , JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        }
        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
           
        });
 

    }

    const editpassword=(id)=>{
        console.log ( "Editing password with id " , id )
        setform(passwordArray.filter(item=>item.id ===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
       

    }


    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
             
            />
            {/* Same as */}
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-grad ient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="  bg-slate-50 mycontainer  ">
                <h1 className='text-3xl  text font-bold text-center'>
                    <span className="text-green-700">&lt;</span>

                    <span> Pass</span>
                    <span className="text-green-700">OP/&gt; </span>

                </h1>
                <p className='text-green-900  text-center text-lg'> Your own password manager</p>
                <div className=" text-black flex flex-col p-4 text-black gap-8 items-center">

                    <input value={form.site} onChange={handlechange} placeholder="Enter Website Url" className=" rounded-full border border-green-500 w-full p-4 py-1" type="text" id="" name="site" />
                    <div className="flex w-full justify-center gap-8 text-black">
                        <input value={form.username} onChange={handlechange} placeholder="Enter UserName" className=" rounded-full border border-green-500 w-full p-4 py-1 text-black" type="text" id="" name="username" />
                        <div className=" relative">
                            <input ref={passwordRef} value={form.password} onChange={handlechange} placeholder="Enter password" className="rounded-full border border-green-500 w-full p-4 py-1" type="password" id="" name="password" />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer ' onClick={showpassword}>
                                <img ref={ref} className="p-1" width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>


                    </div>
                    <button onClick={savepassword} className=' flex justify-center item-center bg-green-400 hover:bg-green-300 px-4 py-2 w-fit rounded-full gap-2 border border-green-900 ring-white ring-2'><lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover"
                    >
                    </lord-icon>
                        Save Password</button>

                </div>

                <div className="passwords">
                    <h2 className=" font-bold text-2xl py-4"> Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show </div>}


                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className=' bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'> UserName</th>
                                <th className='py-2'>Passwords</th>
                                <th className='py-2'>Actions</th>

                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {

                                return <tr key={index}>
                                    <td className=' flex items-center justify-center py-2 border border-white text-center '><a href={item.site} target='_blank'>{item.site} </a>
                                        <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.site) }}>

                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center '>
                                        <div className=' lordiconcopy flex items-center justify-center' onClick={() => { copyText(item.username) }}>

                                            <span> {item.username}</span>
                                            <div className=" size-7 cursor-pointer">
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center '>
                                        <div className=' flex items-center justify-center'>

                                            <span>{item.password} </span>
                                            <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    
                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span className=' cursor-pointer'onClick={()=>{editpassword(item.id)}}> <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon></span>

                                            <span className=' cursor-pointer mx-2' onClick={()=>{deletepassword(item.id)}}> <lord-icon
                                            src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon></span>
                                    </td>

                                </tr>
                            })}

                        </tbody>
                    </table>}


                </div>


            </div>

        </>
    )
}

export default Manager