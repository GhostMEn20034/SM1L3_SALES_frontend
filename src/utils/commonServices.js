export function range(start=0, stop, step=1) {
    // Sequence generator function 
    return Array.from({ length: ((stop - 1) - start) / step + 1 }, (_, i) => start + (i * step));
}