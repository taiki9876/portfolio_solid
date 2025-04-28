import type { Preview } from '@storybook/react';
import '../src/admin/assets/styles/colors.css';
import '../src/admin/assets/styles/reset.css';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
