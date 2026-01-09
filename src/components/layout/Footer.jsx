
import { Github, Twitter, Mail, Linkedin, Facebook } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-full border border-border shadow-sm object-cover" />
                            <span className="text-xl font-bold text-foreground">TextBehind</span>
                        </div>
                        <p className="text-muted-foreground mb-6 max-w-sm text-sm">
                            Create stunning compositions by placing text behind your images. Simple, fast, and professional.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://github.com/1dev-hridoy/TextBehind" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/1dev-hridoy/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="https://www.facebook.com/hridoy.py/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="mailto:contact@syntexcore.site" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-foreground mb-4 text-sm">Product</h3>
                        <ul className="space-y-3">
                            <li><a href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</a></li>
                            <li><Link to="/coming-soon" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
                            <li><Link to="/coming-soon" className="text-sm text-muted-foreground hover:text-foreground">Gallery</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-foreground mb-4 text-sm">Legal</h3>
                        <ul className="space-y-3">
                            <li><button onClick={() => toast.info("Coming Soon", { description: "Privacy Policy is not ready yet." })} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Privacy Policy</button></li>
                            <li><button onClick={() => toast.info("Coming Soon", { description: "Terms of Service is not ready yet." })} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Terms of Service</button></li>
                            <li><button onClick={() => toast.info("Coming Soon", { description: "Cookie Policy is not ready yet." })} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Cookie Policy</button></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted-foreground text-xs">© 2026 TextBehind. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
