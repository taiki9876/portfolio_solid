export type ColorKeys =
    | 'primary'
    | 'primarySub'
    | 'secondary'
    | 'text'
    | 'gray400'
    | 'gray300'
    | 'gray200'
    | 'gray100'
    | 'pageBackgroundGray'
    | 'sidenavBackground'
    | 'tableBorder'
    | 'chatBackground'
    | 'white'
    | 'red'
    | 'yellow'
    | 'green'
    | 'lightRed'
    | 'black';

export const Colors: Record<ColorKeys, string> = {
    primary: 'var(--color-primary)',
    primarySub: 'var(--color-primary-light)',
    secondary: 'var(--color-secondary)',
    text: 'var(--color-text-base)',
    gray400: 'var(--color-gray-400)',
    gray300: 'var(--color-gray-300)',
    gray200: 'var(--color-gray-200)',
    gray100: 'var(--color-gray-100)',
    pageBackgroundGray: 'var(--color-ui-page-bg)',
    sidenavBackground: 'var(--color-ui-sidenav-bg)',
    tableBorder: 'var(--color-ui-table-border)',
    chatBackground: 'var(--color-ui-chat-bg)',
    white: 'var(--color-white)',
    red: 'var(--color-accent-red)',
    lightRed: 'var(--color-accent-red-light)',
    yellow: 'var(--color-accent-yellow)',
    green: 'var(--color-accent-green)',
    black: 'var(--color-black)',
};
