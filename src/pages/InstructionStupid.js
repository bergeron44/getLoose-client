import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import './InstructionStupid.css'; 
   
const InstructionStupid = () => {
    const navigate = useNavigate();
    const [instructions, setInstructions] = useState([]);
    const gameType = useSelector((state) => state.liveGames.gameType); 
    
    
    useEffect(() => {
        
        if (gameType === 'Date') {
            setInstructions([
                { text: '🍷 הולך מדהים עם 2 כוסות יין ב50 ש״ח 🍷', className: 'highlight-red-stupid' },
                { text: '👉🏼 החליקו ימינה אם אתם רוצים לשתף או אם עשיתם את מה שכתוב בכרטיס 👉🏼', className: 'highlight-black-stupid' },
                { text: 'או', className: 'highlight-red-stupid' },
                { text: '👈🏻 אחרת החליקו שמאלה 👈🏻', className: 'highlight-black-stupid' },
                { text: '🍺 בצעו את העונש  🍺', className: 'highlight-red-stupid' },
                { text: 'חזרו חלילה🍻', className: 'highlight-black-stupid' }
            ]);
        } else {
            setInstructions([
                { text: ' 😵 מומלץ מאוד לקחת  🥃 10 שוטים ב- 50 ש״ח בלבד', className: 'highlight-red-stupid' },
                { text: '👉🏼 אמיצים ? החליקו ימינה ועשו את מה שכתוב 👉🏼', className: 'highlight-black-stupid' },
                { text: 'או', className: 'highlight-red-stupid' },
                { text: '👈🏻פחדנים ? החליקו שמאלה ועשו את העונש👈🏻', className: 'highlight-black-stupid' },
                { text: '🍺 העבירו את הטלפון לחבר הבא 🍺', className: 'highlight-red-stupid' },
                { text: '🎉 יאללללה להשתכרררר 🎉', className: 'highlight-black-stupid' }
            ]);
        }
    }, [gameType]);

    const handleStartPlaying = () => {
        console.log(gameType);
        if (gameType === 'Friends') {
            navigate('/FrindesGame');
        } else {
            navigate('/DateGame');
        }
    };

    return (
        <div className="stupid-landing-page">
            <div className="stupid-landing-content">
                <h4 className="stupid-landing-title">🍺 Game Rules 🍺</h4>
                {instructions.map((instruction, index) => (
                    <p key={index} className={instruction.className}>
                        {instruction.text}
                    </p>
                ))}
                <button className="stupid-start-button" onClick={handleStartPlaying}>
                🍺 החל לשחק 🍺
                </button>
            </div>
        </div>
    );
};

export default InstructionStupid;
