import { Box } from 'theme-ui'

const Heading2 = ({ sx, children }) => {
  return (
    <Box
      sx={{
        letterSpacing: 'body',
        fontFamily: 'heading',
        fontSize: [5, 5, 6, 6],
        lineHeight: '1.15',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export default Heading2
