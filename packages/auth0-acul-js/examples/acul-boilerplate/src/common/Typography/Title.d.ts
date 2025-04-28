import React from 'react';

// Export the interface
export interface TitleProps {
    title?: string;
    description?: string;
}

declare const Title: React.FC<TitleProps>;
export default Title; 