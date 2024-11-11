import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Waves, 
  Zap, 
  Shield, 
  Activity,
  Globe,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { TimeDisplay } from './components/TimeDisplay';

function App() {
  const [currentYear, setCurrentYear] = useState(1970);
  const [targetYear, setTargetYear] = useState(2024);
  const [spaceFreq, setSpaceFreq] = useState(432.0);
  const [stability, setStability] = useState(98);
  const [power, setPower] = useState(85);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpaceFreq(prev => prev + (Math.random() - 0.5) * 0.1);
      setStability(prev => Math.min(100, Math.max(95, prev + (Math.random() - 0.5))));
      setPower(prev => Math.min(100, Math.max(80, prev + (Math.random() - 0.5))));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCalibrate = () => {
    setIsCalibrating(true);
    setTimeout(() => setIsCalibrating(false), 2000);
  };

  const handleTimeJump = () => {
    if (isJumping) return;
    setIsJumping(true);
    
    // Animate the time jump
    const startYear = currentYear;
    const endYear = targetYear;
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    
    const animateJump = () => {
      const now = Date.now();
      const progress = Math.min(1, (now - startTime) / duration);
      
      if (progress < 1) {
        const currentProgress = easeInOutCubic(progress);
        const newYear = Math.round(
          startYear + (endYear - startYear) * currentProgress
        );
        setCurrentYear(newYear);
        requestAnimationFrame(animateJump);
      } else {
        setCurrentYear(endYear);
        setIsJumping(false);
      }
    };
    
    requestAnimationFrame(animateJump);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 p-4 border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="w-8 h-8 text-blue-400" />
            Chronos Navigation System
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity className="text-green-400" />
              <span>System Active</span>
            </div>
            <button 
              onClick={handleCalibrate}
              disabled={isJumping}
              className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calibrate Systems
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Time Display */}
          <TimeDisplay currentYear={currentYear} targetYear={targetYear} />

          {/* Time Targeting */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="text-blue-400" />
              Temporal Targeting
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Target Year</label>
                <input 
                  type="number"
                  value={targetYear}
                  onChange={(e) => setTargetYear(Number(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Space Frequency</label>
                  <div className="text-2xl font-mono text-blue-400">{spaceFreq.toFixed(2)} Hz</div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Timeline Stability</label>
                  <div className="text-2xl font-mono text-green-400">{stability}%</div>
                </div>
              </div>
              <button
                onClick={handleTimeJump}
                disabled={isJumping || isCalibrating || currentYear === targetYear}
                className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isJumping ? 'Jumping...' : 'Initiate Time Jump'}
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="text-blue-400" />
              System Status
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <StatusIndicator 
                icon={<Waves className="text-blue-400" />}
                label="Sync Waves"
                value={stability}
              />
              <StatusIndicator 
                icon={<Zap className="text-yellow-400" />}
                label="Zero-Point Power"
                value={power}
              />
              <StatusIndicator 
                icon={<Compass className="text-green-400" />}
                label="Anti-Grav Drive"
                value={93}
              />
              <StatusIndicator 
                icon={<Globe className="text-purple-400" />}
                label="Space-Time Lock"
                value={97}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Visualization */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Space-Time Visualization</h2>
          <div className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`relative w-64 h-64 ${isCalibrating ? 'animate-spin' : ''} ${isJumping ? 'animate-pulse' : ''}`}>
                <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full" />
                <div className="absolute inset-2 border-4 border-blue-500/40 rounded-full" />
                <div className="absolute inset-4 border-4 border-blue-500/50 rounded-full" />
                <div className="absolute inset-6 border-4 border-blue-500/60 rounded-full" />
                <div className="absolute inset-8 border-4 border-blue-500/70 rounded-full" />
                <div className="absolute inset-10 border-4 border-blue-500/80 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Warning Banner */}
      {(isCalibrating || isJumping) && (
        <div className="fixed bottom-0 inset-x-0 bg-yellow-600 p-4">
          <div className="container mx-auto flex items-center gap-2">
            <AlertTriangle className="text-black" />
            <span className="font-semibold text-black">
              {isCalibrating ? 'System Calibration in Progress...' : 'Time Jump in Progress...'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusIndicator({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="mt-1 text-right text-sm text-gray-400">{value}%</div>
    </div>
  );
}

// Easing function for smooth animation
function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export default App;