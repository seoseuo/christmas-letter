export const screenPaths = {
  intro: '/',
  login: '/login',
  decorate: '/decorate',
  complete: '/complete',
  home: '/home',
  visit: '/stockings/demo',
  write: '/write',
  sent: '/sent',
  letters: '/letters',
  checkout: '/checkout',
  paid: '/paid',
  read: '/read',
  report: '/report',
  guide: '/guide',
};

export const routableScreens = Object.keys(screenPaths).filter(
  (screen) => screen !== 'intro' && screen !== 'visit',
);
