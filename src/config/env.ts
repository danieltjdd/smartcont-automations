// Configurações do ambiente
export const env = {
  // Configurações básicas
  appName: 'SmartCont Automations Hub',
  appEnv: import.meta.env.VITE_APP_ENV || 'development',
  
  // URLs da API
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  apiUrlProduction: import.meta.env.VITE_API_URL_PRODUCTION || 'https://api.seu-dominio.com',
  
  // Configurações de autenticação
  auth: {
    clientId: import.meta.env.VITE_AUTH_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_AUTH_CLIENT_SECRET || '',
  },
  
  // Configurações de analytics
  analytics: {
    trackingId: import.meta.env.VITE_GA_TRACKING_ID || '',
  },
  
  // Função para verificar se está em produção
  isProduction: () => env.appEnv === 'production',
  
  // Função para obter a URL da API correta baseada no ambiente
  getApiUrl: () => env.isProduction() ? env.apiUrlProduction : env.apiUrl,
}; 