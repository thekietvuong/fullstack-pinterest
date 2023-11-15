export const getRouteParam = (location) => {
    const path = location.pathname;
    const parts = path.split("/");
    return parts[2];
}