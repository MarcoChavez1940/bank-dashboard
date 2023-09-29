const loadData = async () => {
  let rawResponse = await fetch('https://sandbox.belvo.com/api/transactions/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${process.env.SECRET_ID}:${process.env.SECRET_PASSWORD}`)
    },
    body: JSON.stringify(
      {
        "link": process.env.LINK_ID,
        "date_from": "2023-07-01",
        "date_to": "2023-09-29"
      }
    )
  });
  const response = await rawResponse.json();
  console.log("data fetch")
  return response;
}

const StatamentAccount = async () => {
  const transactionsData = await loadData();
  const transactions = transactionsData.reduce((group: any, transaction: any) => {
    const { category } = transaction;
    if (category !== null) {
      group[category] = group[category] ?? [];
      group[category].push(transaction);
      return group;
    } else {
      group["Sin Categoria"] = group["Sin Categoria"] ?? [];
      group["Sin Categoria"].push(transaction);
      return group;
    }

  }, {});

  return (
    <div>
      {Object.keys(transactions).map((key) => {
        return (
          <div key={key}>
            <h1>{key}</h1>
            <table className="table-auto">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Transaccion</th>
                  <th>Cantidad</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {transactions[key].map((transaction: any) => {
                  return (
                    <tr key={transaction.id}>
                      <td>{transaction.value_date}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.type}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  )
}

export default StatamentAccount;
