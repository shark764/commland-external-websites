import React, { useEffect, useState } from 'react';
import { useLocationHash } from '@/hooks';
import { targetUrl } from '@/shared/constants';

interface WebsiteItem {
  id: string;
  active: boolean;
}

const App = () => {
  const [activeWebsites, setActiveWebsites] = useState<WebsiteItem[]>([]);
  const [hash] = useLocationHash();

  useEffect(() => {
    const [, pathname] = hash.split('#');
    console.log(
      'file: App.tsx ~ line 16 ~ useEffect ~ pathname',
      pathname,
      activeWebsites
    );
    if (pathname.startsWith(targetUrl)) {
      setActiveWebsites((currentActiveWebsites) => currentActiveWebsites);
    }

    const showApp = () => {
      setActiveWebsites([]);
    };
    const hideApp = () => {
      setActiveWebsites([]);
    };

    window.commlandEvents.on('commland.websites.show', showApp);
    window.commlandEvents.on('commland.websites.hide', hideApp);

    return () => {
      window.commlandEvents.removeListener('commland.websites.show', showApp);
      window.commlandEvents.removeListener('commland.websites.hide', hideApp);
    };
  }, [hash]);

  return (
    <div
      style={{
        marginTop: '100px',
        marginLeft: '100px',
        backgroundColor: 'red',
        color: 'black',
      }}>
      Hello World!
    </div>
  );
};

export default App;
