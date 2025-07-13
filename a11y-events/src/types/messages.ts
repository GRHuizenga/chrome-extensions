// Shared message types for communication between DevTools, Service Worker, and Content Script

// Message types
export type MessageType =
  | 'GET_HEADINGS'
  | 'GET_LANDMARKS'
  | 'GET_FORMS'
  | 'GET_IMAGES'
  | 'HAS_SKIP_LINK'
  | 'GET_COLOR_CONTRAST_ISSUES'
  | 'PING';

export interface DevToolsMessage {
  source: 'devtools-panel';
  type: string;
  data?: any;
  tabId: number;
}

export interface ContentScriptResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Data types for responses
export interface HeadingInfo {
  level: number;
  text: string;
  id?: string;
  hasId: boolean;
}

export interface LandmarkInfo {
  role: string;
  tagName: string;
  label?: string;
  selector: string;
}

export interface FormControlInfo {
  tagName: string;
  type?: string;
  label?: string;
  hasLabel: boolean;
  required: boolean;
  selector: string;
}

export interface ImageInfo {
  src: string;
  alt?: string;
  hasAlt: boolean;
  isDecorative: boolean;
  selector: string;
}

export interface ColorContrastIssue {
  text: string;
  selector: string;
  color: string;
  backgroundColor: string;
}
