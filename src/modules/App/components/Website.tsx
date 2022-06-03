import React, { memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import type { ExternalWebsiteItem } from '@/types';
import { Loader } from '@2600hz/sds-react-components';

import './styles.scss';

const Website = ({
  id,
  label,
  lastUrlVisited,
  srcUrl,
  hidden = true,
}: ExternalWebsiteItem) => {
  const [isLoading, setIsLoading] = useState(true);
  const webviewRef = useRef<HTMLWebViewElement>(null);

  const partition = `persist:${id}`;

  useEffect(() => {
    // const webview = document.querySelector('webview');
    const webview = webviewRef.current;

    const onReady = () => {
      setIsLoading(false);
    };

    webview?.addEventListener('dom-ready', onReady);

    return () => {
      webview?.removeEventListener('dom-ready', onReady);
    };
  }, []);

  return (
    // <div className="w_ExternalWebsites_layout">
    <>
      {isLoading && (
        <div className="w_ExternalWebsites_loading_indicator">
          <Loader size="Large" />
        </div>
      )}

      <webview
        key={id}
        id={id}
        ref={webviewRef}
        className={classNames('w_ExternalWebsites_site', {
          w_ExternalWebsites_site_loading: isLoading,
          w_ExternalWebsites_site_hidden: hidden,
        })}
        title={label}
        src={lastUrlVisited ?? srcUrl}
        // @ts-expect-error
        disablewebsecurity="true"
        partition={partition}
      />
    </>
    // </div>
  );
};

export default memo(Website);
