import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import AppTheme from '../theme/appTheme';
import ColorModeSelect from '../theme/colorModeSelect';
import SignInCard from './signInCard';
import Content from './content';
import VerticalFooter from '../../footer/footer';
import { WalletMultiButton } from '@solana/wallet-adapter-material-ui';
interface ISignInSideProps {
  disableCustomTheme?: boolean;
  setEmail: any;
  setPassword: any;}
export default function SignInSide(props: ISignInSideProps ) {
 
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <WalletMultiButton />

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
            <Content />
            <SignInCard setEmail={props.setEmail} setPassword={props.setPassword} />
          </Stack>
        </Stack>
      </Stack>
      <VerticalFooter/>
    </AppTheme>
  );
}
