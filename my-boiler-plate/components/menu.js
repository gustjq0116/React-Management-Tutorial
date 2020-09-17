import { useState } from 'react'
import React from 'react'
import Link from 'next/link'

function menu() {

    const [IsMenuOpend, setIsMenuOpend] = useState(false)

    return (
            <nav style={{ minWidth: '320px'}}className="flex items-center justify-between flex-wrap bg-teal-500 p-6 ">
                <Link href="/">
                    <a>
                        <div className="flex items-center flex-shrink-0 text-white mr-6">
                            <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
                            <span className="font-semibold text-xl tracking-tight">Home</span>
                        </div>
                    </a>
                </Link>
                
                <div className="block md:hidden">
                    <button onClick={()=> {setIsMenuOpend(!IsMenuOpend)}} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>메뉴</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                    
                </div>
                {IsMenuOpend &&
                <div style={{ maxWidth: '140px'}} className="rounded-lg mt-40 bg-teal-500 right-0 absolute text-right w-full block flex-grow md:items-center md:w-auto md:hidden p-6" hidden>
                    <div className="z-10 ">
                        <a href="#responsive-header" className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4">
                            로그인
                        </a>
                        <Link href="/sign_up">
                            <a className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4">
                                회원가입
                            </a>
                        </Link>
                        
                    </div>
                </div> 
                }
                <div className="w-full hidden flex-grow md:items-center md:w-auto md:block">
                    <a href="#responsive-header" className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4">
                        로그인
                    </a>
                    <Link href="/sign_up">
                        <a className="block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4">
                            회원가입
                        </a>
                    </Link>
                </div>
            </nav> 
    )
}

export default menu