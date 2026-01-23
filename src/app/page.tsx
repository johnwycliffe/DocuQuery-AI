import { Sidebar } from '@/components/Sidebar';
import { ChatArea } from '@/components/ChatArea';

export default function Home() {
  return (
    <main className="flex h-screen w-full bg-slate-950 overflow-hidden">
      <Sidebar />
      <ChatArea />
    </main>
  );
}
