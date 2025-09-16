/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRAPI_API_URL: string;
  readonly VITE_STRAPI_API_TOKEN: string;
  readonly VITE_STRAPI_ADMIN_JWT_SECRET: string;
  
  readonly VITE_PADDLE_VENDOR_ID: string;
  readonly VITE_PADDLE_API_KEY: string;
  readonly VITE_PADDLE_PUBLIC_KEY: string;
  
  readonly VITE_BREVO_API_KEY: string;
  readonly VITE_SENDER_EMAIL: string;
  readonly VITE_SENDER_NAME: string;
  
  readonly VITE_WISE_API_TOKEN: string;
  readonly VITE_WISE_PROFILE_ID: string;
  
  readonly VITE_PAYEER_MERCHANT_ID: string;
  readonly VITE_PAYEER_SECRET_KEY: string;
  
  readonly VITE_GITHUB_CLIENT_ID: string;
  readonly VITE_GITHUB_CLIENT_SECRET: string;
  
  readonly VITE_JWT_SECRET: string;
  readonly VITE_REFRESH_TOKEN_SECRET: string;
  
  readonly VITE_ABLY_API_KEY: string;
  
  readonly VITE_CRYPTO_API_KEY: string;
  readonly VITE_BLOCKCHAIN_WEBHOOK_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}