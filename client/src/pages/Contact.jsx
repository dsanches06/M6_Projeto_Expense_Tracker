// componente contact
// mostra um google maps da fcul c8 lisboa e um formulário de contacto fake
import "../styles/contact.css";

// componente Contact melhorado: formulário e mapa lado a lado
const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2>Contacto</h2>
        <form className="contact-form">
          <div>
            <input type="text" placeholder="Nome" />
          </div>
          <div>
            <input type="email" placeholder="Email" />
          </div>
          <div>
            <textarea placeholder="Mensagem" rows={4} />
          </div>
          <button type="submit">
            Enviar
          </button>
        </form>
      </div>
      <div className="contact-map-card">
        <h2>Localização</h2>
        <iframe
          title="fcul c8 lisboa"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.013370893019!2d-9.15963468465413!3d38.75211397959509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd193381b2e2e1b1%3A0x7e2e2e2e2e2e2e2e!2sFaculdade%20de%20Ci%C3%AAncias%20da%20Universidade%20de%20Lisboa%20-%20C8!5e0!3m2!1spt-PT!2spt!4v1712670000000!5m2!1spt-PT!2spt"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <p>Faculdade de Ciências, ULisboa - Edifício C8</p>
      </div>
    </div>
  );
};

export default Contact;
