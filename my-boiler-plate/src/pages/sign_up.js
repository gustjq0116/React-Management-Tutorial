import React from 'react'
import Layout from '../components/layout'

function sign_up() {
    return (
        <Layout>
            <div className="text-center">
                <h2 className=" text-teal-500 mt-20 text-xl">
                    <strong>회원가입</strong>
                </h2>
            </div>
            
            <div style={{ height: '40vh'}} class="flex items-center justify-center">
                
                <form>
                    <div className="sm:w-1/4 sm:inline-block">
                        <label className="block text-gray-500 font-bold sm:text-right mb-1 sm:mb-0 pr-4" htmlFor="inline-full-name">
                            Email
                        </label>
                    </div>
                    <div className="sm:w-3/4 sm:inline-block">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500" id="inline-full-name" type="email" placeholder="email@email.com"/>
                    </div>
                    <div className="sm:w-1/4 sm:inline-block pt-2 sm:pt-6">
                        <label className="block text-gray-500 font-bold sm:text-right mb-1 sm:mb-0 pr-4" htmlFor="inline-password">
                            Password
                        </label>
                    </div>
                    <div className="sm:w-3/4 sm:inline-block sm:pt-6">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500" id="inline-password" type="password" placeholder="******************" />
                    </div>
                    <div className=" mt-6 flex sm:justify-center">
                        <button className="shadow w-full sm:w-40 bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
        
    )
}

export default sign_up
