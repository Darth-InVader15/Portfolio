import React, { useState, useEffect } from 'react';

function Terminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(['Type `help` to see the list of available commands']);
  const [figlet, setFiglet] = useState('');
  const [user, setUser] = useState('Guest'); // Default user name
  const [currentText, setCurrentText] = useState('');

  async function fetchArt() {
    try {
      const response = await fetch("figlet.txt");
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

    // const typeCommand = async (text) => {
    //     setCurrentText(''); // Reset the current text
    //   for (const word of text.split(' ')) {
    //   setCurrentText((prevText) => prevText + word + ' ');
    //   await new Promise((resolve) => setTimeout(resolve, 100)); 
    //   }
    // };

    if (command.startsWith('setuser '))
    {
      const newUserName = command.replace('setuser ', '');
      setUser(newUserName);
      const res = "User name set to: " + newUserName;
      printOut(res);  
    } 
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
          const statement = "Command not recognized " +command +  " Here's a list of commands you can try:-\n\n " +
           "about, resume, interests, techstack, projects, currentroles, gui";
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

      <div className='footer'> Welcome to <span className='tit'>Darth-Shell</span>, a terminal styled portfolio page for <span className='tit'>Darth InVader</span></div>
      <div className="terminal-output">
        {output.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        {/* <p>{currentText}</p> */}
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
