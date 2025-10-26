import Spline from '@splinetool/react-spline';

export default function HeroSection({ onStart }) {
  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/m8wpIQzXWhEh9Yek/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/50 pointer-events-none" />
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">Interactive 3D License Plate Customizer</h1>
            <p className="mt-4 text-neutral-200">
              Design Albanian and UK plates, preview on a 3D car, and download your design. Smooth, real-time updates inspired by the GTA Online experience.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <button onClick={onStart} className="inline-flex items-center justify-center rounded-md bg-white text-neutral-900 px-5 py-2.5 font-medium shadow hover:shadow-md transition">
                Start customizing
              </button>
              <a href="#customizer" className="text-white/90 hover:text-white">Learn more</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
