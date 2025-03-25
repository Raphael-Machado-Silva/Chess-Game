import React from "react";
import { useContext } from "react";
import AppContext from "../../contexts/Context";
import { Sun, Moon } from "lucide-react"; // Importando ícones

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useContext(AppContext);

    return (
        <button 
            onClick={toggleTheme} 
            style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.5rem",
                padding: "8px",
                position: "fixed",
                top: "10px",
                left: "10px"
            }}
            title={`Trocar para ${theme === "light" ? "Modo Escuro" : "Modo Claro"}`}
        >
            {theme === "light" ? (
                <Moon size={28} color="black" /> // Lua preta no modo claro
            ) : (
                <Sun size={28} color="white" /> // Sol amarelo no modo escuro
            )}
        </button>
    );
};

export default ThemeToggleButton;
