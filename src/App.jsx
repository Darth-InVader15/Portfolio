import React, { useState, useEffect } from 'react';

function Terminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(['Type `help` to see the list of available commands']);
  const [figlet, setFiglet] = useState('');
  const [user, setUser] = useState('Guest'); // Default user name

  async function fetchArt() {
    try {
      const response = await fetch("/src/assets/figlet.txt");
      const art = await response.text();
      setFiglet(art);
    } catch (error) {
      console.error('Error fetching ASCII art:', error);
    }
  }

  useEffect(() => {
    fetchArt();
  }, []);

  const handleCommand = async () => {
    
    const command = input.trim().toLowerCase();

    if (command.startsWith('setuser '))
    {
      const newUserName = command.replace('setuser ', '');
      setUser(newUserName);
      const res = "User name set to: " + newUserName;
      printOut(res);  
    } 
    // else if(command === "kudo pop install fun")
    // {
    //   response = "---------Done. \n" + "Try commands like `kanyeq` or `jokeme`";
    // }
    else if(command === 'clear')
      {
        setOutput([]);
      }
    // else if(command === 'kanye')
    // {
    //     const response = await fetch("https://api.kanye.rest");
    //     const txt = await response.data.quote;

    //     printOut(txt);
    // }
    else{
      try {
        const response = await fetch(`/src/assets/${command}.txt`);
        console.log("here");
        if(response.status === 200 && response.headers.get('content-type') === 'text/plain')
        {
          console.log("passed");
          const cont =  await response.text();
          printOut(cont);
        }
        else
        {
          console.log("failed");
          if(command !== "help" )
          {
            var ment = "Command not recognized: " + command + ". ";
          }
          else var ment = "";
          let statement = ment +  " Here's a list of commands you can try:-\n\n " +
           "about, interests, techstack, projects, currentroles, gui\n";// + "Or try `kudo pop install fun` to install some fun commands";
          printOut(statement);      
        }
      } catch (error) {
        console.log("Error fetching data: ", error);
        return "Error...... Its not you, its us"
      } 
    }
        
    function printOut(response) {
      const newOutput = [
        <span key={output.length}>
          <span className='operator'>{user}</span>
          <span id='op'>@darthnet:</span> {input}
        </span>,
        response,
      ];
      setOutput(prevOutput => [...prevOutput, ...newOutput]);
    }
    setInput('');
  };

  return (
    <div className="terminal-container">
      <div className="figlet">
        {figlet.split('\n').map((line, index) => (
          <div key={index}>{line}</div>
        ))}        
      </div>

      <div className='footer'> Welcome to <span className='tit'>Darth-Shell</span>, a terminal themed portfolio page for <span className='tit'>Darth InVader</span></div>
      <div className="terminal-output">
        {output.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      
      <div className="terminal-input">
        <span><span className='operator'>{user}</span><span id='op'>@darthnet:</span>&gt;</span>
        <input 
          type="text"
          placeholder="Type a command..."
          value={input}

          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCommand();
            }
          }}
          style={{ fontFamily: 'monospace' }} // Set the font to a monospaced font
        />
      </div>
    </div>
  );
}

export default Terminal;
