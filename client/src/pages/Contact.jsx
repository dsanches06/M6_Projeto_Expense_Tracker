// componente contact
// mostra um google maps da fcul c8 lisboa e um formulário de contacto fake


// componente Contact melhorado: formulário e mapa lado a lado
const Contact = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', gap: 40, marginTop: 40 }}>
      <div style={{ minWidth: 280, maxWidth: 400, flex: 1, background: '#f7f7fa', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px #0001' }}>
        <h2 style={{ color: '#4a78e0', marginBottom: 16 }}>Contacto</h2>
        <form style={{ width: '100%' }}>
          <div style={{ marginBottom: 10 }}>
            <input type="text" placeholder="Nome" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: 10 }}>
            <input type="email" placeholder="Email" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: 10 }}>
            <textarea placeholder="Mensagem" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} rows={4} />
          </div>
          <button type="submit" style={{ padding: '8px 24px', background: '#4a78e0', color: '#fff', border: 'none', borderRadius: 4 }}>
            Enviar
          </button>
        </form>
      </div>
      <div style={{ minWidth: 280, maxWidth: 500, flex: 1, background: '#f7f7fa', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px #0001', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ color: '#4a78e0', marginBottom: 16 }}>Localização</h2>
        <iframe
          title="fcul c8 lisboa"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.013370893019!2d-9.15963468465413!3d38.75211397959509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd193381b2e2e1b1%3A0x7e2e2e2e2e2e2e2e!2sFaculdade%20de%20Ci%C3%AAncias%20da%20Universidade%20de%20Lisboa%20-%20C8!5e0!3m2!1spt-PT!2spt!4v1712670000000!5m2!1spt-PT!2spt"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: 8 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <p style={{ marginTop: 12, fontSize: 14, color: '#555' }}>Faculdade de Ciências, ULisboa - Edifício C8</p>
      </div>
    </div>
  );
};

export default Contact;
