export const getRandomColor = (): string => {
    const colors: string[] = [];

    for (let i = 0; i < 20; i++) {
        const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        colors.push(color);
    }

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
