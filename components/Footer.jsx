'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLang } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const pathname = usePathname();
  const router = useRouter();

  const handleHashLink = (hash) => {
    if (pathname !== '/') {
      router.push('/' + hash);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <Image
              className="footer-logo-img"
              src="/assets/connexaAzulP.png"
              alt="Connexa Services"
              width={160}
              height={40}
            />
            <p className="footer-desc">{f.description}</p>
            <div className="footer-partner-logos">
              <div className="footer-partner-badge">
                <Image src="/assets/OFSC-hq.png" alt="Oracle" width={18} height={18} />
                <span>Oracle Partner</span>
              </div>
              <div className="footer-partner-badge">
                <Image
                  src="/assets/zinier-hq.webp"
                  alt="Zinier"
                  width={18}
                  height={18}
                  style={{ background: '#fff', borderRadius: 4 }}
                />
                <span>Zinier Partner</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="footer-col-title">{f.services}</div>
            <ul className="footer-links">
              <li><Link href="/servicios">{f.serviceLinks.ofscImpl}</Link></li>
              <li><Link href="/servicios">{f.serviceLinks.zinierImpl}</Link></li>
              <li><Link href="/servicios">{f.serviceLinks.consulting}</Link></li>
              <li><Link href="/servicios">{f.serviceLinks.support}</Link></li>
            </ul>
          </div>

          {/* Products + Company */}
          <div>
            <div className="footer-col-title">{f.products}</div>
            <ul className="footer-links">
              <li><Link href="/productos/fsmtool">FSMTool</Link></li>
              <li><Link href="/productos/workflow-builder">Workflow Builder</Link></li>
            </ul>
            <div className="footer-col-title" style={{ marginTop: 28 }}>{f.company}</div>
            <ul className="footer-links">
              <li>
                <a
                  href="/#nosotros"
                  onClick={(e) => { e.preventDefault(); handleHashLink('#nosotros'); }}
                >
                  {f.companyLinks.about}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-col-title">{f.contact}</div>
            <div className="footer-contact-item">
              <span className="footer-contact-label">Email</span>
              <div className="footer-contact-val">
                <a href="mailto:contacto@connexaservices.com">contacto@connexaservices.com</a>
              </div>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-label">Website</span>
              <div className="footer-contact-val">www.connexaservices.com</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">{f.copyright}</span>
          <div className="footer-bottom-links">
            <a href="#">{f.privacy}</a>
            <a href="#">{f.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
