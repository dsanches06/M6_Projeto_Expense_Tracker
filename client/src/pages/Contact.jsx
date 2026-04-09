// componente contact
// mostra um google maps da fcul c8 lisboa e um formulário de contacto fake

const Contact = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h2>contacto</h2>
      <div style={{ margin: '20px 0' }}>
        {/* google maps embed fcul c8 lisboa */}
        <iframe
          title="fcul c8 lisboa"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.013370893019!2d-9.15963468465413!3d38.75211397959509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd193381b2e2e1b1%3A0x7e2e2e2e2e2e2e2e!2sFaculdade%20de%20Ci%C3%AAncias%20da%20Universidade%20de%20Lisboa%20-%20C8!5e0!3m2!1spt-PT!2spt!4v1712670000000!5m2!1spt-PT!2spt"
          width="400"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      {/* formulário de contacto fake */}
      <form style={{ maxWidth: 400, margin: '0 auto' }}>
        <div style={{ marginBottom: 10 }}>
          <input type="text" placeholder="nome" style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <input type="email" placeholder="email" style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <textarea placeholder="mensagem" style={{ width: '100%', padding: 8 }} rows={4} />
        </div>
        <button type="submit" style={{ padding: '8px 24px', background: '#4a78e0', color: '#fff', border: 'none', borderRadius: 4 }}>
          enviar
        </button>
      </form>
    </div>
  );
};

export default Contact;
