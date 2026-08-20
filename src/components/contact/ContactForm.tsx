import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Envoi automatique de l'e-mail en direct sur secretariat.handballmouscron@gmail.com
      const SERVICE_ID = "service_98qdq9a";
      const TEMPLATE_ID = "template_gsj2r52";
      const PUBLIC_KEY = "3OR_HbG-VLDs6r3oV";

      await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
          PUBLIC_KEY
      );

      // Notification de succès verte
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });

      // Remise à zéro du formulaire
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error: any) {
      console.error("Erreur d'envoi EmailJS :", error);
      toast({
        title: "Erreur lors de l'envoi",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-2xl text-hc-green">
            Envoyez-nous un message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Votre nom et prénom"
                  disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="votre.email@exemple.com"
                  disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="subject">Sujet *</Label>
              <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Objet de votre message"
                  disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1"
                  rows={6}
                  placeholder="Votre message..."
                  disabled={loading}
              />
            </div>
            <Button
                type="submit"
                className="w-full bg-hc-green hover:bg-hc-green-light"
                disabled={loading}
            >
              {loading ? "Envoi..." : "Envoyer le message"}
            </Button>
          </form>
        </CardContent>
      </Card>
  );
};

export default ContactForm;