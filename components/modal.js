import { Box } from 'theme-ui'

const Modal = ({ open, onClose, children }) => {
  if (!open) return null

  return (
    <Box
      onClick={onClose}
      sx={{
        position: 'fixed',
        inset: 0,
        bg: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          height: '85dvh',
          width: ['77vw', '80vw', '80vw', '80vw'],
          maxWidth: '500px',
          bg: 'background',
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '24px',
          py: [4],
          px: [3, 4, 4, 4],
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Modal
