import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Dashboard({ activeTab }) {
  const [file, setFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    
    setFile(uploadedFile);
    setScanning(true);
    setResult(null);

    // Simulate AI Processing Logic
    setTimeout(() => {
      setScanning(false);
      setResult({
        status: 'Valid',
        confidence: '98.2%',
        extracted: { Name: "Bishal Deb", Document: "Aadhar/PAN", Expiry: "N/A" }
      });
    }, 3500);
  };

  if (activeTab !== 'verify') return <div style={{color: '#94a3b8'}}>Select "Verify Documents" to begin.</div>;

  return (
    <div style={{ maxWidth: '900px' }}>
      <h1 style={{ marginBottom: '10px' }}>Document Verification Portal</h1>
      <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Upload a digital copy of the form to trigger AI cross-referencing.</p>

      <div style={{ 
        background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(56,189,248,0.3)', 
        borderRadius: '20px', padding: '60px', textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        {scanning && (
          <motion.div 
            initial={{ top: 0 }} animate={{ top: '100%' }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: 'absolute', left: 0, width: '100%', height: '2px', background: '#38bdf8', boxShadow: '0 0 15px #38bdf8', zIndex: 10 }}
          />
        )}

        {!file ? (
          <>
            <Upload size={48} color="#38bdf8" style={{ marginBottom: '20px' }} />
            <h3>Drag & Drop Government ID</h3>
            <input type="file" onChange={handleUpload} style={{ marginTop: '20px' }} />
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {scanning ? (
              <>
                <Loader2 className="animate-spin" size={40} color="#38bdf8" />
                <p style={{ marginTop: '15px' }}>AI is analyzing document security features...</p>
              </>
            ) : (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <CheckCircle2 size={60} color="#22c55e" />
                <h2 style={{ margin: '15px 0' }}>Verification Complete</h2>
                
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', textAlign: 'left', minWidth: '300px' }}>
                  <p><strong>Status:</strong> <span style={{color: '#22c55e'}}>{result.status}</span></p>
                  <p><strong>Accuracy:</strong> {result.confidence}</p>
                  <hr style={{ border: '0.1px solid rgba(255,255,255,0.1)', margin: '10px 0' }} />
                  <p><strong>Name:</strong> {result.extracted.Name}</p>
                  <p><strong>Doc Type:</strong> {result.extracted.Document}</p>
                </div>
                
                <button onClick={() => setFile(null)} style={{ marginTop: '20px', background: 'transparent', border: '1px solid #38bdf8', color: '#38bdf8', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer' }}>
                  Scan Another
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}