import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { projectsData, servicesData, testimonialsData } from "@/data/static-data";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => projectsData,
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: async () => projectsData.find((p) => p.slug === slug) || null,
    enabled: !!slug,
  });
}

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => [],
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: async () => null,
    enabled: !!slug,
  });
}

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => servicesData,
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => testimonialsData,
  });
}

export function useContact() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: { name: string; email: string; subject?: string; message: string }) => {
      const res = await fetch("https://formspree.io/f/xdalgbdn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send message");
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
