"use client";

import { useState } from "react";
import { generatePersonalBio } from "@/ai/flows/ai-personal-bio-generator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, Loader2, Copy, Check, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AIBioGenerator() {
  const [name, setName] = useState("Parth Boldhane");
  const [role, setRole] = useState("Firebase Expert & CSE Student");
  const [skills, setSkills] = useState("Firebase, Next.js, C++, React");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!skills || !role) {
      toast({
        title: "More Info Needed",
        description: "Please fill in your role and key skills.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const output = await generatePersonalBio({
        name,
        role,
        skills: skills.split(",").map(s => s.trim()),
        experiences: ["CSE student at JIT", "Firebase implementation expert", "Building gaming projects in C++"],
      });
      setResult(output.bio);
    } catch (error) {
      console.error(error);
      toast({
        title: "Generation Failed",
        description: "AI had a brain freeze. Try again?",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ description: "Bio copied!" });
  };

  return (
    <section id="ai-bio" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-6">
            <BrainCircuit className="w-4 h-4 text-accent" />
            <span className="text-xs font-black uppercase tracking-widest text-accent">AI Bio Architect</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">
            CRAFT YOUR <span className="text-primary neon-text-primary">IDENTITY</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Use AI to generate professional, compelling biographies for your social profiles or portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-white/10 bg-black/40 backdrop-blur-xl rounded-none">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-widest">Profile Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-muted-foreground tracking-tighter">Your Role</label>
                  <Input 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    className="bg-white/5 border-white/10 rounded-none focus:ring-accent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black text-muted-foreground tracking-tighter">Top Skills (Comma separated)</label>
                  <Textarea 
                    value={skills} 
                    onChange={(e) => setSkills(e.target.value)}
                    className="bg-white/5 border-white/10 rounded-none focus:ring-accent resize-none"
                    rows={3}
                  />
                </div>
                <Button 
                  onClick={handleGenerate} 
                  disabled={loading}
                  className="w-full bg-accent text-white hover:bg-accent/80 rounded-none font-bold uppercase tracking-tighter"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                  Generate Bio
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="h-full bg-white/5 border border-dashed border-primary/30 p-8 relative min-h-[300px] flex flex-col justify-center">
              {result ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-primary/90">
                    "{result}"
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={copyToClipboard}
                    className="border-primary/50 text-primary hover:bg-primary hover:text-black rounded-none"
                  >
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    Copy Biography
                  </Button>
                </div>
              ) : (
                <div className="text-center opacity-30">
                  <BrainCircuit className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                  <p className="font-bold uppercase tracking-widest text-xs">Awaiting Input Data...</p>
                </div>
              )}
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
