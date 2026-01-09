
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Home, MoveLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <div className="relative mb-8">
                    <h1 className="text-[12rem] font-black text-muted/30 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                            Page Not Found
                        </p>
                    </div>
                </div>

                <p className="text-base text-muted-foreground max-w-md mx-auto mb-10">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button variant="outline" onClick={() => window.history.back()} className="h-12 px-6">
                        <MoveLeft className="mr-2 h-4 w-4" />
                        Go Back
                    </Button>
                    <Button asChild className="h-12 px-8 shadow-lg shadow-primary/20">
                        <Link to="/">
                            <Home className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </motion.div>


            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        </div>
    )
}
