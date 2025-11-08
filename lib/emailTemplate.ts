

export function generateOrderEmailHtml(order: any, to: string, userName: string) {
  const { items, totals } = order;

  const itemsHtml = items
    .map((item: any) => {
      const imageUrl = `https://audiophilewebsite-psi.vercel.app/${item.image.replace(/^\.\/?/, '')}`;

      return `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align:center;">
            <img src="${imageUrl}" width="50" style="border-radius:4px;" alt="${item.name}" />
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align:center;">${item.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align:right;">$${item.price}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <html>
      <body style="font-family: 'Manrope', Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f7f7; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <tr>
 <td
  align="center"
  valign="middle"
  style="background-color: #000000; padding: 40px 0;"
>
  <img
    src="https://audiophilewebsite-psi.vercel.app/assets/audiologo.png"
    alt="Audiophile Logo"
    width="120"
    style="display: block; margin: 0 auto;"
  />
</td>


                </tr>

                <tr>
                  <td style="text-align: left;">
                    <h1 style="font-size: 22px; color: #000; margin-bottom: 10px;">Thank you for your order, ${userName || "Valued Customer"}!</h1>
                    <p style="font-size: 16px; color: #555;">We’ve sent this confirmation to <strong>${to}</strong>.</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding-top: 10px; padding-bottom: 10px;">
                    <h2 style="font-size: 18px; color: #000;">Order Summary</h2>
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top: 10px;">
                      <thead>
                        <tr style="background-color: #f1f1f1;">
                          <th style="padding: 8px; text-align:left;">Image</th>
                          <th style="padding: 8px; text-align:left;">Product</th>
                          <th style="padding: 8px; text-align:center;">Qty</th>
                          <th style="padding: 8px; text-align:right;">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${itemsHtml}
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding-top: 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size: 14px; color: #555;">Subtotal:</td>
                        <td style="font-size: 14px; color: #000; text-align:right;">$${totals.subtotal}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; color: #555;">Shipping:</td>
                        <td style="font-size: 14px; color: #000; text-align:right;">$${totals.shipping}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 14px; color: #555;">Tax:</td>
                        <td style="font-size: 14px; color: #000; text-align:right;">$${totals.tax}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 16px; font-weight: 700; color: #000; padding-top: 10px;">Total:</td>
                        <td style="font-size: 16px; font-weight: 700; color: #D87D4A; text-align:right; padding-top: 10px;">$${totals.grandTotal}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding-top: 30px;">
                    <p style="font-size: 14px; color: #999;">Need help? Contact us at <a href="mailto:support@audiophile.com" style="color:#D87D4A; text-decoration:none;">support@audiophile.com</a></p>
                    <p style="font-size: 13px; color: #bbb;">© ${new Date().getFullYear()} Audiophile. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
