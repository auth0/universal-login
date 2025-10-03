import { FormHandler } from '@auth0/auth0-acul-js';
import { name, version } from '../package.json';

const originalAddTelemetryField = (FormHandler.prototype as any).addTelemetryField;

(FormHandler.prototype as any).addTelemetryField = function (form: HTMLFormElement): HTMLFormElement {
  // Do not call original, to replace the telemetry
  const formWithBaseTelemetry = form;

  let sdkInput = formWithBaseTelemetry.querySelector('input[name="acul-sdk"]');
  const telemetryToAdd = `${name}@${version}`;

  if (sdkInput) {
    sdkInput.setAttribute('value', telemetryToAdd);
  } else {
    sdkInput = document.createElement('input');
    sdkInput.setAttribute('type', 'hidden');
    sdkInput.setAttribute('name', 'acul-sdk');
    sdkInput.setAttribute('value', telemetryToAdd);
    formWithBaseTelemetry.appendChild(sdkInput);
  }

  return formWithBaseTelemetry;
};
