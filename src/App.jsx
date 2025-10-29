
import { useState } from "react";
import "./App.css";
import { URL } from "./consts";
import Answer from "./Answers";



function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);


  const payload = {
    contents: [
      {
        parts: [{ text: question }],
      },
    ],
  };

  const askQuestion = async () => {
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());

    setResult([...result,{ type: 'q', text: question },{ type: 'a', text: dataString } ])
  }

  console.log(result);

  return (
    <div className="grid grid-cols-5 h-screen text-l">
      {/* Sidebar */}
      <div className="col-span-1 bg-zinc-800"></div>

      {/* Main content */}
      <div className="col-span-4 flex flex-col justify-between">
        {/* Scrollable container */}
        <div className="container h-full overflow-y-auto p-4">
          <div className="text-zinc-300">
            <ul>
              {result.map((item, index) =>(
                <div key={index+Math.random()} className={item.type == 'q' ? "flex justify-end":""}>
                  {
                    item.type == 'q' ? 
                  <li key={index + Math.random()} 
                  className="text-right border-5 bg-zinc-700 border-zinc-700 rounded-tl-2xl w-fit  p-1">
                  <Answer ans={item.text} totalResult={1} index={index} type = {item.type} /></li>
                 :item.text.map((ansItem,ansIndex) => (
                    <li key={ansIndex + Math.random()} className="text-left p-1">
                      <Answer ans={ansItem} totalResult={item.length} index={ansIndex} type = {item.type}/>
                    </li>
                  ))
                  }
                </div>
              )
              )}
            </ul>
          </div>
        </div>

        {/* Question box */}
        <div
          className="bg-zinc-800 w-1/2 p-1 pr-5 text-white mx-auto mb-6 rounded-2xl
      border border-zinc-700 flex h-16"
        >
          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            className="w-full h-full p-3 outline-none bg-transparent text-white"
            placeholder="Ask me a question..."
          />
          <button onClick={askQuestion}>Enter</button>
        </div>
      </div>
    </div>
  );
}

export default App;