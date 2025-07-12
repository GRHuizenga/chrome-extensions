import { describe, beforeEach, it, expect } from 'vitest';
import { createComponentFactory, Spectator } from '@ngneat/spectator/vitest';
import { App } from './app';
import { getTestProviders } from '../test-setup';

describe('App', () => {
  let spectator: Spectator<App>;
  const createComponent = createComponentFactory({
    component: App,
    providers: getTestProviders(),
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render title', () => {
    expect(spectator.query('h1')!.textContent).toContain('Hello, a11y-events');
  });
});
