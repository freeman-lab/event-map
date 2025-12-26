import { Box } from 'theme-ui'

const Heading3 = ({ sx, children, ...props }) => {
  return (
    <Box
      sx={{
        letterSpacing: '0.07em',
        fontFamily: 'heading',
        fontSize: [2, 2, 4, 4],
        lineHeight: '1.3',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default Heading3
