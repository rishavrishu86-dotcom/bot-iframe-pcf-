// BotIframe.tsx
// React component for the Copilot Website channel iframe.
// Monochrome design: white background, black text, 1px borders, NO shadows.

import * as React from "react";

export interface IBotIframeProps {
  botUrl: string;
}

export const BotIframeComponent: React.FC<IBotIframeProps> = ({ botUrl }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(!!botUrl);
  const [hasError, setHasError] = React.useState<boolean>(!botUrl);

  React.useEffect(() => {
    if (botUrl) {
      setIsLoading(true);
      setHasError(false);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  }, [botUrl]);

  const handleLoad = () => {
    setIsLoading(false);
    if (botUrl) {
      setHasError(false);
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="bot-iframe-container">
      {/* Header */}
      <div className="bot-iframe-header">
        <span className="bot-iframe-title">Embedded Copilot (Website Channel)</span>
        <span className="bot-iframe-source">Source: EV__BOT_URL</span>
      </div>

      {/* Main content area - iframe always rendered for steady layout */}
      <div className="bot-iframe-content">
        <iframe
          className="bot-iframe"
          src={botUrl || "about:blank"}
          title="Embedded Copilot (Website Channel)"
          sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          referrerPolicy="no-referrer"
          allow="clipboard-read; clipboard-write"
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>

      {/* Loading banner - shows while connecting */}
      {isLoading && (
        <div className="bot-iframe-loading" role="status" aria-live="polite">
          Connecting...
        </div>
      )}

      {/* Error banner - shows when no URL or load fails */}
      {hasError && !isLoading && (
        <div className="bot-iframe-error" role="status" aria-live="polite">
          Bot unreachable. Check EV__BOT_URL or network.
        </div>
      )}

      {/* Footer */}
      
    </div>
  );
};
