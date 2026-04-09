// componente about
// mostra informações sobre o curso e os estudantes


// componente About melhorado com layout em duas colunas
const About = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 40, marginTop: 40, flexWrap: 'wrap' }}>
      <div style={{ minWidth: 280, maxWidth: 400, background: '#f7f7fa', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px #0001' }}>
        <h2 style={{ color: '#4a78e0', marginBottom: 16 }}>Sobre o módulo</h2>
        <p><b>Módulo:</b> M6: Frontend - React & Next.js</p>
        <p><b>Objetivo:</b> Criar aplicações web modernas com React, Vite e boas práticas de UI/UX.</p>
        <p><b>Projeto:</b> Expense Tracker</p>
      </div>
      <div style={{ minWidth: 280, maxWidth: 400, background: '#f7f7fa', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px #0001' }}>
        <h2 style={{ color: '#4a78e0', marginBottom: 16 }}>Sobre os estudantes</h2>
        <div style={{ textAlign: 'left' }}>
          <p><b>Abel Pinto</b> &mdash; FCUL, Ciências ULisboa</p>
          <p><b>Danilson Sanchez</b> &mdash; FCUL, Ciências ULisboa</p>
        </div>
        <p>Projeto realizado no âmbito do curso UPSKILL.</p>
      </div>
    </div>
  );
};

export default About;
