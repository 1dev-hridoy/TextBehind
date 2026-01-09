
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Rocket, Bell, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export default function ComingSoon() {
    const handleNotify = () => {
        toast.success("Great!", { description: "We'll notify you when this feature launches." })
    }

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <div className="w-20 h-20 bg-primary/10 rounded-3xl rotate-12 flex items-center justify-center mx-auto mb-10">
                    <Rocket className="h-10 w-10 text-primary -rotate-12" />
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
                    Coming Soon
                </h1>

                <p className="text-xl font-medium text-foreground mb-4">
                    We're building something amazing!
                </p>

                <p className="text-base text-muted-foreground max-w-md mx-auto mb-12 leading-relaxed">
                    This feature is currently in active development. We're working hard to bring you the best experience possible.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button onClick={handleNotify} className="h-12 px-8 shadow-xl shadow-primary/25">
                        <Bell className="mr-2 h-4 w-4" />
                        Notify Me
                    </Button>
                    <Button asChild variant="ghost" className="h-12 px-8">
                        <Link to="/">
                            <Home className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </div>

                <div className="mt-16 pt-8 border-t max-w-sm mx-auto">
                    <div className="flex justify-center gap-8 items-center opacity-50">
                        <div className="text-xs uppercase tracking-widest font-semibold">Design</div>
                        <div className="text-xs uppercase tracking-widest font-semibold">Build</div>
                        <div className="text-xs uppercase tracking-widest font-semibold">Ship</div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
