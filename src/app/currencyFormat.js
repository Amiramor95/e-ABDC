//
export function currencyFormat (type,currency) {
    var formatter = new Intl.NumberFormat(type, {
        style: 'currency',
        currency: currency,
      });

      return formatter;
} 