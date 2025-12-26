import { useState } from 'react'
import { Box, Button as ThemedButton } from 'theme-ui'

const Button = ({
  children,
  flat = false,
  onClick,
  color,
  bg,
  shadow,
  sx,
  ...props
}) => {
  const [pressed, setPressed] = useState(false)

  return (
    <Box
      {...props}
      sx={(theme) => ({
        display: 'inline-block',
        cursor: 'pointer',
      })}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
    >
      <ThemedButton
        sx={(theme) => ({
          appearance: 'none',
          border: 'none',
          borderRadius: '4px',
          px: [3, 4, 4, 4],
          py: 2,
          fontWeight: 'bold',
          cursor: 'inherit',
          letterSpacing: '0.07em',
          fontFamily: 'heading',
          fontSize: [2, 2, 4, 4],
          ':focus': { outline: 'none' },
          ...sx,
        })}
      >
        {children}
      </ThemedButton>
    </Box>
  )
}

export default Button
