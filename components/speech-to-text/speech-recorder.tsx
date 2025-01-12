"use client";

import { useState, useEffect } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mic, MicOff, Copy, Trash2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultType {
  transcript: string;
}

const SpeechRecorder = () => {
  const [editableText, setEditableText] = useState("");
  const [copied, setCopied] = useState(false);
  
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      const transcripts = results.map((result) =>
        typeof result === "string" ? result : result.transcript
      );
      setEditableText(transcripts.join(" "));
    }
  }, [results]);
  

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editableText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleClear = () => {
    setEditableText("");
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error || "Speech recognition is not supported in this browser."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full max-w-3xl p-6 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Button
            size="lg"
            variant={isRecording ? "destructive" : "default"}
            className={cn(
              "relative w-20 h-20 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl",
              isRecording ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90",
              isRecording && "after:absolute after:inset-0 after:rounded-full after:border-4 after:border-red-500 after:animate-ping"
            )}
            onClick={isRecording ? stopSpeechToText : startSpeechToText}
            aria-label={isRecording ? "Stop recording" : "Start recording"}
          >
            {isRecording ? (
              <MicOff className="h-8 w-8 text-white" />
            ) : (
              <Mic className="h-8 w-8 text-white" />
            )}
          </Button>
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          {isRecording ? "Recording..." : "Click to start recording"}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Transcription</h3>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!editableText}
              aria-label="Copy to clipboard"
              className="hover:bg-primary/5"
            >
              <Copy className="h-4 w-4 mr-2" />
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              disabled={!editableText}
              aria-label="Clear text"
              className="hover:bg-destructive/5"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>

        <Textarea
          value={editableText}
          onChange={(e) => setEditableText(e.target.value)}
          placeholder="Your speech will appear here..."
          className="min-h-[200px] resize-none"
          aria-label="Transcribed text"
        />

        {interimResult && (
          <p className="text-sm text-muted-foreground italic">
            Interim: {interimResult}
          </p>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        <h4 className="font-medium mb-2">Tips:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Click the microphone button to start/stop recording</li>
          <li>Speak clearly into your microphone</li>
          <li>You can edit the transcribed text manually</li>
          <li>Use the copy button to copy the text to your clipboard</li>
        </ul>
      </div>
    </Card>
  );
};

export default SpeechRecorder;