import theme from '../theme'
import 'react-day-picker/dist/style.css'
import '../global.css'
import { ThemeUIProvider } from 'theme-ui'

export default function App({ Component, pageProps }) {
  return (
    <ThemeUIProvider theme={theme}>
      <main>
        <Component {...pageProps} />
      </main>
    </ThemeUIProvider>
  )
}
