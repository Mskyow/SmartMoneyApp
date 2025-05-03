import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../theme/appTheme';
import ColorModeSelect from '../theme/colorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../customIcons';
import { JSX } from 'react';
import { logoText } from './styles/style';
import Background from './SignUpFormBack';
import { Logo } from '../../logo/logo';
import VerticalFooter from '../../footer/footer';
import SpaceBackground from '../../watchlist/SpaceBackground';
import SignUpCard from './signUpCard';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
      'hsla(225, 42.20%, 32.50%, 0.05) 0px 5px 15px 0px, hsl(0, 0.00%, 0.00%) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
      width: '450px',
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '450px',
  padding: 4,
  gap: 4,
  margin: 'auto',
  fill: `radial-gradient(328.77% 129.59% at 10.74% 15.23%, 
  rgba(0, 0, 0, 0.77) 0%,
  rgba(0, 0, 0, 0.77) 77.05%, 
  rgba(255, 255, 255, 0.77) 100%)`,
  strokeWidth: '1px',
  stroke: '#FFF',
  boxShadow: `0px 4px 4px 0px rgba(255, 255, 255, 0.15) inset, 0px 0px 68px 0px rgba(255, 255, 255, 0.05) inset`,
  backdropFilter: 'blur(24px)',
}));
interface ISignUpSideProps {
  disableCustomTheme?: boolean;
  setEmail: (value: string) => void ;
  setUserName: (value: string) => void  ;
  setPassword: (value: string) => void ;}
export default function SignUp(props: ISignUpSideProps) : JSX.Element{
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (nameError || emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: 'center',
            height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
            marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
            minHeight: '100%',
          },
          (theme) => ({
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              zIndex: -1,
              inset: 0,
              backgroundImage:
                'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
              backgroundRepeat: 'no-repeat',
              ...theme.applyStyles('dark', {
                backgroundImage:
                  'radial-gradient(at 50% 50%, hsl(284, 83.70%, 9.60%), hsl(220, 80%, 0%))',
              }),
            },
          }),
        ]}
      >
      <SpaceBackground/>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          width: '100%', 
        }}>
          <Logo />
        </Box>        
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
          }}
        >
         
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: 'auto',
            }}
          >
            {/* <Content /> */}
            <SignUpCard setEmail={props.setEmail} setPassword={props.setPassword} />
          </Stack>
        </Stack>
      </Stack>
      <VerticalFooter/>
    </AppTheme>
  );
}
