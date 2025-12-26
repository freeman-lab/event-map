import * as Select from '@radix-ui/react-select'
import { useState } from 'react'
import { Button } from './'
import { Box } from 'theme-ui'

const MySelect = ({
  color,
  icon = false,
  bg,
  shadow,
  value,
  onChange,
  options,
  children,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Select.Root
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={onChange}
    >
      <Select.Trigger asChild>
        <Button
          color={color}
          bg={bg}
          shadow={shadow}
          sx={{
            position: 'relative',
            pr: icon ? ['46px', '46px', '46px', '46px'] : [3, 4, 4, 4],
          }}
        >
          <Select.Value placeholder='Anywhere' />
          {children}
        </Button>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position='popper'
          sideOffset={4}
          position='popper'
          align='start'
          style={{ zIndex: 9999 }}
          asChild
        >
          <Box
            sx={{
              bg: 'background',
              borderRadius: '4px',
              p: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
              zIndex: 5000,
            }}
          >
            <Select.Viewport>
              {options.map((opt) => (
                <Select.Item key={opt.value} value={opt.value} asChild>
                  <Box
                    sx={{
                      px: 1,
                      py: 1,
                      borderRadius: '999px',
                      cursor: 'pointer',
                      fontSize: 1,
                      fontFamily: 'heading',
                      '&[data-highlighted]': {
                        color: 'primary',
                        outline: 'none',
                      },
                      '&[data-state="checked"]': {
                        color: 'primary',
                      },
                    }}
                  >
                    <Select.ItemText>{opt.label}</Select.ItemText>
                  </Box>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Box>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default MySelect
