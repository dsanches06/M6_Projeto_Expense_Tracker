import { useState, useEffect } from "react";
import Loader from "../components/ui/TrophySpin";

const Statistics = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h1>Estatisticas</h1>
    </>
  );
};

export default Statistics;
