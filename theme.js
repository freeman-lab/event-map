import { base } from '@theme-ui/presets'

const theme = {
  ...base,
  layout: {
    container: {
      px: [5, 7, 9, 10],
      maxWidth: '1920px',
    },
  },
  space: [0, 4, 8, 16, 24, 32, 48, 64, 96, 128, 232, 256, 512],
  fontSizes: [13, 14, 15, 16, 18, 20, 24, 28, 34, 42, 50, 64, 80, 96, 128],
  fontWeights: {
    regular: 400,
    medium: 500,
    heading: 700,
    bold: 800,
  },
  fontStyles: {
    body: 'normal',
    heading: 'italic',
  },
  fonts: {
    body: "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", sans-serif",
    heading: "inherit",
  },
  letterSpacings: {
    body: 'normal',
    heading: '0.02em'
  },
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#07c",
    secondary: "#30c",
    muted: "#f6f6f6",
  },
  forms: {
    select: {
      cursor: 'pointer',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'regular',
      letterSpacing: 'body',
      fontSize: [2, 2, 2, 2],
      color: 'text',
      bg: 'oklch(0.99 0 0)'
    },
    a: {
      color: 'blue',
      transition: 'color 100ms',
      '&:active': {
        color: 'blue',
      },
      '&:hover': {
        color: 'blue',
      },
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    hr: {
      border: 'none',
      borderStyle: 'solid',
      borderWidth: '0px',
      borderTopWidth: '1px',
      borderColor: 'text',
      opacity: 0.2
    },
    p: {
      fontSize: [2, 2, 2, 2],
      fontFamily: 'body',
      fontWeight: 'body',
      letterSpacing: 'body',
      my: [0],
    },
    h1: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      fontStyle: 'italic',
      letterSpacing: 'heading',
      fontSize: [9, 9, 10, 10],
      lineHeight: ['1.17em', '1.17em', '1.18em', '1.18em'],
      mt: ['7px', '7px', '8px', '8px'],
      mb: [0]
    },
    h2: {
      fontSize: [6, 6, 6, 7],
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: '1.15em',
      mt: [4, 4, 4, 5],
      mb: [2, 2, 2, 3]
    },
    h3: {
      fontSize: [4, 4, 4, 5],
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      mt: [4, 4, 4, 5],
      mb: [1],
    },
    ul: {
      paddingInlineStart: ['16px', '20px', '20px', '24px'],
    },
    ol: {
      paddingInlineStart: ['16px', '16px', '16px', '16px'],
    },
    table: {
      textAlign: 'center',
      borderSpacing: [4],
      fontSize: [3],
      fontFamily: 'monospace',
    },
  },
  config: {
    useColorSchemeMediaQuery: false,
  },
}

export default theme
