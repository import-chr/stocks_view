'use client'

import { useEffect, useRef } from "react"

const useTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height: number = 600) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const containerRefCurrent = containerRef.current;

    if(!containerRefCurrent) return;
    if(containerRefCurrent.dataset.loaded) return;

    containerRefCurrent.innerHTML = `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${height}px;"></div>`;

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.innerHTML = JSON.stringify(config);

    containerRefCurrent.appendChild(script);
    containerRefCurrent.dataset.loaded = 'true';

    return () => {
      if(containerRefCurrent) {
        containerRefCurrent.innerHTML = '';
        delete containerRefCurrent.dataset.loaded;
      }
    }
    }, [scriptUrl, config, height]);

  return containerRef;
}

export default useTradingViewWidget