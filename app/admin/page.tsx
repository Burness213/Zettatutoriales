import { SignIn } from "@clerk/nextjs";

export const metadata = { title: "Admin Login" };

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07070A] p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
      
      <div className="z-10 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-montserrat font-bold text-white mb-2">Zetta Admin</h1>
          <p className="text-sm text-slate-400">Inicia sesión con tu cuenta segura</p>
        </div>
        <SignIn forceRedirectUrl="/admin/dashboard" signUpUrl="/admin" />
      </div>
    </div>
  );
}
