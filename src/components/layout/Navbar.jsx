
import { Button } from '@/components/ui/button'

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-foreground tracking-tight">
                            TextBehind
                        </span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</a>
                        <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
                        <a href="#tool" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Create</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="hidden sm:flex">Log In</Button>
                        <Button size="sm">
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
