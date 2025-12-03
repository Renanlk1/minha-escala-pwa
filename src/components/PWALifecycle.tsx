import { useState, useEffect } from 'react';
import { Download, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWALifecycle = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Capture the install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      
      // Check if user dismissed before
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      if (!dismissed) {
        setShowInstallBanner(true);
      }
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setShowInstallBanner(false);
      localStorage.setItem('pwa-installed', 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg);
        
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setShowUpdateBanner(true);
              }
            });
          }
        });
      });

      // Listen for controller change (update applied)
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    setInstallPrompt(null);
  };

  const handleDismissInstall = () => {
    setShowInstallBanner(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  const handleUpdate = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  // Install Banner
  if (showInstallBanner && installPrompt) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe animate-slide-up">
        <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <img src="/logo.png" alt="Minha Escala" className="w-8 h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">Instalar Minha Escala</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Adicione à tela inicial para acesso rápido e offline
              </p>
            </div>
            <button
              onClick={handleDismissInstall}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleDismissInstall}
            >
              Agora não
            </Button>
            <Button
              size="sm"
              className="flex-1 gap-2"
              onClick={handleInstall}
            >
              <Download className="w-4 h-4" />
              Instalar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Update Banner
  if (showUpdateBanner) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe animate-slide-up">
        <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">Nova versão disponível</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Atualize para obter as últimas melhorias
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setShowUpdateBanner(false)}
            >
              Depois
            </Button>
            <Button
              size="sm"
              className="flex-1 gap-2"
              onClick={handleUpdate}
            >
              <RefreshCw className="w-4 h-4" />
              Atualizar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
