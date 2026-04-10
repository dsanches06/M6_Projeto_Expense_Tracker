// componente about
// mostra informações sobre o curso e os estudantes
import "../styles/about.css";

// componente About melhorado com layout em duas colunas
const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h2>Sobre o módulo</h2>
        <p><b>Módulo:</b> M6: Frontend - React & Next.js</p>
        <p><b>Objetivo:</b> Criar aplicações web modernas com React, Vite e boas práticas de UI/UX.</p>
        <p><b>Projeto:</b> Expense Tracker</p>
      </div>
      <div className="about-card">
        <h2>Sobre os estudantes</h2>
        <div style={{ textAlign: 'left' }}>
          <p><b>Abel Pinto</b> &mdash; FCUL, Ciências ULisboa</p>
          <p><b>Danilson Sanches</b> &mdash; FCUL, Ciências ULisboa</p>
        </div>
        <p>Projeto realizado no âmbito do curso UPSKILL.</p>
      </div>
    </div>
  );
};

export default About;
