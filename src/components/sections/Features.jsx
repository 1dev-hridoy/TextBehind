
import { Type, Image as ImageIcon, Zap, Download } from 'lucide-react'

const features = [
    {
        icon: Type,
        title: 'Custom Typography',
        description: 'Choose from a wide range of premium fonts to match your style perfectly.'
    },
    {
        icon: ImageIcon,
        title: 'High Resolution',
        description: 'Export your creations in crystal clear quality suitable for any platform.'
    },
    {
        icon: Zap,
        title: 'Instant Preview',
        description: 'See your changes in real-time with our lightning-fast rendering engine.'
    },
    {
        icon: Download,
        title: 'Easy Export',
        description: 'Download your masterpiece with a single click in your preferred format.'
    }
]

export function Features() {
    return (
        <section id="features" className="py-24 bg-background border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">Why Choose TextBehind?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        We provide all the tools you need to create professional-looking images without the steep learning curve of complex design software.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all">
                            <div className="w-10 h-10 border rounded-lg flex items-center justify-center mb-4 bg-background">
                                <feature.icon className="h-5 w-5 text-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
