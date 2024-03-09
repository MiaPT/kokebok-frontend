import { Html, Head, Main, NextScript } from 'next/document';
import Navbar from '@/components/Navbar';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <Navbar/>
      <body className='bg-surface-200'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
