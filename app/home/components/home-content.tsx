"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { VIDEOS_DATA } from "@/lib/constants"
import type { VideoData } from "@/lib/constants"
import { capitalizeFirstLetter } from "@/lib/utils"
import { toast } from "sonner"
import { 
  User,
  Play,
  Laptop,
  Dumbbell,
  Utensils,
  Plane,
  Heart,
  LucideIcon,
  WalletCards,
  Home,
  Search,
  DollarSign,
  Clock,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  CheckCircle,
  Lock
} from "lucide-react"
import confetti from 'canvas-confetti'

// Definindo o tipo do YT
declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, config: any) => any
      PlayerState: {
        PLAYING: number
      }
    }
    onYouTubeIframeAPIReady: () => void
  }
}

type TabType = 'inicio' | 'explorar' | 'ganhos' | 'perfil'

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const TOTAL_VIDEO_TIME = 30 // Tempo total em segundos

interface VideoProgress {
  videoIndex: number
  progress: number
  time: number
  timestamp: number
}

// Funções auxiliares para localStorage
const getStoredProgress = () => {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem('videoProgress')
  if (!stored) return null
  try {
    const data = JSON.parse(stored) as VideoProgress
    // Verifica se os dados são recentes (menos de 1 hora)
    if (Date.now() - data.timestamp < 3600000) {
      return data
    }
    localStorage.removeItem('videoProgress')
    return null
  } catch (e) {
    return null
  }
}

const storeProgress = (data: Omit<VideoProgress, 'timestamp'>) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('videoProgress', JSON.stringify({
    ...data,
    timestamp: Date.now()
  }))
}

// Funções para salvar e carregar dados gerais
const getStoredGeneralData = () => {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem('generalProgress')
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch (e) {
    return null
  }
}

const storeGeneralData = (data: { 
  balance: number; 
  todayEarnings: number; 
  videosCompleted: number;
  currentVideoIndex: number;
}) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('generalProgress', JSON.stringify(data))
}

const triggerConfetti = () => {
  // Toca o som de celebração
  const audio = new Audio('/sounds/song.mp3')
  audio.volume = 0.3 // Volume a 30% para não ficar muito alto
  audio.play().catch(err => console.log('Erro ao tocar áudio:', err))

  // Dispara confete dos cantos da tela
  const count = 200
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999
  }

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      scalar: 1.2
    })
  }

  // Dispara de vários ângulos para criar um efeito mais impressionante
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    origin: { x: 0 }
  })
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    origin: { x: 1 }
  })
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45
  })
}

function WithdrawModal({ isOpen, onClose, balance }: { isOpen: boolean; onClose: () => void; balance: number }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Seu saldo: R$ {balance.toFixed(2)}</h3>
            <p className="text-sm text-gray-600 mt-1">Desbloqueie agora mesmo seu saque!</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-start">
            <Lock className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Conta não verificada</p>
              <p className="text-sm mt-1">Para realizar saques, você precisa ter uma conta verificada com acesso VIP.</p>
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 font-medium mb-3">Com a conta VIP você pode:</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Sacar seus ganhos a qualquer momento
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Ganhar até R$ 500 por mês
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Acesso a mais de 100 vídeos premium
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Suporte prioritário via WhatsApp
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full bg-[#c6426b] hover:bg-[#b33d61] text-white h-14 text-lg"
            onClick={() => window.location.href = '/catalogo'}
          >
            Desbloquear Saque Agora →
          </Button>
          <button 
            className="w-full text-gray-500 hover:text-gray-700 text-sm"
            onClick={onClose}
          >
            Continuar avaliando vídeos gratuitos
          </button>
        </div>
      </div>
    </div>
  );
}

const HomeContent = () => {
  const [mounted, setMounted] = useState(false)
  const [userName, setUserName] = useState('Avaliador')
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  
  // Estados iniciais sem localStorage
  const [balance, setBalance] = useState(0)
  const [todayEarnings, setTodayEarnings] = useState(0)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [videosCompleted, setVideosCompleted] = useState(0)
  const [showCompletionMessage, setShowCompletionMessage] = useState(false)
  const [watchProgress, setWatchProgress] = useState(0)
  const [canEvaluate, setCanEvaluate] = useState(false)
  const [videoStarted, setVideoStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTab, setCurrentTab] = useState<TabType>('inicio')
  const [currentTime, setCurrentTime] = useState(0)
  const playerRef = useRef<any>(null)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)

  // Efeito para carregar dados do localStorage após a montagem
  useEffect(() => {
    setMounted(true)
    
    // Carrega os dados gerais primeiro
    const generalData = getStoredGeneralData()
    if (generalData) {
      setBalance(generalData.balance)
      setTodayEarnings(generalData.todayEarnings)
      setVideosCompleted(generalData.videosCompleted)
      setCurrentVideoIndex(generalData.currentVideoIndex)
    }

    // Depois carrega o progresso do vídeo atual
    const storedProgress = getStoredProgress()
    if (storedProgress) {
      const progress = storedProgress.progress
      setWatchProgress(progress)
      // Calcula o tempo baseado no progresso para manter sincronizado
      const calculatedTime = (progress / 100) * TOTAL_VIDEO_TIME
      setCurrentTime(calculatedTime)
      
      if (progress >= 100) {
        setCanEvaluate(true)
      }
    }

    // Carrega o nome do usuário da URL
    const urlParams = new URLSearchParams(window.location.search)
    const nameFromUrl = urlParams.get('name')
    if (nameFromUrl) {
      setUserName(capitalizeFirstLetter(nameFromUrl))
    }
  }, [])

  console.log('VIDEOS_DATA:', VIDEOS_DATA)
  console.log('currentVideoIndex:', currentVideoIndex)
  const currentVideo = VIDEOS_DATA[currentVideoIndex]
  console.log('currentVideo:', currentVideo)

  const cleanupPlayer = () => {
    stopProgressTimer()
    try {
      // Primeiro, pausamos o vídeo se possível
      if (playerRef.current?.pauseVideo) {
        playerRef.current.pauseVideo()
      }
      // Limpamos a referência
      playerRef.current = null
    } catch (e) {
      console.error('Erro ao limpar player:', e)
    }
  }

  const startProgressTimer = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }
    
    if (watchProgress < 100) {
      progressInterval.current = setInterval(() => {
        setWatchProgress(prev => {
          // Ajustando o incremento para subir mais suavemente
          const increment = (100 / TOTAL_VIDEO_TIME) // Incremento por segundo
          const newProgress = Math.min(prev + (increment / 10), 100) // Dividido por 10 pois o intervalo é 100ms
          
          if (mounted) {
            // Calcula o tempo baseado no progresso
            const calculatedTime = (newProgress / 100) * TOTAL_VIDEO_TIME
            setCurrentTime(calculatedTime)
            
            storeProgress({
              videoIndex: currentVideoIndex,
              progress: newProgress,
              time: calculatedTime
            })
          }
          
          if (newProgress >= 100) {
            if (progressInterval.current) {
              clearInterval(progressInterval.current)
            }
            setCanEvaluate(true)
          }
          
          return newProgress
        })
      }, 100)
    }
  }

  const stopProgressTimer = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
      progressInterval.current = null
    }
  }

  const handleEvaluation = async (approved: boolean) => {
    if (!currentVideo || !canEvaluate) {
      if (!canEvaluate) {
        toast.error("Aguarde o vídeo completar para avaliar!")
        return
      }
      return
    }

    // Primeiro paramos o timer e limpamos o player
    cleanupPlayer()
    // Limpa o progresso armazenado
    localStorage.removeItem('videoProgress')

    let message = `Vídeo "${currentVideo.title}" `
    let newBalance = balance
    let newTodayEarnings = todayEarnings
    
    if (approved) {
      newBalance = balance + currentVideo.reward
      newTodayEarnings = todayEarnings + currentVideo.reward
      setBalance(newBalance)
      setTodayEarnings(newTodayEarnings)
      message += "aprovado!"
      toast.success(message, { description: `+ R$ ${currentVideo.reward.toFixed(2)} adicionado ao saldo.` })
      // Dispara o confete quando aprovar
      triggerConfetti()
    } else {
      message += "reprovado."
      toast.info(message, { description: "Nenhum valor adicionado por esta avaliação." })
    }

    // Atualizamos os estados
    const newVideosCompleted = videosCompleted + 1
    setVideosCompleted(newVideosCompleted)
    
    // Calculamos o próximo índice do vídeo
    const nextVideoIndex = currentVideoIndex < VIDEOS_DATA.length - 1 ? currentVideoIndex + 1 : currentVideoIndex
    
    // Salva os dados gerais com o próximo índice
    storeGeneralData({
      balance: newBalance,
      todayEarnings: newTodayEarnings,
      videosCompleted: newVideosCompleted,
      currentVideoIndex: nextVideoIndex
    })

    setWatchProgress(0)
    setCurrentTime(0)
    setCanEvaluate(false)
    setIsPlaying(false)
    setVideoStarted(false)

    // Mudamos para o próximo vídeo
    if (currentVideoIndex < VIDEOS_DATA.length - 1) {
      setCurrentVideoIndex(nextVideoIndex)
    } else {
      setShowCompletionMessage(true)
    }
  }

  const handleStartVideo = () => {
    setVideoStarted(true)
  }

  const getWatchTimeInSeconds = () => {
    return Math.ceil(2 * watchProgress / 100)
  }

  useEffect(() => {
    // Função para inicializar o player
    const initializePlayer = () => {
      try {
        if (!document.getElementById('youtube-player')) {
          console.error('Player element not found');
          return;
        }

        if (playerRef.current) {
          playerRef.current.destroy();
        }

        playerRef.current = new window.YT.Player('youtube-player', {
          videoId: currentVideo?.youtubeId,
          playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
            controls: 1
          },
          events: {
            onReady: (event: { target: any }) => {
              event.target.playVideo();
              setIsPlaying(true);
              startProgressTimer();
            },
            onStateChange: (event: { data: number }) => {
              const isVideoPlaying = event.data === window.YT.PlayerState.PLAYING;
              setIsPlaying(isVideoPlaying);
              
              if (isVideoPlaying) {
                startProgressTimer();
              } else {
                stopProgressTimer();
              }
            },
            onError: (event: { data: any }) => {
              console.error('YouTube Player Error:', event.data);
              toast.error('Erro ao carregar o vídeo. Tente novamente.');
            }
          }
        });
      } catch (e) {
        console.error('Erro ao inicializar player:', e);
        toast.error('Erro ao inicializar o player. Tente novamente.');
      }
    };

    // Função para carregar a API do YouTube
    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    };

    // Verifica se a API já está carregada
    if (!window.YT) {
      loadYouTubeAPI();
      window.onYouTubeIframeAPIReady = () => {
        if (videoStarted && currentVideo) {
          initializePlayer();
        }
      };
    } else if (videoStarted && currentVideo) {
      initializePlayer();
    }

    return () => {
      stopProgressTimer();
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error('Erro ao destruir player:', e);
        }
      }
    };
  }, [videoStarted, currentVideo]);

  // Atualiza o player quando o vídeo muda
  useEffect(() => {
    setVideoStarted(false);
    setCanEvaluate(false);
    setIsPlaying(false);
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
        playerRef.current = null;
      } catch (e) {
        console.error('Erro ao destruir player:', e);
      }
    }
  }, [currentVideoIndex]);

  useEffect(() => {
    return () => {
      cleanupPlayer()
    }
  }, [])

  // Limpa o localStorage quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (watchProgress >= 100) {
        localStorage.removeItem('videoProgress')
      }
    }
  }, [watchProgress])

  // Limpa os dados gerais quando completar todos os vídeos
  useEffect(() => {
    if (showCompletionMessage) {
      localStorage.removeItem('generalProgress')
      localStorage.removeItem('videoProgress')
    }
  }, [showCompletionMessage])

  // Efeito para lidar com visibilidade da página
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Página perdeu foco, salvar estado atual
        if (isPlaying) {
          stopProgressTimer()
        }
      } else {
        // Página ganhou foco, restaurar estado
        if (isPlaying) {
          startProgressTimer()
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isPlaying])

  // Efeito para sincronizar o progresso com o tempo
  useEffect(() => {
    if (currentTime >= TOTAL_VIDEO_TIME) {
      setWatchProgress(100)
      setCanEvaluate(true)
      stopProgressTimer()
    }
  }, [currentTime])

  return (
    <>
    {!mounted ? null : (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-[#c6426b] rounded-lg">
              <img src="/image/clipcash.jpg" alt="ClipCash Logo" className="h-10 w-10 rounded-lg" />
            </div>
            <span className="font-bold text-lg text-black">ClipCash</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{userName}</span>
            <div className="flex items-center space-x-1">
              <span className="text-[#c6426b] font-medium">R$ {balance.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Card de Saldo */}
      <div className="max-w-screen-xl mx-auto w-full px-4 mt-6">
        <div className="bg-gradient-to-r from-blue-500 to-[#c6426b] rounded-xl p-6">
          <div className="flex flex-col space-y-4">
            <div className="space-y-1">
              <p className="text-sm text-white/90">Seu saldo disponível</p>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold text-white">R$ {balance.toFixed(2)}</p>
                <Button 
                  className="bg-white text-[#c6426b] hover:bg-white/90 px-6 py-2 text-sm font-medium"
                  onClick={() => setIsWithdrawModalOpen(true)}
                >
                  Sacar
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-sm text-white/90">
                <TrendingUp className="h-4 w-4 mr-1.5" />
                <span>+R$ {todayEarnings.toFixed(2)} hoje</span>
              </div>
              <div className="flex items-center text-sm text-white/90">
                <Clock className="h-4 w-4 mr-1.5" />
                <span>Próximo bônus em 2h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progresso */}
      <div className="max-w-screen-xl mx-auto w-full px-4 mt-6">
        <div className="bg-white rounded-xl p-6">
          <h2 className="text-lg font-semibold text-black mb-4">Seu progresso</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Avaliações concluídas</span>
              <span className="text-blue-600">{videosCompleted}/5 vídeos</span>
            </div>
            <Progress value={(videosCompleted / 5) * 100} className="h-2 [&>div]:bg-[#c6426b] bg-gray-100" />
            <div className="flex justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-4 w-4 mr-1 text-[#c6426b]" />
                <span>Ganhos: R$ {balance.toFixed(2)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>Restante: {5 - videosCompleted} vídeos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vídeo Atual */}
      <div className="max-w-screen-xl mx-auto w-full px-4 mt-6">
        {showCompletionMessage ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-black mb-2">Parabéns! 🎉</h2>
                <p className="text-lg text-gray-900">
                  Você completou todas as avaliações e ganhou <span className="font-bold text-[#c6426b]">R$ {balance.toFixed(2)}</span>
                </p>
                <p className="text-gray-600">
                  Desbloqueie o catálogo completo para ganhar até R$ 500/mês!
                </p>
              </div>
              <Button 
                className="bg-[#c6426b] hover:bg-[#b33d61] text-white w-full max-w-sm h-12 text-base"
                onClick={() => window.location.href = '/catalogo'}
              >
                Acessar catálogo completo
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold text-black">Vídeo atual</h2>
              <span className="text-[#c6426b] font-medium text-lg border-2 border-[#c6426b] rounded-lg px-3 py-1">+R$ {currentVideo?.reward.toFixed(2) || "2.50"}</span>
            </div>
            {!videoStarted ? (
              <div className="aspect-video bg-gray-100 relative">
                <img 
                  src={`https://img.youtube.com/vi/${currentVideo?.youtubeId}/maxresdefault.jpg`}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Button 
                    onClick={handleStartVideo}
                    className="bg-[#c6426b] hover:bg-[#b33d61] text-white"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Iniciar vídeo para ganhar
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="aspect-video bg-gray-100 relative">
                  <iframe
                    id="youtube-player"
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${currentVideo?.youtubeId}?enablejsapi=1&autoplay=1&modestbranding=1&rel=0`}
                    title={currentVideo?.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  {watchProgress < 100 && (
                    <div className="absolute top-4 right-4 bg-black/70 rounded-lg px-3 py-1.5 flex items-center gap-2 z-10">
                      <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-white text-sm">
                        {isPlaying ? `Assistindo... ${formatTime(currentTime)}` : 'Pausado'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          <span className="mr-2">⏱</span>
                          Tempo mínimo de visualização:
                        </span>
                        <span className="text-black font-medium">{formatTime(currentTime)} / {formatTime(TOTAL_VIDEO_TIME)}</span>
                      </div>
                      <Progress value={watchProgress} className="h-2 [&>div]:bg-[#c6426b] bg-gray-100" />
                      
                      {watchProgress < 100 ? (
                        <div className="flex items-center gap-2 text-sm">
                          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-gray-400'}`} />
                          <span className="text-gray-600">
                            Status: {isPlaying ? 'Assistindo' : 'Pausado'}
                          </span>
                          {watchProgress > 0 && (
                            <span className="ml-auto text-gray-600">
                              Assista mais {Math.ceil(TOTAL_VIDEO_TIME - currentTime)} segundos para avaliar
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                          <span className="flex items-center">
                            ✓ Pronto para avaliar
                          </span>
                        </div>
                      )}
                    </div>

                    {canEvaluate && (
                      <div className="space-y-4">
                        <p className="text-center text-sm text-gray-600">
                          Avalie agora para aumentar seu saldo
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          <Button 
                            variant="outline" 
                            onClick={() => handleEvaluation(false)}
                            className="border-[#c6426b] text-[#c6426b] hover:bg-[#c6426b] hover:text-white"
                          >
                            <ThumbsDown className="mr-2 h-5 w-5" /> Reprovar
                          </Button>
                          <Button 
                            onClick={() => handleEvaluation(true)}
                            className="bg-[#c6426b] hover:bg-[#b33d61] text-white"
                          >
                            <ThumbsUp className="mr-2 h-5 w-5" /> Aprovar
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            <div className="p-4 border-t">
              <h3 className="font-medium text-black text-lg">{currentVideo?.title || "VÍDEO 1 - Conteúdo Educativo"}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {currentVideo?.channel || "Canal Educativo"} • {currentVideo?.views || "1.2M"} visualizações • {currentVideo?.duration || "5:30"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Como Funciona */}
      <div className="max-w-screen-xl mx-auto w-full px-4 mt-6">
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-black">Como Funciona</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center p-6 rounded-xl bg-white hover:bg-gray-50 border border-gray-100">
              <div className={`w-16 h-16 rounded-full bg-[#c6426b]/10 flex items-center justify-center mb-3`}>
                <Play className="h-8 w-8 text-[#c6426b]" />
              </div>
              <span className="text-base font-medium text-gray-900 mb-2">Passo 1</span>
              <span className="text-sm text-gray-600 text-center">Selecione um vídeo da nossa curadoria de conteúdo de qualidade</span>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl bg-white hover:bg-gray-50 border border-gray-100">
              <div className={`w-16 h-16 rounded-full bg-[#c6426b]/10 flex items-center justify-center mb-3`}>
                <Laptop className="h-8 w-8 text-[#c6426b]" />
              </div>
              <span className="text-base font-medium text-gray-900 mb-2">Passo 2</span>
              <span className="text-sm text-gray-600 text-center">Assista o vídeo até o final</span>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl bg-white hover:bg-gray-50 border border-gray-100">
              <div className={`w-16 h-16 rounded-full bg-[#c6426b]/10 flex items-center justify-center mb-3`}>
                <Dumbbell className="h-8 w-8 text-[#c6426b]" />
              </div>
              <span className="text-base font-medium text-gray-900 mb-2">Passo 3</span>
              <span className="text-sm text-gray-600 text-center">Avalie o vídeo</span>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl bg-white hover:bg-gray-50 border border-gray-100">
              <div className={`w-16 h-16 rounded-full bg-[#c6426b]/10 flex items-center justify-center mb-3`}>
                <Utensils className="h-8 w-8 text-[#c6426b]" />
              </div>
              <span className="text-base font-medium text-gray-900 mb-2">Passo 4</span>
              <span className="text-sm text-gray-600 text-center">Receba seu bônus</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white py-8 text-center text-gray-600 text-sm">
        <div className="max-w-screen-xl mx-auto px-4">
          © 2024 ClipCash. Transformando tempo de tela em oportunidade.
        </div>
      </div>

      <WithdrawModal 
        isOpen={isWithdrawModalOpen} 
        onClose={() => setIsWithdrawModalOpen(false)}
        balance={balance}
      />
    </div>
    )}
    </>
  )
}

export default HomeContent