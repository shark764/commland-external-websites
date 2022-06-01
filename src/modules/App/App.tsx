import React, { useEffect } from 'react';
import { useLocationHash } from '@/hooks';
import { routesToRedirectFrom, targetUrl } from '@/shared/constants';
import useWebsitesDataStore from '@/stores/useWebsitesDataStore';
import type { ExternalWebsiteItem } from '@/types';
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
  const [hash] = useLocationHash();
  const websites = useWebsitesDataStore((state) => state.data);
  const removeWebsite = useWebsitesDataStore((state) => state.remove);
  const addWebsite = useWebsitesDataStore((state) => state.add);
  const showWebsite = useWebsitesDataStore((state) => state.show);
  const hideAllWebsites = useWebsitesDataStore((state) => state.hideAll);

  useEffect(() => {
    if (routesToRedirectFrom.includes(hash)) {
      return;
    }

    const [, pathname] = hash.split('#');

    if (pathname.startsWith(targetUrl)) {
      // Paths have the pattern "/websites/:website"
      // Example "/websites/:slack"
      const [, , websiteId] = pathname.split('/');
      // Hide all and show current website
      showWebsite(websiteId);
      console.log(
        'file: App.tsx ~ line 22 ~ useEffect ~ pathname',
        pathname,
        websiteId
      );
    } else {
      // Navigating away, then hide all
      hideAllWebsites();
    }
  }, [hash, hideAllWebsites, showWebsite]);

  useEffect(() => {
    const handleAddedToDock = ({ data }: EventData) => {
      addWebsite(data);
    };
    const handleRemoveFromDock = ({ id }: { id: string; }) => {
      removeWebsite(id);
    };

    window.commlandEvents.on(
      'commland.websites.addedToDock',
      handleAddedToDock
    );
    window.commlandEvents.on(
      'commland.websites.removedFromDock',
      handleRemoveFromDock
    );

    return () => {
      window.commlandEvents.removeListener(
        'commland.websites.addedToDock',
        handleAddedToDock
      );
      window.commlandEvents.removeListener(
        'commland.websites.removedFromDock',
        handleRemoveFromDock
      );
    };
  }, [addWebsite, removeWebsite]);

  return (
    <div className="w_ExternalWebsites_container">
      <ul>
        {websites.map((website) => (
          <li key={website.id}>{JSON.stringify(website, null, 3)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
