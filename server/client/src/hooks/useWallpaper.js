import { useEffect } from 'react';

const useWallpaper = (isDark) => {
    useEffect(() => {
        const body = document.body;
        const root = document.documentElement;

        // Light mode wallpaper
        const lightWallpaper = '/wallpapers/Light_Background.jpg';
        // Dark mode wallpaper
        const darkWallpaper = '/wallpapers/DarkBlue_Gradient.jpg';

        console.log(`Setting wallpaper for ${isDark ? 'DARK' : 'LIGHT'} mode`);

        // Set the background image
        if (isDark) {
            body.style.backgroundImage = `url('${darkWallpaper}')`;
            body.style.setProperty('--wallpaper-overlay', 'rgba(10, 10, 10, 0.90)');
            console.log(`✅ Dark wallpaper set: ${darkWallpaper}`);
        } else {
            body.style.backgroundImage = `url('${lightWallpaper}')`;
            body.style.setProperty('--wallpaper-overlay', 'rgba(250, 250, 250, 0.85)');
            console.log(`✅ Light wallpaper set: ${lightWallpaper}`);
        }

        // Force background settings
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';
        body.style.backgroundAttachment = 'fixed';
        body.style.backgroundRepeat = 'no-repeat';

    }, [isDark]);
};

export default useWallpaper;
