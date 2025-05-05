# `organization-picker` Screen

> This screen represents the **OrganizationPicker** flow in Auth0 Universal Login.

---

## 🔹 Factory Hook
### Root import
```tsx
import { useOrganizationPickerInstance } from '@auth0/auth0-acul-react/organization-picker';

const screen = useOrganizationPickerInstance(); // typed as OrganizationPickerMembers
// Submits the selected organization ID.
screen.selectOrganization({ /* args */ });

// Submits the action to skip the organization selection.
screen.skipOrganizationSelection({ /* args */ });
```

### Partial import
```tsx
import { useOrganizationPickerInstance } from '@auth0/auth0-acul-react';

const screen = useOrganizationPickerInstance(); // typed as OrganizationPickerMembers
```

---

## 🔹 Context Usage

### Root import
```tsx
import { OrganizationPickerProvider, useOrganizationPickerContext } from '@auth0/auth0-acul-react/organization-picker';

function App() {
  return (
    <OrganizationPickerProvider>
      <ScreenComponent />
    </OrganizationPickerProvider>
  );
}

function ScreenComponent() {
  const screen = useOrganizationPickerContext(); // typed as OrganizationPickerMembers
  // use screen methods here
  return <div>{/* UI */}</div>;
}
```


### Partial import
```tsx
import { OrganizationPickerProvider, useOrganizationPickerContext } from '@auth0/auth0-acul-react';

function App() {
  return (
    <OrganizationPickerProvider>
      <ScreenComponent />
    </OrganizationPickerProvider>
  );
}

function ScreenComponent() {
  const screen = useOrganizationPickerContext(); // typed as OrganizationPickerMembers
  return <div />;
}
```

---
