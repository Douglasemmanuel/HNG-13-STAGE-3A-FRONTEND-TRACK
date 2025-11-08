
// utils/generateOrderEmail.ts
export function generateOrderEmailHtml(order:any, to : string) {
  const { customer, items, totals } = order;

  const itemsHtml = items
    .map(
      (item: any) => `
      <tr>
        <td><img src="https://audiophilewebsite-psi.vercel.app/images/${item.image}" width="50" /></td>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price}</td>
      </tr>
    `
    )
    .join("");

  return `
  <html>
    <body>
      <h1>Thank you for your order, ${customer.name}!</h1>
      <p>We have sent this order confirmation to <strong>${to}</strong>.</p>
      <p>Order Summary:</p>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      <p>Subtotal: $${totals.subtotal}</p>
      <p>Shipping: $${totals.shipping}</p>
      <p>Tax: $${totals.tax}</p>
      <p><strong>Total: $${totals.grandTotal}</strong></p>
    </body>
  </html>
  `;
}
