import { useEffect } from "react";

export default function UserMeta({ gAnalytics }) {

  const scriptId = 'google-analytics-tracking-script';
  const dataScriptId = 'google-analytics-data-script';

  useEffect(() => {
    if (gAnalytics) {
      handleAddAnalyticsTag();
      return () => {
        handleRemoveAnalyticsTag();
      }
    }
  }, [gAnalytics]);

  const handleAddAnalyticsTag = () => {
    const existingScript = document.getElementById(scriptId);
    const existingDataScript = document.getElementById(dataScriptId);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gAnalytics}`;
      script.async = true;
      script.id = scriptId;
      document.head.appendChild(script);
    }
    if (!existingDataScript) {
      const dataScript = document.createElement('script');
      dataScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gAnalytics}');
        `;
      dataScript.id = dataScriptId;
      document.head.appendChild(dataScript);
    }
  }

  const handleRemoveAnalyticsTag = () => {
    const script = document.getElementById(scriptId);
    const dataScript = document.getElementById(dataScriptId);
    if (script) {
      script.remove();
    }
    if (dataScript) {
      dataScript.remove();
    }
  }
}
