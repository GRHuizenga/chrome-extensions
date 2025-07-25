import {
  HeadingInfo,
  LandmarkInfo,
  FormControlInfo,
  ImageInfo,
  ColorContrastIssue,
  AriaLevelSatus,
} from '../../types/messages';

// Accessibility analyzer classes - shared between DevTools and Content Script
// Written in proper TypeScript with full IDE support

export class AccessibilityAnalyzer {
  static getHeadings(doc: Document): HeadingInfo[] {
    // Include both native headings and role="heading" elements
    const headings: HTMLElement[] = Array.from(
      doc.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]'),
    );

    return headings.reduce((acc, heading, index) => {
      heading.setAttribute('data-a11y-heading-index', index.toString());
      const isNative = /^H[1-6]$/.test(heading.tagName);
      const text = heading.textContent?.trim() || '';
      const level = isNative
        ? parseInt(heading.tagName[1])
        : parseInt(heading.getAttribute('aria-level') ?? '0');
      return [
        ...acc,
        {
          tagName: heading.tagName,
          level,
          text,
          isNative,
          ariaLevelStatus: isNative
            ? AriaLevelSatus.Valid
            : this.getAriaLevelStatus(heading.getAttribute('aria-level')),
          isEmpty: text.length === 0,
          nonDescriptive: text.length < 3,
          levelSkipDetected: acc.length ? level > acc.at(-1)!.level + 1 : false,
        },
      ];
    }, [] as HeadingInfo[]);
  }

  static highLight(doc: Document, index: number): void {
    const heading: HTMLElement | null = doc.querySelector(
      `[data-a11y-heading-index="${index}"]`,
    );
    if (heading) {
      heading.scrollIntoView({ behavior: 'smooth', block: 'center' });
      heading.style.outlineColor = 'red';
      heading.style.outlineStyle = 'solid';
      heading.style.outlineWidth = '4px';
      setTimeout(() => {
        heading.style.outlineColor = '';
        heading.style.outlineStyle = '';
        heading.style.outlineWidth = '';
      }, 5000);
    }
  }

  private static getAriaLevelStatus(
    ariaLevelAttribute: string | null,
  ): AriaLevelSatus {
    if (ariaLevelAttribute === null) {
      return AriaLevelSatus.Missing;
    }
    const level = parseInt(ariaLevelAttribute);
    if (isNaN(level)) {
      return AriaLevelSatus.NaN;
    }
    if (level < 1) {
      return AriaLevelSatus.TooLow;
    }
    return AriaLevelSatus.Valid;
  }

  static getLandmarks(doc: Document): LandmarkInfo[] {
    const landmarks = Array.from(
      doc.querySelectorAll('[role], main, nav, header, footer, aside, section'),
    );

    return landmarks
      .map((element) => {
        const role =
          element.getAttribute('role') || element.tagName.toLowerCase();
        const label =
          element.getAttribute('aria-label') ||
          element.getAttribute('aria-labelledby');

        // Generate a simple selector
        let selector = element.tagName.toLowerCase();
        if (element.id) selector += '#' + element.id;
        if (element.className)
          selector += '.' + element.className.split(' ').join('.');

        return {
          role,
          tagName: element.tagName.toLowerCase(),
          label: label || undefined,
          selector,
        };
      })
      .filter((item) =>
        [
          'main',
          'nav',
          'header',
          'footer',
          'aside',
          'section',
          'banner',
          'contentinfo',
          'complementary',
          'navigation',
          'search',
          'form',
        ].includes(item.role),
      );
  }

  static getFormControls(doc: Document): FormControlInfo[] {
    const controls = Array.from(
      doc.querySelectorAll('input, select, textarea, button'),
    );

    return controls.map((control) => {
      const htmlControl = control as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement
        | HTMLButtonElement;
      const label =
        htmlControl.getAttribute('aria-label') ||
        htmlControl.getAttribute('aria-labelledby') ||
        (htmlControl.labels && htmlControl.labels.length > 0
          ? htmlControl.labels[0].textContent?.trim()
          : null);

      let selector = htmlControl.tagName.toLowerCase();
      if (htmlControl.id) selector += '#' + htmlControl.id;
      if (htmlControl.className)
        selector += '.' + htmlControl.className.split(' ').join('.');

      return {
        tagName: htmlControl.tagName.toLowerCase(),
        type: (htmlControl as HTMLInputElement).type || undefined,
        label: label || undefined,
        hasLabel: Boolean(label),
        required: (htmlControl as HTMLInputElement).required || false,
        selector,
      };
    });
  }

  static getImages(doc: Document): ImageInfo[] {
    const images = Array.from(doc.querySelectorAll('img'));

    return images.map((img) => {
      const alt = img.getAttribute('alt');
      const isDecorative = alt === '';

      let selector = 'img';
      if (img.id) selector += '#' + img.id;
      if (img.className) selector += '.' + img.className.split(' ').join('.');

      return {
        src: img.src,
        alt: alt || undefined,
        hasAlt: alt !== null,
        isDecorative,
        selector,
      };
    });
  }

  static hasSkipLink(doc: Document): boolean {
    const skipLinks = Array.from(doc.querySelectorAll('a[href^="#"]'));
    return skipLinks.some(
      (link) =>
        link.textContent?.toLowerCase().includes('skip') ||
        link.textContent?.toLowerCase().includes('main content'),
    );
  }

  static getColorContrastIssues(doc: Document): ColorContrastIssue[] {
    const elements = Array.from(doc.querySelectorAll('*'));
    const issues: ColorContrastIssue[] = [];

    elements.forEach((element) => {
      const style = window.getComputedStyle(element);
      const text = element.textContent?.trim();

      if (text && text.length > 0) {
        const color = style.color;
        const backgroundColor = style.backgroundColor;

        // Simple check - you'd want a more sophisticated contrast calculation
        if (
          color &&
          backgroundColor &&
          color !== 'rgba(0, 0, 0, 0)' &&
          backgroundColor !== 'rgba(0, 0, 0, 0)'
        ) {
          let selector = element.tagName.toLowerCase();
          if (element.id) selector += '#' + element.id;
          if (element.className)
            selector += '.' + element.className.split(' ').join('.');

          issues.push({
            text: text.substring(0, 50),
            selector,
            color,
            backgroundColor,
          });
        }
      }
    });

    return issues.slice(0, 20); // Limit results
  }
}
