import { Box } from 'theme-ui'

const Heading1 = ({ sx, children }) => {
  return (
    <Box
      sx={{
        fontSize: [7, 7, 8, 9],
        fontFamily: 'heading',
        letterSpacing: 'heading',
        lineHeight: '1.1',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export default Heading1
