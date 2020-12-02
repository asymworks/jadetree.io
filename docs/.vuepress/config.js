module.exports = {
  title: 'Jade Tree Documentation',
  description: 'Self-Hosted Personal Budgeting Platform',
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
              title: 'Reports Page Overview (Coming Soon)',
              collapsable: false,
            },
          ],
        },
      ],
      '/ref/': [
        'configuration',
        'accounting',
      ],
      '/': 'auto',
    },
  },
};
