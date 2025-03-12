import React from 'react'

function HomePage() {
  return (
    <div className='p-4 flex justify-center items-center mt-10 text-lg'>
        <form method='post' className='p-8 rounded-lg text-white flex flex-col border border-black shadow-md bg-gradient-to-r from-gray-900 from-10% via-neutral-800 via-30% via-zinc-900 via-60% to-stone-900 to-90% hover:border-rose-500 hover:scale-105 transition-all'>
            <div className="flex justify-center space-x-4 mb-8">
                <a href="/login" className="p-4 text-xl font-bold text-center text-slate-700 hover:text-white hover:border-b-2 hover:border-rose-500 transition-all">Sign in</a>
                <a className="p-4 text-xl font-bold text-center border-b-2 border-rose-500">Sign up</a>
            </div>
            <label className=""></label>
            
        </form>

    </div>    
  )
}

export default HomePage
