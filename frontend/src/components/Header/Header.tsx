import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-[45vw] min-h-[600px] w-full overflow-hidden bg-[url('/header_img.png')] bg-no-repeat bg-cover bg-center animate-in fade-in duration-700">
      {/* Dark Overlay/Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

      <div className="container mx-auto px-8 lg:px-16 h-full relative flex items-center">
        <div className="max-w-[90%] md:max-w-[50%] flex flex-col items-start gap-[1.5vw] animate-in slide-in-from-left-10 duration-700 delay-100 mt-20">
          <h2 className="text-white font-black text-[max(5vw,48px)] leading-[1.1] drop-shadow-2xl">
            Order your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 underline decoration-red-500/30">favourite food</span> here
          </h2>
          <p className="text-white/80 text-[max(1.1vw,18px)] leading-relaxed font-medium drop-shadow-md mt-4">
            Experience the culinary revolution with Tomato. We bring the world's best cuisines straight to your door, crafted with love and passion.
          </p>
          <button
            onClick={() => {
              document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-8 px-[min(4vw,40px)] py-[min(2vw,20px)] bg-gradient-to-r from-red-500 to-orange-600 text-white font-black text-[max(1vw,16px)] rounded-2xl hover:scale-105 hover:shadow-2xl hover:shadow-red-500/40 transition-all flex items-center gap-3 uppercase tracking-widest"
          >
            Explore Menu <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}


export default Header
