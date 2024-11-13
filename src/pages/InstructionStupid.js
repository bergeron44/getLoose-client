import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import './InstructionStupid.css'; 
import { updateBar } from '../store/actions/barsActions'; // Import your updateBar action
   
const InstructionStupid = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Use it here at the top level
    const [instructions, setInstructions] = useState([]);
    const gameType = useSelector((state) => state.liveGames.gameType); 
    const currentBar = useSelector(state => state.bars.currentBar);

    useEffect(() => {
        // Adjust instructions based on the bar name and game type
        if (gameType === 'Date') {
            if (currentBar.barName === 'SassonBar') {
                setInstructions([
                    { text: 'ששון בר', className: 'highlight-red-stupid' },
                    { text: '🍷 הולך מדהים עם 2 כוסות יין ב70 ש״ח  🍷', className: 'highlight-red-stupid' },
                    { text: '👉🏼 החליקו ימינה אם עשיתם את מה שכתוב בכרטיס 👉🏼', className: 'highlight-black-stupid' },
                    { text: 'או', className: 'highlight-red-stupid' },
                    { text: '👈🏻 אחרת החליקו שמאלה 👈🏻', className: 'highlight-black-stupid' },
                    { text: '🍺 בצעו את העונש 🍺', className: 'highlight-red-stupid' },
                    { text: 'חזרו חלילה🍻', className: 'highlight-black-stupid' }
                ]);
            } 
            else if(currentBar.barName === 'Mileva')
            {
                setInstructions([
                    { text: 'מילבה', className: 'highlight-red-stupid' },
                    { text: '🍷 הולך מדהים עם 2 כוסות יין ב70 ש״ח  🍷', className: 'highlight-red-stupid' },
                    { text: '👉🏼 החליקו ימינה אם עשיתם את מה שכתוב בכרטיס 👉🏼', className: 'highlight-black-stupid' },
                    { text: 'או', className: 'highlight-red-stupid' },
                    { text: '👈🏻 אחרת החליקו שמאלה 👈🏻', className: 'highlight-black-stupid' },
                    { text: '🍺 בצעו את העונש 🍺', className: 'highlight-red-stupid' },
                    { text: 'חזרו חלילה🍻', className: 'highlight-black-stupid' }
                ]);
            }
            else if(currentBar.barName === 'BarGiora')
                {
                    setInstructions([
                        { text: 'בר גיורא', className: 'highlight-red-stupid' },
                        { text: '🍷 הולך מדהים עם 2 כוסות יין ב70 ש״ח  🍷', className: 'highlight-red-stupid' },
                        { text: '👉🏼 החליקו ימינה אם עשיתם את מה שכתוב בכרטיס 👉🏼', className: 'highlight-black-stupid' },
                        { text: 'או', className: 'highlight-red-stupid' },
                        { text: '👈🏻 אחרת החליקו שמאלה 👈🏻', className: 'highlight-black-stupid' },
                        { text: '🍺 בצעו את העונש 🍺', className: 'highlight-red-stupid' },
                        { text: 'חזרו חלילה🍻', className: 'highlight-black-stupid' }
                    ]);
                }
             else {
                setInstructions([
                    { text: '🍷 מבצע מיוחד עם המשחק 2 כוסות יין ב 50 ש״ח🍷', className: 'highlight-red-stupid' },
                    { text: '👉🏼 החליקו ימינה אם אתם רוצים לשתף או אם עשיתם את מה שכתוב בכרטיס 👉🏼', className: 'highlight-black-stupid' },
                    { text: 'או', className: 'highlight-red-stupid' },
                    { text: '👈🏻 אחרת החליקו שמאלה 👈🏻', className: 'highlight-black-stupid' },
                    { text: '🍺 בצעו את העונש  🍺', className: 'highlight-red-stupid' },
                    { text: 'חזרו חלילה🍻', className: 'highlight-black-stupid' }
                ]);
            }
        } else {
            if (currentBar.barName === 'SassonBar') {
                setInstructions([
                    { text: 'ששון בר', className: 'highlight-red-stupid' },
                    { text: '🍾 מבצע מיוחד של המשחק:שוט שלישי חינם 🍾', className: 'highlight-red-stupid' },
                    { text: '👉🏼 אמיצים ? החליקו ימינה ועשו את מה שכתוב 👉🏼', className: 'highlight-black-stupid' },
                    { text: 'או', className: 'highlight-red-stupid' },
                    { text: '👈🏻 פחדנים ? החליקו שמאלה ועשו את העונש 👈🏻', className: 'highlight-black-stupid' },
                    { text: '🍺 העבירו את הטלפון לחבר הבא 🍺', className: 'highlight-red-stupid' },
                    { text: '🎉 יאללללה להשתכרררר 🎉', className: 'highlight-black-stupid' }
                ]);
            } 
            else if (currentBar.barName === 'Mileva') {
                setInstructions([
                    { text: 'מילבה', className: 'highlight-red-stupid' },
                    { text: '🍾 מבצע מיוחד של המשחק:שוט שלישי חינם 🍾', className: 'highlight-red-stupid' },
                    { text: '👉🏼 אמיצים ? החליקו ימינה ועשו את מה שכתוב 👉🏼', className: 'highlight-black-stupid' },
                    { text: 'או', className: 'highlight-red-stupid' },
                    { text: '👈🏻 פחדנים ? החליקו שמאלה ועשו את העונש 👈🏻', className: 'highlight-black-stupid' },
                    { text: '🍺 העבירו את הטלפון לחבר הבא 🍺', className: 'highlight-red-stupid' },
                    { text: '🎉 יאללללה להשתכרררר 🎉', className: 'highlight-black-stupid' }
                ]);
            } 
            else if (currentBar.barName === 'BarGiora') {
                setInstructions([
                    { text: 'בר גיורא', className: 'highlight-red-stupid' },
                    { text: '🍾 מבצע מיוחד של המשחק:שוט שלישי חינם 🍾', className: 'highlight-red-stupid' },
                    { text: '👉🏼 אמיצים ? החליקו ימינה ועשו את מה שכתוב 👉🏼', className: 'highlight-black-stupid' },
                    { text: 'או', className: 'highlight-red-stupid' },
                    { text: '👈🏻 פחדנים ? החליקו שמאלה ועשו את העונש 👈🏻', className: 'highlight-black-stupid' },
                    { text: '🍺 העבירו את הטלפון לחבר הבא 🍺', className: 'highlight-red-stupid' },
                    { text: '🎉 יאללללה להשתכרררר 🎉', className: 'highlight-black-stupid' }
                ]);
            } 
            else {
                setInstructions([
                    { text: '😵 מומלץ מאוד לקחת  🥃 10 שוטים ב- 50 ש״ח בלבד', className: 'highlight-red-stupid' },
                    { text: '👉🏼 אמיצים ? החליקו ימינה ועשו את מה שכתוב 👉🏼', className: 'highlight-black-stupid' },
                    { text: 'או', className: 'highlight-red-stupid' },
                    { text: '👈🏻פחדנים ? החליקו שמאלה ועשו את העונש👈🏻', className: 'highlight-black-stupid' },
                    { text: '🍺 העבירו את הטלפון לחבר הבא 🍺', className: 'highlight-red-stupid' },
                    { text: '🎉 יאללללה להשתכרררר 🎉', className: 'highlight-black-stupid' }
                ]);
            }
        }
    }, [gameType, currentBar]);

    const handleStartPlaying = async () => {
        console.log(gameType);
    
        try {
            // Determine the game type key
            const gameTypeKey = gameType === 'Date' ? 'datingGame' :
                                 gameType === 'Friends' ? 'friendsGame' :
                                 'partyGame';
    
            // Create the update payload to increment the game type count
            const updatePayload = {
                gameType: gameTypeKey,  // Pass the game type as part of the payload
                gameStats: {
                    [gameTypeKey]: (currentBar.gameStats[gameTypeKey] || 0) + 1,  // Increment the game count
                }
            };
    
            // Dispatch the updateBar function
            await dispatch(updateBar(currentBar._id, updatePayload));
        } catch (error) {
            console.error('Error updating game stats:', error);
        }
    
        // Navigate based on the game type
        if (gameType === 'Friends') {
            navigate('/FriendsGame');
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
