import { LayoutDashboard, FileText, CheckCircle, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ setActiveTab, activeTab }) {
  const menu = [
    { id: 'overview', icon: <LayoutDashboard size={20}/>, label: 'Overview' },
    { id: 'verify', icon: <FileText size={20}/>, label: 'Verify Documents' },
    { id: 'approved', icon: <CheckCircle size={20}/>, label: 'Approved' },
  ];

  return (
    <div style={{ width: '260px', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '40px', fontSize: '1.2rem', fontWeight: '800' }}>GOVSTREAM AI</h2>
      
      <nav style={{ flex: 1 }}>
        {menu.map(item => (
          <div 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', 
              borderRadius: '8px', cursor: 'pointer', transition: '0.3s',
              background: activeTab === item.id ? 'rgba(56,189,248,0.1)' : 'transparent',
              color: activeTab === item.id ? '#38bdf8' : '#94a3b8',
              marginBottom: '8px'
            }}
          >
            {item.icon} {item.label}
          </div>
        ))}
      </nav>
      
      <div style={{ color: '#ef4444', padding: '12px', cursor: 'pointer', display: 'flex', gap: '10px' }}>
        <LogOut size={20}/> Logout
      </div>
    </div>
  );
}