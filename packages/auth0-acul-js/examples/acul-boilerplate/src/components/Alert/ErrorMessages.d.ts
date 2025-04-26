import React from 'react';
interface Error {
    message: string;
}
interface ErrorMessagesProps {
    errors: Error[];
}
declare const ErrorMessages: React.FC<ErrorMessagesProps>;
export default ErrorMessages; 