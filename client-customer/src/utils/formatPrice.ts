function formatPrice(str: any) {
  if (isNaN(Number(str))) {
    return;
  }

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  let price = Number(str);

  return VND.format(price);
}

export default formatPrice;
