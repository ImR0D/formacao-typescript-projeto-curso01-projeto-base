export default function ToCurrency(value) {
    if (!value) {
        return 'R$ 0,00';
    }
    return value.toLocaleString('pt-br', {
        currency: 'BRL',
        style: 'currency',
    });
}
