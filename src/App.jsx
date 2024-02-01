import React, { useState, useEffect } from 'react';

function Terminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(['Hello User, type help to see the list of available commands']);
  const [figlet, setFiglet] = useState('');
  // const [user, setUser] = useState('anonymous');

  async function fetchArt() {
    try {
      const response = await fetch("figlet.txt");
      const art = await response.text();
      setFiglet(art);
      // console.log("success");
    } catch (error) {
      console.log('Error fetching ASCII art:', error);
    }
  }

  useEffect(() => {
    fetchArt();
  }, []);

  const handleCommand = () => {
    const command = input.trim().toLowerCase();

    switch (command) {
      case 'hello':
        setOutput(prevOutput => [...prevOutput, command + ' Hi']);
        break;
      case 'function':
        setOutput(prevOutput => [...prevOutput, 'Hello, Welcome to this terminal.']);
        break;
      default:
        setOutput(prevOutput => [...prevOutput, `Command not recognized: ${command}`]);
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
          <p key={index}><span className='operator'>Operator</span><span id='op'>@darthnet:</span> {line}</p>
        ))}
      </div>
      
      <div className="terminal-input">
        <span><span className='operator'>User</span><span id='op'>@darthnet</span>&gt;</span>
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
