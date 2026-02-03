import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div className="relative py-24 px-4 w-full bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 text-center overflow-hidden" id="app-download">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] -z-0 pointer-events-none"></div>

      <div className="relative z-10">
        <p className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-10 leading-tight">
          For Better Experience Download <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Tomato App</span>
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <img
            src={assets.play_store}
            alt="Download from Google Play Store"
            className="h-16 md:h-20 cursor-pointer hover:scale-105 transition-transform drop-shadow-xl hover:shadow-orange-500/20"
          />
          <img
            src={assets.app_store}
            alt="Download from Apple App Store"
            className="h-16 md:h-20 cursor-pointer hover:scale-105 transition-transform drop-shadow-xl hover:shadow-orange-500/20"
          />
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
