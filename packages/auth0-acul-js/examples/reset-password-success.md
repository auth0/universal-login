##  React Component Example with TailwindCSS

```typescript
import React, { useState } from "react";
import ResetPasswordSuccess from "@auth0/auth0-acul-js/reset-password-success";
import { withWindowDebug } from "../../utils";
import { Logo } from "../../components/Logo";

const ResetPasswordSuccessScreen: React.FC = () => {
  // Manager setup
  const [resetPasswordSuccessManager] = useState(() => new ResetPasswordSuccess());
  withWindowDebug(resetPasswordSuccessManager, 'resetPasswordSuccess');

  return (
    <div className="prompt-container">
      <Logo />
      <div className="title-container">
        <h1>{resetPasswordSuccessManager.screen.texts?.title}</h1>
        <p>{resetPasswordSuccessManager.screen.texts?.description}</p>
      </div>

      {resetPasswordSuccessManager.transaction.hasErrors && resetPasswordSuccessManager.transaction.errors && (
        <div className="error-container">
          {resetPasswordSuccessManager.transaction.errors.map((error: any, index: number) => (
            <p key={index}>{error?.message}</p>
          ))}
        </div>
      )}

      {/* Back to Login Button */}
      {resetPasswordSuccessManager.screen.links?.back_to_app && (
        <div className="button-container">
          <a
            href={resetPasswordSuccessManager.screen.links.back_to_app}
            className="button"
          >
            {resetPasswordSuccessManager.screen.texts?.buttonText || "Back to App"}
          </a>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordSuccessScreen;
```