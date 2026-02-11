export const Footer = () => {
  return (
    <footer className="hidden lg:block w-full border-t-4 border-slate-300 dark:border-slate-700 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Civic Learn
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Building games that teches manners!
            </p>
          </div>

           

          {/* Social Links */}
           
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t-2 border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 justify-center items-center ">
            © 2026 Civic Learn. All rights reserved.
          </p>
           
        </div>
      </div>
    </footer>
  )
}