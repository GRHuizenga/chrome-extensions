import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadingMap } from '../heading-map/heading-map';

@Component({
  selector: 'a11y-dashboard',
  standalone: true,
  imports: [CommonModule, HeadingMap],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h1>Accessibility Analysis</h1>
        <p>Analyze the accessibility of the current page</p>
        <button (click)="testConnection()" class="test-connection-btn">
          Test Connection
        </button>
        <button (click)="debugInfo()" class="debug-btn">Debug Info</button>
        <div *ngIf="connectionStatus" class="connection-status">
          {{ connectionStatus }}
        </div>
        <div *ngIf="debugOutput" class="debug-output">
          <pre>{{ debugOutput }}</pre>
        </div>
      </div>

      <div class="dashboard-tabs">
        <button
          *ngFor="let tab of tabs; trackBy: trackByTab"
          [class.active]="activeTab === tab.id"
          (click)="setActiveTab(tab.id)"
          class="tab-button"
        >
          {{ tab.name }}
        </button>
      </div>

      <div class="dashboard-content">
        <div *ngIf="activeTab === 'headings'" class="tab-content">
          <a11y-heading-map></a11y-heading-map>
        </div>

        <div *ngIf="activeTab === 'overview'" class="tab-content">
          <div class="overview-panel">
            <h2>Accessibility Overview</h2>
            <p>
              This Chrome DevTools extension helps you analyze the accessibility
              of web pages.
            </p>

            <div class="feature-grid">
              <div class="feature-card">
                <h3>Heading Structure</h3>
                <p>
                  Analyze the heading hierarchy (h1-h6) and identify structural
                  issues.
                </p>
                <button
                  (click)="setActiveTab('headings')"
                  class="feature-button"
                >
                  View Headings
                </button>
              </div>

              <div class="feature-card">
                <h3>ARIA Landmarks</h3>
                <p>
                  Identify navigation landmarks and semantic regions on the
                  page.
                </p>
                <button
                  (click)="setActiveTab('landmarks')"
                  class="feature-button"
                >
                  View Landmarks
                </button>
              </div>

              <div class="feature-card">
                <h3>Form Controls</h3>
                <p>
                  Check form elements for proper labeling and accessibility
                  attributes.
                </p>
                <button (click)="setActiveTab('forms')" class="feature-button">
                  View Form Controls
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .dashboard-header {
        padding: 16px 20px;
        background: #f8f9fa;
        border-bottom: 1px solid #e9ecef;
      }

      .dashboard-header h1 {
        margin: 0 0 4px 0;
        font-size: 18px;
        color: #212529;
      }

      .dashboard-header p {
        margin: 0;
        font-size: 14px;
        color: #6c757d;
      }

      .test-connection-btn {
        margin-top: 8px;
        margin-right: 8px;
        padding: 6px 12px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      }

      .debug-btn {
        margin-top: 8px;
        padding: 6px 12px;
        background: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      }

      .debug-btn:hover {
        background: #218838;
      }

      .test-connection-btn:hover {
        background: #0056b3;
      }

      .connection-status {
        margin-top: 8px;
        padding: 6px 8px;
        background: #f8f9fa;
        border-radius: 4px;
        font-size: 12px;
        color: #495057;
      }

      .debug-output {
        margin-top: 8px;
        padding: 8px;
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        font-size: 11px;
        max-height: 200px;
        overflow-y: auto;
      }

      .debug-output pre {
        margin: 0;
        font-family: 'Courier New', monospace;
        white-space: pre-wrap;
      }

      .dashboard-tabs {
        display: flex;
        background: #fff;
        border-bottom: 1px solid #e9ecef;
        padding: 0 20px;
      }

      .tab-button {
        padding: 12px 16px;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 14px;
        color: #6c757d;
        border-bottom: 2px solid transparent;
        transition: all 0.2s;
      }

      .tab-button:hover {
        color: #495057;
        background: #f8f9fa;
      }

      .tab-button.active {
        color: #0066cc;
        border-bottom-color: #0066cc;
      }

      .dashboard-content {
        flex: 1;
        overflow: auto;
        background: #fff;
      }

      .tab-content {
        height: 100%;
      }

      .overview-panel {
        padding: 24px;
        max-width: 800px;
        margin: 0 auto;
      }

      .overview-panel h2 {
        margin: 0 0 8px 0;
        font-size: 20px;
        color: #212529;
      }

      .overview-panel p {
        margin: 0 0 32px 0;
        font-size: 16px;
        color: #6c757d;
      }

      .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
      }

      .feature-card {
        padding: 20px;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        background: #fff;
        transition: box-shadow 0.2s;
      }

      .feature-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .feature-card h3 {
        margin: 0 0 8px 0;
        font-size: 16px;
        color: #212529;
      }

      .feature-card p {
        margin: 0 0 16px 0;
        font-size: 14px;
        color: #6c757d;
        line-height: 1.5;
      }

      .feature-button {
        padding: 8px 16px;
        border: 1px solid #0066cc;
        border-radius: 4px;
        background: #0066cc;
        color: white;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
      }

      .feature-button:hover {
        background: #0052a3;
        border-color: #0052a3;
      }
    `,
  ],
})
export class DashboardComponent {
  protected activeTab = 'overview';
  protected connectionStatus = '';
  protected debugOutput = '';

  protected tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'headings', name: 'Headings' },
    { id: 'landmarks', name: 'Landmarks' },
    { id: 'forms', name: 'Forms' },
  ];

  protected setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  protected trackByTab(index: number, tab: any): string {
    return tab.id;
  }

  protected async testConnection() {
    this.connectionStatus = 'Testing connection...';

    try {
      // Test the connection using the DevTools inspector service
      if (typeof chrome !== 'undefined' && chrome.devtools) {
        const tabId = chrome.devtools.inspectedWindow.tabId;

        chrome.runtime.sendMessage(
          {
            source: 'devtools-panel',
            type: 'PING',
            tabId: tabId,
          },
          (response) => {
            if (chrome.runtime.lastError) {
              this.connectionStatus = `Connection failed: ${chrome.runtime.lastError.message}`;
            } else if (response && response.success) {
              this.connectionStatus =
                'Connection successful! Content script is active.';
            } else {
              this.connectionStatus = `Connection failed: ${response?.error || 'Unknown error'}`;
            }
          },
        );
      } else {
        this.connectionStatus = 'Not running in DevTools context';
      }
    } catch (error) {
      this.connectionStatus = `Connection test failed: ${error}`;
    }
  }

  protected debugInfo() {
    this.debugOutput = '';
    const info: any = {};

    try {
      // Check DevTools context
      info.isDevTools = typeof chrome !== 'undefined' && !!chrome.devtools;
      info.hasInspectedWindow =
        typeof chrome !== 'undefined' && !!chrome.devtools?.inspectedWindow;

      if (chrome.devtools?.inspectedWindow) {
        info.tabId = chrome.devtools.inspectedWindow.tabId;
      }

      // Check runtime API
      info.hasRuntimeAPI = typeof chrome !== 'undefined' && !!chrome.runtime;

      // Check URL
      info.currentURL = 'DevTools API does not expose current URL directly';

      this.debugOutput = JSON.stringify(info, null, 2);
    } catch (error) {
      this.debugOutput = `Debug error: ${error}`;
    }
  }
}
