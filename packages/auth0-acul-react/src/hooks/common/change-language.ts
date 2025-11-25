import { changeLanguage, type LanguageChangeOptions } from '@auth0/auth0-acul-js';

/**
 * React hook that provides a function to change the language/locale.
 *
 * This hook returns a function that triggers a language change by submitting the new locale preference
 * to the server with the 'change-language' action. The language change will cause the current screen
 * to re-render with the new locale.
 *
 * ## Parameters
 *
 * The returned function accepts `LanguageChangeOptions`:
 * - **`language`** (required) - Short language name (locale code) to be set (e.g., 'en', 'fr', 'es')
 * - **`persist`** (required) - Persistence scope for the language preference (defaults to 'session')
 *
 * ## Key Points
 *
 * - The language must be one of the enabled locales configured in your Auth0 tenant
 * - The screen will automatically re-render with the new language after submission
 * - The function returns a promise that resolves when the form submission is complete
 *
 * @returns {(options: LanguageChangeOptions) => Promise<void>} Function to change the language
 *
 * @example
 * Basic language change
 * ```tsx
 * import { useChangeLanguage } from '@auth0/auth0-acul-react';
 *
 * const LanguageSelector = () => {
 *   const changeLanguage = useChangeLanguage();
 *
 *   const handleLanguageChange = async (lang: string) => {
 *     await changeLanguage({
 *       language: lang,
 *       persist: 'session'
 *     });
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={() => handleLanguageChange('en')}>English</button>
 *       <button onClick={() => handleLanguageChange('fr')}>Français</button>
 *       <button onClick={() => handleLanguageChange('es')}>Español</button>
 *     </div>
 *   );
 * };
 * ```
 *
 * @example
 * With tenant enabled locales
 * ```tsx
 * import { useChangeLanguage, useCurrentScreen } from '@auth0/auth0-acul-react';
 *
 * const LanguageSelector = () => {
 *   const changeLanguage = useChangeLanguage();
 *   const screenOptions = useCurrentScreen();
 *   const tenant = screenOptions?.tenant;
 *   const transaction = screenOptions?.transaction;
 *
 *   const handleChangeLanguage = async (language: string) => {
 *     try {
 *       await changeLanguage({ language, persist: 'session' });
 *     } catch (error) {
 *       console.error('Failed to change language:', error);
 *     }
 *   };
 *
 *   return (
 *     <>
 *       {tenant?.enabledLocales && (
 *         <div>
 *           <label htmlFor="language-select">
 *             Language
 *           </label>
 *           <select
 *             id="language-select"
 *             onChange={(e) => handleChangeLanguage(e.target.value)}
 *             defaultValue={transaction?.locale}
 *           >
 *             {tenant.enabledLocales.map((locale: string) => (
 *               <option key={locale} value={locale}>
 *                 {locale.toUpperCase()}
 *               </option>
 *             ))}
 *           </select>
 *         </div>
 *       )}
 *     </>
 *   );
 * };
 * ```
 */
export const useChangeLanguage = (): ((options: LanguageChangeOptions) => Promise<void>) => {
  return changeLanguage as (options: LanguageChangeOptions) => Promise<void>;
};
