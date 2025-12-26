import { useState, useRef } from 'react'
import { Calendar, X } from 'lucide-react'
import * as Popover from '@radix-ui/react-popover'
import { DayPicker } from 'react-day-picker'
import { Box } from 'theme-ui'
import { Button } from './'

const toLocalYMD = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const fromYMD = (ymd) => {
  if (!ymd) return undefined
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(y, m - 1, d) // local midnight
}

const DatePicker = ({ value, setValue, disabled, defaultMonth }) => {
  const [open, setOpen] = useState(false)

  const selectedDate = fromYMD(value)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          onClick={() => setOpen((prev) => !prev)}
          color='yellow'
          bg='blue'
          shadow='red'
          sx={{
            cursor: 'pointer',
            position: 'relative',
            pr: ['46px', '46px', '46px', '46px'],
          }}
        >
          {value != ''
            ? `${value.split('-')[1]}/${value.split('-')[2]}`
            : 'Anytime'}
          <Box sx={{ position: 'absolute', right: '17px', top: '10px' }}>
            <Calendar size={18} strokeWidth={2.5} />
          </Box>
        </Button>
      </Popover.Trigger>
      <Popover.Content
        side='bottom'
        sideOffset={5}
        align='start'
        alignOffset={0}
      >
        <Box
          sx={{
            bg: 'background',
            borderRadius: '4px',
            p: 3,
            boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
            zIndex: 1000,
            fontFamily: 'heading',
          }}
        >
          <DayPicker
            navLayout='around'
            mode='single'
            disabled={disabled}
            selected={selectedDate}
            defaultMonth={defaultMonth}
            onSelect={(day) => {
              if (!day) return
              setValue(toLocalYMD(day))
              setOpen(false)
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              onClick={() => {
                setValue('')
                setOpen(false)
              }}
              sx={{
                '&:hover': {
                  color: 'primary', // optional hover
                },
                maxWidth: 'fit-content',
                cursor: 'pointer',
                mt: [2],
              }}
            >
              <Box as='span' sx={{ mr: '6px', ml: ['5px'] }}>
                Anytime
              </Box>
            </Box>
          </Box>
        </Box>
      </Popover.Content>
    </Popover.Root>
  )
}

export default DatePicker
