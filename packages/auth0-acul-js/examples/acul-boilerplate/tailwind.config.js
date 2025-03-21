/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary colors from branding
        primary: {
          DEFAULT: 'var(--color-primary, #635dff)',
          light: 'var(--color-primary-light, rgba(99, 93, 255, 0.1))',
          dark: 'var(--color-primary-dark, rgba(99, 93, 255, 0.8))',
          button: 'var(--color-primary-button, #635dff)',
          'button-label': 'var(--color-primary-button-label, #ffffff)',
        },
        // Secondary colors
        secondary: {
          'button-border': 'var(--color-secondary-button-border, #c9cace)',
          'button-label': 'var(--color-secondary-button-label, #1e212a)',
        },
        // Base colors
        base: {
          focus: 'var(--color-base-focus, #635dff)',
          hover: 'var(--color-base-hover, rgba(99, 93, 255, 0.8))',
        },
        // Text colors
        text: {
          header: 'var(--color-header, #1e212a)',
          body: 'var(--color-body-text, #1e212a)',
          links: 'var(--color-links, #635dff)',
          'input-label': 'var(--color-input-labels, #65676e)',
          'input-text': 'var(--color-input-text, #000000)',
        },
        // UI element colors
        ui: {
          background: 'var(--color-widget-background, #ffffff)',
          border: 'var(--color-widget-border, #c9cace)',
          'input-border': 'var(--color-input-border, #c9cace)',
          'input-bg': 'var(--color-input-background, #ffffff)',
          icons: 'var(--color-icons, #65676e)',
          error: 'var(--color-error, #d03c38)',
          success: 'var(--color-success, #13a688)',
          'page-bg': 'var(--color-page-background, #f2f2f2)',
        },
      },
      borderRadius: {
        button: 'var(--border-button-radius, 3px)',
        input: 'var(--border-input-radius, 3px)',
        widget: 'var(--border-widget-radius, 5px)',
      },
      borderWidth: {
        button: 'var(--border-button-weight, 1px)',
        input: 'var(--border-input-weight, 1px)',
        widget: 'var(--border-widget-weight, 0px)',
      },
      fontSize: {
        'title': 'var(--font-title-size, 1.5rem)',
        'subtitle': 'var(--font-subtitle-size, 0.875rem)',
        'body': 'var(--font-body-size, 0.875rem)',
        'button': 'var(--font-button-size, 1rem)',
        'input-label': 'var(--font-input-label-size, 1rem)',
        'link': 'var(--font-link-size, 0.875rem)',
      },
      fontWeight: {
        'title': 'var(--font-title-weight, 400)',
        'subtitle': 'var(--font-subtitle-weight, 400)',
        'body': 'var(--font-body-weight, 400)',
        'button': 'var(--font-button-weight, 400)',
        'input-label': 'var(--font-input-label-weight, 400)',
        'link': 'var(--font-link-weight, 700)',
      },
      fontFamily: {
        'sans': ['var(--font-family)', 'sans-serif'],
        'title': ['var(--font-family)', 'sans-serif'],
        'body': ['var(--font-family)', 'sans-serif'],
        'button': ['var(--font-family)', 'sans-serif'],
        'input-label': ['var(--font-family)', 'sans-serif'],
        'link': ['var(--font-family)', 'sans-serif'],
      },
      boxShadow: {
        widget: 'var(--widget-shadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06))',
      },
      spacing: {
        'widget-padding-x': 'var(--widget-padding-x, 2.5rem)',
        'widget-padding-y': 'var(--widget-padding-y, 2rem)',
      },
      opacity: {
        'disabled': 'var(--opacity-disabled, 0.5)',
      },
      transitionProperty: {
        'auth0': 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
      },
      transitionDuration: {
        'auth0': 'var(--transition-duration, 200ms)',
      },
      width: {
        '5': '1.25rem', // 20px
      },
      height: {
        '5': '1.25rem', // 20px
      },
    },
  },
  plugins: [],
};
