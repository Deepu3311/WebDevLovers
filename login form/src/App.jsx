import { useState } from 'react'
import reactLogo from './assets/react.svg'


function App() {
  const [loginData, setLogindata] = useState
    ({})
  const [isLoading, setLoading] = useState(false)
  const onLoginFormSubmit = e => {
    e.preventDefault();
    console.log({ loginData })
    // dummy loading 
    setLoading(true)
    setTimeout(() => setLoading(false), 1000);
  }
  return (
    <>
      <header className='fixed bg-white w-full p-4'>
        {/* {
          isLoading && <section className='fixed grid place-items-center text-white text-2xl font-semibold inset-0 bg-black/40 backdrop-filter backdrop-blur-md'>
<h3>Please wait...</h3>
          </section>
        } */}
        <h4 className='text-xl text-blue-500 text-center font-bold'>Innovative solutions</h4>
      </header>
      <div className="bg-slate-200  h-full flex justify-center items-center">

        <div className="bg-white w-[90%] max-w-[400px] px-6 py-6 rounded-md shadow-lg">
          <h4 className='text-xl  mb-2 text-slate-800 font-semibold'>Login here</h4>
          <form className='' onSubmit={onLoginFormSubmit}>
            <label htmlFor="username" className=' text-md text-slate-600 mt-4 mb-2 inline-block'>Username</label>
            <input
              required className='text-md py-2 px-4 rounded-md outline-none w-full border focus:border-blue-500' type="text" id='username'
              onInput={e => setLogindata({ ...loginData, username: e.target.value })}
              value={loginData?.username} />
            <label htmlFor="password" className=' text-md text-slate-600 mt-4 mb-2 inline-block'>Password</label>
            <input
              required
              className='text-md py-2 px-4 rounded-md outline-none w-full border focus:border-blue-500' type="password" id='password'
              onInput={e => setLogindata({ ...loginData, password: e.target.value })}
              value={loginData?.password} />
            <button className='py-2 px-8 bg-blue-500 text-white rounded-md mt-4'>{isLoading ? "Please wait..." : "Login"}</button>
            <p className='text-slate-500 text-md my-4'>Dont have an account yet , <a href="/" className='text-blue-500'>sign up here</a></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
