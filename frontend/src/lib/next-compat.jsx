// Capa de compatibilidad: reimplementa las APIs de Next que usaban las páginas
// sobre react-router puro, para preservar el comportamiento sin depender de Next.
import { lazy, Suspense, useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

// next/link -> react-router Link (href -> to)
export function Link({ href, to, children, ...rest }) {
  return (
    <RouterLink to={to ?? href} {...rest}>
      {children}
    </RouterLink>
  );
}

// next/image -> <img> (descarta props propias de Next)
export function Image({
  src,
  alt = '',
  width,
  height,
  priority,
  fill,
  sizes,
  quality,
  placeholder,
  blurDataURL,
  loader,
  unoptimized,
  ...rest
}) {
  return <img src={src} alt={alt} width={width} height={height} {...rest} />;
}

// next/navigation useRouter -> navigate
export function useRouter() {
  const navigate = useNavigate();
  return {
    push: (to) => navigate(to),
    replace: (to) => navigate(to, { replace: true }),
    back: () => navigate(-1),
    forward: () => navigate(1),
    refresh: () => {},
    prefetch: () => {},
  };
}

// next/navigation usePathname
export function usePathname() {
  return useLocation().pathname;
}

// next/dynamic -> React.lazy (+ comportamiento client-only cuando ssr: false)
export function dynamic(loader, options = {}) {
  const LazyComp = lazy(loader);
  const Fallback = options.loading || (() => null);
  const clientOnly = options.ssr === false;

  return function DynamicComponent(props) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (clientOnly && !mounted) return <Fallback />;

    return (
      <Suspense fallback={<Fallback />}>
        <LazyComp {...props} />
      </Suspense>
    );
  };
}
