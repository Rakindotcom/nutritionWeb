import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import {
  Flame,
  Apple,
  BrainCircuit,
  Dumbbell,
  HeartPulse,
  BookOpenCheck,
} from 'lucide-react';

const slides = [
  { title: 'Ignite Your Health', subtitle: 'Motivation fuels transformation.', icon: Flame },
  { title: 'Eat Smart', subtitle: 'Your diet is your foundation.', icon: Apple },
  { title: 'Train Your Mind', subtitle: 'Mental clarity meets physical wellness.', icon: BrainCircuit },
  { title: 'Move Daily', subtitle: 'Strength starts with action.', icon: Dumbbell },
  { title: 'Heart First', subtitle: 'Healthy heart, happy life.', icon: HeartPulse },
  { title: 'Keep Learning', subtitle: 'Knowledge powers progress.', icon: BookOpenCheck },
];

export default function HeroSlider() {
  return (
    <section className="w-full h-[60vh] md:h-[100vh] bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        speed={1000}
        loop
        pagination={{ 
          clickable: true,
        }}
        className="w-full h-full"
      >
        {slides.map(({ icon: Icon, title, subtitle }, idx) => (
          <SwiperSlide key={idx}>
            <div className="h-full flex items-center justify-center px-4">
              <div className="bg-white/5 backdrop-blur-lg p-8 md:p-16 rounded-3xl max-w-2xl text-center shadow-lg border border-white/10 transform transition-transform hover:scale-105 duration-300">
                <Icon size={60} className="text-white mb-6 mx-auto drop-shadow-md" />
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
                <p className="text-lg md:text-xl text-gray-200">{subtitle}</p>
                <Link 
                  to="/about"
                  className="mt-6 inline-block bg-white/90 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-white hover:scale-105 transition-transform duration-300"
                >
                  Start Your Journey
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}