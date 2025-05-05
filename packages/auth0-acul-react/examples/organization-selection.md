# `organization-selection` Screen

> This screen represents the **OrganizationSelection** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useOrganizationSelectionInstance } from '@auth0/auth0-acul-react/organization-selection';

const screen = useOrganizationSelectionInstance(); // typed as OrganizationSelectionMembers
// Continues with the selected organization name.
screen.continueWithOrganizationName({ screen: '<screen>' });
```

### Partial import
```tsx
import { useOrganizationSelectionInstance } from '@auth0/auth0-acul-react';

const screen = useOrganizationSelectionInstance(); // typed as OrganizationSelectionMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { OrganizationSelectionProvider, useOrganizationSelectionContext } from '@auth0/auth0-acul-react/organization-selection';

function App() {
  return (
    <OrganizationSelectionProvider>
      <ScreenComponent />
    </OrganizationSelectionProvider>
  );
}

function ScreenComponent() {
  const screen = useOrganizationSelectionContext(); // typed as OrganizationSelectionMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { OrganizationSelectionProvider, useOrganizationSelectionContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <OrganizationSelectionProvider>
      <ScreenComponent />
    </OrganizationSelectionProvider>
  );
}

function ScreenComponent() {
  const screen = useOrganizationSelectionContext(); // typed as OrganizationSelectionMembers
  return <div />;
}
```

---
