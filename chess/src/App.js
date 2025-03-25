import './App.css';
import Board from './components/Board/Board';
import { reducer } from './reducer/reducer';
import { useReducer } from 'react';
import { initGameState } from './constants';
import AppContext from './contexts/Context';
import Control from './components/Control/Control';
import TakeBack from './components/Control/bits/TakeBack';
import MovesList from './components/Control/bits/MovesList';
import ThemeToggleButton from './components/Control/ThemeToggleButton'; // Importando o botão
import { useState, useEffect } from "react";

function App() {
    const [appState, dispatch] = useReducer(reducer, initGameState);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    };

    const providerState = {
        appState,
        dispatch,
        theme,
        toggleTheme
    };

    return (
        <AppContext.Provider value={providerState}>
            <div className="App">
                <Board />
                <Control>
                    <ThemeToggleButton /> {/* Adicionando o botão */}
                    <MovesList />
                    <TakeBack />
                </Control>
            </div>
        </AppContext.Provider>
    );
}

export default App;
