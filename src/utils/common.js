export function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}
export function compareDates(a,b) {
    return a.getTime() >= b.getTime();
}