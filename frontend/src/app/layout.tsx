import { AuthProvider } from '@/contexts/AuthContext';
import '../styles/globals.css'; 

export const metadata = {
  title: 'Agenda de Contatos',
  description: 'Gerencie seus contatos de forma simples e eficiente.',
  icons: {
    icon: '/favicon.png'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
