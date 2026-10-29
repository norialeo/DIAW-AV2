import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard';
import { listarNaRoca, listarForaDaRoca, registrarVoto } from '../services/votacaoService';

function Votacao() {
  const naRoca = listarNaRoca();
  const foraDaRoca = listarForaDaRoca();

  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [votosNaSessao, setVotosNaSessao] = useState(0);

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setVotosNaSessao(votosNaSessao + 1);
  }

  return (
    <main className="pagina">
      <h1>Quem você quer eliminar?</h1>
      <p>Cada clique conta um voto para tirar o peão da fazenda.</p>

      {ultimoVoto !== null && (
        <div className="mensagem">
          Voto registrado para eliminar <strong>{ultimoVoto.nome}</strong>. Você já votou{' '}
          {votosNaSessao} {votosNaSessao === 1 ? 'vez' : 'vezes'}.{' '}
          <Link to="/resultado">Ver resultado</Link>
        </div>
      )}

      <section className="grade-roca">
        {naRoca.map((p) => (
          <ParticipanteCard key={p.id} participante={p} onVotar={handleVotar} />
        ))}
      </section>

      <h2>Demais peões</h2>
      <p>Fora da roça nesta semana, não podem receber votos.</p>

      <section className="grade-peoes">
        {foraDaRoca.map((p) => (
          <ParticipanteCard key={p.id} participante={p} />
        ))}
      </section>
    </main>
  );
}

export default Votacao;
