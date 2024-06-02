import type { Preview } from '@storybook/react'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'INTRODUCTION',
          ['Configure', 'Usage', 'Theme'],
          'COMPONENTS',
          'PROVIDERS',
        ],
      },
    },
  },
}

export default preview
