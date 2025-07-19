import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DevtoolsInteraction {
  public inspectElement(selector: string): Promise<unknown> {
    return this.eval(this.inspect(selector));
  }

  private readonly eval = (code: string): Promise<unknown> =>
    new Promise((resolve, reject) => {
      chrome.devtools.inspectedWindow.eval(code, (result, isException) => {
        if (isException) {
          reject(new Error('Error evaluating code: ' + result));
        } else {
          resolve(result);
        }
      });
    });

  private readonly inspect = (selector: string): string =>
    this.wrapIife(`
    const element = document.querySelector('${selector}');
    if (element) {
      inspect(element);
    } else {
      console.warn('Element not found:', '${selector}');
    }`);

  private readonly wrapIife = (code: string): string => `(function() {
    ${code}
  })()`;
}
