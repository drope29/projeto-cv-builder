import React, { useState } from 'react';

// --- Componente do Formulário Simplificado ---
function FormularioCurriculo({ onCancelar }) {
  return (
    <section>
      <form style={{ padding: '1rem', border: '1px solid #ccc' }}>
        <h2>Adicionar Novo Currículo</h2>
        <br />

        {/* --- Campos do Formulário --- */}
        <div>
          {/* Nome Completo */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="nome" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Nome Completo
            </label>
            <input type="text" id="nome" name="nome" style={{ width: '100%', padding: '0.5rem' }} />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Email
            </label>
            <input type="email" id="email" name="email" style={{ width: '100%', padding: '0.5rem' }} />
          </div>

          {/* Telefone */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="telefone" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Telefone
            </label>
            <input type="tel" id="telefone" name="telefone" style={{ width: '100%', padding: '0.5rem' }} />
          </div>

          {/* Endereço Completo */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="endereco" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Endereço (Rua, Número, Bairro, Cidade, etc.)
            </label>
            <input type="text" id="endereco" name="endereco" style={{ width: '100%', padding: '0.5rem' }} />
          </div>
        </div>
        
        {/* --- Botões de Ação --- */}
        <div style={{ marginTop: '1.5rem' }}>
            <button type="button" onClick={onCancelar} style={{ marginRight: '1rem' }}>
                Cancelar
            </button>
            <button type="button" onClick={() => alert('Funcionalidade de salvar não implementada.')}>
                Salvar
            </button>
        </div>
      </form>
    </section>
  );
}


// --- Componente Principal da Aplicação ---
function App() {
  // Estado para controlar a visibilidade do formulário
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>

      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Currículo Builder</h1>
        <p>Crie e gerencie seus currículos de forma fácil</p>
      </header>

      <main>
        {/* Se o formulário NÃO estiver visível, mostra o botão de cadastro e a lista */}
        {!mostrarFormulario ? (
          <>
            <section style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <button onClick={() => setMostrarFormulario(true)}>
                Cadastrar Novo Currículo
              </button>
            </section>

            <section>
              <h2>Visualização dos Currículos</h2>
              <div style={{ padding: '1rem', border: '1px solid #eee' }}>
                <p>A lista de currículos cadastrados aparecerá aqui.</p>
              </div>
            </section>
          </>
        ) : (
          // Se o formulário ESTIVER visível, renderiza o componente do formulário
          <FormularioCurriculo onCancelar={() => setMostrarFormulario(false)} />
        )}
      </main>

    </div>
  );
}

export default App;
