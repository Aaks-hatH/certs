import React, { useState, useRef, useEffect } from 'react';
import { Download, Shield, Award, CheckCircle, XCircle, Clock, BookOpen, Users, TrendingUp, Key, Lock, Zap } from 'lucide-react';

export default function CyberSecurityCertApp() {
  const [view, setView] = useState('home');
  const [name, setName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [certData, setCertData] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [hashInput, setHashInput] = useState('');
  const [hashResult, setHashResult] = useState('');
  const canvasRef = useRef(null);

  const allQuestions = [
    {
      q: "What type of attack involves an attacker intercepting communication between two parties?",
      options: ["Phishing", "Man-in-the-Middle", "SQL Injection", "Cross-site Scripting"],
      correct: 1
    },
    {
      q: "Which of the following is NOT a symmetric encryption algorithm?",
      options: ["AES", "DES", "RSA", "Blowfish"],
      correct: 2
    },
    {
      q: "What does the principle of 'least privilege' mean?",
      options: ["Everyone gets admin access", "Users only get the minimum access needed", "Passwords should be complex", "All data should be encrypted"],
      correct: 1
    },
    {
      q: "Which port does SSH typically use?",
      options: ["21", "22", "23", "25"],
      correct: 1
    },
    {
      q: "What is the main purpose of a DMZ (Demilitarized Zone) in network security?",
      options: ["Store backup data", "Isolate public-facing services from internal network", "Increase network speed", "Host employee workstations"],
      correct: 1
    },
    {
      q: "Which type of malware encrypts files and demands payment?",
      options: ["Trojan", "Worm", "Ransomware", "Spyware"],
      correct: 2
    },
    {
      q: "What does hashing provide that encryption does not?",
      options: ["Reversibility", "One-way transformation", "Key exchange", "Authentication"],
      correct: 1
    },
    {
      q: "Which protocol provides secure email transmission?",
      options: ["SMTP", "POP3", "S/MIME", "IMAP"],
      correct: 2
    },
    {
      q: "What is the purpose of a certificate authority (CA)?",
      options: ["Issue digital certificates", "Scan for viruses", "Block malicious traffic", "Encrypt hard drives"],
      correct: 0
    },
    {
      q: "Which authentication factor is 'something you are'?",
      options: ["Password", "Smart card", "Fingerprint", "Security question"],
      correct: 2
    },
    {
      q: "What does a WAF (Web Application Firewall) protect against?",
      options: ["Physical theft", "Email spam", "Web-based attacks", "USB threats"],
      correct: 2
    },
    {
      q: "Which of the following is an example of social engineering?",
      options: ["Buffer overflow", "Pretexting", "Port scanning", "Packet sniffing"],
      correct: 1
    },
    {
      q: "What is the main difference between IDS and IPS?",
      options: ["IDS detects, IPS prevents", "IDS is hardware, IPS is software", "IDS is faster", "There is no difference"],
      correct: 0
    },
    {
      q: "Which wireless security protocol is considered most secure?",
      options: ["WEP", "WPA", "WPA2", "WPA3"],
      correct: 3
    },
    {
      q: "What does MAC stand for in MAC filtering?",
      options: ["Maximum Access Control", "Media Access Control", "Mandatory Access Control", "Machine Authentication Code"],
      correct: 1
    },
    {
      q: "Which attack involves overwhelming a system with traffic?",
      options: ["SQL Injection", "XSS", "DDoS", "Phishing"],
      correct: 2
    },
    {
      q: "What is the purpose of SIEM?",
      options: ["Encrypt emails", "Security Information and Event Management", "Secure file transfers", "Block malware"],
      correct: 1
    },
    {
      q: "Which of these is NOT a risk assessment methodology?",
      options: ["Qualitative", "Quantitative", "Differential", "Hybrid"],
      correct: 2
    },
    {
      q: "What does VPN tunneling provide?",
      options: ["Faster internet", "Encrypted communication over public networks", "Free WiFi", "Better graphics"],
      correct: 1
    },
    {
      q: "Which backup type only backs up data changed since the last full backup?",
      options: ["Full", "Incremental", "Differential", "Snapshot"],
      correct: 2
    },
    {
      q: "What is the purpose of network segmentation?",
      options: ["Increase speed", "Limit the spread of threats", "Reduce costs", "Improve graphics"],
      correct: 1
    },
    {
      q: "Which access control model uses labels and clearance levels?",
      options: ["DAC", "MAC", "RBAC", "ABAC"],
      correct: 1
    },
    {
      q: "What does NAC (Network Access Control) do?",
      options: ["Encrypts data", "Controls device access to network", "Scans emails", "Backs up files"],
      correct: 1
    },
    {
      q: "Which is an example of multifactor authentication?",
      options: ["Password only", "Two passwords", "Password + fingerprint", "Username + password"],
      correct: 2
    },
    {
      q: "What is the primary purpose of penetration testing?",
      options: ["Install software", "Identify vulnerabilities", "Train employees", "Backup data"],
      correct: 1
    },
    {
      q: "Which protocol is used for secure file transfer?",
      options: ["FTP", "HTTP", "SFTP", "SMTP"],
      correct: 2
    },
    {
      q: "What does RADIUS provide?",
      options: ["Firewall protection", "Authentication, Authorization, and Accounting", "Virus scanning", "Email filtering"],
      correct: 1
    },
    {
      q: "Which type of attack targets vulnerabilities in web applications?",
      options: ["Physical attack", "SQL Injection", "Cold boot attack", "Evil twin"],
      correct: 1
    },
    {
      q: "What is the main purpose of data loss prevention (DLP)?",
      options: ["Speed up networks", "Prevent unauthorized data exfiltration", "Install updates", "Encrypt emails"],
      correct: 1
    },
    {
      q: "Which of these describes defense in depth?",
      options: ["One strong firewall", "Multiple layers of security controls", "Only using antivirus", "Physical security only"],
      correct: 1
    }
  ];

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const shuffled = [...allQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setQuestions(shuffled.slice(0, 15));
  }, []);

  const generateCertId = (name, score) => {
    const str = `${name}-${score}-${Date.now()}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `CSC-${Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')}`;
  };

  const drawCertificate = (certId, personName, finalScore, percentage, grade) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 850;

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a365d');
    gradient.addColorStop(1, '#2d3748');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 12;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
    
    ctx.strokeStyle = '#c9a434';
    ctx.lineWidth = 4;
    ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);

    ctx.fillStyle = '#d4af37';
    [[60, 60], [canvas.width - 60, 60], [60, canvas.height - 60], [canvas.width - 60, canvas.height - 60]].forEach(([x, y]) => {
      ctx.fillRect(x - 15, y - 15, 30, 30);
    });

    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 90);
    ctx.lineTo(canvas.width / 2 - 40, 110);
    ctx.lineTo(canvas.width / 2 - 40, 150);
    ctx.lineTo(canvas.width / 2, 180);
    ctx.lineTo(canvas.width / 2 + 40, 150);
    ctx.lineTo(canvas.width / 2 + 40, 110);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF ACHIEVEMENT', canvas.width / 2, 240);

    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 36px serif';
    ctx.fillText('Cybersecurity Competency Assessment', canvas.width / 2, 290);

    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, 320);
    ctx.lineTo(canvas.width - 200, 320);
    ctx.stroke();

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '28px serif';
    ctx.fillText('This is to certify that', canvas.width / 2, 370);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 56px serif';
    ctx.fillText(personName, canvas.width / 2, 440);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '24px serif';
    ctx.fillText('has successfully completed the Cybersecurity Fundamentals', canvas.width / 2, 500);
    ctx.fillText('examination and demonstrated proficiency in', canvas.width / 2, 535);
    ctx.fillText('information security principles and practices', canvas.width / 2, 570);

    ctx.fillStyle = '#2d3748';
    ctx.fillRect(canvas.width / 2 - 180, 600, 360, 100);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(canvas.width / 2 - 180, 600, 360, 100);

    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('EXAMINATION RESULTS', canvas.width / 2, 630);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(`${finalScore}/${questions.length} (${percentage}%) - Grade: ${grade}`, canvas.width / 2, 670);

    ctx.textAlign = 'left';
    ctx.font = '20px serif';
    ctx.fillStyle = '#e2e8f0';
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillText(`Issue Date: ${date}`, 100, 760);
    ctx.fillText(`Certificate ID: ${certId}`, 100, 790);

    ctx.textAlign = 'center';
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width - 400, 760);
    ctx.lineTo(canvas.width - 100, 760);
    ctx.stroke();
    
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'italic 20px serif';
    ctx.fillText('Director of Certification', canvas.width - 250, 785);
    ctx.font = '18px serif';
    ctx.fillText('Cybersecurity Standards Board', canvas.width - 250, 810);
  };

  const startTest = () => {
    if (!name.trim()) {
      alert('Please enter your full name');
      return;
    }
    
    const shuffled = [...allQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setQuestions(shuffled.slice(0, 15));
    
    setView('test');
    setCurrentQuestion(0);
    setAnswers([]);
    setTimeLeft(600);
  };

  const selectAnswer = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (answers[currentQuestion] === undefined) {
      alert('Please select an answer');
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitTest();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitTest = async () => {
    let finalScore = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correct) {
        finalScore++;
      }
    });

    setScore(finalScore);
    const certId = generateCertId(name, finalScore);
    const timestamp = Date.now();
    const percentage = Math.round((finalScore / questions.length) * 100);
    
    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else if (percentage >= 50) grade = 'D';

    const data = {
      id: certId,
      name: name,
      score: finalScore,
      totalQuestions: questions.length,
      percentage: percentage,
      grade: grade,
      timestamp: timestamp,
      date: new Date(timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    setCertData(data);

    try {
      await window.storage.set(`cert:${certId}`, JSON.stringify(data));
    } catch (err) {
      console.error('Storage error:', err);
    }

    setView('result');
  };

  const downloadCert = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `cybersecurity_certificate_${certData.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const verifyCert = async () => {
    const certId = document.getElementById('certIdInput').value.trim();
    
    if (!certId) {
      alert('Please enter a certificate ID');
      return;
    }

    try {
      const result = await window.storage.get(`cert:${certId}`);
      
      if (result && result.value) {
        const data = JSON.parse(result.value);
        setVerifyResult({ status: 'valid', data: data });
      } else {
        setVerifyResult({ status: 'invalid', message: 'Certificate not found. This may be fraudulent or expired.' });
      }
    } catch (err) {
      setVerifyResult({ status: 'invalid', message: 'Certificate not found. This may be fraudulent or expired.' });
    }
  };

  const checkPasswordStrength = (pwd) => {
    setPasswordInput(pwd);
    let strength = 0;
    let feedback = [];

    if (pwd.length >= 8) strength++;
    else feedback.push('at least 8 characters');
    
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    else feedback.push('uppercase and lowercase letters');
    
    if (/[0-9]/.test(pwd)) strength++;
    else feedback.push('numbers');
    
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    else feedback.push('special characters');

    if (pwd.length >= 12) strength++;

    let result = '';
    if (strength === 0) result = '';
    else if (strength <= 2) result = 'Weak';
    else if (strength === 3) result = 'Medium';
    else if (strength === 4) result = 'Strong';
    else result = 'Very Strong';

    setPasswordStrength(result + (feedback.length > 0 && pwd.length > 0 ? ' - Add: ' + feedback.join(', ') : ''));
  };

  const generateHash = async (text) => {
    if (!text) {
      setHashResult('');
      return;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    setHashResult(hashHex);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let timer;
    if (view === 'test' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            submitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [view, timeLeft]);

  useEffect(() => {
    if (certData) {
      drawCertificate(certData.id, certData.name, certData.score, certData.percentage, certData.grade);
    }
  }, [certData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
              <Shield className="w-7 h-7 text-blue-600" />
              <span className="text-xl font-semibold text-gray-800">CyberCert Academy</span>
            </div>
            <div className="flex gap-8">
              <button onClick={() => setView('home')} className="text-gray-600 hover:text-blue-600 transition-colors">Home</button>
              <button onClick={() => setView('tools')} className="text-gray-600 hover:text-blue-600 transition-colors">Tools</button>
              <button onClick={() => setView('start')} className="text-gray-600 hover:text-blue-600 transition-colors">Get Certified</button>
              <button onClick={() => setView('verify')} className="text-gray-600 hover:text-blue-600 transition-colors">Verify</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {view === 'home' && (
          <div className="space-y-12 py-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-16 text-center shadow-lg">
              <h1 className="text-5xl font-bold mb-5 tracking-tight">Prove Your Cybersecurity Knowledge</h1>
              <p className="text-xl mb-10 text-blue-50">Get certified with our Security+ level assessment and showcase your skills</p>
              <button onClick={() => setView('start')} className="bg-white text-blue-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all shadow-md">
                Start Certification Exam
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <Award className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Professional Certification</h3>
                <p className="text-gray-600 leading-relaxed">Earn a verifiable certificate recognized by employers and peers in the cybersecurity community.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <BookOpen className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Security+ Level</h3>
                <p className="text-gray-600 leading-relaxed">Questions based on CompTIA Security+ standards covering fundamental security concepts.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <Shield className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Instant Verification</h3>
                <p className="text-gray-600 leading-relaxed">All certificates are securely stored and can be authenticated instantly by anyone.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Platform Statistics</h2>
              <div className="grid md:grid-cols-3 gap-12 text-center">
                <div>
                  <Users className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <div className="text-4xl font-bold text-blue-600 mb-1">2,847+</div>
                  <div className="text-gray-600">Certified Professionals</div>
                </div>
                <div>
                  <TrendingUp className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <div className="text-4xl font-bold text-green-600 mb-1">94%</div>
                  <div className="text-gray-600">Pass Rate</div>
                </div>
                <div>
                  <Award className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                  <div className="text-4xl font-bold text-purple-600 mb-1">15</div>
                  <div className="text-gray-600">Questions Per Exam</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'tools' && (
          <div className="space-y-8 py-8">
            <h1 className="text-4xl font-bold text-gray-800">Security Tools</h1>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-5">
                <Key className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Password Strength Checker</h2>
              </div>
              <p className="text-gray-600 mb-5">Test the strength of your passwords and get recommendations</p>
              <input
                type="text"
                value={passwordInput}
                onChange={(e) => checkPasswordStrength(e.target.value)}
                placeholder="Enter password to test..."
                className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {passwordStrength && (
                <div className={`p-4 rounded-lg ${
                  passwordStrength.includes('Weak') ? 'bg-red-50 border border-red-200 text-red-800' :
                  passwordStrength.includes('Medium') ? 'bg-yellow-50 border border-yellow-200 text-yellow-800' :
                  'bg-green-50 border border-green-200 text-green-800'
                }`}>
                  <span className="font-semibold">Strength:</span> {passwordStrength}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-5">
                <Lock className="w-8 h-8 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">SHA-256 Hash Generator</h2>
              </div>
              <p className="text-gray-600 mb-5">Generate cryptographic hashes for any text input</p>
              <input
                type="text"
                value={hashInput}
                onChange={(e) => {
                  setHashInput(e.target.value);
                  generateHash(e.target.value);
                }}
                placeholder="Enter text to hash..."
                className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {hashResult && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2 font-medium">SHA-256 Hash:</p>
                  <p className="font-mono text-sm break-all text-gray-800">{hashResult}</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-5">
                <Zap className="w-8 h-8 text-yellow-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Quick Security Tips</h2>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">-</span>
                  <span>Use unique passwords for each account - consider a password manager</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">-</span>
                  <span>Enable two-factor authentication (2FA) wherever possible</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">-</span>
                  <span>Keep your software and operating system updated</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">-</span>
                  <span>Be cautious of phishing emails - verify sender before clicking links</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">-</span>
                  <span>Use a VPN when connecting to public WiFi networks</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">-</span>
                  <span>Regularly backup important data to multiple locations</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {view === 'start' && (
          <div className="py-8">
            <div className="bg-white border border-gray-200 rounded-xl p-10 shadow-sm max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Certification Exam</h2>
              
              <div className="space-y-6 mb-10">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Exam Details:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Total Questions: 15 (randomized from a pool of 30)</li>
                    <li>Time Limit: 10 minutes</li>
                    <li>Passing Score: 60% or higher</li>
                    <li>Question Type: Multiple choice</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Before You Begin:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Ensure you have a stable internet connection</li>
                    <li>Find a quiet environment free from distractions</li>
                    <li>You cannot pause once the exam starts</li>
                    <li>Your certificate will be generated immediately upon completion</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Full Name (as it will appear on certificate):</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={startTest}
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                >
                  Start Exam
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'test' && questions.length > 0 && (
          <div className="space-y-6 py-8 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-700">Time Remaining:</span>
                  <span className={`text-xl font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-blue-600'}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <div className="text-gray-600">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-10 shadow-sm">
              <h3 className="text-2xl font-semibold mb-8 text-gray-800 leading-relaxed">
                {questions[currentQuestion].q}
              </h3>

              <div className="space-y-3 mb-10">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all ${
                      answers[currentQuestion] === index
                        ? 'border-blue-500 bg-blue-50 font-medium'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-semibold text-blue-600 mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                    currentQuestion === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={nextQuestion}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {currentQuestion === questions.length - 1 ? 'Submit Exam' : 'Next Question'}
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex gap-2 flex-wrap justify-center">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-10 h-10 flex items-center justify-center rounded font-medium transition-colors ${
                      answers[index] !== undefined
                        ? 'bg-green-500 text-white'
                        : index === currentQuestion
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'result' && certData && (
          <div className="space-y-8 py-8 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl p-12 shadow-sm text-center">
              <div className="flex justify-center mb-6">
                {certData.percentage >= 60 ? (
                  <CheckCircle className="w-20 h-20 text-green-600" />
                ) : (
                  <XCircle className="w-20 h-20 text-red-600" />
                )}
              </div>

              <h2 className="text-4xl font-bold mb-5 text-gray-800">
                {certData.percentage >= 60 ? 'Congratulations!' : 'Exam Complete'}
              </h2>

              <p className="text-xl text-gray-600 mb-10">
                {certData.percentage >= 60
                  ? 'You have successfully passed the certification exam!'
                  : 'Unfortunately, you did not meet the passing threshold this time.'}
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{certData.score}/{certData.totalQuestions}</div>
                  <div className="text-gray-600">Questions Correct</div>
                </div>
                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                  <div className="text-4xl font-bold text-green-600 mb-2">{certData.percentage}%</div>
                  <div className="text-gray-600">Final Score</div>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                  <div className="text-4xl font-bold text-purple-600 mb-2">{certData.grade}</div>
                  <div className="text-gray-600">Letter Grade</div>
                </div>
              </div>

              {certData.percentage >= 60 && (
                <button
                  onClick={downloadCert}
                  className="bg-blue-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Download Certificate
                </button>
              )}

              {certData.percentage < 60 && (
                <button
                  onClick={() => setView('start')}
                  className="bg-blue-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                >
                  Retake Exam
                </button>
              )}
            </div>

            {certData.percentage >= 60 && (
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">Your Certificate</h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-5">
                  <canvas ref={canvasRef} className="w-full h-auto" />
                </div>
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">Certificate ID:</span> {certData.id}
                  </p>
                  <p className="text-sm text-gray-600">
                    Share this ID with employers or others who need to verify your certification.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">Review Your Answers</h3>
              <div className="space-y-6">
                {questions.map((question, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === question.correct;
                  return (
                    <div key={index} className={`p-6 rounded-lg border-2 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <div className="flex items-start gap-3 mb-3">
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 mb-2">Question {index + 1}: {question.q}</p>
                          <p className="text-sm text-gray-700 mb-1">
                            <span className="font-medium">Your answer:</span> {question.options[userAnswer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Correct answer:</span> {question.options[question.correct]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {view === 'verify' && (
          <div className="space-y-8 py-8 max-w-3xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl p-10 shadow-sm">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Verify Certificate</h2>
              
              <p className="text-gray-600 mb-8">
                Enter a certificate ID to verify its authenticity and view the holder's credentials.
              </p>

              <div className="flex gap-4 mb-8">
                <input
                  type="text"
                  id="certIdInput"
                  placeholder="Enter Certificate ID (e.g., CSC-A1B2C3D4)"
                  className="flex-1 bg-white border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={verifyCert}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Verify
                </button>
              </div>

              {verifyResult && (
                <div className={`p-8 rounded-xl border-2 ${
                  verifyResult.status === 'valid'
                    ? 'bg-green-50 border-green-300'
                    : 'bg-red-50 border-red-300'
                }`}>
                  {verifyResult.status === 'valid' ? (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <h3 className="text-2xl font-semibold text-green-900">Valid Certificate</h3>
                      </div>
                      <div className="space-y-3 text-gray-800">
                        <p><span className="font-semibold">Name:</span> {verifyResult.data.name}</p>
                        <p><span className="font-semibold">Certificate ID:</span> {verifyResult.data.id}</p>
                        <p><span className="font-semibold">Score:</span> {verifyResult.data.score}/{verifyResult.data.totalQuestions} ({verifyResult.data.percentage}%)</p>
                        <p><span className="font-semibold">Grade:</span> {verifyResult.data.grade}</p>
                        <p><span className="font-semibold">Issue Date:</span> {verifyResult.data.date}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <XCircle className="w-8 h-8 text-red-600" />
                        <h3 className="text-2xl font-semibold text-red-900">Invalid Certificate</h3>
                      </div>
                      <p className="text-gray-800">{verifyResult.message}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">About Certificate Verification</h3>
              <p className="text-gray-700 leading-relaxed">
                All certificates issued by CyberCert Academy are stored securely and can be verified instantly. 
                Each certificate has a unique ID that can be used to confirm its authenticity. If a certificate 
                cannot be found, it may be fraudulent or expired.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
