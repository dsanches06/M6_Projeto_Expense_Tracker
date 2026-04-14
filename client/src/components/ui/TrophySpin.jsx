import { TrophySpin } from "react-loading-indicators";
import { useTheme } from "../../context/ThemeContext";
import "../../styles/TrophySpin.css";

const Loader = () => {
  const { theme } = useTheme();

  const loaderColor = theme === "dark" ? "#5a8aff" : "#4a78e0";
  const textColorValue = theme === "dark" ? "#e8eaed" : "#4c3b3b";

  return (
    <div className="loader-container">
      <TrophySpin color={loaderColor} size="medium" text="Aguarde por favor" textColor={textColorValue} />
    </div>
  );
};

export default Loader;
