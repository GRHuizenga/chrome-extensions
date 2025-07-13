import { Component, OnInit, signal } from '@angular/core';

interface HeadingInfo {
  level: number;
  text: string;
  id?: string;
  hasId: boolean;
}

@Component({
  selector: 'a11y-heading-map',
  imports: [],
  templateUrl: './heading-map.html',
  styleUrl: './heading-map.scss',
})
export class HeadingMap implements OnInit {
  protected headings = signal<HeadingInfo[]>([]);
  protected isLoading = signal(false);
  protected error = signal<string | null>(null);

  ngOnInit() {
    this.loadHeadings();
  }

  protected async loadHeadings() {
    chrome.runtime.sendMessage({ data: 'GET_HEADINGS' }, (response) => {
      console.log('Response from content script in Angular app:', response);
      this.headings.set(response.data || []);
    });
  }

  protected refreshHeadings() {
    this.loadHeadings();
  }

  // private x(): void {
  //   chrome.runtime.onMessage.addListener((message, x, sendResponse) => {
  //     x.
  //     console.log('Background script received message:', message);
  //     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //       chrome.tabs.sendMessage(tabs[0].id, message, (response) =>
  //         sendResponse(response),
  //       );
  //     });
  //   });
  // }
}
