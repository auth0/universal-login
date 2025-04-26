import React from 'react';
interface ErrorMessagesProps {
    errors: Array<{
        message: string;
        type?: string;
    }>;
}
declare const ErrorMessages: React.FC<ErrorMessagesProps>;
export default ErrorMessages;
