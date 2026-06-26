export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} 大程开源百宝箱. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
