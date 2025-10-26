import { useEffect, useMemo, useRef, useState } from 'react';
import { Download, ShoppingCart } from 'lucide-react';
import PlatePreview from './PlatePreview';

const constraints = {
  AL: {
    max: 8,
    regex: /^[A-Z0-9]{1,8}$/,
    hint: 'Up to 8 characters. Letters and numbers only.',
  },
  UK: {
    max: 8,
    regex: /^[A-Z0-9]{1,8}$/,
    hint: 'Typical UK format (e.g., AB12 CDE). Letters and numbers only.',
  },
};

export default function PlateCustomizer({ plateType, setPlateType, plateText, setPlateText, side, setSide }) {
  const [error, setError] = useState('');
  const canvasRef = useRef(null);

  const formatLabel = useMemo(() => (plateType === 'AL' ? 'Albanian' : 'British (UK)'), [plateType]);

  useEffect(() => {
    validate(plateText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plateType]);

  function validate(value) {
    const val = value.toUpperCase();
    const rule = constraints[plateType];
    if (val.length > rule.max) {
      setError(`Too long. Max ${rule.max} characters.`);
      return false;
    }
    if (val && !rule.regex.test(val)) {
      setError('Invalid character. Only A-Z and 0-9.');
      return false;
    }
    setError('');
    return true;
  }

  function onChange(e) {
    const next = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (next.length <= constraints[plateType].max) {
      setPlateText(next);
      validate(next);
    }
  }

  function downloadPlate() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${plateType}_${plateText || 'PLATE'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  return (
    <div className="w-full">
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 md:p-6 bg-white dark:bg-neutral-950">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Customize Plate</h2>
            <p className="text-sm text-neutral-500">Live updates on your plate preview. {formatLabel} format.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className={`px-3 py-1.5 rounded-md text-sm border ${plateType === 'AL' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900'}`}
              onClick={() => setPlateType('AL')}
            >AL</button>
            <button
              className={`px-3 py-1.5 rounded-md text-sm border ${plateType === 'UK' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900'}`}
              onClick={() => setPlateType('UK')}
            >UK</button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-2 space-y-4">
            <label className="block text-sm font-medium">Plate text</label>
            <input
              type="text"
              value={plateText}
              onChange={onChange}
              placeholder={plateType === 'AL' ? 'AA123BB' : 'AB12CDE'}
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={constraints[plateType].max}
              inputMode="latin"
            />
            <p className="text-xs text-neutral-500">{constraints[plateType].hint}</p>
            {error && <p className="text-xs text-red-500">{error}</p>}

            <div className="pt-2">
              <label className="block text-sm font-medium mb-2">Preview</label>
              <PlatePreview ref={canvasRef} plateType={plateType} plateText={plateText} side={side} />
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium">Plate position</label>
              <div className="mt-2 flex items-center gap-2">
                <button
                  className={`flex-1 px-3 py-2 rounded-md border text-sm ${side === 'front' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900'}`}
                  onClick={() => setSide('front')}
                >Front</button>
                <button
                  className={`flex-1 px-3 py-2 rounded-md border text-sm ${side === 'rear' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900'}`}
                  onClick={() => setSide('rear')}
                >Rear</button>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={downloadPlate}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 text-white px-4 py-2.5 font-medium hover:bg-blue-700 transition"
              >
                <Download size={18} /> Download PNG
              </button>
              <button
                className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-neutral-300 dark:border-neutral-700 px-4 py-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
              >
                <ShoppingCart size={18} /> Add to cart
              </button>
              <p className="text-xs text-neutral-500">Checkout integrations and order handling can be connected later.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
