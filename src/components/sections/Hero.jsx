
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero() {
    return (
        <section className="relative pt-20 pb-32 overflow-hidden">
            {/* Background gradients restored */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 transform -translate-x-1/2 left-1/2 w-[1000px] h-[500px] bg-indigo-200/30 rounded-[100%] blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[500px] bg-purple-200/30 rounded-[100%] blur-[80px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-white/50 backdrop-blur-sm mb-8 animate-fade-in-up">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="text-xs font-medium text-indigo-900">New AI-Powered Features Available</span>
                </div>

                <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 mb-6 leading-tight">
                    Text Behind Image <br />
                    <span className="text-indigo-600">Made Simple</span>
                </h1>

                <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                    Create professional, eye-catching compositions in seconds. No complex software needed—just upload, type, and download.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="h-12 px-8 text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200 border-none">
                        <a href="#tool" className="flex items-center">
                            Start Creating
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-white/60 hover:bg-white/80 backdrop-blur-sm border-gray-200">
                        View Gallery
                    </Button>
                </div>
            </div>
        </section>
    )
}
