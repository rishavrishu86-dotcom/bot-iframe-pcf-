// index.ts
// PCF React control that renders a sandboxed <iframe> for the Copilot Website channel.
// Styling is monochrome. URL is supplied through the bound "botUrl" property.
//
// Security posture:
// - sandbox attribute limits the iframe's capabilities
// - referrerpolicy=no-referrer
// - no tokens/secrets in code
//
// UX posture:
// - visible, simple error banner when the iframe cannot load (CSP/frame-ancestor/misconfig)
// - container stretches to fill parent (height controlled by Canvas container)

import * as React from "react";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { BotIframeComponent } from "./BotIframe";

export class BotIframe implements ComponentFramework.ReactControl<IInputs, IOutputs> {
  public init(
    _context: ComponentFramework.Context<IInputs>,
    _notifyOutputChanged: () => void,
    _state: ComponentFramework.Dictionary
  ): void {
    // No initialization needed for this control
  }

  public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
    // Get the bot URL from the bound property
    const botUrl = context.parameters.botUrl?.raw || "";

    // Return the React component
    return React.createElement(BotIframeComponent, {
      botUrl: botUrl,
    });
  }

  public getOutputs(): IOutputs {
    // No outputs – hosting only.
    return {};
  }

  public destroy(): void {
    // React cleanup is handled automatically by the framework.
  }
}
