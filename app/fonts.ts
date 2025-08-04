import { Lexend_Deca, DM_Sans } from 'next/font/google';

export const lexendDeca = Lexend_Deca({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend-deca',
});

export const dmSans = DM_Sans({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});
