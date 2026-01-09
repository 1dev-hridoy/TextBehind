import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-full border border-border shadow-sm object-cover" />
                        <span className="text-xl font-bold text-foreground tracking-tight">
                            TextBehind
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
                        <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
                        <a href="#tool" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Create</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hidden sm:flex"
                            onClick={() => toast.info("Coming Soon", { description: "User authentication is not available yet." })}
                        >
                            Log In
                        </Button>
                        <Button size="sm" asChild>
                            <a href="#tool">Get Started</a>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
