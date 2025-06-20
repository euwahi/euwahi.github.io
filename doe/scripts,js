console.log('Script carregado!'); // Debug inicial

// Debug Mercado Pago
try {
  const mp = new MercadoPago('APP_USR-499b47b3-fc50-4ec0-b451-7a3da3255400', {
    locale: 'pt-BR'
  });
  console.log('Mercado Pago inicializado:', mp);
} catch (error) {
  console.error('Erro ao carregar Mercado Pago:', error);
}

// Função para debug de erros
function mostrarErro(mensagem) {
  const erroDiv = document.createElement('div');
  erroDiv.style.color = 'red';
  erroDiv.style.padding = '10px';
  erroDiv.textContent = `ERRO: ${mensagem}`;
  document.body.prepend(erroDiv);
}

// Formulário com debug aprimorado
document.getElementById("formDoacao").addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log('Formulário enviado!'); // Debug
  
  const botao = e.target.querySelector('button[type="submit"]');
  botao.disabled = true;
  botao.textContent = 'Processando...';

  try {
    const dados = {
      nome: document.getElementById("nome").value || "Anônimo",
      valor: parseFloat(document.getElementById("valor").value),
      mensagem: document.getElementById("mensagem").value || ""
    };

    console.log('Dados do formulário:', dados); // Debug

    if (!dados.valor || dados.valor < 1) {
      throw new Error('Valor mínimo: R$ 1,00');
    }

    // Debug da API
    console.log('Enviando para /api/createPreference...');
    const res = await fetch('/api/createPreference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    if (!res.ok) {
      const erroApi = await res.text();
      throw new Error(`API respondeu com ${res.status}: ${erroApi}`);
    }

    const data = await res.json();
    console.log('Resposta da API:', data); // Debug

    if (!data.preferenceId) {
      throw new Error('PreferenceId não recebido');
    }

    // Debug Mercado Pago Brick
    console.log('Inicializando Wallet Brick...');
    mp.bricks().create("wallet", "wallet_container", {
      initialization: {
        preferenceId: data.preferenceId
      },
      customization: {
        visual: {
          style: {
            theme: 'dark',
            customVariables: {
              formBackgroundColor: '#1e1e1e',
              baseColor: '#a3005b'
            }
          }
        }
      }
    }).then(() => {
      console.log('Wallet Brick carregado!');
    });

  } catch (error) {
    console.error('Erro no processo:', error);
    mostrarErro(error.message);
    botao.disabled = false;
    botao.textContent = 'DOAR AGORA';
  }
});

// Ranking (mantido igual)
async function carregarRanking() {
  try {
    const res = await fetch('/api/getRanking');
    if (!res.ok) throw new Error('Erro ao carregar ranking');
    const doacoes = await res.json();
    
    const rankingDiv = document.getElementById('rankingDoadores');
    rankingDiv.innerHTML = doacoes.length ? 
      doacoes.map((d, i) => `
        <div class="doador-item">
          <span>${i + 1}. ${d.nome || 'Anônimo'}</span>
          <span class="valor">R$ ${d.valor.toFixed(2)}</span>
        </div>
      `).join('') : '<p>Nenhuma doação ainda. Seja o primeiro!</p>';
  } catch (error) {
    console.error('Erro no ranking:', error);
    document.getElementById('rankingDoadores').innerHTML = 
      '<p>Erro ao carregar ranking</p>';
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM carregado!');
  carregarRanking();
  setInterval(carregarRanking, 30000);
});
