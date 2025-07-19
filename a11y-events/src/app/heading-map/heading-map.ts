import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AriaLevelSatus, HeadingInfo } from '../../types/messages';
import { DevtoolsInteraction } from '../core/chrome/devtools-interaction';

@Component({
  selector: 'a11y-heading-map',
  templateUrl: './heading-map.html',
  styleUrl: './heading-map.scss',
})
export class HeadingMap implements OnInit {
  private readonly devtoolsInteractionService: DevtoolsInteraction =
    inject(DevtoolsInteraction);

  protected readonly headings = signal<HeadingInfo[]>([]);
  protected readonly missingH1 = computed<boolean>(
    () => this.headings().filter((h) => h.level === 1).length === 0,
  );
  protected readonly multipleH1 = computed<boolean>(
    () => this.headings().filter((h) => h.level === 1).length > 1,
  );

  protected readonly AriaLevelSatus = AriaLevelSatus;

  ngOnInit() {
    this.loadHeadings();
  }

  protected loadHeadings() {
    chrome.tabs.sendMessage(
      chrome.devtools.inspectedWindow.tabId,
      { type: 'GET_HEADINGS' },
      (response) => this.headings.set(response.data || []),
    );
  }

  protected findElement(index: number, $event: MouseEvent): void {
    if ($event.ctrlKey || $event.metaKey) {
      this.findInElementsTab(index);
    } else {
      this.highlightOnPage(index);
    }
  }

  private findInElementsTab(index: number): void {
    this.devtoolsInteractionService
      .inspectElement(`[data-a11y-heading-index="${index}"]`)
      .then(() => console.log('Heading inspected successfully'))
      .catch(() => console.error('Failed to inspect heading'));
  }

  private highlightOnPage(index: number): void {
    chrome.tabs.sendMessage(
      chrome.devtools.inspectedWindow.tabId,
      { type: 'HIGHLIGHT_HEADING', data: { index } },
      (response) => {
        if (!response.success) {
          console.error('Failed to highlight heading:', response.error);
        }
      },
    );
  }

  protected refreshHeadings() {
    this.loadHeadings();
  }

  getHeadingClasses(heading: HeadingInfo): string {
    const classes = ['heading-item'];

    // Only add level class if we have a valid level
    if (heading.level > 0 && !isNaN(heading.level)) {
      classes.push(`heading-level-${heading.level}`);
    } else {
      classes.push('heading-level-invalid');
    }

    // Add type indicator class
    if (heading.isNative) {
      classes.push('heading-native');
    } else {
      classes.push('heading-custom');
    }

    return classes.join(' ');
  }

  getHeadingLevelClass(heading: HeadingInfo): string {
    const classes = ['heading-level'];

    if (heading.isNative) {
      classes.push('level-native');
    } else {
      classes.push('level-custom');

      // Add specific class based on aria-level status
      switch (heading.ariaLevelStatus) {
        case AriaLevelSatus.Valid:
          classes.push('level-valid');
          break;
        case AriaLevelSatus.Missing:
          classes.push('level-missing');
          break;
        case AriaLevelSatus.NaN:
          classes.push('level-nan');
          break;
        case AriaLevelSatus.TooLow:
          classes.push('level-too-low');
          break;
      }
    }

    return classes.join(' ');
  }
}
