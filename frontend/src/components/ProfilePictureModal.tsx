import React, { useState } from 'react'
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  Avatar,
} from '@mui/material'
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material'

interface ProfilePictureModalProps {
  open: boolean
  onClose: () => void
  onSelectPicture: (pictureUrl: string) => void
}

const randomPictures = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=6',
]

export default function ProfilePictureModal({ open, onClose, onSelectPicture }: ProfilePictureModalProps) {
  const [selectedPicture, setSelectedPicture] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedPicture(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleConfirm = () => {
    if (selectedPicture) {
      onSelectPicture(selectedPicture)
      onClose()
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Choose a Profile Picture
        </Typography>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={handleFileUpload}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
            Upload Picture
          </Button>
        </label>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Or choose from these options:
        </Typography>
        <Grid container spacing={2}>
          {randomPictures.map((pic, index) => (
            <Grid item key={index}>
              <Avatar
                src={pic}
                sx={{
                  width: 60,
                  height: 60,
                  cursor: 'pointer',
                  border: selectedPicture === pic ? '2px solid #1976d2' : 'none',
                }}
                onClick={() => setSelectedPicture(pic)}
              />
            </Grid>
          ))}
        </Grid>
        {selectedPicture && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Avatar
              src={selectedPicture}
              sx={{ width: 100, height: 100, margin: '0 auto' }}
            />
          </Box>
        )}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="contained" disabled={!selectedPicture}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
