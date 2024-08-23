import { AppBar, Toolbar, Typography, IconButton, Switch } from '@mui/material'

interface IProps{
  isDarkMode: boolean
  handleThemeToggle: ()=>void
}

export const Header = ( {isDarkMode, handleThemeToggle}:IProps) => {
  return (
    <AppBar position='sticky'>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Task Management Dashboard
      </Typography>
      <IconButton edge="end" color="inherit" aria-label="dark-mode-toggle" onClick={handleThemeToggle}>
        <Switch checked={isDarkMode} />
      </IconButton>
    </Toolbar>
  </AppBar>
  )
}
