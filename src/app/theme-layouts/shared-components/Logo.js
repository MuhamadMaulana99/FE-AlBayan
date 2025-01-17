import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className="flex items-center">
      {/* <img className="logo-icon w-32 h-32" src="logoBmt.jpg" /> */}

      <div
        className="badge flex items-center py-4 px-8 mx-8 rounded"
        style={{  color: '#61DAFB' }}
      >
        <img
          className="react-badge"
          src='/logoBmt.jpg'
          alt="react"
          width="16"
        />
        <span className="react-text text-12 mx-4">Al Bayan</span>
      </div>
    </Root>
  );
}

export default Logo;
