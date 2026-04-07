export function generateSecureCode() {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return (array[0] % 10000).toString().padStart(4, '0');
}