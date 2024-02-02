import React, { useState, useEffect } from 'react';

function Terminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(['Type `help` to see the list of available commands or `clear` to clear the screen' ]);
  const [figlet, setFiglet] = useState('');
  const [user, setUser] = useState('Guest'); // Default user name
  

  async function fetchArt() {
    try {
      const response = await fetch("/files/figlet.txt");
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
    else if(command === "connect")
    {
      const response = (
        <div>
        <p>
          <a href={`https://www.instagram.com/__i.r.i.d.e.s.c.e.n.t___/`} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </p>
        <p>
          <a href={`https://www.linkedin.com/in/darthinvader5/`} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </p>
        <p>
          <a href={`mailto:piyush.singh1315@gmail.com`} target="_blank" rel="noopener noreferrer">
            Gmail
          </a>
        </p>
        <p>
          <a href={`https://github.com/Darth-InVader15`} target="_blank" rel="noopener noreferrer">
            Github
          </a>
        </p>
      </div>
      );
      // console.log(response);
      printOut(response);
    }
    
    else if(command === 'clear')
      {
        setOutput([]);
      }
    else if(command === 'kanye')
    {
      try {
        const response = await fetch("https://api.kanye.rest");
        const res = await response.json();
    
        if (res && res.quote) {
          const txt = res.quote;
          printOut("`" + txt + "` --Kanye West");
        } else {
          console.log("Error: Quote not found in the response");
        }
      } catch (error) {
        console.error("Error fetching Kanye quote:", error);
      }
    }
    else{
      try {
        const response = await fetch(`/files/${command}.txt`);
        console.log("here");
        // const cont = await response.text();
        // printOut(cont);
        if(response.status === 200 && response.headers.get('content-type') === 'text/plain; charset=utf-8')
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
            var ment = "Command not recognized: `" + command + "`. ";
          }
          else var ment = "";
          let statement = ment +  " Here's a list of commands you can try:-\n\n " +
           "about, connect, kanye, interests, techstack, projects, currentroles, gui. \n" + "You can change the user by `setuser <your name>`";// + "Or try `kudo pop install fun` to install some fun commands";
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

      <div className='footer'> Welcome to <span className='tit'>Darth-Shell</span>, a terminal themed page for <span className='tit'>Darth InVader</span></div>
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
