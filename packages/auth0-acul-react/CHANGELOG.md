# Change Log

## [auth0-acul-react-v1.2.0](https://github.com/auth0/universal-login/tree/auth0-acul-react-v1.2.0) (2026-01-12)
[Full Changelog](https://github.com/auth0/universal-login/compare/auth0-acul-react-v1.1.0...auth0-acul-react-v1.2.0)

**Added**
- docs: migration guide from JavaScript SDK to React SDK [\#319](https://github.com/auth0/universal-login/pull/319) ([amitsingh05667](https://github.com/amitsingh05667))
- Chore: support for brute-force-protection screens [\#317](https://github.com/auth0/universal-login/pull/317) ([ankita10119](https://github.com/ankita10119))

## [auth0-acul-react-v1.1.0](https://github.com/auth0/universal-login/tree/auth0-acul-react-v1.1.0) (2025-12-09)
[Full Changelog](https://github.com/auth0/universal-login/compare/auth0-acul-react-v1.0.0...auth0-acul-react-v1.1.0)

**Added**
- feat: switchConnection for passwordless email and SMS OTP screen [\#310](https://github.com/auth0/universal-login/pull/310) ([amitsingh05667](https://github.com/amitsingh05667))
- feat: add useChangeLanguage hook for language support [\#298](https://github.com/auth0/universal-login/pull/298) ([amitsingh05667](https://github.com/amitsingh05667))
- feat: add toggleView method for switching between QR code [\#296](https://github.com/auth0/universal-login/pull/296) ([amitsingh05667](https://github.com/amitsingh05667))

## [auth0-acul-react-v1.0.0](https://github.com/auth0/universal-login/tree/auth0-acul-react-v1.0.0) (2025-11-20)

**Added**
- update:Update dependencies to use stable version of @auth0/auth0-acul-js [\#293](https://github.com/auth0/universal-login/pull/293) ([aks96](https://github.com/aks96))

## [auth0-acul-react-1.0.0-alpha.3](https://github.com/auth0/universal-login/tree/auth0-acul-react-1.0.0-alpha.3) (2025-11-20)

**Added**
- Release auth0-acul-js-1.0.0-alpha.3 [\#282](https://github.com/auth0/universal-login/pull/282) ([aks96](https://github.com/aks96))
- Fix: Update API reference to point to github pages links [\#276](https://github.com/auth0/universal-login/pull/276) ([ankita10119](https://github.com/ankita10119))
- feat: add passkey autofill options to transaction interfaces and shar… [\#274](https://github.com/auth0/universal-login/pull/274) ([amitsingh05667](https://github.com/amitsingh05667))
- feat: implement changeLanguage method and add LanguageChangeOptions interface [\#264](https://github.com/auth0/universal-login/pull/264) ([amitsingh05667](https://github.com/amitsingh05667))
- feat: added continue method for MFA push enrollment QR [\#270](https://github.com/auth0/universal-login/pull/270) ([aks96](https://github.com/aks96))
- fix: fix typos in interstitial-captcha and mfa-push-welcome examples [\#272](https://github.com/auth0/universal-login/pull/272) ([amitsingh05667](https://github.com/amitsingh05667))
- Add clientSubdomain to CaptchaContext interface [\#269](https://github.com/auth0/universal-login/pull/269) ([amitsingh05667](https://github.com/amitsingh05667))
- Fix: MFA WebAuthn Roaming Challenge - Remember Device & Code Improvements [\#256](https://github.com/auth0/universal-login/pull/256) ([amitsingh05667](https://github.com/amitsingh05667))
- Fix: Removed complete support for interface partial import [\#267](https://github.com/auth0/universal-login/pull/267) ([ankita10119](https://github.com/ankita10119))
- Update: Rename byKind helper method to byType in error store (kind -> type) [\#266](https://github.com/auth0/universal-login/pull/266) ([ankita10119](https://github.com/ankita10119))

## [auth0-acul-react@1.0.0-alpha.2](https://github.com/auth0/universal-login/tree/auth0-acul-react%401.0.0-alpha.2) (2025-11-03)

**Added**
- Update: Renamed custom errors in TS and React SDK [\#255](https://github.com/auth0/universal-login/pull/255) ([ankita10119](https://github.com/ankita10119))
- feat: flexible connection switching [\#250](https://github.com/auth0/universal-login/pull/250) ([amitsingh05667](https://github.com/amitsingh05667))
- Added support for passkey autofill on react SDK [\#249](https://github.com/auth0/universal-login/pull/249) ([nandan-bhat](https://github.com/nandan-bhat))
- feat(mfa-login-options): add returnToPrevious for back navigation  [\#238](https://github.com/auth0/universal-login/pull/238) ([amitsingh05667](https://github.com/amitsingh05667))
- added: Polling for the mfa-push-enrollment-qr screen [\#240](https://github.com/auth0/universal-login/pull/240) ([aks96](https://github.com/aks96))

**Fixed**
- Refactor: Simplify reset password logic and enhance password  [\#254](https://github.com/auth0/universal-login/pull/254) ([amitsingh05667](https://github.com/amitsingh05667))
- Refactor: Rename Login Password Policy Methods [\#253](https://github.com/auth0/universal-login/pull/253) ([amitsingh05667](https://github.com/amitsingh05667))

## [auth0-acul-react@1.0.0-alpha.1](https://github.com/auth0/universal-login/tree/auth0-acul-react%401.0.0-alpha.1) (2025-10-16)

**Added**
- fix: update peerDependencies for React compatibility [\#231](https://github.com/auth0/universal-login/pull/231) ([amitsingh05667](https://github.com/amitsingh05667))
- Update: Updated examples and type doc [\#230](https://github.com/auth0/universal-login/pull/230) ([ankita10119](https://github.com/ankita10119))

**Fixed**
- fix: Added `files` and `publishConfig` keys to the package.json [\#229](https://github.com/auth0/universal-login/pull/229) ([nandan-bhat](https://github.com/nandan-bhat))

## [auth0-acul-react@1.0.0-alpha.0](https://github.com/auth0/universal-login/tree/auth0-acul-react%401.0.0-alpha.0) (2025-10-13)

**Added**
- New package release | Updated the version of auth0-acul-react files [\#220](https://github.com/auth0/universal-login/pull/220) ([nandan-bhat](https://github.com/nandan-bhat))

**Fixed**
- fix: Fix release pipeline [\#225](https://github.com/auth0/universal-login/pull/225) ([nandan-bhat](https://github.com/nandan-bhat))
- fix: change the pipeline lint sequence [\#223](https://github.com/auth0/universal-login/pull/223) ([aks96](https://github.com/aks96))
- fix: Fixing linter issues [\#222](https://github.com/auth0/universal-login/pull/222) ([nandan-bhat](https://github.com/nandan-bhat))
