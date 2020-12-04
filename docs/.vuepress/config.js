module.exports = {
  title: 'Jade Tree Documentation',
  description: 'Self-Hosted Personal Budgeting Platform',
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }],
    ['link', { rel: "manifest", href: "/site.webmanifest" }],
    ['link', { rel: "shortcut icon", href: "/favicon.ico" }],
  ],
  themeConfig: {
    nav: [
      { text: 'User\'s Guide', link: '/guide/' },
      { text: 'Reference', link: '/ref/' },
      {
        text: 'GitHub',
        items: [
          { text: 'Jade Tree Backend', link: 'https://github.com/asymworks/jadetree-backend' },
          { text: 'Jade Tree Frontend', link: 'https://github.com/asymworks/jadetree-frontend' },
          { text: 'JT Vue Controls', link: 'https://github.com/asymworks/jadetree-controls' },
          { text: 'JT Money Library', link: 'https://github.com/asymworks/jadetree-currency' },
        ],
      },
    ],
    sidebar: {
      '/guide/': [
        '',
        'install',
        {
          title: 'Getting Started',
          sidebarDepth: 2,
          collapsable: false,
          children: [
            'start_login',
            'start_dashboard',
            'start_budget',
            'start_transactions',
            {
              title: 'Reports Page (Coming Soon)',
              collapsable: false,
            },
          ],
        },
        'config',
      ],
      '/ref/': [
        'configuration',
        'accounting',
      ],
      '/': 'auto',
    },
  },
};
