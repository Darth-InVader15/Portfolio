import React, { useState, useEffect } from 'react';

function Terminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(['Type `help` to see the list of available commands']);
  const [figlet, setFiglet] = useState('');
  const [user, setUser] = useState('Guest'); // Default user name

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

    if (command.startsWith('setuser '))
    {
      const newUserName = command.replace('setuser ', '');
      setUser(newUserName);
      setOutput(prevOutput => [ ...prevOutput,
        <span key={output.length}>
          <span className='operator'>{user}</span>
          <span id='op'>@darthnet:</span> {input}
        </span>,  `User name set to: ${newUserName}`]);
    } 

    else{
      switch(command)
      {
        case 'education':
        try {
          const response = await fetch('/src/assets/education.txt'); // 
          const educationContent = await response.text();
          setOutput(prevOutput => [ ...prevOutput,
            <span key={output.length}>
              <span className='operator'>{user}</span>
              <span id='op'>@darthnet:</span> {input}
            </span>,
            educationContent,
          ]);
        } catch (error) {
          console.error('Error fetching education content:', error);
        }
        break;

        case 'projects':
          try {
            const response = await fetch('/src/assets/projects.txt'); // 
            const proContent = await response.text();
            setOutput(prevOutput => [ ...prevOutput,
              <span key={output.length}>
                <span className='operator'>{user}</span>
                <span id='op'>@darthnet:</span> {input}
              </span>,
              proContent,
            ]);
          } catch (error) {
            console.error('Error fetching projects content:', error);
          }
          break;

          case 'interests':
            try {
              const response = await fetch('/src/assets/interests.txt');
              const interestsContent = await response.text();
              setOutput(prevOutput => [
                ...prevOutput,
                <span key={prevOutput.length}>
                  <span className='operator'>{`${user}`}</span>
                  <span id='op'>@darthnet:</span> {input}
                </span>,
                interestsContent,
              ]);
            } catch (error) {
              console.error('Error fetching interests content:', error);
            }
            break;

          case 'currentroles':
            try {
              const response = await fetch('/src/assets/roles.txt');
              const currentRolesContent = await response.text();
              setOutput(prevOutput => [
                ...prevOutput,
                <span key={prevOutput.length}>
                  <span className='operator'>{`${user}`}</span>
                  <span id='op'>@darthnet:</span> {input}
                </span>,
                currentRolesContent,
              ]);
            } catch (error) {
              console.error('Error fetching current roles content:', error);
            }
            break;

          case 'techstack':
            try {
              const response = await fetch('/src/assets/techstack.txt');
              const techStackContent = await response.text();
              setOutput(prevOutput => [
                ...prevOutput,
                <span key={prevOutput.length}>
                  <span className='operator'>{`${user}`}</span>
                  <span id='op'>@darthnet:</span> {input}
                </span>,
                techStackContent,
              ]);
            } catch (error) {
              console.error('Error fetching tech stack content:', error);
            }
            break;

          case 'about':
            try {
              const response = await fetch('/src/assets/about.txt');
              const accoladesContent = await response.text();
              setOutput(prevOutput => [
                ...prevOutput,
                <span key={prevOutput.length}>
                  <span className='operator'>{`${user}`}</span>
                  <span id='op'>@darthnet:</span> {input}
                </span>,
                accoladesContent,
              ]);
            } catch (error) {
              console.error('Error fetching accolades content:', error);
            }
            break;

            case 'resume':
              try {
                const response = await fetch('/src/assets/resume.txt');
                const resumeContent = await response.text();
                setOutput(prevOutput => [
                  ...prevOutput,
                  <span key={prevOutput.length}>
                    <span className='operator'>{`${user}`}</span>
                    <span id='op'>@darthnet:</span> {input}
                  </span>,
                  resumeContent,
                ]);
              } catch (error) {
                console.error('Error fetching accolades content:', error);
              }
              break;


            case 'gui':
              setOutput(prevOutput => [
                ...prevOutput,
                <span key={prevOutput.length}>
                  <span className='operator'>{`${user}`}</span>
                  <span id='op'>@darthnet:</span> {input}
                </span>,
                "you can try the gui version, here's the link: 404",
              ]);
              break;

        default:
          setOutput(prevOutput => [
            ...prevOutput,
            <span key={output.length}>
              <span className='operator'>{user}</span>
              <span id='op'>@darthnet:</span> {input}
            </span>,
            `Command not recognized: ${command}`, "Here's a list of commands you can try",
            "about, resume, interests, techstack, projects, currentroles, gui",
          ]);
      }
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
