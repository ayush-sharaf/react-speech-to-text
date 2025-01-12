import dynamic from 'next/dynamic';

const SpeechRecorder = dynamic(
  () => import('@/components/speech-to-text/speech-recorder'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Speech to Text</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transform your voice into text instantly. Just click the microphone button and start speaking.
            Perfect for note-taking, transcription, and more.
          </p>
        </div>
        
        <div className="flex flex-col justify-center items-center space-y-4">
          <SpeechRecorder />
          <div>
            <p className="text-2xl font-bold">
              Developed by{" "}
              <a
                href="https://ayushsharaf.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Ayush Kumar Sharaf
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
