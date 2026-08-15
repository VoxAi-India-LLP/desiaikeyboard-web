import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  Mail, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Lock, 
  Trash2, 
  ExternalLink,
  Smartphone
} from 'lucide-react';
import { AppConfig } from '../types';
import { RippleButton, RippleLink } from './RippleButton';
import logoImg from '../../assets/Web_logo.png';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, config }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 text-[#172033] shadow-2xl border border-slate-200"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 overflow-hidden items-center justify-center rounded-2xl bg-slate-900 shadow-md mb-3 border border-slate-200">
              <img
                src={logoImg}
                alt="Desi AI Keyboard"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-xl font-bold text-[#172033]">Download Desi AI Keyboard</h3>
            <p className="text-xs text-slate-500 mt-1">Available free for Android 8.0 Oreo and newer</p>
          </div>

          {/* Direct Play Store Link */}
          <div className="mt-6 space-y-2.5">
            <RippleLink
              href={config.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              rippleColor="rgba(255, 255, 255, 0.4)"
              className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#FF9933] to-[#138808] p-3 text-xs font-bold text-white shadow-md transition-shadow"
            >
              <Download className="h-4 w-4" />
              <span>Open in Google Play Store</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </RippleLink>

            <RippleButton
              onClick={onClose}
              rippleColor="rgba(0, 0, 0, 0.08)"
              className="w-full rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Close
            </RippleButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, config }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Language Feedback');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 text-[#172033] shadow-2xl border border-slate-200"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            <X className="h-4 w-4" />
          </button>

          {isSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-[#172033]">Thank You!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Your feedback has been received. Our team will review your message and reply to {email || 'your email'} shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#FF9933]">
                  <Mail className="h-4 w-4" />
                  <span>Contact & Feedback</span>
                </div>
                <h3 className="text-xl font-bold text-[#172033] mt-1">Get in Touch with Our Team</h3>
                <p className="text-xs text-slate-500">
                  Suggest a new Indian script, report an autocorrect anomaly, or ask questions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full rounded-xl border border-slate-300 p-2.5 outline-hidden focus:border-[#000080]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-slate-300 p-2.5 outline-hidden focus:border-[#000080]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Topic</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 outline-hidden focus:border-[#000080] bg-white cursor-pointer"
                  >
                    <option value="Language Feedback">Language / Script Feedback</option>
                    <option value="Bug Report">Android Bug Report</option>
                    <option value="Feature Request">Feature or Theme Request</option>
                    <option value="Privacy Query">Privacy & Data Deletion</option>
                    <option value="General">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you'd like to improve or request..."
                    className="w-full rounded-xl border border-slate-300 p-2.5 outline-hidden focus:border-[#000080] resize-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    Direct Email: <code className="text-slate-600 font-bold">{config.contactEmail}</code>
                  </span>
                  <RippleButton
                    type="submit"
                    rippleColor="rgba(255, 255, 255, 0.4)"
                    className="inline-flex items-center space-x-1.5 rounded-xl bg-[#000080] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-950 transition-colors"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Message</span>
                  </RippleButton>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

interface LegalModalProps {
  isOpen: boolean;
  docType: 'privacy' | 'terms' | 'permissions' | 'data-deletion' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, docType, onClose }) => {
  if (!isOpen || !docType) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Transparent overview of keyboard permissions and data handling',
      icon: Lock,
      body: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <p><strong>1. Our Privacy Commitment:</strong> Desi AI Keyboard is built with user privacy as a foundational principle. Keystrokes, passwords, and private messages are processed on-device for typing predictions whenever possible.</p>
          <p><strong>2. Online Services:</strong> Features such as GIF lookup, online translation engines, and cloud sticker downloads require network access to fetch results from secured servers.</p>
          <p><strong>3. Voice Data:</strong> When voice typing is activated by pressing the microphone icon, audio is temporarily processed to return transcribed text.</p>
          <p><strong>4. Data Retention:</strong> We do not sell personal typing histories to third parties. Users can clear their learned dictionary words at any time in keyboard settings.</p>
        </div>
      ),
    },
    terms: {
      title: 'Terms of Service',
      subtitle: 'Standard software terms for using Desi AI Keyboard',
      icon: FileText,
      body: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <p><strong>1. License:</strong> Desi AI Keyboard grants you a personal, non-exclusive, non-transferable license to use the application on compatible Android devices.</p>
          <p><strong>2. Acceptable Use:</strong> You agree not to reverse engineer or modify the application for malicious purposes.</p>
          <p><strong>3. Updates:</strong> Feature improvements, language script packs, and security patches may be delivered via Google Play store updates.</p>
        </div>
      ),
    },
    permissions: {
      title: 'Permission Guide',
      subtitle: 'Why Android may ask for permissions and how they are used',
      icon: ShieldCheck,
      body: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <p><strong>• Microphone:</strong> Needed solely when tapping the voice typing button to convert regional speech into text.</p>
          <p><strong>• Storage / Media:</strong> Needed only when you pick a personal photo as your custom theme or save custom-cut stickers to your gallery.</p>
          <p><strong>• Internet:</strong> Required for GIF search, dynamic cloud translation, and downloading additional language packs.</p>
        </div>
      ),
    },
    'data-deletion': {
      title: 'Data Deletion Request',
      subtitle: 'How to clear your learned dictionary and account data',
      icon: Trash2,
      body: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-600">
          <p><strong>• Clear Local Dictionary:</strong> Open Keyboard Settings ➔ Advanced ➔ "Clear Learned Words & Dictionary" to wipe on-device suggestions instantly.</p>
          <p><strong>• Server Data Purge:</strong> If you used cloud backup or synced themes, email support@desiaikeyboard.com with the subject "Data Deletion Request" and your registered device ID for prompt deletion.</p>
        </div>
      ),
    },
  };

  const activeDoc = contentMap[docType] || contentMap.privacy;
  const DocIcon = activeDoc.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 text-[#172033] shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center space-x-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#000080]">
              <DocIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#172033]">{activeDoc.title}</h3>
              <p className="text-[11px] text-slate-500">{activeDoc.subtitle}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 py-2 border-y border-slate-100">
            {activeDoc.body}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="rounded-xl bg-[#000080] px-5 py-2 text-xs font-bold text-white hover:bg-navy-900"
            >
              Understood & Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
