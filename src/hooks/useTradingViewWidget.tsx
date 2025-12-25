'use client'

import { useEffect, useMemo, useRef } from "react"

const useTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height: number = 600) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const configKey = useMemo(() => JSON.stringify(config), [config]);

  useEffect(() => {
    const containerRefCurrent = containerRef.current;
    if(!containerRefCurrent) return;

    const widget = containerRefCurrent.querySelector<HTMLDivElement>(".tradingview-widget-container__widget");
    if(!widget) return;

    const prevScript = containerRefCurrent.querySelector<HTMLScriptElement>("script[data-origin='preConfig']");
    if(prevScript) prevScript.remove();

    widget.replaceChildren();

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.type = "text/javascript";
    script.dataset.origin = "preConfig";
    script.text = configKey;

    containerRefCurrent.appendChild(script);

    return () => {
      if(script.parentNode) script.remove();
      widget.replaceChildren();
    }
  }, [scriptUrl, configKey, height]);

  return containerRef;
}

export default useTradingViewWidget