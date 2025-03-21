import React, { useEffect, ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
  instance: any; // Using any to support all screen types
}

// Helper function to get a value with fallbacks and track the source
const getValueWithFallback = (obj: any, paths: string[], defaultValue: any) => {
  let usedPath = '';
  
  for (const path of paths) {
    const value = path.split('.').reduce((acc, part) => acc && acc[part], obj);
    if (value !== undefined && value !== null) {
      usedPath = path;
      return { value, path: usedPath, source: 'instance' };
    }
  }
  
  return { value: defaultValue, path: 'default', source: 'default' };
};

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number = 1) => {
  if (!hex || typeof hex !== 'string') return '';
  
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  if (!result) return '';
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, instance: screenInstance }) => {
  useEffect(() => {
    if (!screenInstance) return;
    
    const root = document.documentElement;
    
    // Extract branding information
    const branding = screenInstance.branding || {};
    const theme = branding.themes?.default || {};
    
    // Create a table to track all variable values and their sources
    const themeVariables: any[] = [];
    
    // Define color variables with organization overrides
    const primaryColorResult = getValueWithFallback(
      screenInstance, 
      ['organization.branding.colors.primary', 'branding.settings.colors.primary'], 
      '#635dff'
    );
    const primaryColor = primaryColorResult.value;
    
    const pageBackgroundResult = getValueWithFallback(
      screenInstance,
      ['organization.branding.colors.pageBackground', 'organization.branding.colors.page_background', 
       'branding.settings.colors.pageBackground', 'branding.settings.colors.page_background'],
      '#f2f2f2'
    );
    const pageBackground = pageBackgroundResult.value;
    
    // Set base colors
    root.style.setProperty('--color-primary', primaryColor);
    themeVariables.push({
      cssVariable: '--color-primary',
      value: primaryColor,
      source: primaryColorResult.source,
      path: primaryColorResult.path,
      firstPreference: 'organization.branding.colors.primary',
      firstPreferenceValue: screenInstance.organization?.branding?.colors?.primary,
      secondPreference: 'branding.settings.colors.primary',
      secondPreferenceValue: branding.settings?.colors?.primary,
      defaultValue: '#635dff'
    });
    
    root.style.setProperty('--color-primary-rgb', hexToRgba(primaryColor, 1).replace('rgba(', '').replace(')', '').split(',').slice(0, 3).join(','));
    root.style.setProperty('--color-page-background', pageBackground);
    themeVariables.push({
      cssVariable: '--color-page-background',
      value: pageBackground,
      source: pageBackgroundResult.source,
      path: pageBackgroundResult.path,
      firstPreference: 'organization.branding.colors.pageBackground',
      firstPreferenceValue: screenInstance.organization?.branding?.colors?.pageBackground,
      secondPreference: 'organization.branding.colors.page_background',
      secondPreferenceValue: screenInstance.organization?.branding?.colors?.page_background,
      thirdPreference: 'branding.settings.colors.pageBackground',
      thirdPreferenceValue: branding.settings?.colors?.pageBackground,
      fourthPreference: 'branding.settings.colors.page_background',
      fourthPreferenceValue: branding.settings?.colors?.page_background,
      defaultValue: '#f2f2f2'
    });
    
    // Set derived colors
    const primaryLight = hexToRgba(primaryColor, 0.1);
    const primaryDark = hexToRgba(primaryColor, 0.8);
    root.style.setProperty('--color-primary-light', primaryLight);
    root.style.setProperty('--color-primary-dark', primaryDark);
    
    // Set colors from theme with better fallbacks
    // Primary button colors
    const primaryButtonResult = getValueWithFallback(theme, ['colors.primary_button'], '#ffffff');
    const primaryButtonLabelResult = getValueWithFallback(theme, ['colors.primary_button_label'], '#ffffff');
    const primaryButtonBorderResult = getValueWithFallback(theme, ['colors.primary_button_border'], '#c9cace');
    
    root.style.setProperty('--color-primary-button', primaryButtonResult.value);
    themeVariables.push({
      cssVariable: '--color-primary-button',
      value: primaryButtonResult.value,
      source: primaryButtonResult.source,
      path: primaryButtonResult.path,
      firstPreference: 'branding.themes.default.colors.primary_button',
      firstPreferenceValue: theme.colors?.primary_button,
      defaultValue: '#ffffff'
    });
    
    root.style.setProperty('--color-primary-button-label', primaryButtonLabelResult.value);
    themeVariables.push({
      cssVariable: '--color-primary-button-label',
      value: primaryButtonLabelResult.value,
      source: primaryButtonLabelResult.source,
      path: primaryButtonLabelResult.path,
      firstPreference: 'branding.themes.default.colors.primary_button_label',
      firstPreferenceValue: theme.colors?.primary_button_label,
      defaultValue: '#ffffff'
    });
    
    root.style.setProperty('--color-primary-button-border', primaryButtonBorderResult.value);
    themeVariables.push({
      cssVariable: '--color-primary-button-border',
      value: primaryButtonBorderResult.value,
      source: primaryButtonBorderResult.source,
      path: primaryButtonBorderResult.path,
      firstPreference: 'branding.themes.default.colors.primary_button_border',
      firstPreferenceValue: theme.colors?.primary_button_border,
      defaultValue: '#c9cace'
    });
    
    // Secondary button colors
    const secondaryButtonBorderResult = getValueWithFallback(theme, ['colors.secondary_button_border'], '#c9cace');
    const secondaryButtonLabelResult = getValueWithFallback(theme, ['colors.secondary_button_label'], '#1e212a');
    
    root.style.setProperty('--color-secondary-button-border', secondaryButtonBorderResult.value);
    themeVariables.push({
      cssVariable: '--color-secondary-button-border',
      value: secondaryButtonBorderResult.value,
      source: secondaryButtonBorderResult.source,
      path: secondaryButtonBorderResult.path,
      firstPreference: 'branding.themes.default.colors.secondary_button_border',
      firstPreferenceValue: theme.colors?.secondary_button_border,
      defaultValue: '#c9cace'
    });
    
    root.style.setProperty('--color-secondary-button-label', secondaryButtonLabelResult.value);
    themeVariables.push({
      cssVariable: '--color-secondary-button-label',
      value: secondaryButtonLabelResult.value,
      source: secondaryButtonLabelResult.source,
      path: secondaryButtonLabelResult.path,
      firstPreference: 'branding.themes.default.colors.secondary_button_label',
      firstPreferenceValue: theme.colors?.secondary_button_label,
      defaultValue: '#1e212a'
    });
    
    // Base colors
    const baseFocusResult = getValueWithFallback(theme, ['colors.base_focus_color'], primaryColor);
    const baseHoverResult = getValueWithFallback(theme, ['colors.base_hover_color'], 'rgba(0, 0, 0, 0.05)');
    
    root.style.setProperty('--color-base-focus', baseFocusResult.value);
    themeVariables.push({
      cssVariable: '--color-base-focus',
      value: baseFocusResult.value,
      source: baseFocusResult.source,
      path: baseFocusResult.path,
      firstPreference: 'branding.themes.default.colors.base_focus_color',
      firstPreferenceValue: theme.colors?.base_focus_color,
      defaultValue: primaryColor
    });
    
    root.style.setProperty('--color-base-hover', baseHoverResult.value);
    themeVariables.push({
      cssVariable: '--color-base-hover',
      value: baseHoverResult.value,
      source: baseHoverResult.source,
      path: baseHoverResult.path,
      firstPreference: 'branding.themes.default.colors.base_hover_color',
      firstPreferenceValue: theme.colors?.base_hover_color,
      defaultValue: 'rgba(0, 0, 0, 0.05)'
    });
    
    // Text colors
    const headerResult = getValueWithFallback(theme, ['colors.header'], '#1e212a');
    const bodyTextResult = getValueWithFallback(theme, ['colors.body_text'], '#1e212a');
    const linksResult = getValueWithFallback(theme, ['colors.links_focused_components'], primaryColor);
    const inputLabelsResult = getValueWithFallback(theme, ['colors.input_labels_placeholders'], '#65676e');
    const inputTextResult = getValueWithFallback(theme, ['colors.input_filled_text'], '#000000');
    
    root.style.setProperty('--color-header', headerResult.value);
    themeVariables.push({
      cssVariable: '--color-header',
      value: headerResult.value,
      source: headerResult.source,
      path: headerResult.path,
      firstPreference: 'branding.themes.default.colors.header',
      firstPreferenceValue: theme.colors?.header,
      defaultValue: '#1e212a'
    });
    
    root.style.setProperty('--color-body-text', bodyTextResult.value);
    themeVariables.push({
      cssVariable: '--color-body-text',
      value: bodyTextResult.value,
      source: bodyTextResult.source,
      path: bodyTextResult.path,
      firstPreference: 'branding.themes.default.colors.body_text',
      firstPreferenceValue: theme.colors?.body_text,
      defaultValue: '#1e212a'
    });
    
    root.style.setProperty('--color-links', linksResult.value);
    themeVariables.push({
      cssVariable: '--color-links',
      value: linksResult.value,
      source: linksResult.source,
      path: linksResult.path,
      firstPreference: 'branding.themes.default.colors.links_focused_components',
      firstPreferenceValue: theme.colors?.links_focused_components,
      defaultValue: primaryColor
    });
    
    root.style.setProperty('--color-input-labels', inputLabelsResult.value);
    themeVariables.push({
      cssVariable: '--color-input-labels',
      value: inputLabelsResult.value,
      source: inputLabelsResult.source,
      path: inputLabelsResult.path,
      firstPreference: 'branding.themes.default.colors.input_labels_placeholders',
      firstPreferenceValue: theme.colors?.input_labels_placeholders,
      defaultValue: '#65676e'
    });
    
    root.style.setProperty('--color-input-text', inputTextResult.value);
    themeVariables.push({
      cssVariable: '--color-input-text',
      value: inputTextResult.value,
      source: inputTextResult.source,
      path: inputTextResult.path,
      firstPreference: 'branding.themes.default.colors.input_filled_text',
      firstPreferenceValue: theme.colors?.input_filled_text,
      defaultValue: '#000000'
    });
    
    // UI element colors
    const widgetBackgroundResult = getValueWithFallback(theme, ['colors.widget_background'], '#ffffff');
    const widgetBorderResult = getValueWithFallback(theme, ['colors.widget_border'], '#c9cace');
    const inputBorderResult = getValueWithFallback(theme, ['colors.input_border'], '#c9cace');
    const inputBackgroundResult = getValueWithFallback(theme, ['colors.input_background'], '#ffffff');
    const iconsResult = getValueWithFallback(theme, ['colors.icons'], '#65676e');
    const errorResult = getValueWithFallback(theme, ['colors.error'], '#d03c38');
    const successResult = getValueWithFallback(theme, ['colors.success'], '#13a688');
    
    root.style.setProperty('--color-widget-background', widgetBackgroundResult.value);
    themeVariables.push({
      cssVariable: '--color-widget-background',
      value: widgetBackgroundResult.value,
      source: widgetBackgroundResult.source,
      path: widgetBackgroundResult.path,
      firstPreference: 'branding.themes.default.colors.widget_background',
      firstPreferenceValue: theme.colors?.widget_background,
      defaultValue: '#ffffff'
    });
    
    root.style.setProperty('--color-widget-border', widgetBorderResult.value);
    themeVariables.push({
      cssVariable: '--color-widget-border',
      value: widgetBorderResult.value,
      source: widgetBorderResult.source,
      path: widgetBorderResult.path,
      firstPreference: 'branding.themes.default.colors.widget_border',
      firstPreferenceValue: theme.colors?.widget_border,
      defaultValue: '#c9cace'
    });
    
    root.style.setProperty('--color-input-border', inputBorderResult.value);
    themeVariables.push({
      cssVariable: '--color-input-border',
      value: inputBorderResult.value,
      source: inputBorderResult.source,
      path: inputBorderResult.path,
      firstPreference: 'branding.themes.default.colors.input_border',
      firstPreferenceValue: theme.colors?.input_border,
      defaultValue: '#c9cace'
    });
    
    root.style.setProperty('--color-input-background', inputBackgroundResult.value);
    themeVariables.push({
      cssVariable: '--color-input-background',
      value: inputBackgroundResult.value,
      source: inputBackgroundResult.source,
      path: inputBackgroundResult.path,
      firstPreference: 'branding.themes.default.colors.input_background',
      firstPreferenceValue: theme.colors?.input_background,
      defaultValue: '#ffffff'
    });
    
    root.style.setProperty('--color-icons', iconsResult.value);
    themeVariables.push({
      cssVariable: '--color-icons',
      value: iconsResult.value,
      source: iconsResult.source,
      path: iconsResult.path,
      firstPreference: 'branding.themes.default.colors.icons',
      firstPreferenceValue: theme.colors?.icons,
      defaultValue: '#65676e'
    });
    
    root.style.setProperty('--color-error', errorResult.value);
    themeVariables.push({
      cssVariable: '--color-error',
      value: errorResult.value,
      source: errorResult.source,
      path: errorResult.path,
      firstPreference: 'branding.themes.default.colors.error',
      firstPreferenceValue: theme.colors?.error,
      defaultValue: '#d03c38'
    });
    
    root.style.setProperty('--color-success', successResult.value);
    themeVariables.push({
      cssVariable: '--color-success',
      value: successResult.value,
      source: successResult.source,
      path: successResult.path,
      firstPreference: 'branding.themes.default.colors.success',
      firstPreferenceValue: theme.colors?.success,
      defaultValue: '#13a688'
    });
    
    // Set border properties from theme
    const buttonBorderRadiusResult = getValueWithFallback(theme, ['borders.button_border_radius'], 3);
    const inputBorderRadiusResult = getValueWithFallback(theme, ['borders.input_border_radius'], 3);
    const widgetCornerRadiusResult = getValueWithFallback(theme, ['borders.widget_corner_radius'], 5);
    
    root.style.setProperty('--border-button-radius', `${buttonBorderRadiusResult.value}px`);
    themeVariables.push({
      cssVariable: '--border-button-radius',
      value: `${buttonBorderRadiusResult.value}px`,
      source: buttonBorderRadiusResult.source,
      path: buttonBorderRadiusResult.path,
      firstPreference: 'branding.themes.default.borders.button_border_radius',
      firstPreferenceValue: theme.borders?.button_border_radius,
      defaultValue: '3px'
    });
    
    root.style.setProperty('--border-input-radius', `${inputBorderRadiusResult.value}px`);
    themeVariables.push({
      cssVariable: '--border-input-radius',
      value: `${inputBorderRadiusResult.value}px`,
      source: inputBorderRadiusResult.source,
      path: inputBorderRadiusResult.path,
      firstPreference: 'branding.themes.default.borders.input_border_radius',
      firstPreferenceValue: theme.borders?.input_border_radius,
      defaultValue: '3px'
    });
    
    root.style.setProperty('--border-widget-radius', `${widgetCornerRadiusResult.value}px`);
    themeVariables.push({
      cssVariable: '--border-widget-radius',
      value: `${widgetCornerRadiusResult.value}px`,
      source: widgetCornerRadiusResult.source,
      path: widgetCornerRadiusResult.path,
      firstPreference: 'branding.themes.default.borders.widget_corner_radius',
      firstPreferenceValue: theme.borders?.widget_corner_radius,
      defaultValue: '5px'
    });
    
    // Border width
    const buttonBorderWeightResult = getValueWithFallback(theme, ['borders.button_border_weight'], 1);
    const inputBorderWeightResult = getValueWithFallback(theme, ['borders.input_border_weight'], 1);
    const widgetBorderWeightResult = getValueWithFallback(theme, ['borders.widget_border_weight'], 0);
    
    root.style.setProperty('--border-button-weight', `${buttonBorderWeightResult.value}px`);
    themeVariables.push({
      cssVariable: '--border-button-weight',
      value: `${buttonBorderWeightResult.value}px`,
      source: buttonBorderWeightResult.source,
      path: buttonBorderWeightResult.path,
      firstPreference: 'branding.themes.default.borders.button_border_weight',
      firstPreferenceValue: theme.borders?.button_border_weight,
      defaultValue: '1px'
    });
    
    root.style.setProperty('--border-input-weight', `${inputBorderWeightResult.value}px`);
    themeVariables.push({
      cssVariable: '--border-input-weight',
      value: `${inputBorderWeightResult.value}px`,
      source: inputBorderWeightResult.source,
      path: inputBorderWeightResult.path,
      firstPreference: 'branding.themes.default.borders.input_border_weight',
      firstPreferenceValue: theme.borders?.input_border_weight,
      defaultValue: '1px'
    });
    
    root.style.setProperty('--border-widget-weight', `${widgetBorderWeightResult.value}px`);
    themeVariables.push({
      cssVariable: '--border-widget-weight',
      value: `${widgetBorderWeightResult.value}px`,
      source: widgetBorderWeightResult.source,
      path: widgetBorderWeightResult.path,
      firstPreference: 'branding.themes.default.borders.widget_border_weight',
      firstPreferenceValue: theme.borders?.widget_border_weight,
      defaultValue: '0px'
    });
    
    // Widget shadow
    const showWidgetShadowResult = getValueWithFallback(theme, ['borders.show_widget_shadow'], true);
    root.style.setProperty('--widget-shadow', showWidgetShadowResult.value 
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      : 'none');
    themeVariables.push({
      cssVariable: '--widget-shadow',
      value: showWidgetShadowResult.value ? 'shadow' : 'none',
      source: showWidgetShadowResult.source,
      path: showWidgetShadowResult.path,
      firstPreference: 'branding.themes.default.borders.show_widget_shadow',
      firstPreferenceValue: theme.borders?.show_widget_shadow,
      defaultValue: 'true'
    });
    
    // Set font properties from theme
    const refSizeResult = getValueWithFallback(theme, ['fonts.reference_text_size'], 16);
    const refSize = refSizeResult.value;
    themeVariables.push({
      cssVariable: '--font-reference-size',
      value: refSize,
      source: refSizeResult.source,
      path: refSizeResult.path,
      firstPreference: 'branding.themes.default.fonts.reference_text_size',
      firstPreferenceValue: theme.fonts?.reference_text_size,
      defaultValue: '16'
    });
    
    // Helper function to set font properties
    const setFontProperties = (type: string, defaultSize: number, defaultBold: boolean = false) => {
      const fontObjResult = getValueWithFallback(theme, [`fonts.${type}`], { size: defaultSize, bold: defaultBold });
      const fontObj = fontObjResult.value;
      const size = fontObj.size ? (fontObj.size / 100) * refSize : defaultSize;
      const weight = fontObj.bold ? '700' : '400';
      
      root.style.setProperty(`--font-${type.replace('_', '-')}-size`, `${size / 16}rem`);
      themeVariables.push({
        cssVariable: `--font-${type.replace('_', '-')}-size`,
        value: `${size / 16}rem`,
        source: fontObjResult.source,
        path: fontObjResult.path,
        firstPreference: `branding.themes.default.fonts.${type}.size`,
        firstPreferenceValue: theme.fonts?.[type]?.size,
        defaultValue: `${defaultSize}px`
      });
      
      root.style.setProperty(`--font-${type.replace('_', '-')}-weight`, weight);
      themeVariables.push({
        cssVariable: `--font-${type.replace('_', '-')}-weight`,
        value: weight,
        source: fontObjResult.source,
        path: fontObjResult.path,
        firstPreference: `branding.themes.default.fonts.${type}.bold`,
        firstPreferenceValue: theme.fonts?.[type]?.bold,
        defaultValue: defaultBold ? '700' : '400'
      });
    };
    
    // Set font sizes and weights
    setFontProperties('title', 24, true);
    setFontProperties('subtitle', 18, false);
    setFontProperties('body_text', 16, false);
    setFontProperties('buttons_text', 16, true);
    setFontProperties('input_labels', 14, false);
    setFontProperties('links', 14, false);
    
    // Set page layout
    const pageLayoutResult = getValueWithFallback(theme, ['page_background.page_layout'], 'center');
    const pageLayout = pageLayoutResult.value;
    themeVariables.push({
      cssVariable: '--page-layout',
      value: pageLayout,
      source: pageLayoutResult.source,
      path: pageLayoutResult.path,
      firstPreference: 'branding.themes.default.page_background.page_layout',
      firstPreferenceValue: theme.page_background?.page_layout,
      defaultValue: 'center'
    });
    
    // Remove any existing layout classes
    document.body.classList.remove('layout-center', 'layout-left', 'layout-right');
    document.body.classList.add(`layout-${pageLayout}`);
    
    // Set font family if available
    const fontFamilyResult = getValueWithFallback(theme, ['fonts.font_family'], 
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif');
    const fontFamily = fontFamilyResult.value;
    
    root.style.setProperty('--font-family', fontFamily);
    themeVariables.push({
      cssVariable: '--font-family',
      value: fontFamily,
      source: fontFamilyResult.source,
      path: fontFamilyResult.path,
      firstPreference: 'branding.themes.default.fonts.font_family',
      firstPreferenceValue: theme.fonts?.font_family,
      defaultValue: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
    });
    
    // Create a simplified version of the theme variables for the console table
    const tableData = themeVariables.map(variable => ({
      'CSS Variable': variable.cssVariable,
      'Current Value': variable.value,
      'Source': variable.source,
      'Path': variable.path,
      'Default Value': variable.defaultValue
    }));
    
    // Output the theme variables to the console
    console.log('Theme Variables:');
    console.table(tableData);
    
    // Also log the full theme data for debugging
    console.log('Full Theme Data:', themeVariables);
    
  }, [screenInstance]);

  return (
    <div className="auth0-acul">
      {children}
    </div>
  );
};

export default ThemeProvider; 