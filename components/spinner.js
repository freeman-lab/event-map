import { Box } from 'theme-ui'
import { LoaderCircle } from 'lucide-react'

const Spinner = ({ sx, size = 42, color = 'oklch(0.566 0 0)' }) => {
  return (
    <Box
      sx={{
        animation: 'spin 1s linear infinite',
        transformOrigin: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@keyframes spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        ...sx,
      }}
    >
      <LoaderCircle size={size} color={color} />
    </Box>
  )
}

export default Spinner
