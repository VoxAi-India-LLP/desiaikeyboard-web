import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  BrainCircuit, 
  Zap, 
  Languages, 
  RotateCcw, 
  Copy, 
  Check, 
  Volume2, 
  TrendingUp, 
  Cpu, 
  Plus, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Info,
  Sliders,
  Keyboard,
  ShieldCheck,
  MousePointer,
  BookmarkPlus
} from 'lucide-react';
import { AshokaChakra } from './AshokaChakra';
import { SUPPORTED_LANGUAGES } from '../data/content';

interface PredictionNode {
  word: string;
  confidence: number;
  grammarTag: string;
  englishGloss: string;
  nextPossibilities: PredictionNode[];
}

interface LanguageContextPreset {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  contexts: {
    domainId: string;
    domainTitle: string;
    starterPrompts: {
      title: string;
      initialTokens: string[];
      targetSentence: string;
      englishTranslation: string;
      tokenTree: Record<string, PredictionNode[]>;
    }[];
  }[];
}

const LANGUAGE_AUTOCOMPLETE_DATA: LanguageContextPreset[] = [
  {
    id: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    contexts: [
      {
        domainId: 'casual',
        domainTitle: 'Chai & Daily Meetup (दैनिक बातचीत)',
        starterPrompts: [
          {
            title: 'Chai invitation with friends',
            initialTokens: ['आज'],
            targetSentence: 'आज शाम को नुक्कड़ पर चाय पीने चलते हैं।',
            englishTranslation: 'Let us go to the street corner for tea this evening.',
            tokenTree: {
              'आज': [
                { word: 'शाम', confidence: 96, grammarTag: 'Noun (Time)', englishGloss: 'evening', nextPossibilities: [] },
                { word: 'सुबह', confidence: 78, grammarTag: 'Noun (Time)', englishGloss: 'morning', nextPossibilities: [] },
                { word: 'रात', confidence: 64, grammarTag: 'Noun (Time)', englishGloss: 'night', nextPossibilities: [] }
              ],
              'आज शाम': [
                { word: 'को', confidence: 98, grammarTag: 'Postposition', englishGloss: 'at / in', nextPossibilities: [] },
                { word: 'मिलते', confidence: 82, grammarTag: 'Verb', englishGloss: 'meet', nextPossibilities: [] },
                { word: '५ बजे', confidence: 70, grammarTag: 'Time', englishGloss: 'at 5pm', nextPossibilities: [] }
              ],
              'आज शाम को': [
                { word: 'नुक्कड़', confidence: 92, grammarTag: 'Noun (Place)', englishGloss: 'street corner', nextPossibilities: [] },
                { word: 'सब', confidence: 85, grammarTag: 'Pronoun', englishGloss: 'everyone', nextPossibilities: [] },
                { word: 'घर', confidence: 73, grammarTag: 'Noun (Place)', englishGloss: 'home', nextPossibilities: [] }
              ],
              'आज शाम को नुक्कड़': [
                { word: 'पर', confidence: 99, grammarTag: 'Postposition', englishGloss: 'at', nextPossibilities: [] },
                { word: 'वाली', confidence: 81, grammarTag: 'Adjective', englishGloss: 'the one at', nextPossibilities: [] }
              ],
              'आज शाम को नुक्कड़ पर': [
                { word: 'चाय', confidence: 95, grammarTag: 'Noun', englishGloss: 'tea', nextPossibilities: [] },
                { word: 'समोसा', confidence: 84, grammarTag: 'Noun', englishGloss: 'samosa', nextPossibilities: [] },
                { word: 'मिलते', confidence: 76, grammarTag: 'Verb', englishGloss: 'meet', nextPossibilities: [] }
              ],
              'आज शाम को नुक्कड़ पर चाय': [
                { word: 'पीने', confidence: 97, grammarTag: 'Infinitive Verb', englishGloss: 'to drink', nextPossibilities: [] },
                { word: 'पार्टी', confidence: 80, grammarTag: 'Noun', englishGloss: 'party', nextPossibilities: [] }
              ],
              'आज शाम को नुक्कड़ पर चाय पीने': [
                { word: 'चलते', confidence: 98, grammarTag: 'Verb', englishGloss: 'let us go', nextPossibilities: [] },
                { word: 'आओ', confidence: 82, grammarTag: 'Imperative', englishGloss: 'come', nextPossibilities: [] }
              ],
              'आज शाम को नुक्कड़ पर चाय पीने चलते': [
                { word: 'हैं।', confidence: 99, grammarTag: 'Auxiliary Verb', englishGloss: 'are (sentence end)', nextPossibilities: [] }
              ]
            }
          },
          {
            title: 'Asking about someone’s wellbeing',
            initialTokens: ['आप'],
            targetSentence: 'आप सब कैसे हैं, घर पर सब ठीक है?',
            englishTranslation: 'How are you all, is everything well at home?',
            tokenTree: {
              'आप': [
                { word: 'सब', confidence: 95, grammarTag: 'Pronoun', englishGloss: 'all', nextPossibilities: [] },
                { word: 'कैसे', confidence: 91, grammarTag: 'Question Word', englishGloss: 'how', nextPossibilities: [] },
                { word: 'कहाँ', confidence: 74, grammarTag: 'Question Word', englishGloss: 'where', nextPossibilities: [] }
              ],
              'आप सब': [
                { word: 'कैसे', confidence: 98, grammarTag: 'Question Word', englishGloss: 'how', nextPossibilities: [] },
                { word: 'लोग', confidence: 86, grammarTag: 'Noun', englishGloss: 'people', nextPossibilities: [] }
              ],
              'आप सब कैसे': [
                { word: 'हैं,', confidence: 99, grammarTag: 'Auxiliary Verb', englishGloss: 'are,', nextPossibilities: [] }
              ],
              'आप सब कैसे हैं,': [
                { word: 'घर', confidence: 94, grammarTag: 'Noun', englishGloss: 'home', nextPossibilities: [] },
                { word: 'परिवार', confidence: 88, grammarTag: 'Noun', englishGloss: 'family', nextPossibilities: [] }
              ],
              'आप सब कैसे हैं, घर': [
                { word: 'पर', confidence: 99, grammarTag: 'Postposition', englishGloss: 'at', nextPossibilities: [] }
              ],
              'आप सब कैसे हैं, घर पर': [
                { word: 'सब', confidence: 96, grammarTag: 'Pronoun', englishGloss: 'everything/everyone', nextPossibilities: [] }
              ],
              'आप सब कैसे हैं, घर पर सब': [
                { word: 'ठीक', confidence: 97, grammarTag: 'Adjective', englishGloss: 'fine/well', nextPossibilities: [] }
              ],
              'आप सब कैसे हैं, घर पर सब ठीक': [
                { word: 'है?', confidence: 99, grammarTag: 'Question Mark', englishGloss: 'is it?', nextPossibilities: [] }
              ]
            }
          }
        ]
      },
      {
        domainId: 'festival',
        domainTitle: 'Festivals & Celebrations (त्योहार व शुभकामनाएं)',
        starterPrompts: [
          {
            title: 'Diwali & New Year wishes',
            initialTokens: ['दीपावली'],
            targetSentence: 'दीपावली के पावन पर्व पर हार्दिक शुभकामनाएं!',
            englishTranslation: 'Heartiest greetings on the auspicious festival of Diwali!',
            tokenTree: {
              'दीपावली': [
                { word: 'के', confidence: 97, grammarTag: 'Postposition', englishGloss: 'of', nextPossibilities: [] },
                { word: 'की', confidence: 91, grammarTag: 'Postposition', englishGloss: 'of (fem)', nextPossibilities: [] }
              ],
              'दीपावली के': [
                { word: 'पावन', confidence: 96, grammarTag: 'Adjective', englishGloss: 'auspicious/sacred', nextPossibilities: [] },
                { word: 'शुभ', confidence: 92, grammarTag: 'Adjective', englishGloss: 'auspicious', nextPossibilities: [] },
                { word: 'अवसर', confidence: 84, grammarTag: 'Noun', englishGloss: 'occasion', nextPossibilities: [] }
              ],
              'दीपावली के पावन': [
                { word: 'पर्व', confidence: 98, grammarTag: 'Noun', englishGloss: 'festival', nextPossibilities: [] },
                { word: 'त्योहार', confidence: 89, grammarTag: 'Noun', englishGloss: 'celebration', nextPossibilities: [] }
              ],
              'दीपावली के पावन पर्व': [
                { word: 'पर', confidence: 99, grammarTag: 'Postposition', englishGloss: 'on', nextPossibilities: [] }
              ],
              'दीपावली के पावन पर्व पर': [
                { word: 'हार्दिक', confidence: 98, grammarTag: 'Adjective', englishGloss: 'heartiest', nextPossibilities: [] },
                { word: 'ढेर', confidence: 85, grammarTag: 'Adverb', englishGloss: 'lots of', nextPossibilities: [] }
              ],
              'दीपावली के पावन पर्व पर हार्दिक': [
                { word: 'शुभकामनाएं!', confidence: 99, grammarTag: 'Noun', englishGloss: 'greetings & wishes!', nextPossibilities: [] },
                { word: 'बधाई!', confidence: 88, grammarTag: 'Noun', englishGloss: 'congratulations!', nextPossibilities: [] }
              ]
            }
          }
        ]
      },
      {
        domainId: 'work',
        domainTitle: 'Work & Professional (कार्यालयीन व व्यापार)',
        starterPrompts: [
          {
            title: 'Meeting schedule reminder',
            initialTokens: ['कल'],
            targetSentence: 'कल सुबह 10 बजे मीटिंग शुरू होगी।',
            englishTranslation: 'The meeting will start tomorrow at 10 AM morning.',
            tokenTree: {
              'कल': [
                { word: 'सुबह', confidence: 96, grammarTag: 'Noun (Time)', englishGloss: 'morning', nextPossibilities: [] },
                { word: 'दोपहर', confidence: 81, grammarTag: 'Noun (Time)', englishGloss: 'afternoon', nextPossibilities: [] }
              ],
              'कल सुबह': [
                { word: '10 बजे', confidence: 95, grammarTag: 'Time', englishGloss: 'at 10 AM', nextPossibilities: [] },
                { word: 'टीम', confidence: 84, grammarTag: 'Noun', englishGloss: 'team', nextPossibilities: [] }
              ],
              'कल सुबह 10 बजे': [
                { word: 'मीटिंग', confidence: 97, grammarTag: 'Noun', englishGloss: 'meeting', nextPossibilities: [] },
                { word: 'कॉल', confidence: 88, grammarTag: 'Noun', englishGloss: 'call', nextPossibilities: [] }
              ],
              'कल सुबह 10 बजे मीटिंग': [
                { word: 'शुरू', confidence: 98, grammarTag: 'Noun', englishGloss: 'start', nextPossibilities: [] },
                { word: 'निर्धारित', confidence: 89, grammarTag: 'Adjective', englishGloss: 'scheduled', nextPossibilities: [] }
              ],
              'कल सुबह 10 बजे मीटिंग शुरू': [
                { word: 'होगी।', confidence: 99, grammarTag: 'Verb (Future)', englishGloss: 'will happen.', nextPossibilities: [] }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    contexts: [
      {
        domainId: 'casual',
        domainTitle: 'Daily & Friendly (தினசரி உரையாடல்)',
        starterPrompts: [
          {
            title: 'Tea & Breakfast invitation',
            initialTokens: ['காலை'],
            targetSentence: 'காலை வணக்கம், டீ குடிக்க போகலாமா?',
            englishTranslation: 'Good morning, shall we go have some tea?',
            tokenTree: {
              'காலை': [
                { word: 'வணக்கம்,', confidence: 98, grammarTag: 'Greeting', englishGloss: 'good morning,', nextPossibilities: [] },
                { word: 'உணவு', confidence: 82, grammarTag: 'Noun', englishGloss: 'food', nextPossibilities: [] }
              ],
              'காலை வணக்கம்,': [
                { word: 'டீ', confidence: 95, grammarTag: 'Noun', englishGloss: 'tea', nextPossibilities: [] },
                { word: 'காபி', confidence: 91, grammarTag: 'Noun', englishGloss: 'coffee', nextPossibilities: [] },
                { word: 'எப்படி', confidence: 84, grammarTag: 'Question Word', englishGloss: 'how', nextPossibilities: [] }
              ],
              'காலை வணக்கம், டீ': [
                { word: 'குடிக்க', confidence: 97, grammarTag: 'Infinitive Verb', englishGloss: 'to drink', nextPossibilities: [] }
              ],
              'காலை வணக்கம், டீ குடிக்க': [
                { word: 'போகலாமா?', confidence: 99, grammarTag: 'Question Verb', englishGloss: 'shall we go?', nextPossibilities: [] }
              ]
            }
          }
        ]
      },
      {
        domainId: 'festival',
        domainTitle: 'Pongal & Festivities (பொங்கல் திருநாள்)',
        starterPrompts: [
          {
            title: 'Happy Pongal Greetings',
            initialTokens: ['இனிய'],
            targetSentence: 'இனிய பொங்கல் திருநாள் நல்வாழ்த்துகள்!',
            englishTranslation: 'Hearty Happy Pongal festival greetings!',
            tokenTree: {
              'இனிய': [
                { word: 'பொங்கல்', confidence: 99, grammarTag: 'Noun (Festival)', englishGloss: 'Pongal', nextPossibilities: [] },
                { word: 'காலை', confidence: 87, grammarTag: 'Noun', englishGloss: 'morning', nextPossibilities: [] },
                { word: 'தீபாவளி', confidence: 83, grammarTag: 'Noun', englishGloss: 'Diwali', nextPossibilities: [] }
              ],
              'இனிய பொங்கல்': [
                { word: 'திருநாள்', confidence: 97, grammarTag: 'Noun', englishGloss: 'festival day', nextPossibilities: [] },
                { word: 'நல்வாழ்த்துகள்!', confidence: 94, grammarTag: 'Greeting', englishGloss: 'good wishes!', nextPossibilities: [] }
              ],
              'இனிய பொங்கல் திருநாள்': [
                { word: 'நல்வாழ்த்துகள்!', confidence: 99, grammarTag: 'Greeting', englishGloss: 'good wishes!', nextPossibilities: [] }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳',
    contexts: [
      {
        domainId: 'casual',
        domainTitle: 'Daily & Meetup (రోజువారీ సంభాషణ)',
        starterPrompts: [
          {
            title: 'Meeting in evening',
            initialTokens: ['ఈరోజు'],
            targetSentence: 'ఈరోజు సాయంత్రం అందరం కలుద్దాం.',
            englishTranslation: 'Let us all meet this evening.',
            tokenTree: {
              'ఈరోజు': [
                { word: 'సాయంత్రం', confidence: 97, grammarTag: 'Noun (Time)', englishGloss: 'evening', nextPossibilities: [] },
                { word: 'ఉదయం', confidence: 83, grammarTag: 'Noun (Time)', englishGloss: 'morning', nextPossibilities: [] }
              ],
              'ఈరోజు సాయంత్రం': [
                { word: 'అందరం', confidence: 95, grammarTag: 'Pronoun', englishGloss: 'all of us', nextPossibilities: [] },
                { word: 'టీ', confidence: 88, grammarTag: 'Noun', englishGloss: 'tea', nextPossibilities: [] }
              ],
              'ఈరోజు సాయంత్రం అందరం': [
                { word: 'కలుద్దాం.', confidence: 99, grammarTag: 'Verb', englishGloss: 'let us meet.', nextPossibilities: [] }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'hinglish',
    name: 'Hinglish',
    nativeName: 'Conversational',
    flag: '🇮🇳',
    contexts: [
      {
        domainId: 'casual',
        domainTitle: 'Social & WhatsApp (दोस्तों के साथ)',
        starterPrompts: [
          {
            title: 'Cricket match & snacks meetup',
            initialTokens: ['Sham'],
            targetSentence: 'Sham ko cricket match dekhne sab aa rahe hain na?',
            englishTranslation: 'Everyone is coming to watch the cricket match this evening, right?',
            tokenTree: {
              'Sham': [
                { word: 'ko', confidence: 98, grammarTag: 'Postposition', englishGloss: 'in the', nextPossibilities: [] },
                { word: 'ka', confidence: 84, grammarTag: 'Postposition', englishGloss: 'of', nextPossibilities: [] }
              ],
              'Sham ko': [
                { word: 'cricket', confidence: 96, grammarTag: 'Noun', englishGloss: 'cricket', nextPossibilities: [] },
                { word: 'chai', confidence: 92, grammarTag: 'Noun', englishGloss: 'tea', nextPossibilities: [] },
                { word: 'milte', confidence: 85, grammarTag: 'Verb', englishGloss: 'meet', nextPossibilities: [] }
              ],
              'Sham ko cricket': [
                { word: 'match', confidence: 99, grammarTag: 'Noun', englishGloss: 'match', nextPossibilities: [] }
              ],
              'Sham ko cricket match': [
                { word: 'dekhne', confidence: 97, grammarTag: 'Verb', englishGloss: 'to watch', nextPossibilities: [] }
              ],
              'Sham ko cricket match dekhne': [
                { word: 'sab', confidence: 96, grammarTag: 'Pronoun', englishGloss: 'everyone', nextPossibilities: [] }
              ],
              'Sham ko cricket match dekhne sab': [
                { word: 'aa', confidence: 98, grammarTag: 'Verb', englishGloss: 'coming', nextPossibilities: [] }
              ],
              'Sham ko cricket match dekhne sab aa': [
                { word: 'rahe', confidence: 99, grammarTag: 'Auxiliary', englishGloss: 'are', nextPossibilities: [] }
              ],
              'Sham ko cricket match dekhne sab aa rahe': [
                { word: 'hain', confidence: 99, grammarTag: 'Auxiliary', englishGloss: 'are', nextPossibilities: [] }
              ],
              'Sham ko cricket match dekhne sab aa rahe hain': [
                { word: 'na?', confidence: 99, grammarTag: 'Question Tag', englishGloss: 'right?', nextPossibilities: [] }
              ]
            }
          }
        ]
      }
    ]
  }
];

export const AIAutocompleteSandbox: React.FC = () => {
  const [selectedLangId, setSelectedLangId] = useState<string>('hi');
  const [selectedDomainIdx, setSelectedDomainIdx] = useState<number>(0);
  const [selectedPromptIdx, setSelectedPromptIdx] = useState<number>(0);

  // Active typing buffer
  const [typedTokens, setTypedTokens] = useState<string[]>(['आज']);
  const [freeformInput, setFreeformInput] = useState<string>('आज ');
  const [customLearnedWords, setCustomLearnedWords] = useState<string[]>(['कनॉट प्लेस', 'जुहू बीच', 'समोसा पार्टी', 'जबरदस्त']);
  const [newCustomWord, setNewCustomWord] = useState<string>('');
  const [recentlyLearnedToast, setRecentlyLearnedToast] = useState<string | null>(null);
  
  // Audio playback state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  // Active language configuration
  const currentLangConfig = useMemo(() => {
    return LANGUAGE_AUTOCOMPLETE_DATA.find(l => l.id === selectedLangId) || LANGUAGE_AUTOCOMPLETE_DATA[0];
  }, [selectedLangId]);

  const currentDomain = useMemo(() => {
    return currentLangConfig.contexts[selectedDomainIdx] || currentLangConfig.contexts[0];
  }, [currentLangConfig, selectedDomainIdx]);

  const currentPrompt = useMemo(() => {
    return currentDomain.starterPrompts[selectedPromptIdx] || currentDomain.starterPrompts[0];
  }, [currentDomain, selectedPromptIdx]);

  // Sync initial tokens when prompt or language changes
  useEffect(() => {
    if (currentPrompt) {
      setTypedTokens([...currentPrompt.initialTokens]);
      setFreeformInput(currentPrompt.initialTokens.join(' ') + ' ');
    }
  }, [currentPrompt]);

  // Compute live prediction chips based on current token sequence
  const currentSentenceKey = typedTokens.join(' ').trim();
  
  const livePredictions = useMemo(() => {
    if (!currentPrompt) return [];
    
    // Exact prefix lookup
    if (currentPrompt.tokenTree[currentSentenceKey]) {
      const basePredictions = [...currentPrompt.tokenTree[currentSentenceKey]];
      
      // Inject custom learned words with contextual score boost if relevant
      if (customLearnedWords.length > 0 && Math.random() > 0.3) {
        const learned = customLearnedWords[0];
        if (!basePredictions.some(p => p.word === learned)) {
          basePredictions.push({
            word: learned,
            confidence: 88,
            grammarTag: 'User Learned ⭐',
            englishGloss: 'custom phrase',
            nextPossibilities: []
          });
        }
      }
      return basePredictions.sort((a, b) => b.confidence - a.confidence);
    }

    // Fallback general context predictions
    const fallbackPredictions: PredictionNode[] = [
      { word: 'बहुत', confidence: 92, grammarTag: 'Adverb', englishGloss: 'very / much', nextPossibilities: [] },
      { word: 'अच्छा', confidence: 86, grammarTag: 'Adjective', englishGloss: 'good', nextPossibilities: [] },
      { word: 'धन्यवाद', confidence: 80, grammarTag: 'Greeting', englishGloss: 'thank you', nextPossibilities: [] }
    ];

    return fallbackPredictions;
  }, [currentPrompt, currentSentenceKey, customLearnedWords]);

  // Calculate keystroke savings
  const fullTargetLen = currentPrompt ? currentPrompt.targetSentence.length : 30;
  const currentLen = currentSentenceKey.length;
  const keystrokesSavedPercent = Math.min(88, Math.round((typedTokens.length / (fullTargetLen > 0 ? fullTargetLen : 30)) * 100 * 3.2));

  // Handler for clicking a prediction chip
  const handleSelectPrediction = (node: PredictionNode) => {
    const nextList = [...typedTokens, node.word];
    setTypedTokens(nextList);
    setFreeformInput(nextList.join(' ') + ' ');
  };

  // Handler for reset
  const handleReset = () => {
    if (currentPrompt) {
      setTypedTokens([...currentPrompt.initialTokens]);
      setFreeformInput(currentPrompt.initialTokens.join(' ') + ' ');
    }
  };

  // Handler for teaching AI a new custom vocabulary word
  const handleTeachNewWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomWord.trim()) return;
    const wordToAdd = newCustomWord.trim();
    if (!customLearnedWords.includes(wordToAdd)) {
      setCustomLearnedWords(prev => [wordToAdd, ...prev]);
      setRecentlyLearnedToast(`AI Model Updated: "${wordToAdd}" added to on-device dictionary!`);
      setTimeout(() => setRecentlyLearnedToast(null), 3000);
      setNewCustomWord('');
    }
  };

  // TTS Speech Player
  const handlePlayTTS = () => {
    const textToSpeak = currentSentenceKey || currentPrompt.targetSentence;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = selectedLangId === 'hi' ? 'hi-IN' : selectedLangId === 'ta' ? 'ta-IN' : selectedLangId === 'te' ? 'te-IN' : 'en-IN';
      utterance.rate = 0.95;
      setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSentenceKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="autocomplete-sandbox" className="relative py-20 lg:py-28 bg-[#030712] text-white overflow-hidden">
      
      {/* Background Neural Matrix Gradient Halos */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 left-10 h-[500px] w-[500px] rounded-full bg-[#000080]/30 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 h-[450px] w-[450px] rounded-full bg-[#FF9933]/15 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full bg-[#138808]/10 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center space-x-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-amber-300 border border-white/20 mb-3 shadow-2xs backdrop-blur-md">
            <BrainCircuit className="h-3.5 w-3.5 animate-pulse text-amber-400" />
            <span>On-Device Neural Next-Word Predictor</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Smart Autocomplete
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Experience how our contextual AI learns sentence structure, understands Indian linguistic nuance, and predicts complete sentences in just a few taps.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
              <span className="block text-xl font-black text-amber-400">&lt; 12ms</span>
              <span className="text-[11px] font-semibold text-slate-400">Prediction Latency</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
              <span className="block text-xl font-black text-emerald-400">74%–85%</span>
              <span className="text-[11px] font-semibold text-slate-400">Keystrokes Reduced</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
              <span className="block text-xl font-black text-sky-400">100% On-Device</span>
              <span className="text-[11px] font-semibold text-slate-400">Local Neural Weights</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
              <span className="block text-xl font-black text-purple-400">Adaptive</span>
              <span className="text-[11px] font-semibold text-slate-400">Learns Your Slang</span>
            </div>
          </div>
        </div>

        {/* Interactive Autocomplete Stage */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Context Configurator & Learning Studio */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Language & Context Scenario Selector Card */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Languages className="h-4 w-4" />
                  1. Choose Language & Script:
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                  {currentLangConfig.nativeName}
                </span>
              </div>

              {/* Language Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {LANGUAGE_AUTOCOMPLETE_DATA.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => {
                      setSelectedLangId(lang.id);
                      setSelectedDomainIdx(0);
                      setSelectedPromptIdx(0);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 border ${
                      selectedLangId === lang.id
                        ? 'bg-[#000080] text-white border-amber-400 shadow-md ring-1 ring-amber-400/40 scale-102'
                        : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>

              {/* Scenario Preset Selector */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-400 block">
                  2. Select Conversational Domain:
                </label>
                <div className="space-y-2">
                  {currentLangConfig.contexts.map((ctx, idx) => (
                    <button
                      key={ctx.domainId}
                      onClick={() => {
                        setSelectedDomainIdx(idx);
                        setSelectedPromptIdx(0);
                      }}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                        selectedDomainIdx === idx
                          ? 'bg-white/15 text-amber-300 border-amber-400/50 shadow-sm'
                          : 'bg-slate-800/50 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      <span>{ctx.domainTitle}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-slate-400 font-mono">
                        {ctx.starterPrompts.length} prompt
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Phrase Objective */}
              <div className="p-3.5 rounded-2xl bg-black/50 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block">
                  Target Sentence Goal (लक्ष्य वाक्य):
                </span>
                <p className="text-sm font-bold text-white leading-snug">
                  {currentPrompt?.targetSentence}
                </p>
                <p className="text-xs text-emerald-400 mt-1">
                  Meaning: {currentPrompt?.englishTranslation}
                </p>
              </div>

            </div>

            {/* AI Custom Vocabulary Adaptive Learning Studio */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <BookmarkPlus className="h-4 w-4" />
                  Teach AI Your Personal Slang:
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  On-Device Dictionary
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Add frequent local place names, nicknames, or slang words. The model dynamically updates weights without sending data to any cloud.
              </p>

              {/* Add Custom Word Form */}
              <form onSubmit={handleTeachNewWord} className="flex gap-2">
                <input
                  type="text"
                  value={newCustomWord}
                  onChange={(e) => setNewCustomWord(e.target.value)}
                  placeholder="e.g. कनॉट प्लेस or Koramangala..."
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition-all active:scale-95 shrink-0"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Teach AI</span>
                </button>
              </form>

              {/* Active Learned Words Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {customLearnedWords.map((word, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium"
                  >
                    <span>⭐ {word}</span>
                  </span>
                ))}
              </div>

              {recentlyLearnedToast && (
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{recentlyLearnedToast}</span>
                </div>
              )}

            </div>

          </div>

          {/* Right Column: Live Autocomplete Smartphone Simulator */}
          <div className="lg:col-span-7 bg-gradient-to-b from-slate-900 via-slate-900 to-black rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
            
            {/* Top Device Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
              <div className="flex items-center space-x-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-extrabold tracking-wide text-slate-200 uppercase">
                  Desi AI Neural Predictor Active
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  {keystrokesSavedPercent}% Keystrokes Saved
                </span>
                <button
                  onClick={handleReset}
                  title="Reset Sentence"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Live Composed Text Screen */}
            <div className="rounded-2xl bg-black/60 border border-slate-800 p-5 shadow-inner space-y-3">
              
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Keyboard className="h-3.5 w-3.5" />
                  Live Chat Box (संभाषण पट्टी):
                </span>
                <span className="text-slate-400 font-mono">
                  {typedTokens.length} Words Composed
                </span>
              </div>

              {/* Big Text Output Area with Caret */}
              <div className="min-h-[72px] sm:min-h-[84px] text-xl sm:text-2xl font-bold text-white leading-relaxed flex flex-wrap items-center">
                {currentSentenceKey ? (
                  <span>
                    {currentSentenceKey}
                    <span className="inline-block w-2.5 h-6 bg-amber-400 ml-1 animate-pulse align-middle rounded-xs"></span>
                  </span>
                ) : (
                  <span className="text-slate-600 font-normal text-lg italic">
                    Tap the suggested words below to autocomplete the sentence...
                  </span>
                )}
              </div>

              {/* Real-time Token Decomposition View */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-500 mr-1">Token Chain:</span>
                {typedTokens.map((token, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-xs text-amber-200 font-medium"
                  >
                    #{idx + 1} {token}
                  </span>
                ))}
              </div>

            </div>

            {/* ------------------------------------------------------------- */}
            {/* REAL-TIME AI PREDICTION STRIP (KEYBOARD SUGGESTION BAR)       */}
            {/* ------------------------------------------------------------- */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  AI Suggested Next Words (Tap to Autocomplete):
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">
                  Zero Typing Needed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {livePredictions.map((pred, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPrediction(pred)}
                    className="group relative p-3.5 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 hover:from-amber-500/20 hover:to-amber-500/10 border border-slate-700 hover:border-amber-400/60 shadow-lg text-left transition-all active:scale-95 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-extrabold text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20">
                        {pred.confidence}% Conf.
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {pred.grammarTag}
                      </span>
                    </div>

                    <div className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                      + {pred.word}
                    </div>

                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {pred.englishGloss}
                    </div>

                    {/* Tap shortcut indicator */}
                    <div className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Neural Context Probability Graph Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold flex items-center gap-1 text-slate-300">
                  <TrendingUp className="h-3.5 w-3.5 text-sky-400" />
                  Neural Probability Distribution (Why the AI predicted this):
                </span>
                <span className="font-mono text-[10px] text-sky-400">N-gram Transformer</span>
              </div>

              <div className="space-y-2">
                {livePredictions.map((pred, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{pred.word} <span className="text-slate-500 font-normal">({pred.englishGloss})</span></span>
                      <span className="font-mono text-xs text-amber-400">{pred.confidence}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pred.confidence}%` }}
                        transition={{ duration: 0.4 }}
                        className={`h-full rounded-full ${
                          idx === 0 ? 'bg-gradient-to-r from-amber-500 to-amber-300' : 'bg-slate-600'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePlayTTS}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all active:scale-95"
                >
                  <Volume2 className={`h-4 w-4 ${isPlayingAudio ? 'text-amber-400 animate-pulse' : 'text-slate-300'}`} />
                  <span>{isPlayingAudio ? 'बोल रहा है...' : 'उच्चारण सुनें (Listen)'}</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-slate-300" />
                      <span>कॉपी करें (Copy)</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Zero cloud telemetry • Local inference</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
