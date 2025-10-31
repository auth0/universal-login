export const TypescriptWrapper = ({ children, construct, method, parameter, title }) => {
  if (construct) {
    // Process children to wrap "new " with a span for styling
    const processChildren = (node) => {
      if (typeof node === "string") {
        // Split by "new " and wrap it with a span
        const parts = node.split(/(new\s+)/);
        return parts.map((part, idx) => {
          if (part === "new ") {
            return (
              <span key={idx}>
                <span className="new-keyword">new</span>{" "}
              </span>
            );
          }
          return part;
        });
      }

      // If it's a React element with children, recursively process
      if (node && typeof node === "object" && node.props && node.props.children) {
        return {
          ...node,
          props: {
            ...node.props,
            children: Array.isArray(node.props.children)
              ? node.props.children.map(processChildren)
              : processChildren(node.props.children),
          },
        };
      }

      // Return node as is
      return node;
    };

    return (
      <div className="constructor-signature-wrapper">
        {/* Text content */}
        <div className="constructor-signature-content">{processChildren(children)}</div>

        <style>{`
        /* Light mode */
        .constructor-signature-wrapper {
          border-top: 1px solid #555;
          border-bottom: 1px solid #555;
        }

        .constructor-signature-content {
          font-family: 'JetBrains Mono', 'Monaco', 'Courier New', monospace;
          color: #60a5fa;
        }

        /* Keyword - "new" in darker blue */
        .new-keyword {
          font-weight: bold;
          color: #2563eb;
        }

        /* Return type - lighter blue/cyan */
        .constructor-signature-content em {
          color: #60a5fa;
          font-style: italic;
        }

        /* Links styling */
        .constructor-signature-content a {
          color: #22d3ee;
          text-decoration: none;
          transition: color 0.2s;
          border-bottom: 0;
        }

        .constructor-signature-content a:hover {
          color: #06b6d4;
        }

        /* Dark mode */
        .dark .constructor-signature-wrapper {
          border-top-color: #444;
          border-bottom-color: #444;
        }

        .dark .constructor-signature-content {
          color: #60a5fa;
        }

        .dark .new-keyword {
          color: #2563eb;
        }

        .dark .constructor-signature-content em {
          color: #60a5fa;
        }

        .dark .constructor-signature-content a {
          color: #60a5fa;
        }

        .dark .constructor-signature-content a:hover {
          color: #06b6d4;
        }
      `}</style>
      </div>
    );
  }

  if (method) {
    // Process children to style method names and return types
    const processChildren = (node) => {
      if (typeof node === "string") {
        // Match the pattern like "acceptInvitation(" and wrap method name
        const methodMatch = node.match(/^(\s*)(\w+)(\()/);

        if (methodMatch) {
          const [, spaces, methodName, openParen] = methodMatch;
          const rest = node.slice(methodMatch[0].length);

          return (
            <>
              <span className="method-name">{methodName}</span>
              {openParen}
              {rest}
            </>
          );
        }
        return node;
      }

      // If it's a React element with children, recursively process
      if (node && typeof node === "object" && node.props && node.props.children) {
        return {
          ...node,
          props: {
            ...node.props,
            children: Array.isArray(node.props.children)
              ? node.props.children.map(processChildren)
              : processChildren(node.props.children),
          },
        };
      }

      return node;
    };

    return (
      <div className="method-signature-wrapper">
        {/* Text content */}
        <div className="method-signature-content">{processChildren(children)}</div>

        <style>{`
        /* Light mode */
        .method-signature-wrapper {
          border-top: 1px solid #555;
          border-bottom: 1px solid #555;
          font-family: 'JetBrains Mono', 'Monaco', 'Courier New', monospace;
        }

        .method-signature-content {
          font-size: 0.95rem;
          line-height: 1.5;
          font-weight: 600;
          padding: 0.5rem 0;
        }

        /* Method name - Magenta */
        .method-name {
          color: #d946ef;
          font-weight: 600;
        }

        /* First link (Classes) - Magenta */
        .method-signature-content a:first-of-type {
          color: #d946ef;
          text-decoration: none;
          transition: color 0.2s;
          border-bottom: 0;
        }

        .method-signature-content a:first-of-type:hover {
          color: #e879f9;
          text-decoration: underline;
        }

        /* Other links (CustomOptions, etc) - Green */
        .method-signature-content a {
          color: #4ade80;
          text-decoration: none;
          transition: color 0.2s;
          border-bottom: 0;
        }

        .method-signature-content a:hover {
          color: #22c55e;
          text-decoration: underline;
        }

        /* Return type - italic/cyan */
        .method-signature-content em {
          color: #22d3ee;
          font-style: italic;
        }

        /* Remove list bullet */
        .method-signature-content li {
          list-style: none;
        }

        .method-signature-content ul,
        .method-signature-content li {
          margin: 0;
          padding: 0;
        }

        .dark .method-signature-content {
          color: #e5e7eb;
        }

        .dark .method-name {
          color: #d946ef;
        }

        .dark .method-signature-content a:first-of-type {
          color: #d946ef;
        }

        .dark .method-signature-content a:first-of-type:hover {
          color: #e879f9;
        }

        .dark .method-signature-content a {
          color: #4ade80;
        }

        .dark .method-signature-content a:hover {
          color: #22c55e;
        }

        .dark .method-signature-content em {
          color: #22d3ee;
        }
      `}</style>
      </div>
    );
  }

  if (parameter) {
    // Process children to style parameter names and class references
    const processChildren = (node) => {
      if (typeof node === "string") {
        // Look for optional badge at the start like "Optional payload:"
        const optionalMatch = node.match(/^(\s*)(Optional)(\s+)(\w+:)/);

        if (optionalMatch) {
          const [, spaces, optional, space, paramName] = optionalMatch;
          const rest = node.slice(optionalMatch[0].length);

          return (
            <>
              <span className="param-badge">{optional}</span>
              {space}
              <span className="param-name">{paramName}</span>
              {rest}
            </>
          );
        }

        // Otherwise just return as is
        return node;
      }

      // If it's a React element with children, recursively process
      if (node && typeof node === "object" && node.props && node.props.children) {
        return {
          ...node,
          props: {
            ...node.props,
            children: Array.isArray(node.props.children)
              ? node.props.children.map(processChildren)
              : processChildren(node.props.children),
          },
        };
      }

      return node;
    };

    return (
      <div className="parameter-type-wrapper">
        {/* Text content */}
        <div className="parameter-type-content">{processChildren(children)}</div>

        <style>{`
        /* Light mode */
        .parameter-type-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .parameter-type-wrapper ul, .breadcrumb-wrapper ul li {
          margin: 0;
        }

        .parameter-type-content {
          font-family: 'JetBrains Mono', 'Monaco', 'Courier New', monospace;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* Optional badge - outlined/bordered pill */
        .param-badge {
          border: 1px solid transparent;
          padding: 0.125rem 0.5rem;
          border-radius: 0.25rem;
          color: #000;
          font-size: 0.85rem;
          white-space: nowrap;
          background-color: #F6F6F6;
        }

        /* Parameter name - Blue */
        .param-name {
          color: #60a5fa;
        }

        /* First link (Classes) - Magenta */
        .parameter-type-content a:first-of-type {
          color: #d946ef;
          text-decoration: none;
          transition: color 0.2s;
          border-bottom: 0;
        }

        .parameter-type-content a:first-of-type:hover {
          color: #e879f9;
          text-decoration: underline;
        }

        /* Other links (CustomOptions, etc) - Green */
        .parameter-type-content a {
          color: #4ade80;
          text-decoration: none;
          transition: color 0.2s;
          border-bottom: 0;
        }

        .parameter-type-content a:hover {
          color: #22c55e;
          text-decoration: underline;
        }

        /* Dark mode */
        .dark .parameter-type-content {
          color: #e5e7eb;
        }

        .dark .param-badge {
          border-color: transparent;
          color: #e5e7eb;
          background-color: #1A1A1C;
        }

        .dark .param-name {
          color: #60a5fa;
        }

        .dark .parameter-type-content a:first-of-type {
          color: #d946ef;
        }

        .dark .parameter-type-content a:first-of-type:hover {
          color: #e879f9;
        }

        .dark .parameter-type-content a {
          color: #4ade80;
        }

        .dark .parameter-type-content a:hover {
          color: #22c55e;
        }
      `}</style>
      </div>
    );
  }

  // Process children to wrap label (word before colon) with yellow color
  const processChildren = (node) => {
    if (typeof node === "string") {
      // Match pattern like "branding: " and wrap the label
      const parts = node.split(/(\w+:\s+)/);
      return parts.map((part, idx) => {
        if (part && part.includes(":")) {
          // This is the label part
          return (
            <span key={idx} className="breadcrumb-label">
              {part}
            </span>
          );
        }
        return part;
      });
    }

    // If it's a React element with children, recursively process
    if (node && typeof node === "object" && node.props && node.props.children) {
      return {
        ...node,
        props: {
          ...node.props,
          children: Array.isArray(node.props.children)
            ? node.props.children.map(processChildren)
            : processChildren(node.props.children),
        },
      };
    }

    return node;
  };

  if (title) {
    return (
      <div className="flex items-center gap-3 rounded-md breadcrumb-title-wrapper">
        {/* Text content */}
        <div className="flex items-center gap-1 font-mono breadcrumb-content">{processChildren(children)}</div>

        <style>{`
        /* Light mode */
        .breadcrumb-title-wrapper {
        }

        .breadcrumb-wrapper ul, .breadcrumb-wrapper ul li {
          margin: 0;
        }

        /* Label/property name before links - Yellow */
        .breadcrumb-content::first-line {
          color: #fbbf24;
        }

        /* Style for text nodes before first link - Yellow */
        .breadcrumb-label {
          color: #fbbf24;
        }

        .breadcrumb-content a {
          text-decoration: none;
          transition: color 0.2s;
          border-bottom: 0;
        }

        /* Default link color - Green for AcceptInvitationMembers and other content links */
        .breadcrumb-content a {
          color: #4ade80;
        }

        .breadcrumb-content a:hover {
          color: #22c55e;
          text-decoration: underline;
        }

        /* First link (Screens) - Magenta */
        .breadcrumb-content a:first-of-type {
          color: #d946ef;
        }

        .breadcrumb-content a:first-of-type:hover {
          color: #e879f9;
        }

        /* Dark mode */
        .dark .breadcrumb-wrapper {
          border-color: #4b5563;
        }

        .dark .breadcrumb-content {
          color: #e5e7eb;
        }

        .dark .breadcrumb-label {
          color: #fbbf24;
        }

        .dark .breadcrumb-content a {
          color: #4ade80;
        }

        .dark .breadcrumb-content a:hover {
          color: #22c55e;
        }

        .dark .breadcrumb-content a:first-of-type {
          color: #d946ef;
        }

        .dark .breadcrumb-content a:first-of-type:hover {
          color: #e879f9;
        }
      `}</style>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-md breadcrumb-wrapper">
      {/* Text content */}
      <div className="flex items-center gap-1 font-mono breadcrumb-content">{processChildren(children)}</div>

      <style>{`
        /* Light mode */
        .breadcrumb-wrapper {
          border: 1px solid #4b5563;
          padding: 0.75rem 1rem;
        }

        .breadcrumb-wrapper ul, .breadcrumb-wrapper ul li {
          margin: 0;
        }

        /* Label/property name before links - Yellow */
        .breadcrumb-content::first-line {
          color: #fbbf24;
        }

        /* Style for text nodes before first link - Yellow */
        .breadcrumb-label {
          color: #fbbf24;
        }

        .breadcrumb-content a {
          text-decoration: none;
          transition: color 0.2s;
          border-bottom: 0;
        }

        /* Default link color - Green for AcceptInvitationMembers and other content links */
        .breadcrumb-content a {
          color: #4ade80;
        }

        .breadcrumb-content a:hover {
          color: #22c55e;
          text-decoration: underline;
        }

        /* First link (Screens) - Magenta */
        .breadcrumb-content a:first-of-type {
          color: #d946ef;
        }

        .breadcrumb-content a:first-of-type:hover {
          color: #e879f9;
        }

        /* Dark mode */
        .dark .breadcrumb-wrapper {
          border-color: #4b5563;
        }

        .dark .breadcrumb-content {
          color: #e5e7eb;
        }

        .dark .breadcrumb-label {
          color: #fbbf24;
        }

        .dark .breadcrumb-content a {
          color: #4ade80;
        }

        .dark .breadcrumb-content a:hover {
          color: #22c55e;
        }

        .dark .breadcrumb-content a:first-of-type {
          color: #d946ef;
        }

        .dark .breadcrumb-content a:first-of-type:hover {
          color: #e879f9;
        }
      `}</style>
    </div>
  );
};
