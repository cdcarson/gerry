import { GerryPage } from './app.po';

describe('gerry App', () => {
  let page: GerryPage;

  beforeEach(() => {
    page = new GerryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
