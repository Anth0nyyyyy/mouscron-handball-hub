import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SocialMediaLinks = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-hc-orange">
          Suivez-nous
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Restez connectés avec nous sur les réseaux sociaux pour ne rien manquer
          de l'actualité du club !
        </p>
        <div className="flex flex-wrap gap-4">
          {/* BOUTON FACEBOOK */}
          <Button variant="outline" size="lg" asChild>
            <a
                href="https://www.facebook.com/HCMouscron"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
            >
              <img
                  src="/lovable-uploads/b2e8bfa2-ec84-4d63-8d58-503664da7229.png"
                  alt="Facebook"
                  className="h-5 w-5"
              />
              Facebook
            </a>
          </Button>

          {/* BOUTON INSTAGRAM */}
          <Button variant="outline" size="lg" asChild>
            <a
                href="https://www.instagram.com/hcmouscron/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
            >
              <img
                  src="/lovable-uploads/e132c7e8-e206-404e-b6fb-60edb8e0d181.png"
                  alt="Instagram"
                  className="h-5 w-5"
              />
              Instagram
            </a>
          </Button>

          {/* BOUTON TIKTOK */}
          <Button variant="outline" size="lg" asChild>
            <a
                href="https://www.tiktok.com/@hc.mouscron"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
            >
              <svg className="h-5 w-5 text-black fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.14 1.02 1.11 2.45 1.8 3.94 2.01v4.06c-1.74-.01-3.41-.65-4.73-1.68-.31-.24-.59-.51-.85-.8-.06 2.8-.03 5.6-.04 8.41-.05 1.94-.57 3.86-1.55 5.48-1.57 2.6-4.52 4.13-7.53 3.9-2.82-.12-5.46-1.75-6.72-4.27-1.55-2.91-1.25-6.81 1.05-9.39 1.65-1.92 4.1-2.96 6.6-2.84v4.18c-1.46-.14-2.98.37-3.87 1.48-.99 1.15-1.12 2.9-.38 4.18.73 1.34 2.37 2.1 3.9 1.87 1.4-.12 2.63-1.16 2.94-2.52.12-.51.11-1.04.11-1.56V0h2.91z"/>
              </svg>
              TikTok
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
);

export default SocialMediaLinks;