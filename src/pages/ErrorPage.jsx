
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <AlertTriangle className="h-10 w-10 text-destructive" />
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
                    500 Error
                </h1>

                <p className="text-xl font-medium text-foreground mb-4">
                    Something went wrong on our end.
                </p>

                <p className="text-base text-muted-foreground max-w-md mx-auto mb-10">
                    We're experiencing some internal server issues. Our team has been notified and is working to fix the problem.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button variant="outline" onClick={() => window.location.reload()} className="h-12 px-6">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Try Again
                    </Button>
                    <Button asChild className="h-12 px-8 shadow-lg shadow-primary/20">
                        <Link to="/">
                            <Home className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}
