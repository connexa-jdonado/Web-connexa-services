import { Link } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <img
              className="footer-logo-img"
              src="/assets/connexaAzulP.png"
              alt="Connexa Services"
              width={160}
              height={40}
            />
            <p className="footer-desc">{f.description}</p>
            <div className="footer-partner-logos">
              <div className="footer-partner-badge">
                <img src="/assets/OFSC-hq.png" alt="Oracle" width={18} height={18} />
                <span>Oracle Partner</span>
              </div>
              <div className="footer-partner-badge">
                <img
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
              <li><Link to="/servicios">{f.serviceLinks.ofscImpl}</Link></li>
              <li><Link to="/servicios">{f.serviceLinks.zinierImpl}</Link></li>
              <li><Link to="/servicios">{f.serviceLinks.consulting}</Link></li>
              <li><Link to="/servicios">{f.serviceLinks.support}</Link></li>
            </ul>
          </div>

          {/* Products + Company */}
          <div>
            <div className="footer-col-title">{f.products}</div>
            <ul className="footer-links">
              <li><Link to="/productos/fsmtool">FSMTool</Link></li>
              <li><Link to="/productos/workflow-builder">Workflow Builder</Link></li>
            </ul>
            <div className="footer-col-title" style={{ marginTop: 28 }}>{f.company}</div>
            <ul className="footer-links">
              <li><Link to="/#nosotros">{f.companyLinks.about}</Link></li>
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
