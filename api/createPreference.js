import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { nome, valor, mensagem } = req.body;

  if (!valor || valor < 1) {
    return res.status(400).json({ message: 'Valor inválido' });
  }

  // 🔗 Cria a preferência no Mercado Pago
  const preference = {
    items: [{
      title: 'Doação para Laços Profanos',
      quantity: 1,
      unit_price: Number(valor),
      currency_id: 'BRL'
    }],
    back_urls: {
      success: 'https://www.lacosprofanos.com.br/sucesso',
      failure: 'https://www.lacosprofanos.com.br/erro',
      pending: 'https://www.lacosprofanos.com.br/pendente'
    },
    auto_return: 'approved'
  };

  const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(preference)
  });

  const mpData = await mpResponse.json();

  if (!mpData.id) {
    return res.status(500).json({ message: 'Erro ao criar preferência' });
  }

  // 💾 Salva no Supabase
  await supabase
    .from('doacoes')
    .insert([{ nome, valor, mensagem, status: 'pendente' }]);

  return res.status(200).json({
    preferenceId: mpData.id,
    init_point: mpData.init_point
  });
}
