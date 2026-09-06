import React, { useState, useRef } from 'react';
import { 
  X, 
  Crop, 
  FileText, 
  Sliders, 
  Download, 
  Upload, 
  RefreshCw, 
  Layers, 
  Check, 
  Sparkles, 
  Image as ImageIcon,
  Minimize2,
  Combine,
  Scissors,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface SarkariToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'photo' | 'pdf';
}

export const SarkariToolsModal: React.FC<SarkariToolsModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'photo',
}) => {
  const [activeTab, setActiveTab] = useState<'photo' | 'pdf'>(initialTab);

  // ----------------------------------------------------
  // TAB 1: PHOTO & SIGNATURE KB RESIZER & COMPRESSOR STATE
  // ----------------------------------------------------
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [originalSizeKb, setOriginalSizeKb] = useState<number>(0);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [compressedSizeKb, setCompressedSizeKb] = useState<number>(0);
  const [targetKb, setTargetKb] = useState<number>(40); // default 40 KB
  const [targetWidth, setTargetWidth] = useState<number>(350);
  const [targetHeight, setTargetHeight] = useState<number>(450);
  const [candidateName, setCandidateName] = useState<string>('');
  const [dateOfPhoto, setDateOfPhoto] = useState<string>('');
  const [isProcessingPhoto, setIsProcessingPhoto] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ----------------------------------------------------
  // TAB 2: iLovePDF STYLE TOOLS STATE
  // ----------------------------------------------------
  const [pdfToolMode, setPdfToolMode] = useState<'merge' | 'split' | 'imgToPdf' | 'compress'>('merge');
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [splitPageRange, setSplitPageRange] = useState<string>('1');
  const [imageFilesForPdf, setImageFilesForPdf] = useState<File[]>([]);
  const [isProcessingPdf, setIsProcessingPdf] = useState<boolean>(false);
  const [pdfStatusMessage, setPdfStatusMessage] = useState<string>('');

  if (!isOpen) return null;

  // ----------------------------------------------------
  // PHOTO RESIZER LOGIC
  // ----------------------------------------------------
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoFile(file);
    setOriginalSizeKb(Math.round(file.size / 1024));

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPhotoPreview(result);
      processImageCompression(result, targetKb, targetWidth, targetHeight, candidateName, dateOfPhoto);
    };
    reader.readAsDataURL(file);
  };

  const processImageCompression = (
    imageSrc: string,
    desiredKb: number,
    w: number,
    h: number,
    name: string,
    dop: string
  ) => {
    setIsProcessingPhoto(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessingPhoto(false);
        return;
      }

      // Draw original image resized
      ctx.drawImage(img, 0, 0, w, h);

      // If Candidate Name or Date of Photo is specified, draw standard exam white strip at bottom
      if (name.trim() || dop.trim()) {
        const stripHeight = Math.max(45, Math.round(h * 0.18));
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, h - stripHeight, w, stripHeight);
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';

        const fontSize = Math.max(12, Math.round(w * 0.048));
        ctx.font = `bold ${fontSize}px sans-serif`;

        if (name.trim() && dop.trim()) {
          ctx.fillText(name.toUpperCase(), w / 2, h - stripHeight + fontSize + 3);
          ctx.font = `normal ${fontSize - 2}px sans-serif`;
          ctx.fillText(`DOP: ${dop}`, w / 2, h - 8);
        } else if (name.trim()) {
          ctx.fillText(name.toUpperCase(), w / 2, h - Math.round(stripHeight / 2) + 5);
        } else if (dop.trim()) {
          ctx.fillText(`DOP: ${dop}`, w / 2, h - Math.round(stripHeight / 2) + 5);
        }
      }

      // Binary search for image quality to reach exact desired KB
      let minQuality = 0.05;
      let maxQuality = 0.98;
      let bestDataUrl = '';
      let bestSizeKb = 0;

      for (let i = 0; i < 8; i++) {
        const midQuality = (minQuality + maxQuality) / 2;
        const dataUrl = canvas.toDataURL('image/jpeg', midQuality);
        const head = 'data:image/jpeg;base64,';
        const currentSizeKb = Math.round(((dataUrl.length - head.length) * 3) / 4 / 1024);

        bestDataUrl = dataUrl;
        bestSizeKb = currentSizeKb;

        if (currentSizeKb > desiredKb) {
          maxQuality = midQuality;
        } else {
          minQuality = midQuality;
        }
      }

      setCompressedPreview(bestDataUrl);
      setCompressedSizeKb(bestSizeKb);
      setIsProcessingPhoto(false);
    };
  };

  const handleApplyPreset = (kb: number, w: number, h: number) => {
    setTargetKb(kb);
    setTargetWidth(w);
    setTargetHeight(h);
    if (photoPreview) {
      processImageCompression(photoPreview, kb, w, h, candidateName, dateOfPhoto);
    }
  };

  const handleDownloadPhoto = () => {
    if (!compressedPreview) return;
    const a = document.createElement('a');
    a.href = compressedPreview;
    a.download = `sarkari_photo_${compressedSizeKb}KB.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // ----------------------------------------------------
  // PDF TOOLS LOGIC (pdf-lib)
  // ----------------------------------------------------
  const handlePdfMerge = async () => {
    if (pdfFiles.length < 2) {
      setPdfStatusMessage('कृपया कम से कम 2 पीडीएफ फाइलें चुनें।');
      return;
    }

    try {
      setIsProcessingPdf(true);
      setPdfStatusMessage('पीडीएफ फाइलों को जोड़ा जा रहा है...');

      const mergedPdf = await PDFDocument.create();

      for (const file of pdfFiles) {
        const fileBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `sarkari_merged_${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setPdfStatusMessage('✅ पीडीएफ सफलता से मर्ज होकर डाउनलोड हो गया!');
    } catch (err: any) {
      console.error(err);
      setPdfStatusMessage(`त्रुटि: ${err.message || 'पीडीएफ प्रोसेस नहीं हो सका।'}`);
    } finally {
      setIsProcessingPdf(false);
    }
  };

  const handlePdfSplit = async () => {
    if (pdfFiles.length === 0) {
      setPdfStatusMessage('कृपया एक पीडीएफ फाइल चुनें।');
      return;
    }

    try {
      setIsProcessingPdf(true);
      setPdfStatusMessage('पेज अलग किए जा रहे हैं...');

      const file = pdfFiles[0];
      const fileBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileBuffer);
      const totalPages = pdf.getPageCount();

      // Parse range like "1-2" or "1,2"
      const pagesToExtract: number[] = [];
      const parts = splitPageRange.split(/[,-]/).map((p) => parseInt(p.trim(), 10));

      if (splitPageRange.includes('-') && parts.length === 2) {
        const start = Math.max(1, parts[0]);
        const end = Math.min(totalPages, parts[1]);
        for (let i = start; i <= end; i++) pagesToExtract.push(i - 1);
      } else {
        parts.forEach((p) => {
          if (!isNaN(p) && p >= 1 && p <= totalPages) {
            pagesToExtract.push(p - 1);
          }
        });
      }

      if (pagesToExtract.length === 0) {
        pagesToExtract.push(0); // fallback page 1
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdf, pagesToExtract);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `sarkari_split_pages_${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setPdfStatusMessage(`✅ चयनित पेज अलग होकर डाउनलोड हो गए (कुल ${copiedPages.length} पेज)!`);
    } catch (err: any) {
      console.error(err);
      setPdfStatusMessage(`त्रुटि: ${err.message || 'पेज अलग नहीं हो सके।'}`);
    } finally {
      setIsProcessingPdf(false);
    }
  };

  const handleImagesToPdf = async () => {
    if (imageFilesForPdf.length === 0) {
      setPdfStatusMessage('कृपया फोटो/दस्तावेज चुनें।');
      return;
    }

    try {
      setIsProcessingPdf(true);
      setPdfStatusMessage('फोटो से पीडीएफ तैयार किया जा रहा है...');

      const pdfDoc = await PDFDocument.create();

      for (const imgFile of imageFilesForPdf) {
        const arrayBuffer = await imgFile.arrayBuffer();
        let image;
        if (imgFile.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          image = await pdfDoc.embedJpg(arrayBuffer);
        }

        // Standard A4 Size: 595 x 842 points
        const page = pdfDoc.addPage([595, 842]);
        const imgDims = image.scaleToFit(555, 802);

        page.drawImage(image, {
          x: (595 - imgDims.width) / 2,
          y: (842 - imgDims.height) / 2,
          width: imgDims.width,
          height: imgDims.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `sarkari_documents_${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setPdfStatusMessage('✅ फोटो से A4 पीडीएफ सफलता से बन गया!');
    } catch (err: any) {
      console.error(err);
      setPdfStatusMessage(`त्रुटि: ${err.message || 'पीडीएफ नहीं बन सका।'}`);
    } finally {
      setIsProcessingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden border-2 border-[#000066] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#000066] via-blue-900 to-[#cc0000] text-white p-4 sm:p-5 flex items-center justify-between border-b-4 border-amber-400 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-red-950 flex items-center justify-center font-black shadow-lg">
              <Crop className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-2xl font-black tracking-tight text-white font-sans">
                  सरकारी टूल्स हब (Sarkari Utility Tools)
                </h3>
                <span className="bg-amber-400 text-red-950 text-[10px] sm:text-xs font-black px-2 py-0.5 rounded shadow-sm">
                  100% Free
                </span>
              </div>
              <p className="text-xs sm:text-sm text-yellow-200 font-medium">
                फोटो व सिग्नेचर को निश्चित KB में बनाएं और iLovePDF स्टाइल के सभी पीडीएफ टूल्स
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-black/30 hover:bg-red-600 text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-gray-100 px-4 py-2.5 border-b border-gray-300 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('photo')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'photo'
                  ? 'bg-[#000066] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
              }`}
            >
              <Crop className="w-4 h-4 text-amber-400" />
              <span>📷 फोटो व सिग्नेचर KB रिसाइज़र</span>
            </button>

            <button
              onClick={() => setActiveTab('pdf')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'pdf'
                  ? 'bg-red-700 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
              }`}
            >
              <FileText className="w-4 h-4 text-yellow-300" />
              <span>📑 iLovePDF स्टाइल पीडीएफ टूल्स</span>
            </button>
          </div>

          <span className="hidden sm:inline text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded border border-emerald-300">
            🔒 सुरक्षित: आपके दस्तावेज आपके डिवाइस पर ही प्रोसेस होते हैं
          </span>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          
          {/* ==================================================== */}
          {/* TAB 1: PHOTO & SIGNATURE KB RESIZER & COMPRESSOR */}
          {/* ==================================================== */}
          {activeTab === 'photo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Controls Column */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* File Upload Box */}
                <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#000066] transition-colors text-center">
                  <input
                    type="file"
                    id="sarkari-photo-input"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="sarkari-photo-input"
                    className="cursor-pointer flex flex-col items-center justify-center p-3"
                  >
                    <Upload className="w-10 h-10 text-blue-800 mb-2" />
                    <span className="text-sm font-black text-gray-900">
                      फोटो या सिग्नेचर सेलेक्ट करें (Click to Upload)
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      JPG, PNG या WebP फॉर्मेट (मूल साइज: {originalSizeKb > 0 ? `${originalSizeKb} KB` : 'कोई नहीं'})
                    </span>
                  </label>
                </div>

                {/* Sarkari Exam Quick Presets */}
                <div className="bg-white p-4 rounded-xl border border-gray-300 shadow-2xs space-y-2">
                  <span className="text-xs font-black uppercase text-gray-500 tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>सरकारी भर्ती प्रीसेट्स (1-Click Exam Presets):</span>
                  </span>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => handleApplyPreset(40, 350, 450)}
                      className="p-2 rounded border border-blue-200 bg-blue-50/50 hover:bg-blue-100 text-left transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-black text-blue-950 block">SSC Photo</span>
                      <span className="text-[10px] text-gray-600 block">20-50 KB • 3.5x4.5cm</span>
                    </button>

                    <button
                      onClick={() => handleApplyPreset(15, 280, 120)}
                      className="p-2 rounded border border-blue-200 bg-blue-50/50 hover:bg-blue-100 text-left transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-black text-blue-950 block">SSC Signature</span>
                      <span className="text-[10px] text-gray-600 block">10-20 KB • सिग्नेचर</span>
                    </button>

                    <button
                      onClick={() => handleApplyPreset(70, 400, 500)}
                      className="p-2 rounded border border-blue-200 bg-blue-50/50 hover:bg-blue-100 text-left transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-black text-blue-950 block">UPSC / State PSC</span>
                      <span className="text-[10px] text-gray-600 block">50-100 KB फोटो</span>
                    </button>

                    <button
                      onClick={() => handleApplyPreset(30, 300, 380)}
                      className="p-2 rounded border border-blue-200 bg-blue-50/50 hover:bg-blue-100 text-left transition-colors cursor-pointer"
                    >
                      <span className="text-xs font-black text-blue-950 block">Railway RRB</span>
                      <span className="text-[10px] text-gray-600 block">20-50 KB फोटो</span>
                    </button>
                  </div>
                </div>

                {/* Target KB Slider & Manual Controls */}
                <div className="bg-white p-4 rounded-xl border border-gray-300 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-black text-gray-800 flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-red-600" />
                      <span>टारगेट साइज (Target File Size):</span>
                    </label>
                    <span className="text-sm font-black text-[#000066] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                      {targetKb} KB
                    </span>
                  </div>

                  <input
                    type="range"
                    min="10"
                    max="300"
                    step="5"
                    value={targetKb}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setTargetKb(val);
                      if (photoPreview) {
                        processImageCompression(photoPreview, val, targetWidth, targetHeight, candidateName, dateOfPhoto);
                      }
                    }}
                    className="w-full accent-[#000066] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                    <span>10 KB (न्यूनतम)</span>
                    <span>50 KB (SSC मानक)</span>
                    <span>100 KB (UPSC)</span>
                    <span>300 KB (अधिकतम)</span>
                  </div>

                  {/* Dimensions */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-[11px] font-bold text-gray-600 block mb-1">
                        चौड़ाई (Width px):
                      </label>
                      <input
                        type="number"
                        value={targetWidth}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 300;
                          setTargetWidth(val);
                          if (photoPreview) {
                            processImageCompression(photoPreview, targetKb, val, targetHeight, candidateName, dateOfPhoto);
                          }
                        }}
                        className="w-full p-2 border border-gray-300 rounded text-xs font-semibold focus:border-[#000066]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-600 block mb-1">
                        ऊंचाई (Height px):
                      </label>
                      <input
                        type="number"
                        value={targetHeight}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 400;
                          setTargetHeight(val);
                          if (photoPreview) {
                            processImageCompression(photoPreview, targetKb, targetWidth, val, candidateName, dateOfPhoto);
                          }
                        }}
                        className="w-full p-2 border border-gray-300 rounded text-xs font-semibold focus:border-[#000066]"
                      />
                    </div>
                  </div>
                </div>

                {/* Candidate Name & Date of Photo (DOP) on Photo Banner */}
                <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-300 shadow-2xs space-y-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-amber-950 uppercase">
                      फोटो पर नाम व तारीख लिखें (Name & Date of Photo):
                    </span>
                    <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.2 rounded">
                      वैकल्पिक (Optional)
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-900 leading-tight">
                    SSC, UP Police और BPSC में फोटो के नीचे अभ्यर्थी का नाम और फोटो की तारीख (DOP) लिखना आवश्यक होता है।
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <input
                        type="text"
                        placeholder="अभ्यर्थी का नाम (उदा. RAHUL KUMAR)"
                        value={candidateName}
                        onChange={(e) => {
                          setCandidateName(e.target.value);
                          if (photoPreview) {
                            processImageCompression(photoPreview, targetKb, targetWidth, targetHeight, e.target.value, dateOfPhoto);
                          }
                        }}
                        className="w-full p-2 bg-white border border-amber-300 rounded text-xs font-bold"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="फोटो की तारीख (उदा. 04/09/2026)"
                        value={dateOfPhoto}
                        onChange={(e) => {
                          setDateOfPhoto(e.target.value);
                          if (photoPreview) {
                            processImageCompression(photoPreview, targetKb, targetWidth, targetHeight, candidateName, e.target.value);
                          }
                        }}
                        className="w-full p-2 bg-white border border-amber-300 rounded text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Live Preview & Download Column */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white p-5 rounded-xl border border-gray-300 shadow-sm text-center">
                <span className="text-xs font-black text-gray-500 uppercase mb-3">
                  लाइव आउटपुट प्रीव्यू (Live Resized Preview)
                </span>

                <div className="w-full max-w-[280px] min-h-[280px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center p-2 overflow-hidden shadow-inner relative">
                  {compressedPreview ? (
                    <img
                      src={compressedPreview}
                      alt="Compressed Preview"
                      className="max-h-[260px] object-contain rounded shadow-sm"
                    />
                  ) : (
                    <div className="text-gray-400 text-xs flex flex-col items-center">
                      <ImageIcon className="w-12 h-12 mb-2 text-gray-300" />
                      <span>फोटो सेलेक्ट करने पर यहां लाइव दिखेगा</span>
                    </div>
                  )}

                  {isProcessingPhoto && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-xs font-bold text-blue-900">
                      रिसाइज हो रहा है...
                    </div>
                  )}
                </div>

                {/* Size comparison indicator */}
                {compressedSizeKb > 0 && (
                  <div className="mt-4 w-full bg-blue-50 border border-blue-200 rounded-lg p-2.5 flex items-center justify-around text-xs">
                    <div>
                      <span className="text-gray-500 block text-[10px]">मूल साइज:</span>
                      <strong className="text-gray-700">{originalSizeKb} KB</strong>
                    </div>
                    <div className="text-blue-900 font-bold">➔</div>
                    <div>
                      <span className="text-emerald-700 block text-[10px] font-bold">रिसाइज साइज:</span>
                      <strong className="text-emerald-700 font-black text-sm">{compressedSizeKb} KB</strong>
                    </div>
                  </div>
                )}

                {/* Download Button */}
                <button
                  onClick={handleDownloadPhoto}
                  disabled={!compressedPreview}
                  className="mt-4 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>फोटो डाउनलोड करें ({compressedSizeKb > 0 ? `${compressedSizeKb} KB` : 'JPG'})</span>
                </button>
              </div>

            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2: iLovePDF STYLE SARKARI PDF TOOLS */}
          {/* ==================================================== */}
          {activeTab === 'pdf' && (
            <div className="space-y-6">
              
              {/* PDF Sub-Tool Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => { setPdfToolMode('merge'); setPdfStatusMessage(''); }}
                  className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                    pdfToolMode === 'merge'
                      ? 'border-[#000066] bg-blue-50 font-black text-[#000066] shadow-sm'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Combine className="w-6 h-6 mx-auto mb-1 text-blue-800" />
                  <span className="text-xs sm:text-sm font-bold block">Merge PDF</span>
                  <span className="text-[10px] text-gray-500 block">कई पीडीएफ को एक करें</span>
                </button>

                <button
                  onClick={() => { setPdfToolMode('split'); setPdfStatusMessage(''); }}
                  className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                    pdfToolMode === 'split'
                      ? 'border-red-600 bg-red-50 font-black text-red-700 shadow-sm'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Scissors className="w-6 h-6 mx-auto mb-1 text-red-700" />
                  <span className="text-xs sm:text-sm font-bold block">Split / Extract</span>
                  <span className="text-[10px] text-gray-500 block">पेज अलग करें</span>
                </button>

                <button
                  onClick={() => { setPdfToolMode('imgToPdf'); setPdfStatusMessage(''); }}
                  className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                    pdfToolMode === 'imgToPdf'
                      ? 'border-emerald-600 bg-emerald-50 font-black text-emerald-800 shadow-sm'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ImageIcon className="w-6 h-6 mx-auto mb-1 text-emerald-700" />
                  <span className="text-xs sm:text-sm font-bold block">Image to PDF</span>
                  <span className="text-[10px] text-gray-500 block">फोटो से A4 पीडीएफ</span>
                </button>

                <button
                  onClick={() => { setPdfToolMode('compress'); setPdfStatusMessage(''); }}
                  className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                    pdfToolMode === 'compress'
                      ? 'border-purple-600 bg-purple-50 font-black text-purple-800 shadow-sm'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Minimize2 className="w-6 h-6 mx-auto mb-1 text-purple-700" />
                  <span className="text-xs sm:text-sm font-bold block">Compress PDF</span>
                  <span className="text-[10px] text-gray-500 block">200KB / 300KB बनाएं</span>
                </button>
              </div>

              {/* Status Message */}
              {pdfStatusMessage && (
                <div className={`p-3 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 ${
                  pdfStatusMessage.includes('✅')
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{pdfStatusMessage}</span>
                </div>
              )}

              {/* SUB-TOOL: MERGE PDF */}
              {pdfToolMode === 'merge' && (
                <div className="bg-white p-5 rounded-xl border border-gray-300 space-y-4">
                  <div className="border-2 border-dashed border-blue-300 bg-blue-50/50 p-6 rounded-xl text-center">
                    <input
                      type="file"
                      id="pdf-merge-input"
                      multiple
                      accept="application/pdf"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setPdfFiles(files);
                      }}
                      className="hidden"
                    />
                    <label htmlFor="pdf-merge-input" className="cursor-pointer block">
                      <Combine className="w-10 h-10 text-blue-800 mx-auto mb-2" />
                      <span className="text-sm font-black text-blue-950 block">
                        2 या अधिक पीडीएफ फाइलें सेलेक्ट करें
                      </span>
                      <span className="text-xs text-gray-500 mt-0.5 block">
                        मार्कशीट, सर्टिफिकेट, फॉर्म रसीद आदि को एक फाइल में जोड़ें
                      </span>
                    </label>
                  </div>

                  {pdfFiles.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-gray-700 block">
                        चयनित फाइलें ({pdfFiles.length}):
                      </span>
                      <div className="max-h-40 overflow-y-auto space-y-1">
                        {pdfFiles.map((f, i) => (
                          <div key={i} className="flex items-center justify-between p-2 rounded bg-gray-50 border text-xs">
                            <span className="font-semibold text-gray-800 truncate max-w-xs">{i + 1}. {f.name}</span>
                            <span className="text-gray-500 font-mono text-[11px]">{Math.round(f.size / 1024)} KB</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={handlePdfMerge}
                        disabled={isProcessingPdf}
                        className="w-full py-3 px-4 rounded-xl bg-[#000066] hover:bg-blue-900 disabled:opacity-40 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                      >
                        <Combine className="w-4 h-4" />
                        <span>{isProcessingPdf ? 'प्रोसेसिंग...' : 'मर्ज करें और डाउनलोड करें (Merge PDF)'}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* SUB-TOOL: SPLIT PDF */}
              {pdfToolMode === 'split' && (
                <div className="bg-white p-5 rounded-xl border border-gray-300 space-y-4">
                  <div className="border-2 border-dashed border-red-300 bg-red-50/50 p-6 rounded-xl text-center">
                    <input
                      type="file"
                      id="pdf-split-input"
                      accept="application/pdf"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setPdfFiles(files);
                      }}
                      className="hidden"
                    />
                    <label htmlFor="pdf-split-input" className="cursor-pointer block">
                      <Scissors className="w-10 h-10 text-red-700 mx-auto mb-2" />
                      <span className="text-sm font-black text-red-950 block">
                        पीडीएफ फाइल अपलोड करें
                      </span>
                      <span className="text-xs text-gray-500 mt-0.5 block">
                        बड़ी नोटिफिकेशन पीडीएफ से विशिष्ट पेज अलग करें
                      </span>
                    </label>
                  </div>

                  {pdfFiles.length > 0 && (
                    <div className="space-y-3">
                      <div className="p-2 rounded bg-gray-50 border text-xs font-bold text-gray-800">
                        फाइल: {pdfFiles[0].name} ({Math.round(pdfFiles[0].size / 1024)} KB)
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">
                          निकालने हेतु पेज संख्या (उदा. 1-3 या 2, 4):
                        </label>
                        <input
                          type="text"
                          value={splitPageRange}
                          onChange={(e) => setSplitPageRange(e.target.value)}
                          placeholder="उदा. 1-2 या 1"
                          className="w-full p-2.5 border border-gray-300 rounded text-xs font-bold focus:border-red-600"
                        />
                      </div>

                      <button
                        onClick={handlePdfSplit}
                        disabled={isProcessingPdf}
                        className="w-full py-3 px-4 rounded-xl bg-red-700 hover:bg-red-800 disabled:opacity-40 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                      >
                        <Scissors className="w-4 h-4" />
                        <span>{isProcessingPdf ? 'प्रोसेसिंग...' : 'पेज अलग करें और डाउनलोड करें'}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* SUB-TOOL: IMAGE TO PDF */}
              {pdfToolMode === 'imgToPdf' && (
                <div className="bg-white p-5 rounded-xl border border-gray-300 space-y-4">
                  <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-6 rounded-xl text-center">
                    <input
                      type="file"
                      id="img-to-pdf-input"
                      multiple
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setImageFilesForPdf(files);
                      }}
                      className="hidden"
                    />
                    <label htmlFor="img-to-pdf-input" className="cursor-pointer block">
                      <ImageIcon className="w-10 h-10 text-emerald-700 mx-auto mb-2" />
                      <span className="text-sm font-black text-emerald-950 block">
                        दस्तावेज फोटो सेलेक्ट करें (1 या अधिक)
                      </span>
                      <span className="text-xs text-gray-500 mt-0.5 block">
                        10वीं/12वीं मार्कशीट, जाति, निवास प्रमाण पत्र की फोटो को A4 PDF बनाएं
                      </span>
                    </label>
                  </div>

                  {imageFilesForPdf.length > 0 && (
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-gray-700 block">
                        चयनित फोटो ({imageFilesForPdf.length}):
                      </span>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {imageFilesForPdf.map((f, i) => (
                          <div key={i} className="p-2 rounded bg-gray-100 border text-[11px] font-bold shrink-0">
                            {i + 1}. {f.name}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={handleImagesToPdf}
                        disabled={isProcessingPdf}
                        className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>{isProcessingPdf ? 'पीडीएफ तैयार हो रहा है...' : 'A4 पीडीएफ बनाएं व डाउनलोड करें'}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* SUB-TOOL: COMPRESS PDF */}
              {pdfToolMode === 'compress' && (
                <div className="bg-white p-5 rounded-xl border border-gray-300 space-y-4">
                  <div className="border-2 border-dashed border-purple-300 bg-purple-50/50 p-6 rounded-xl text-center">
                    <input
                      type="file"
                      id="pdf-compress-input"
                      accept="application/pdf"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setPdfFiles(files);
                      }}
                      className="hidden"
                    />
                    <label htmlFor="pdf-compress-input" className="cursor-pointer block">
                      <Minimize2 className="w-10 h-10 text-purple-700 mx-auto mb-2" />
                      <span className="text-sm font-black text-purple-950 block">
                        बड़ी साइज की पीडीएफ फाइल अपलोड करें
                      </span>
                      <span className="text-xs text-gray-500 mt-0.5 block">
                        सरकारी पोर्टल पर अपलोड करने हेतु पीडीएफ को 200 KB या 300 KB के अंदर लाएं
                      </span>
                    </label>
                  </div>

                  {pdfFiles.length > 0 && (
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-gray-50 border flex items-center justify-between text-xs">
                        <span className="font-bold text-gray-800">{pdfFiles[0].name}</span>
                        <span className="font-mono text-purple-900 font-black">
                          वर्तमान साइज: {Math.round(pdfFiles[0].size / 1024)} KB
                        </span>
                      </div>

                      <button
                        onClick={async () => {
                          try {
                            setIsProcessingPdf(true);
                            setPdfStatusMessage('पीडीएफ कंप्रेस किया जा रहा है...');
                            const file = pdfFiles[0];
                            const buffer = await file.arrayBuffer();
                            const pdfDoc = await PDFDocument.load(buffer);
                            // pdf-lib compress by rewriting streams
                            const compressedBytes = await pdfDoc.save({ useObjectStreams: true });
                            const blob = new Blob([compressedBytes], { type: 'application/pdf' });
                            const url = URL.createObjectURL(blob);

                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `sarkari_compressed_${Date.now()}.pdf`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                            setPdfStatusMessage(`✅ पीडीएफ कंप्रेस होकर सफलतापूर्वक डाउनलोड हो गया (${Math.round(compressedBytes.byteLength / 1024)} KB)!`);
                          } catch (err: any) {
                            setPdfStatusMessage(`त्रुटि: ${err.message || 'कंप्रेशन विफल रहा'}`);
                          } finally {
                            setIsProcessingPdf(false);
                          }
                        }}
                        disabled={isProcessingPdf}
                        className="w-full py-3 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 disabled:opacity-40 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                      >
                        <Minimize2 className="w-4 h-4" />
                        <span>{isProcessingPdf ? 'कंप्रेस हो रहा है...' : 'कंप्रेस करें और डाउनलोड करें'}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-gray-100 px-4 py-2.5 border-t border-gray-300 flex items-center justify-between text-xs text-gray-600">
          <span className="font-semibold text-blue-950">
            ★ mysarkariresult.co.in • 100% निशुल्क सरकारी परीक्षा टूल्स (No watermark)
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1 rounded bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold cursor-pointer"
          >
            बंद करें (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
