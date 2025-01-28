import React, { useEffect, useRef } from "react";

const TradingViewWidget = ({ defaultSearch = "AAPL" }) => {
  const widgetContainerRef = useRef(null);

  useEffect(() => {
    // Dynamically load the TradingView script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (window.TradingView) {
        // Ensure the container element exists before initializing the widget
        if (widgetContainerRef.current) {
          new window.TradingView.widget({
            container_id: widgetContainerRef.current.id,
            autosize: true,
            symbol: defaultSearch, // Default search symbol
            interval: "D", // Daily chart
            timezone: "Etc/UTC",
            theme: "light", // Light or dark theme
            style: "1", // Candlestick chart style
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true, // Allow changing symbols
            withdateranges: true,
            hotlist: true,
            details: true,
            // studies: ["MACD@tv-basicstudies"], // Add specific studies
            hide_side_toolbar: true,
          });
        } else {
          console.error("Widget container ref is not available.");
        }
      } else {
        console.error("TradingView script failed to load.");
      }
    };

    document.body.appendChild(script);

    return () => {
      // Clean up: Remove the widget and script when the component unmounts
      if (widgetContainerRef.current) {
        widgetContainerRef.current.innerHTML = "";
      }
    };
  }, [defaultSearch]);

  return (
    <div
      id="widget-container"
      className="w-full h-[700px] rounded-lg shadow-lg">
      <div
        id="tradingview_widget"
        ref={widgetContainerRef}
        className="w-full h-full"></div>
    </div>
  );
};

export default TradingViewWidget;
