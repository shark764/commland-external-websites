import React, { useEffect } from 'react';
// import { useLocationHash } from '@/hooks';
// import { routesToRedirectFrom, targetUrl } from '@/shared/constants';
import useWebsitesDataStore from '@/stores/useWebsitesDataStore';
import type { ExternalWebsiteItem } from '@/types';
import Website from './components/Website';

import './styles.scss';

interface EventData {
  data: ExternalWebsiteItem;
}

// TODO:
// websites repo
//   array of websites
//   memo component
//   background using theme color

const App = () => {
  // const [hash] = useLocationHash();
  const websites = useWebsitesDataStore((state) => state.data);
  const removeWebsite = useWebsitesDataStore((state) => state.remove);
  const addWebsite = useWebsitesDataStore((state) => state.add);
  const showWebsite = useWebsitesDataStore((state) => state.show);
  const hideAllWebsites = useWebsitesDataStore((state) => state.hideAll);

  // useEffect(() => {
  //   if (routesToRedirectFrom.includes(hash)) {
  //     return;
  //   }

  //   const [, pathname] = hash.split('#');

  //   if (pathname.startsWith(targetUrl)) {
  //     // Paths have the pattern "/websites/:website"
  //     // Example "/websites/:slack"
  //     const [, , websiteId] = pathname.split('/');
  //     // Hide all and show current website
  //     showWebsite(websiteId);
  //     console.log(
  //       'file: App.tsx ~ line 22 ~ useEffect ~ pathname',
  //       pathname,
  //       websiteId
  //     );
  //   } else {
  //     // Navigating away, then hide all
  //     hideAllWebsites();
  //   }
  // }, [hash, hideAllWebsites, showWebsite]);

  useEffect(() => {
    console.log('file: App.tsx ~ line 55 ~ useEffect ~ websites', websites);
  }, [websites]);

  useEffect(() => {
    const mapEventToHandler = [
      {
        target: window.commlandEvents,
        methods: {
          bind: 'on',
          unbind: 'removeListener',
        },
        handlers: {
          'commland.websites.addWebsite': ({ data }: EventData) => {
            // TODO:
            // As soon as it's added, must be the active one
            console.log('commland.websites.addWebsite', data);
            addWebsite(data);
          },
          'commland.websites.showWebsite': ({ id }: { id: string; }) => {
            console.log('commland.websites.showWebsite', id);
            showWebsite(id);
          },
          'commland.websites.hideAllWebsites': () => {
            console.log('commland.websites.hideAllWebsites');
            // Navigating away, then hide all
            hideAllWebsites();
          },
          'commland.websites.removeWebsite': ({ id }: { id: string; }) => {
            console.log('commland.websites.removeWebsite', id);
            removeWebsite(id);
          },
        },
      },
    ];

    mapEventToHandler.forEach(({ handlers, methods: { bind }, target }) => {
      Object.keys(handlers).forEach((event) => {
        // @ts-expect-error
        target[bind](event, handlers[event]);
      });
    });

    return () => {
      mapEventToHandler.forEach(({ handlers, methods: { unbind }, target }) => {
        Object.keys(handlers).forEach((event) => {
          // @ts-expect-error
          target[unbind](event, handlers[event]);
        });
      });
    };
  }, [addWebsite, hideAllWebsites, removeWebsite, showWebsite]);

  return (
    <div className="w_ExternalWebsites_container">
      {websites.map(({ id, label, srcUrl, lastUrlVisited, hidden = true }) => (
        <Website
          key={id}
          id={id}
          label={label}
          srcUrl={srcUrl}
          lastUrlVisited={lastUrlVisited}
          hidden={hidden}
        />
      ))}
    </div>
  );
};

export default App;
