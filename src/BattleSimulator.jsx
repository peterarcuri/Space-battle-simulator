import React, { useState } from 'react';


function BattleSimulator ({minDamage = 0, maxDamage = 50}) {

    const [playerHealth, setPlayerHealth] = useState(100);
    const [enemyHealth, setEnemyHealth] = useState(100);
    
    const [gameStatus, setGameStatus] = useState("active");

    const getRandomDamage = () => Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;

    const fireAttack = () => {

        const playerDamage = getRandomDamage();
        const enemyDamage = getRandomDamage();

        const newPlayerHealth = Math.max(playerHealth - enemyDamage, 0);
        const newEnemyHealth = Math.max(enemyHealth - playerDamage, 0);

        setPlayerHealth(newPlayerHealth);
        setEnemyHealth(newEnemyHealth);

        if (newPlayerHealth === 0 && newEnemyHealth === 0) {
            setGameStatus("draw")
        }
        else if (newEnemyHealth === 0) {
            setGameStatus("won")
        }
        else if (newPlayerHealth === 0) {
            setGameStatus("lost");
        }
    }

    const handleRestart = () => {
        setPlayerHealth(100);
        setEnemyHealth(100);
        setGameStatus("active");
    }

    const gameStatusMessage = () => {

        switch (gameStatus) {
            case "won":
                return "Congratulations! 🎉 You've successfully defended your spacecraft";
            case "lost":
                return "Mission Failed. 😵 Your spacecraft has been defeated.";
            case "draw":
                return "It's a draw! 🤝 Both spacecrafts have been netralized.";
            default:
                return "Engage the enemy! 🐦‍🔥";
        }
    }

    const renderhealth = (health) => {

        let healthSymbol;

        if (health === 100) {
            healthSymbol = "💜";
        }
        else if (health === 0) {
            healthSymbol = "💀";
        }
        else {
            healthSymbol = "❤️‍🩹"
        }
        return `${health} ${healthSymbol}`;
    }

    return (
        <div className="game-container">

            <div className={"player"}>
                <p>Player Health: <span className={"score"}>{renderhealth(playerHealth)}</span></p>
            </div>

            {
                gameStatus === "active" &&
                <div className={"attack"}>
                    <button onClick={fireAttack}>Fire!</button>
                </div>
            }

            {
                gameStatus !== "active" &&
                <div className={"restart"}>
                    <button onClick={handleRestart}>Restart?</button>
                </div>
            }

            <div className={"enemy"}>
                <p>Enemy Health: <span className={"score"}>{renderhealth(enemyHealth)}</span></p>
            </div>

            <div className={"message-container"}>
                <p>{gameStatusMessage()}</p>
            </div>
        </div>
    )
}

export default BattleSimulator;
