/**
 * Content script — injected on whitelisted job pages.
 * Day 7 ships the architecture: detection heuristics + sidebar mount slot.
 * Sprint-2 wires the actual sidebar React app inside Shadow DOM.
 */

(function init() {
  if (window.self !== window.top) return; // skip iframes
  if (document.getElementById('careerops-sidebar-root')) return; // already injected

  const detected = detectJobPage();
  if (!detected) return;

  // Mount slot — Shadow DOM isolates extension styles from the host page.
  const host = document.createElement('div');
  host.id = 'careerops-sidebar-root';
  host.style.cssText =
    'position:fixed;top:0;right:0;height:100vh;width:0;z-index:2147483646;pointer-events:none;';
  document.documentElement.appendChild(host);

  const shadow = host.attachShadow({ mode: 'open' });

  // Floating CO logo button to expand
  const launcher = document.createElement('button');
  launcher.type = 'button';
  launcher.setAttribute('aria-label', 'Open CareerOps sidebar');
  launcher.style.cssText = `
    position:fixed; bottom:20px; right:20px; pointer-events:auto;
    width:48px; height:48px; border-radius:9999px; border:none;
    background:#14998D; color:#07201F; font-family:'Fraunces',serif;
    font-weight:700; font-size:18px; cursor:pointer;
    box-shadow:0 8px 24px rgba(7,32,31,0.4); z-index:2147483647;`;
  launcher.textContent = 'CO';
  shadow.appendChild(launcher);

  launcher.addEventListener('click', () => {
    // Sprint-2: expand into a 360px Shadow-DOM-isolated sidebar with the
    // detected listing's title / company / ghost-score / referral paths /
    // tailored bullets. For now we open the web app dashboard.
    window.open('https://careerops.in/dashboard', '_blank');
  });

  // Inform background of detection
  chrome.runtime.sendMessage({
    kind: 'co:job-detected',
    title: detected.title,
    company: detected.company,
    url: location.href,
  });
})();

function detectJobPage(): { title: string; company: string } | null {
  const h = location.host;
  if (h.endsWith('naukri.com')) {
    const title = qs('h1.styles_jd-header-title__rZwM1') ?? qs('h1');
    const company = qs('a.styles_jd-header-comp-name__MvqAI') ?? qs('a');
    return title ? { title: text(title), company: text(company) } : null;
  }
  if (h.endsWith('linkedin.com') && location.pathname.includes('/jobs/')) {
    const title = qs('h1');
    const company = qs('.job-details-jobs-unified-top-card__company-name a');
    return title ? { title: text(title), company: text(company) } : null;
  }
  if (h.endsWith('indeed.com') && location.pathname.includes('viewjob')) {
    const title = qs('[data-testid="jobsearch-JobInfoHeader-title"]');
    const company = qs('[data-testid="inlineHeader-companyName"]');
    return title ? { title: text(title), company: text(company) } : null;
  }
  // Generic JD heuristic: any page with a single h1 + an "apply" button
  const h1 = document.querySelector('h1');
  const apply = document.querySelector('button, a')?.textContent?.toLowerCase().includes('apply');
  if (h1 && apply) return { title: text(h1), company: '' };
  return null;
}

function qs(selector: string): Element | null {
  return document.querySelector(selector);
}

function text(el: Element | null): string {
  return (el?.textContent ?? '').trim();
}
