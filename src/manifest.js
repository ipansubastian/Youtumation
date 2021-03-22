manifest = {
  name: 'Youtumation',
  description: 'Youtube Automation by Ipan Subastian',
  version: '1.0.0',
  manifest_version: 2,
  background: {
    scripts: ['background/background.app.js'],
    // page: 'backgrounds/background.html',
    persistent: false,
  },
  content_scripts: [
    {
      matches: [
        'http://localhost:5000/*',
        // "http://www.youtube.com/*",
        // "https://www.youtube.com/*",
      ],
      // css: ['content/content.css'],
      js: ['content/content.app.js'],
    },
  ],
  icons: {
    // icon_default: 'icons/icon.png',
    16: 'icons/icon.png',
    22: 'icons/icon.png',
    24: 'icons/icon.png',
    48: 'icons/icon.png',
    128: 'icons/icon.png',
  },
  browser_action: {
    // default_icon: {
    //   16: 'icon.svg',
    //   48: 'icon.svg',
    //   128: 'icon.svg',
    // },
    default_title: 'Youtumation has access to this site.',
    default_popup: 'popup/popup.html',
    chrome_style: true,
  },
  options_ui: {
    page: 'options/options.html',
    open_in_tab: true,
    chrome_style: true,
  },

  permissions: ['tabs'],
};
