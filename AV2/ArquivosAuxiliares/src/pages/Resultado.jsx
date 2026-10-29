import { useState } from 'react';
import { Link } from 'react-router-dom';
import { obterVotos, calcularTotalVotos, calcularResultado, zerarVotos } from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());

  const total = calcularTotalVotos(votos);
  const resultado = calcularResultado(votos);

  function handleZerar() {
    if (window.confirm('Apagar todos os votos?')) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <main className="pagina">
      <h1>Parcial da eliminação</h1>
      <p>{total} votos computados</p>

      {total === 0 ? (
        <div className="sem-votos">
          <p>Nenhum voto ainda. Escolha quem sai da roça para ver a parcial.</p>
          <Link to="/votacao" className="botao botao-principal">Ir para a votação</Link>
        </div>
      ) : (
        <div>
          {resultado.map((p, index) => (
            <div key={p.id} className={index === 0 ? 'placar placar-lider' : 'placar'}>
              <img src={p.foto} alt={p.nome} />
              <div className="placar-info">
                <h3>
                  {p.nome} {index === 0 && <span className="selo-sairia">Sairia hoje</span>}
                </h3>
                <div className="barra">
                  <div
                    className="barra-preenchida"
                    style={{ width: `${p.percentual}%` }}
                  />
                </div>
                <p>
                  {p.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}% ({p.votos} votos)
                </p>
              </div>
            </div>
          ))}

          <button type="button" className="botao botao-zerar" onClick={handleZerar}>
            Zerar votação
          </button>
        </div>
      )}
    </main>
  );
}

export default Resultado;
