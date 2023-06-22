import { ThemeType } from "@/components/theme/Theme";

export const setTheme = (theme: ThemeType) => {
    localStorage.setItem('theme', theme);
}

export const getTheme = () => {
    let theme;

    if (typeof window !== "undefined") {
        theme = localStorage.getItem("theme") || 'dark';
    }
    
    return theme || 'dark'
}
