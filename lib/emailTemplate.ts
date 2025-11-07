// lib/emailTemplate.ts

export interface CartItem {
  name: string;
  image: string; // URL of the product image
  quantity: number;
  price: number; // price per unit
}

export interface OrderSummary {
  subtotal: number;
  tax: number;
  total: number;
}

export function getEmailTemplate(
  to: string,
  items: CartItem[],
  summary: OrderSummary
) {
  // Generate HTML rows for each item
  const itemsHtml = items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <img src="${item.image}" alt="${item.name}" width="50" style="vertical-align: middle; margin-right: 10px;">
        ${item.name} (x${item.quantity})
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px;">
      <h2 style="color: #1a73e8;">Thank you for your purchase, ${to}!</h2>
      <p>Your order has been successfully processed. Here’s a summary of your purchase:</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top: 20px;">
        ${itemsHtml}
        <tr>
          <td style="padding: 10px; text-align: right; font-weight: bold;">Subtotal:</td>
          <td style="padding: 10px; text-align: right;">$${summary.subtotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td style="padding: 10px; text-align: right; font-weight: bold;">Tax:</td>
          <td style="padding: 10px; text-align: right;">$${summary.tax.toFixed(2)}</td>
        </tr>
        <tr>
          <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 16px;">Total:</td>
          <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 16px;">$${summary.total.toFixed(2)}</td>
        </tr>
      </table>

      <hr style="border:none; border-top:1px solid #eee; margin:20px 0;">
      <p style="font-size: 12px; color: #999;">
        This is an automated message. Please do not reply directly to this email.
      </p>
    </div>
  `;
}
