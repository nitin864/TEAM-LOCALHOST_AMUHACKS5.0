import { Button } from "@/components/ui/button";

const ButtonPage = ()=> {
    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            3D Button Variants
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Click and interact with the buttons to see the 3D effects!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1 */}
          <div className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Filled Buttons
            </h2>
            
            <Button variant="default" className="w-full">
              DEFAULT
            </Button>

            <Button variant="primary" className="w-full">
              PRIMARY
            </Button>

            <Button variant="secondary" className="w-full">
              SECONDARY
            </Button>

            <Button variant="danger" className="w-full">
              DANGER
            </Button>

            <Button variant="super" className="w-full">
              SUPER
            </Button>

            <Button variant="ghost" className="w-full">
              GHOST
            </Button>
            <Button variant="sidebar" className="w-full">
              SIDEBAR
            </Button>
          </div>

          {/* Column 2 */}
          <div className="space-y-6 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Outline Buttons
            </h2>
            
            <Button variant="primary-outline" className="w-full">
              PRIMARY OUTLINE
            </Button>

            <Button variant="secondary-outline" className="w-full">
              SECONDARY OUTLINE
            </Button>

            <Button variant="danger-outline" className="w-full">
              DANGER OUTLINE
            </Button>

            <Button variant="super-outline" className="w-full">
              SUPER OUTLINE
            </Button>

            <Button variant="outline" className="w-full">
              OUTLINE
            </Button>

            <Button variant="link" className="w-full">
              LINK
            </Button>
            <Button variant="sidebarOutline" className="w-full">
              SIDEBAR OUTLINE
            </Button>
          </div>
        </div>

        {/* Size Variants */}
        <div className="mt-8 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
            Size Variants (Primary)
          </h2>
          
          <div className="flex flex-wrap items-end gap-4">
            <Button variant="primary" size="xs">
              Extra Small
            </Button>
            
            <Button variant="primary" size="sm">
              Small
            </Button>
            
            <Button variant="primary" size="default">
              Default
            </Button>
            
            <Button variant="primary" size="lg">
              Large
            </Button>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="mt-8 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
            Interactive States
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <Button variant="primary" className="w-full">
                Normal
              </Button>
              <p className="text-xs text-gray-600 dark:text-gray-400">Default state</p>
            </div>
            
            <div className="text-center space-y-2">
              <Button variant="secondary" className="w-full" disabled>
                Disabled
              </Button>
              <p className="text-xs text-gray-600 dark:text-gray-400">Disabled state</p>
            </div>
            
            <div className="text-center space-y-2">
              <Button variant="danger" className="w-full">
                Hover Me
              </Button>
              <p className="text-xs text-gray-600 dark:text-gray-400">Hover effect</p>
            </div>
            
            <div className="text-center space-y-2">
              <Button variant="super" className="w-full">
                Click Me
              </Button>
              <p className="text-xs text-gray-600 dark:text-gray-400">Active press</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default ButtonPage;