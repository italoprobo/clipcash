import type { LucideIcon } from "lucide-react"
import { 
  Gift, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  ThumbsUp, 
  ThumbsDown,
  Home,
  Wallet,
  CheckCircle,
  Pause,
  Play,
  Video,
  UserCheck,
  CreditCard,
  History,
  Settings,
  Laptop,
  Dumbbell,
  Utensils,
  Plane,
  Heart,
  ChevronRight
} from "lucide-react"

export const ICONS = {
  Gift,
  DollarSign,
  TrendingUp,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Home,
  Wallet,
  CheckCircle,
  Pause,
  Play,
  Video,
  UserCheck,
  CreditCard,
  History,
  Settings,
  Laptop,
  Dumbbell,
  Utensils,
  Plane,
  Heart,
  ChevronRight
}

export type VideoData = {
  youtubeId: string
  title: string
  channel: string
  reward: number
  views: string
  duration: string
  email?: string
}

export const VIDEOS_DATA: VideoData[] = [
  {
    youtubeId: "Tru9n5mOEAQ",
    title: "Treino CARDIO HIIT - 21 minutos - todo em pé",
    channel: "Carol Borba",
    reward: 3.50,
    views: "892K",
    duration: "21:00"
  },
  {
    youtubeId: "c7P03kkrEG8",
    title: "Configurando VSCode para Node.js, ReactJS e React Native",
    channel: "Rocketseat",
    reward: 4.25,
    views: "756K",
    duration: "15:30"
  },
  {
    youtubeId: "rcSTXlhK2gM",
    title: "Delícia SEM TRIGO e SEM OVO - Receita Low Carb",
    channel: "Low Carb Receitas",
    reward: 5.00,
    views: "654K",
    duration: "18:20"
  },
  {
    youtubeId: "t6PVUF669g0",
    title: "Alivie a Ansiedade com Mindfulness | Atenção Plena",
    channel: "Zen Meditation",
    reward: 4.75,
    views: "987K",
    duration: "14:15"
  },
  {
    youtubeId: "_T58fYXVlDE",
    title: "Sopa para Emagrecer | Sopa de Legumes com Frango",
    channel: "Receitas da Cris",
    reward: 3.75,
    views: "1.2M",
    duration: "16:45"
  }
] as const;

export const POPULAR_CATEGORIES = [
  {
    name: "Tecnologia",
    icon: Laptop,
    href: "#",
    color: "text-blue-500"
  },
  {
    name: "Fitness",
    icon: Dumbbell,
    href: "#",
    color: "text-green-500"
  },
  {
    name: "Culinária",
    icon: Utensils,
    href: "#",
    color: "text-orange-500"
  },
  {
    name: "Viagem",
    icon: Plane,
    href: "#",
    color: "text-purple-500"
  },
  {
    name: "Bem-estar",
    icon: Heart,
    href: "#",
    color: "text-pink-500"
  }
]

export type OnboardingStep = {
  title: string
  description: string
  icon: LucideIcon
  buttonText: string
}

export const ONBOARDING_STEPS_CONFIG: OnboardingStep[] = [
  {
    title: "Assista vídeos",
    description: "Assista vídeos curtos e dê sua opinião sobre eles para ganhar recompensas.",
    icon: Video,
    buttonText: "Próximo"
  },
  {
    title: "Avalie o conteúdo",
    description: "Sua avaliação ajuda a melhorar a qualidade dos vídeos recomendados.",
    icon: UserCheck,
    buttonText: "Próximo"
  },
  {
    title: "Receba recompensas",
    description: "Ganhe dinheiro real por cada avaliação. Saque a qualquer momento para sua conta.",
    icon: CreditCard,
    buttonText: "Começar agora"
  }
] 