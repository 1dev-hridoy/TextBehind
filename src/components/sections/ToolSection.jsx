
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Upload, Type, Palette, Maximize, FileImage, Image as ImageIcon, Loader2, Download, Sparkles } from 'lucide-react'
import html2canvas from 'html2canvas'

const fontOptions = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Anton', label: 'Anton' },
    { value: 'Hind Siliguri', label: 'Hind Siliguri' },
    { value: 'Indie Flower', label: 'Indie Flower' },
    { value: 'Luckiest Guy', label: 'Luckiest Guy' },
    { value: 'Oswald', label: 'Oswald' },
    { value: 'Satisfy', label: 'Satisfy' },
    { value: 'Ubuntu', label: 'Ubuntu' },
]

const colorOptions = [
    { value: '#000000', label: 'Black' },
    { value: '#ffffff', label: 'White' },
    { value: '#ef4444', label: 'Red' },
    { value: '#22c55e', label: 'Green' },
    { value: '#3b82f6', label: 'Blue' },
    { value: '#eab308', label: 'Yellow' },
    { value: '#d946ef', label: 'Magenta' },
    { value: '#06b6d4', label: 'Cyan' },
    { value: '#f97316', label: 'Orange' },
    { value: '#a855f7', label: 'Purple' },
    { value: '#ec4899', label: 'Pink' },
    { value: '#78350f', label: 'Brown' },
]

const sizeOptions = [
    { value: '2rem', label: 'Small' },
    { value: '4rem', label: 'Medium' },
    { value: '6rem', label: 'Large' },
    { value: '8rem', label: 'X-Large' },
    { value: '10rem', label: 'Huge' },
    { value: '12rem', label: 'Massive' },
]

export function ToolSection() {
    const previewRef = useRef(null)
    const [file, setFile] = useState(null)
    const [uploadedImage, setUploadedImage] = useState(null)
    const [processedImage, setProcessedImage] = useState(null)






    // Server-side state
    const [originalUrl, setOriginalUrl] = useState(null)
    const [maskUrl, setMaskUrl] = useState(null)

    const [textInput, setTextInput] = useState('')
    const [selectedFont, setSelectedFont] = useState('Inter')
    const [selectedColor, setSelectedColor] = useState('#ffffff')
    const [selectedSize, setSelectedSize] = useState('6rem')
    const [isProcessing, setIsProcessing] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const [activeTab, setActiveTab] = useState('content')





    // Advanced Effects State
    const [textOpacity, setTextOpacity] = useState(100)
    const [shadowBlur, setShadowBlur] = useState(0)
    const [shadowColor, setShadowColor] = useState('#000000')
    const [letterSpacing, setLetterSpacing] = useState(0)
    const [showTextPlate, setShowTextPlate] = useState(false)
    const [plateColor, setPlateColor] = useState('#000000')
    const [isRetro, setIsRetro] = useState(false)
    const [sharpenAmount, setSharpenAmount] = useState(0)




    const fetchImageAsBlob = async (url) => {
        try {

            const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(url)
            const response = await fetch(proxyUrl)
            if (!response.ok) throw new Error('Proxy fetch failed')
            const blob = await response.blob()
            return URL.createObjectURL(blob)
        } catch (e) {
            console.warn("Blob fetch failed, falling back to usage with potential CORS issues", e)
            return url
        }
    }






    const handleImageUpload = (event) => {
        const selectedFile = event.target.files[0]
        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                toast.error("File too large", { description: "Please upload an image smaller than 5MB." })
                return
            }
            const url = URL.createObjectURL(selectedFile)
            setFile(selectedFile)
            setUploadedImage(url)
            setProcessedImage(null)
            setOriginalUrl(null)
            setMaskUrl(null)
            toast.success("Image selected", { description: "Click 'Generate Result' to process." })
        }
    }





    const processImage = async () => {
        if (!file || !textInput) {
            toast.error("Missing information", { description: "Please upload an image and enter some text." })
            return
        }

        setIsProcessing(true)
        setProcessedImage(null)

        try {


            toast.info("Uploading image...", { duration: 2000 })
            const formData = new FormData()
            formData.append('file', file)

            const uploadResponse = await fetch('https://tmpfiles.org/api/v1/upload', {
                method: 'POST',
                body: formData
            })

            if (!uploadResponse.ok) throw new Error('Failed to upload image')

            const uploadData = await uploadResponse.json()
            let imageUrl = uploadData.data.url

            // Convert to download URL
            const dlUrl = imageUrl.replace('tmpfiles.org/', 'tmpfiles.org/dl/')
            setOriginalUrl(dlUrl);



            toast.info("Removing background...", { duration: 4000 })
            const bgResponse = await fetch('/api/removebg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    imageUrl: dlUrl
                })
            })




            if (!bgResponse.ok) throw new Error('Failed to remove background')

            const bgData = await bgResponse.json()

            if (bgData.status === 'success' && bgData.data.result) {


                const safeUrl = await fetchImageAsBlob(bgData.data.result)
                setProcessedImage(safeUrl)
                setMaskUrl(bgData.data.result)
                toast.success("Success!", { description: "Text placed behind image." })
            } else {
                throw new Error('API returned error or no result')
            }




        } catch (error) {
            console.error(error)
            toast.error("Process failed", { description: "Something went wrong. Please try again." })
        } finally {
            setIsProcessing(false)
        }
    }




    const handleDownload = async () => {
        setIsDownloading(true)
        try {
            // Use Server-Side Composition
            const response = await fetch('/api/compose', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    originalImageUrl: originalUrl,
                    maskImageUrl: maskUrl,
                    textConfig: {
                        content: textInput,
                        font: selectedFont,
                        size: selectedSize,
                        color: selectedColor,
                        opacity: textOpacity / 100,
                        letterSpacing: letterSpacing,
                        shadow: {
                            blur: shadowBlur,
                            color: shadowColor
                        }
                    },
                    effects: {
                        sharpen: sharpenAmount,
                        retro: isRetro
                    },
                    previewWidth: 800
                })
            });




            if (!response.ok) throw new Error('Generation failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `composition-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.success("High-Quality Image Downloaded!")
        } catch (err) {
            console.error("Download failed:", err)
            toast.error("Download failed", { description: "Could not generate server-side image. Try again." })
        } finally {
            setIsDownloading(false)
        }
    }





    // Styles for Effects
    const getTextStyle = () => {
        return {
            fontFamily: selectedFont,
            fontSize: selectedSize,
            fontWeight: 'bold',
            lineHeight: 1,
            zIndex: 20,
            color: selectedColor,
            opacity: textOpacity / 100,
            textShadow: `0 10px ${shadowBlur}px ${shadowColor}`,
            letterSpacing: `${letterSpacing}px`,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxWidth: '90%'
        }
    }

    const getPlateStyle = () => {
        if (!showTextPlate) return {}
        return {
            backgroundColor: plateColor + '99',
            padding: '0.2em 0.5em',
            borderRadius: '0.2em',
            backdropFilter: 'blur(4px)',
        }
    }




    return (
        <section id="tool" className="py-24 bg-muted/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">Create Your Masterpiece</h2>
                    <p className="text-muted-foreground">Customize every detail to match your vision.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                    {/* Controls Panel (Left Col) */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="flex p-1 bg-muted rounded-xl border">
                            {['content', 'style', 'effects'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === tab
                                        ? 'bg-background text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>




                        <Card className="border shadow-none bg-card">
                            <CardContent className="p-6 space-y-6">
                                {/* Tab: Content */}
                                {activeTab === 'content' && (
                                    <div className="space-y-6 animate-fade-in-up">
                                        <div className="space-y-3">
                                            <Label className="text-sm font-medium">1. Source Image</Label>
                                            <div className="p-4 border-2 border-dashed rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors text-center cursor-pointer relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                                <div className="flex flex-col items-center gap-2 py-4">
                                                    <Upload className="w-8 h-8 text-muted-foreground" />
                                                    <span className="text-sm text-muted-foreground">Click to upload image</span>
                                                </div>
                                            </div>
                                            {file && <p className="text-xs text-green-600 font-medium text-center">Selected: {file.name}</p>}
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-sm font-medium">2. Text Content</Label>
                                            <Textarea
                                                placeholder="Enter your text here..."
                                                value={textInput}
                                                onChange={(e) => setTextInput(e.target.value)}
                                                className="min-h-[100px] text-lg resize-none"
                                            />
                                        </div>

                                        <Button
                                            onClick={processImage}
                                            disabled={!file || !textInput || isProcessing}
                                            className="w-full h-12 text-base shadow-lg shadow-primary/20"
                                        >
                                            {isProcessing ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="mr-2 h-5 w-5" />
                                                    Generate Composition
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                )}



                                {/* Tab: Style */}
                                {activeTab === 'style' && (
                                    <div className="space-y-6 animate-fade-in-up">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-xs text-muted-foreground">Font Family</Label>
                                                <Select value={selectedFont} onValueChange={setSelectedFont}>
                                                    <SelectTrigger className="h-10">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {fontOptions.map((font) => (
                                                            <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                                                                {font.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-xs text-muted-foreground">Size</Label>
                                                <Select value={selectedSize} onValueChange={setSelectedSize}>
                                                    <SelectTrigger className="h-10">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {sizeOptions.map((size) => (
                                                            <SelectItem key={size.value} value={size.value}>
                                                                {size.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-xs text-muted-foreground">Color</Label>
                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-10 h-10 rounded-full overflow-hidden border ring-1 ring-border shadow-sm shrink-0">
                                                        <input
                                                            type="color"
                                                            value={selectedColor}
                                                            onChange={(e) => setSelectedColor(e.target.value)}
                                                            className="absolute -top-2 -left-2 w-16 h-16 p-0 border-none cursor-pointer"
                                                        />
                                                    </div>
                                                    <Select value={selectedColor} onValueChange={setSelectedColor}>
                                                        <SelectTrigger className="w-full h-10">
                                                            <SelectValue placeholder="Or select preset..." />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {colorOptions.map((color) => (
                                                                <SelectItem key={color.value} value={color.value}>
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: color.value }}></div>
                                                                        {color.label}
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="border-border/50" />

                                        <div className="space-y-5">
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <Label className="text-xs text-muted-foreground">Opacity</Label>
                                                    <span className="text-xs font-mono">{textOpacity}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={textOpacity}
                                                    onChange={(e) => setTextOpacity(e.target.value)}
                                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary"
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <Label className="text-xs text-muted-foreground">Spacing</Label>
                                                    <span className="text-xs font-mono">{letterSpacing}px</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="-10"
                                                    max="50"
                                                    value={letterSpacing}
                                                    onChange={(e) => setLetterSpacing(e.target.value)}
                                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}





                                {/* Tab: Effects */}
                                {activeTab === 'effects' && (
                                    <div className="space-y-6 animate-fade-in-up">

                                        {/* Sharpening Control */}
                                        <div className="p-4 rounded-xl border bg-muted/20 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-medium flex items-center gap-2">
                                                    <Sparkles className="w-3 h-3 text-yellow-500" />
                                                    Sharpening (HQ)
                                                </Label>
                                                <span className="text-xs font-mono">{sharpenAmount}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={sharpenAmount}
                                                onChange={(e) => setSharpenAmount(e.target.value)}
                                                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                                            />
                                            <p className="text-[10px] text-muted-foreground">Applies to downloaded image only</p>
                                        </div>

                                        {/* Text Shadow */}
                                        <div className="p-4 rounded-xl border bg-muted/20 space-y-4">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                                                Text Shadow
                                            </Label>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <Label className="text-xs text-muted-foreground">Blur Radius</Label>
                                                        <span className="text-xs font-mono text-muted-foreground">{shadowBlur}px</span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="50"
                                                        value={shadowBlur}
                                                        onChange={(e) => setShadowBlur(e.target.value)}
                                                        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <Label className="text-xs text-muted-foreground">Shadow Color</Label>
                                                    <div className="relative w-8 h-8 rounded-full overflow-hidden border shadow-sm cursor-pointer ring-1 ring-border">
                                                        <input
                                                            type="color"
                                                            value={shadowColor}
                                                            onChange={(e) => setShadowColor(e.target.value)}
                                                            className="absolute -top-2 -left-2 w-12 h-12 p-0 border-none cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>






                                        {/* Text Plate Toggle */}
                                        <div className="flex items-center justify-between p-3 rounded-xl border bg-card hover:bg-muted/30 transition-colors">
                                            <div className="space-y-0.5">
                                                <Label htmlFor="plate-toggle" className="text-sm font-medium cursor-pointer">Text Background Box</Label>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {showTextPlate && (
                                                    <div className="relative w-6 h-6 rounded-full overflow-hidden border shadow-sm cursor-pointer">
                                                        <input
                                                            type="color"
                                                            value={plateColor}
                                                            onChange={(e) => setPlateColor(e.target.value)}
                                                            className="absolute -top-2 -left-2 w-10 h-10 p-0 border-none"
                                                        />
                                                    </div>
                                                )}
                                                <input
                                                    id="plate-toggle"
                                                    type="checkbox"
                                                    checked={showTextPlate}
                                                    onChange={(e) => setShowTextPlate(e.target.checked)}
                                                    className="w-4 h-4 accent-primary"
                                                />
                                            </div>
                                        </div>






                                        {/* Retro Effect Toggle */}
                                        <div className="flex items-center justify-between p-3 rounded-xl border bg-card hover:bg-muted/30 transition-colors">
                                            <div className="space-y-0.5">
                                                <Label htmlFor="retro-toggle" className="text-sm font-medium cursor-pointer">Retro Filter</Label>
                                            </div>
                                            <input
                                                id="retro-toggle"
                                                type="checkbox"
                                                checked={isRetro}
                                                onChange={(e) => setIsRetro(e.target.checked)}
                                                className="w-4 h-4 accent-primary"
                                            />
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>





                    {/* Preview Panel (Right Col) */}
                    <div className="lg:col-span-8 flex flex-col h-[600px] lg:h-auto gap-4">
                        {/* Artboard Toolbar */}
                        <div className="flex items-center justify-between p-2 bg-card border rounded-lg shadow-sm">
                            <div className="flex items-center gap-2 px-2">
                                <Maximize className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium text-muted-foreground">Artboard</span>
                            </div>
                            {processedImage && (
                                <Button
                                    size="sm"
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="h-8 text-xs"
                                >
                                    {isDownloading ? <Loader2 className="w-3 h-3 mr-2 animate-spin" /> : <Download className="w-3 h-3 mr-2" />}
                                    Download HQ
                                </Button>
                            )}
                        </div>





                        <div className="flex-grow bg-grid-white/[0.02] bg-[length:20px_20px] bg-muted/20 border-2 border-dashed border-border/50 rounded-xl relative overflow-hidden flex items-center justify-center p-8">

                            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                                backgroundImage: `linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)`,
                                backgroundSize: '20px 20px',
                                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                            }}></div>



                            <div
                                className="relative shadow-2xl rounded-sm overflow-hidden bg-transparent select-none max-w-full max-h-full"
                            >
                                {uploadedImage ? (
                                    <div
                                        ref={previewRef}
                                        className="relative w-auto h-auto max-w-full max-h-[600px] flex items-center justify-center object-contain bg-transparent"
                                        data-html2canvas-ignore="false"
                                        style={isRetro ? { filter: 'sepia(0.3) contrast(1.1) brightness(0.9) grayscale(0.2)' } : {}}
                                    >


                                        <img
                                            src={uploadedImage}
                                            alt="Original"
                                            className="relative z-10 w-auto h-auto max-h-[600px] object-contain block"
                                            crossOrigin="anonymous"

                                        />


                                        <div
                                            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                                        >
                                            <span
                                                className="text-center"
                                                style={{ ...getTextStyle(), ...getPlateStyle() }}
                                            >
                                                {textInput}
                                            </span>
                                        </div>




                                        {processedImage && (
                                            <img
                                                src={processedImage}
                                                alt="Processed"
                                                className="absolute inset-0 z-30 w-full h-full object-contain pointer-events-none"
                                                crossOrigin="anonymous"
                                            />
                                        )}




                                        {isRetro && (
                                            <div
                                                className="absolute inset-0 pointer-events-none z-40 opacity-20 mix-blend-overlay"
                                                style={{
                                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                                                    backgroundRepeat: 'repeat'
                                                }}
                                            ></div>
                                        )}

                                    </div>
                                ) : (




                                    // Empty state
                                    <div className="w-[300px] h-[400px] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-muted-foreground/20 rounded-xl bg-card/50 backdrop-blur-sm">
                                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                            <ImageIcon className="w-8 h-8 text-muted-foreground" />
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">Artboard Empty</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Upload an image from the "Content" tab to start designing.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
