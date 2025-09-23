import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogOut, BookOpen, Users, Calendar, FileText } from 'lucide-react';

const EspaceCoachs = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    checkUser();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) {
        toast({
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Connexion réussie !",
          description: "Bienvenue dans l'espace coachs",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Déconnexion",
      description: "À bientôt !",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hc-green mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  // Page de connexion
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <img 
              src="/lovable-uploads/7f5485a2-eaa0-4a73-8e50-8de5813ec2f3.png" 
              alt="HC Mouscron" 
              className="h-20 w-20 mx-auto mb-4 rounded-full"
            />
            <CardTitle className="text-2xl text-hc-green">Espace Coachs</CardTitle>
            <p className="text-muted-foreground">Connectez-vous pour accéder aux ressources</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder="coach@hcmouscron.com"
                  disabled={loginLoading}
                />
              </div>
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    disabled={loginLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loginLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-hc-green hover:bg-hc-green-light"
                disabled={loginLoading}
              >
                {loginLoading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Espace coachs connecté
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/7f5485a2-eaa0-4a73-8e50-8de5813ec2f3.png" 
                alt="HC Mouscron" 
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h1 className="text-xl font-bold text-hc-green">Espace Coachs</h1>
                <p className="text-sm text-muted-foreground">HC Mouscron</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue dans l'espace coachs ! 👋
          </h2>
          <p className="text-lg text-muted-foreground">
            Accédez à toutes les ressources pédagogiques du club
          </p>
        </div>

        {/* Grille des ressources */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Catalogue d'exercices */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-hc-green/10 rounded-lg group-hover:bg-hc-green/20 transition-colors">
                  <BookOpen className="h-6 w-6 text-hc-green" />
                </div>
                <div>
                  <CardTitle className="text-lg">Catalogue d'exercices</CardTitle>
                  <p className="text-sm text-muted-foreground">Exercices techniques et tactiques</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Accédez à notre bibliothèque complète d'exercices de handball pour tous les niveaux.
              </p>
              <Button 
                className="w-full bg-hc-green hover:bg-hc-green-light"
                onClick={() => window.open('https://hcmouscron-catalogue.netlify.app/', '_blank')}
              >
                Ouvrir le catalogue
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Section informations */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-hc-green/5 to-hc-orange/5 border-hc-green/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-hc-green mb-2">
                📋 Informations importantes
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Cet espace est réservé aux coachs du HC Mouscron</p>
                <p>• Le catalogue d'exercices est accessible en permanence</p>
                <p>• De nouvelles ressources seront ajoutées régulièrement</p>
                <p>• Pour toute question : <a href="mailto:handballmouscron@gmail.com" className="text-hc-green hover:underline">handballmouscron@gmail.com</a></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EspaceCoachs;