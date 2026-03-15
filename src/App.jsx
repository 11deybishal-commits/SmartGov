import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Upload, Loader2, CheckCircle2, XCircle, 
  LayoutDashboard, Zap, Database, LogOut, User, 
  Globe, Activity, Lock, Search, Bell, Menu
} from 'lucide-react';

// --- ANIMATED BACKGROUND COMPONENT ---
const AnimatedBackground = () => (
  <div style={{
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    zIndex: -1, background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #1e293b 100%)',
    overflow: 'hidden'
  }}>
    <motion.div 
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity }}
      style={{
        position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%',
        borderRadius: '50%', background: 'radial-gradient(circle, #38bdf844 0%, transparent 70%)',
      }}
    />
  </div>
);

export default function App() {
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('verify');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);

  const handleScan = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsScanning(true);
    setResults(null);

    setTimeout(() => {
      setIsScanning(false);
      const isFraud = file.name.toLowerCase().includes('fake');
      if (isFraud) {
        setResults({ status: "Rejected", reason: "AI-Generated Artifacts Detected", idNumber: "DENIED" });
      } else {
        const uniqueID = `GS-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;
        const newRecord = { idNumber: uniqueID, timestamp: new Date().toISOString(), status: "Verified" };
        setResults(newRecord);
        setHistory(prev => [newRecord, ...prev]);
      }
    }, 3500);
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#1e293b' }}>
      <AnimatedBackground />

      {/* --- TOP NAVIGATION BAR --- */}
      <nav style={{
        height: '70px', background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(15px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', borderBottom: '1px solid rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#0f172a', padding: '8px', borderRadius: '10px' }}>
            <ShieldCheck color="#38bdf8" size={24} />
          </div>
          <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-0.5px' }}>GovStream</span>
        </div>
        
        <div style={{ display: 'flex', gap: '30px', fontWeight: '500', color: '#64748b' }}>
          {['Solutions', 'Network', 'Governance', 'Audit'].map(item => (
            <span key={item} style={{ cursor: 'pointer' }} className="hover:text-black transition-colors">{item}</span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Search size={20} color="#94a3b8" />
          <Bell size={20} color="#94a3b8" />
          <button style={{
            background: '#0f172a', color: 'white', padding: '10px 24px', borderRadius: '12px',
            fontSize: '0.9rem', fontWeight: 'bold', border: 'none', cursor: 'pointer'
          }}>Login / Sign Up</button>
        </div>
      </nav>

      <div style={{ display: 'flex', height: 'calc(100vh - 70px)' }}>
        {/* --- SIDEBAR --- */}
        <aside style={{
          width: '280px', background: 'rgba(255, 255, 255, 0.4)', 
          padding: '40px 20px', display: 'flex', flexDirection: 'column', gap: '10px'
        }}>
          <SidebarItem icon={<LayoutDashboard size={20}/>} label="Executive Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <SidebarItem icon={<Zap size={20}/>} label="Neural Scan" active={activeTab === 'verify'} onClick={() => setActiveTab('verify')} />
          <SidebarItem icon={<Database size={20}/>} label="Vault Records" active={activeTab === 'records'} onClick={() => setActiveTab('records')} />
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main style={{ flex: 1, padding: '40px', display: 'flex', gap: '30px' }}>
          
          {/* LEFT SIDE: SCANNER & RESULTS */}
          <div style={{ flex: 1.2, background: 'white', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', padding: '40px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Identity Anchor</h2>
              <p style={{ color: '#64748b' }}>Securely verify institutional credentials.</p>
            </div>

            <AnimatePresence mode="wait">
              {!results && !isScanning && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
                  height: '350px', border: '2px dashed #e2e8f0', borderRadius: '24px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: '0.3s'
                }} whileHover={{ background: '#f8fafc', borderColor: '#38bdf8' }}>
                  <input type="file" onChange={handleScan} style={{ opacity: 0, position: 'absolute', height: '350px', width: '100%', cursor: 'pointer' }} />
                  <Upload size={48} color="#38bdf8" style={{ marginBottom: '15px' }} />
                  <p style={{ fontWeight: 'bold' }}>Drop File or Browse</p>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Supports JPG, PNG, PDF (Max 5MB)</p>
                </motion.div>
              )}

              {isScanning && (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <Loader2 className="animate-spin" size={48} color="#38bdf8" style={{ margin: '0 auto 20px' }} />
                  <h3>Analyzing Neural Patterns...</h3>
                  <div style={{ width: '200px', height: '4px', background: '#f1f5f9', borderRadius: '10px', margin: '20px auto', overflow: 'hidden' }}>
                    <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: '100%', height: '100%', background: '#38bdf8' }} />
                  </div>
                </div>
              )}

              {results && (
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                     {results.status === 'Verified' ? <CheckCircle2 color="#22c55e" size={32} /> : <XCircle color="#ef4444" size={32} />}
                     <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{results.status === 'Verified' ? 'Verification Success' : 'Security Warning'}</h3>
                   </div>
                   
                   <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {results.status === 'Verified' ? 'Assigned Digital Identity' : 'Reason for Rejection'}
                      </p>
                      <p style={{ fontSize: '1.8rem', fontWeight: '800', color: results.status === 'Verified' ? '#38bdf8' : '#ef4444', fontFamily: 'monospace' }}>
                        {results.status === 'Verified' ? results.idNumber : results.reason}
                      </p>
                   </div>
                   
                   <button onClick={() => setResults(null)} style={{ marginTop: '30px', background: 'transparent', border: '1px solid #e2e8f0', padding: '12px 25px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Scan Another Document</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: ENGAGING ANIMATION (Global Network Pulse) */}
          <div style={{ flex: 1, background: '#0f172a', borderRadius: '32px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Activity color="#38bdf8" size={18} />
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#38bdf8' }}>LIVE NETWORK PULSE</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Global Node Activity</h3>
            </div>

            {/* Pulsing Globe Animation */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px' }}>
               <motion.div 
                animate={{ scale: [1, 1.1, 1], rotate: 360 }}
                transition={{ scale: { duration: 4, repeat: Infinity }, rotate: { duration: 20, repeat: Infinity, ease: "linear" }}}
                style={{ width: '180px', height: '180px', border: '2px solid rgba(56, 189, 248, 0.3)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
               >
                 <Globe size={80} color="#38bdf8" />
               </motion.div>
               {/* Animated Pulse Rings */}
               <motion.div animate={{ scale: [1, 2], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', width: '180px', height: '180px', border: '1px solid #38bdf8', borderRadius: '50%' }} />
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '20px', zIndex: 2 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                 <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Nodes Synced</span>
                 <span style={{ fontWeight: 'bold' }}>1,402</span>
               </div>
               <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                 <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} style={{ height: '100%', background: '#38bdf8' }} />
               </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px',
      borderRadius: '16px', cursor: 'pointer', transition: '0.2s',
      background: active ? '#0f172a' : 'transparent',
      color: active ? 'white' : '#64748b',
    }}>
      {icon}
      <span style={{ fontWeight: active ? 'bold' : '500' }}>{label}</span>
    </div>
  );
}