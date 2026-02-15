import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, InsertContactMessage } from "@shared/schema";
import { useContact } from "@/hooks/use-content";
import { TechCard } from "@/components/TechCard";
import { Mail, MessageSquare, Send } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const { mutate: sendMessage, isPending } = useContact();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: InsertContactMessage) {
    sendMessage(data, {
      onSuccess: () => form.reset(),
    });
  }

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-6">Initialize Communication</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Have a project in mind or just want to chat tech? My inbox is always open for interesting collaborations.
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 border border-border/50">
              <Mail className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold">Email</h3>
                <p className="text-muted-foreground text-sm">hello@example.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 border border-border/50">
              <MessageSquare className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold">Socials</h3>
                <p className="text-muted-foreground text-sm">@alexdev on Twitter/X</p>
              </div>
            </div>
          </div>
        </div>

        <TechCard title="CONTACT_FORM.tsx" className="bg-background">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs uppercase tracking-wider">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} className="font-mono bg-muted/20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs uppercase tracking-wider">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jane@company.com" {...field} className="font-mono bg-muted/20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs uppercase tracking-wider">Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Inquiry" {...field} className="font-mono bg-muted/20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs uppercase tracking-wider">Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell me about your project..." 
                        className="min-h-[150px] font-mono bg-muted/20 resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-bold" 
                disabled={isPending}
              >
                {isPending ? (
                  "Transmitting..."
                ) : (
                  <>Send Message <Send className="ml-2 w-4 h-4" /></>
                )}
              </Button>
            </form>
          </Form>
        </TechCard>
      </div>
    </div>
  );
}
