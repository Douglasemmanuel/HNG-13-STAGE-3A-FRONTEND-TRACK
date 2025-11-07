
export interface CartItem {
  name: string;
  image: string; // URL of the product image
  quantity: number;
  price: number; // price per unit
}

export interface CartState {
  cart: CartItem[];
  subtotal: number;
  vat: number;
  shipping: number;
  grandTotal: number;
}




export function getEmailTemplate(to: string, cartState: CartState) {
  const { cart, subtotal, vat, shipping, grandTotal } = cartState;

  // Generate HTML rows for each cart item
  const itemsHtml = cart
    .map(
      (item) => `
      <tr>
        <td style="width: 70%; padding: 10px; border-bottom: 1px solid #eee; display: flex; align-items: center;">
          <img src="${item.image}" alt="${item.name}" width="50" style="margin-right: 10px;">
          <span style="font-size: 14px; color: #333;">${item.name} (x${item.quantity})</span>
        </td>
        <td style="width: 30%; padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-size: 14px; color: #333;">
          $${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px;">
      <h2 style="color: #1a73e8; margin-bottom: 10px;">Thank you for your purchase, ${to}!</h2>
      <p style="margin-bottom: 20px;">Your order has been successfully processed. Here’s a summary of your purchase:</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr>
            <th style="width: 70%; text-align: left; padding: 10px; border-bottom: 2px solid #1a73e8; font-size: 14px; color: #333;">Product</th>
            <th style="width: 30%; text-align: right; padding: 10px; border-bottom: 2px solid #1a73e8; font-size: 14px; color: #333;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
          <tr>
            <td style="width: 70%; padding: 10px; text-align: right; font-weight: bold; color: #000;">Subtotal:</td>
            <td style="width: 30%; padding: 10px; text-align: right; color: #000;">$${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="width: 70%; padding: 10px; text-align: right; font-weight: bold; color: #000;">VAT:</td>
            <td style="width: 30%; padding: 10px; text-align: right; color: #000;">$${vat.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="width: 70%; padding: 10px; text-align: right; font-weight: bold; color: #000;">Shipping:</td>
            <td style="width: 30%; padding: 10px; text-align: right; color: #000;">$${shipping.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="width: 70%; padding: 10px; text-align: right; font-weight: bold; font-size: 16px; color: #000;">Grand Total:</td>
            <td style="width: 30%; padding: 10px; text-align: right; font-weight: bold; font-size: 16px; color: #000;">$${grandTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <p style="margin-top: 20px; font-size: 14px; color: #333;">
        We appreciate your business! If you have any questions about your order, feel free to contact us.
      </p>

      <hr style="border:none; border-top:1px solid #eee; margin:20px 0;">
      <p style="font-size: 12px; color: #999;">
        This is an automated message. Please do not reply directly to this email.
      </p>
    </div>
  `;
}
