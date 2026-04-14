import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { PreferencesContext } from "../context/PreferencesContext";
import "../styles/settings.css";

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currency, setCurrency, userName, setUserName } =
    useContext(PreferencesContext);

  return (
    <div className="settings-container">
      <div className="settings-card">
        <section className="settings-section">
          <div className="settings-header">
            <h3>Tema</h3>
          </div>
          <button className="settings-button" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Mudar para Dark" : "☀️ Mudar para Light"}
          </button>
        </section>

        <section className="settings-section">
          <label htmlFor="currency" className="settings-label">
            Moeda
          </label>
          <select
            id="currency"
            className="settings-input"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="EUR">EUR - Euro</option>
            <option value="USD">USD - Dólar</option>
            <option value="GBP">GBP - Libra</option>
          </select>
        </section>

        <section className="settings-section">
          <label htmlFor="userName" className="settings-label">
            O teu nome
          </label>
          <input
            id="userName"
            type="text"
            className="settings-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Como te chamas?"
          />
        </section>
      </div>
    </div>
  );
};

export default Settings;
