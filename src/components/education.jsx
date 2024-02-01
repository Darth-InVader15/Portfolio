// Education component is not working at the moment and is directly used in the App.jsx

import React, { useEffect } from 'react';

const EducationCommand = ({ user, setInput, setOutput }) => {
  useEffect(() => {
    const fetchEducationContent = async () => {
      try {
        const response = await fetch('/src/education.txt'); // Update the path as needed
        const educationContent = await response.text();
        setOutput(prevOutput => [
          ...prevOutput,
          <span key={prevOutput.length}>
            <span className='operator'>Operator</span>
            <span id='op'>{`@${user}:`}</span> education
          </span>,
          educationContent,
        ]);
      } catch (error) {
        console.error('Error fetching education content:', error);
      }

      setInput('');
    };

    fetchEducationContent();
  }, [user, setInput, setOutput]);

  // Render a placeholder element
  return <div style={{ display: 'none' }}></div>;
};

export default EducationCommand;
