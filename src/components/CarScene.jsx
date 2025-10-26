import Spline from '@splinetool/react-spline';
import PlatePreview from './PlatePreview';

export default function CarScene({ plateType, plateText, side }) {
  return (
    <div className="relative w-full h-[420px] md:h-full min-h-[380px] rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/m8wpIQzXWhEh9Yek/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none" />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] md:w-[70%] lg:w-[60%]">
        <PlatePreview plateType={plateType} plateText={plateText} side={side} />
        <p className="mt-2 text-center text-xs text-neutral-400">Live plate overlay. Full 3D car mounting will be added with GLB integration.</p>
      </div>
    </div>
  );
}
