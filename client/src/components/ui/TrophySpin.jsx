import { TrophySpin } from "react-loading-indicators";
import "../../styles/TrophySpin.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <TrophySpin color="#1227c9" size="medium" text="Aguarde por favor" textColor="#4c3b3b" />
    </div>
  );
};

export default Loader;
