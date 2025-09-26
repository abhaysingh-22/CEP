import { ArrowLeft, Check, Smartphone, Tablet, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ResponsiveTest = () => {
  return (
    <div className="min-h-screen bg-gradient-card pt-16 sm:pt-20 safe-area-top">
      <div className="container-responsive py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-responsive-4xl font-bold text-foreground mb-4">
            📱 Responsive Design Test
          </h1>
          <p className="text-responsive-base text-muted-foreground">
            Testing the improved responsiveness across different screen sizes
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid-responsive-1-2-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-nature-accent" />
                Mobile First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-responsive-sm">Touch-friendly buttons (44px+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-responsive-sm">Responsive text scaling</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-responsive-sm">Safe area support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-responsive-sm">Optimized spacing</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tablet className="h-5 w-5 text-nature-accent" />
                Tablet Layout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-responsive-sm">Adaptive grids</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-responsive-sm">Flexible navigation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-responsive-sm">Optimized chatbot size</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-responsive-sm">Balanced content density</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-nature-accent" />
                Desktop Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-responsive-sm">Full navigation visible</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-responsive-sm">Multi-column layouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-responsive-sm">Enhanced hover effects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-responsive-sm">Detailed voice instructions</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Responsive Text Demo */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Responsive Typography</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-responsive-4xl font-bold mb-2">Hero Heading</h2>
              <p className="text-muted-foreground text-sm">text-responsive-4xl: Scales from text-4xl → text-5xl → text-6xl</p>
            </div>
            <div>
              <h3 className="text-responsive-2xl font-semibold mb-2">Section Title</h3>
              <p className="text-muted-foreground text-sm">text-responsive-2xl: Scales from text-2xl → text-3xl</p>
            </div>
            <div>
              <p className="text-responsive-base mb-2">This is body text that scales responsively for optimal readability.</p>
              <p className="text-muted-foreground text-sm">text-responsive-base: Scales from text-base → text-lg</p>
            </div>
          </CardContent>
        </Card>

        {/* Layout Tests */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Layout Responsiveness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Flex Responsive */}
              <div>
                <h4 className="font-semibold mb-3">Responsive Flex Layout</h4>
                <div className="flex-responsive-col gap-4 p-4 bg-muted/50 rounded">
                  <Button variant="outline" className="touch-target">Button 1</Button>
                  <Button variant="outline" className="touch-target">Button 2</Button>
                  <Button variant="outline" className="touch-target">Button 3</Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Stacked on mobile, row on desktop
                </p>
              </div>

              {/* Grid Responsive */}
              <div>
                <h4 className="font-semibold mb-3">Responsive Grid</h4>
                <div className="grid-responsive-1-3 gap-4">
                  <div className="bg-nature-accent/20 p-4 rounded text-center">Item 1</div>
                  <div className="bg-nature-accent/20 p-4 rounded text-center">Item 2</div>
                  <div className="bg-nature-accent/20 p-4 rounded text-center">Item 3</div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  1 column on mobile, 3 columns on large screens
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Features */}
        <Card>
          <CardHeader>
            <CardTitle>✨ New Features Added</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid-responsive-1-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-nature-accent">🎨 Custom Favicon</h4>
                <ul className="space-y-2 text-responsive-sm">
                  <li>• Modern SVG favicon with eco theme</li>
                  <li>• Apple touch icon for mobile devices</li>
                  <li>• Theme color meta tag</li>
                  <li>• Multiple format support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-nature-accent">📱 Enhanced Mobile UX</h4>
                <ul className="space-y-2 text-responsive-sm">
                  <li>• Touch-friendly button sizing (44px+)</li>
                  <li>• Safe area inset support</li>
                  <li>• Optimized chatbot for mobile</li>
                  <li>• Responsive navigation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResponsiveTest;