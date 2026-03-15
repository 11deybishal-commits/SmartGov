import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Activity } from 'lucide-react';

export default function Hero() {
  return (
    <div style={{ padding: '100px 20px', textAlign: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ color: 'var(--accent)', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '20px' }}
      >
        GOVERNMENT OF INDIA • DIGITAL INITIATIVE
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '20px' }}
      >
        Smart Form <span style={{ color: 'var(--accent)' }}>Verification</span>
      </motion.h1>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
        <FeatureCard icon={<Cpu />} title="AI Processing" desc="Automated data extraction" />
        <FeatureCard icon={<ShieldCheck />} title="Secure" desc="End-to-end encryption" />
        <FeatureCard icon={<Activity />} title="Real-time" desc="Instant status tracking" />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      style={{ background: 'var(--glass)', border: '1px solid var(--border)', padding: '30px', borderRadius: '20px', width: '200px' }}
    >
      <div style={{ color: 'var(--accent)', marginBottom: '15px' }}>{icon}</div>
      <h4 style={{ marginBottom: '10px' }}>{title}</h4>
      <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{desc}</p>
    </motion.div>
  );
}