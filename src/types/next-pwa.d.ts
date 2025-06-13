declare module 'next-pwa' {
  import { NextConfig } from 'next';
  import { Configuration } from 'next-pwa';

  function withPWA(config: Configuration): (nextConfig: NextConfig) => NextConfig;

  export default withPWA;
}
