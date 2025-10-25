
import { useState } from 'react'
import './App.css'
import { URL } from './consts'

function App() {

  const [question,setQuestion] = useState('');
  

const payload = {
    "contents": [{
"parts": [
{"text": "Explain how AI works in a few words"}]
  }]
}
  
  const askQuestion = async() => {
    let response = await fetch(URL,{
      method:'POST',
      body:JSON.stringify(payload)
    })

    response = await response.json();
    console.log(response.candidates[0].content.parts[0].text);
    
  }
 

  return (
    <div className='grid grid-cols-5 h-screen text-center'>
      <div className='col-span-1 bg-zinc-800 '>
      </div>
      <div className='col-span-4'>
        <div className='container h-170 '>

        </div>
        <div className='bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl
        border border-zinc-700 flex h-16'>
          <input type="text" value={question} onChange={(event)=>setQuestion(event.target.value)}
           className='w-full h-full p-3 outline-none' placeholder='Ask me Question' />
          <button onClick={askQuestion}>Enter</button>
        </div>
      </div>
    </div>
  )
}

export default App
