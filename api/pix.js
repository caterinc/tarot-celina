module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method !== "POST") return res.status(405).end();

  const { amount, name } = req.body;
  const token = process.env.PIXZY_TOKEN;

  const r = await fetch("https://app.pixzypay.com/api/transactions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      client_name: "Cliente",
      client_email: "cliente@tarotcomcelina.com",
      client_doc: "00000000000",
      items: [{ name, price: amount, quantity: 1 }],
    }),
  });

  const data = await r.json();
  res.status(r.ok ? 200 : r.status).json(data);
};
