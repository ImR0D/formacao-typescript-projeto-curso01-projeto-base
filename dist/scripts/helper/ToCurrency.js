export default function ToCurrency(value) {
    if (!value) {
        return null;
    }
    return value.toLocaleString('pt-br', {
        currency: 'BRL',
        style: 'currency',
    });
}
