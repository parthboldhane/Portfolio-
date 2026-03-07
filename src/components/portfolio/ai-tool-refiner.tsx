
"use client";

import { useState } from "react";
import { generateProjectDescription } from "@/ai/flows/ai-project-description-generator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Loader2, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AIRefiner() {
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleRefine = async () => {
    if (!title || !points) {
      toast({
        title: "Input Required",
        description: "Please provide a project title and some key details.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const output = await generateProjectDescription({
        title,
        keyFeaturesOrDetails: points.split("\n").filter(p => p.trim() !== ""),
        tone: "professional",
      });
      setResult(output.generatedDescription);
    } catch (error) {
      console.error(error);
      toast({
        title: "Refinement Failed",
        description: "Something went wrong while generating the description.",
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
    toast({
      description: "Description copied to clipboard!",
    });
  };

  return (
    <section id="ai-refiner" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-accent animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-bold">AI Project Refiner</h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Elevate your project descriptions using our AI-powered content refinement tool.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>Input Details</CardTitle>
              <CardDescription>Enter project information to refine</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Title</label>
                <Input
                  placeholder="e.g., BoldFolio Website"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Key Points (One per line)</label>
                <Textarea
                  placeholder="e.g., Built with Next.js&#10;Integrated Firebase&#10;AI-powered features"
                  rows={5}
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                />
              </div>
              <Button
                className="w-full gap-2 py-6 text-lg"
                onClick={handleRefine}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="w-5 h-5" />}
                Refine Description
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl min-h-[350px] relative bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-white">Refined Output</CardTitle>
              <CardDescription className="text-primary-foreground/70">Your compelling description will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-4">
                  <p className="leading-relaxed text-lg">
                    {result}
                  </p>
                  <Button
                    variant="outline"
                    className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
                    onClick={copyToClipboard}
                  >
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    Copy Result
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 opacity-40">
                  <Sparkles className="w-12 h-12 mb-4" />
                  <p>Ready to refine your content...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
