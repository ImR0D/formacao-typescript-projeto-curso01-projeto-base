export default function ToCurrency(value: number): string | null {
  if (!value) {
    return null;
  }

  return value.toLocaleString('pt-br', {
    currency: 'BRL',
    style: 'currency',
  });
}
