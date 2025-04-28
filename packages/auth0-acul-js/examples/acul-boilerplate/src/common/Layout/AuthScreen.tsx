import React from 'react';

export interface AuthScreenTemplateProps {
  title?: string;
  description?: string;
  logo?: React.ReactNode;
  errorMessages?: React.ReactNode;
  formContent: React.ReactNode;
  footerLinks?: React.ReactNode;
  className?: string;
}

/**
 * A generic authentication screen template that can be used for login, login-id,
 * and other authentication flows. This provides consistent layout and styling
 * across different authentication screens.
 */
const AuthScreenTemplate: React.FC<AuthScreenTemplateProps> = ({
  title,
  description,
  logo,
  errorMessages,
  formContent,
  footerLinks,
  className = '',
}) => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-[var(--color-page-background)] m-0 p-0 sm:py-12">
      <div className={`w-full max-w-sm min-w-[280px] mx-auto bg-transparent ${className}`}>
        <div className="bg-[var(--color-widget-background)] shadow-[var(--widget-shadow)] border-[var(--border-widget-weight)] border-[var(--color-widget-border)] rounded-[var(--border-widget-radius)] 
                      overflow-wrap-break-word 
                      px-10 py-6 
                      sm:rounded-[var(--border-widget-radius)] 
                      md:py-8">
          <div className="auth0-header">
            {logo && (
              <div className="flex justify-center mb-3">
                {logo}
              </div>
            )}
            
            {(title || description) && (
              <>
                {title && (
                  <div className="text-center mb-4">
                    <h1 className="text-[length:var(--font-title-size)] font-[var(--font-title-weight)] text-[var(--color-header)] mb-1 mt-0 
                                   sm:text-[1.25rem]">
                      {title}
                    </h1>
                  </div>
                )}
                {description && (
                   <div className="text-center mb-4"> 
                    <p className="text-[length:var(--font-body-size)] font-[var(--font-body-text-weight)] text-[var(--color-body-text)] m-0">{description}</p>
                   </div>
                )}
              </>
            )}
          </div>
          
          <div className="mb-2">
            {errorMessages && (
              <div className="mt-4 mb-4">
                {errorMessages}
              </div>
            )}
            
            {formContent}
          </div>
          
          {footerLinks && (
            <div className="mt-3 text-center">
              {footerLinks}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthScreenTemplate; 