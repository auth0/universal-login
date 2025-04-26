import React, { ReactNode } from 'react';
interface ThemeProviderProps {
    children: ReactNode;
    instance: any;
}
declare const ThemeProvider: React.FC<ThemeProviderProps>;
export default ThemeProvider;
