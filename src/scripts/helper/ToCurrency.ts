export default function ToCurrency(value: number): string {
  if (!value) {
    return 'R$ 0,00';
  }

  return value.toLocaleString('pt-br', {
    currency: 'BRL',
    style: 'currency',
  });
}
