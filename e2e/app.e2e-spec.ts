import { NgrxTodoPracticePage } from './app.po';

describe('ngrx-todo-practice App', () => {
  let page: NgrxTodoPracticePage;

  beforeEach(() => {
    page = new NgrxTodoPracticePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
